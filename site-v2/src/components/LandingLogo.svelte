<script>
    // All available images (01 to 13)
    const allImages = Array.from({ length: 13 }, (_, i) => ({
        id: i + 1,
        url: `/logo/rstr-${String(i + 1).padStart(2, "0")}.png`,
    }));

    // Fisher-Yates shuffle and pick random images
    function pickRandomImages(count) {
        const shuffled = [...allImages];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    // Randomly selected images for this load
    const images = pickRandomImages(6);

    // Shared noise parameters with random seed
    const sharedNoise = {
        baseFrequency: 0.008,
        octaves: 4,
        seed: Math.floor(Math.random() * 10000),
    };

    // Desktop: wider ranges for more visible effect
    const thresholdRangesDesktop = [
        { min: 0.3, max: 0.37 },
        { min: 0.37, max: 0.4 },
        { min: 0.45, max: 0.5 },
        { min: 0.5, max: 0.5667 },
        { min: 0.5667, max: 0.6333 },
        { min: 0.66, max: 0.72 },
    ];

    // Mobile: narrower ranges for better readability
    const thresholdRangesMobile = [
        { min: 0.32, max: 0.35 },
        { min: 0.38, max: 0.4 },
        { min: 0.46, max: 0.48 },
        { min: 0.52, max: 0.54 },
        { min: 0.58, max: 0.6 },
        { min: 0.66, max: 0.68 },
    ];

    // Canvas state
    let canvas = $state(null);
    let useCanvas = $state(false);
    let mounted = $state(false);
    let animationId;

    // Simple Perlin noise implementation
    class PerlinNoise {
        constructor(seed) {
            this.p = new Uint8Array(512);
            const perm = new Uint8Array(256);
            for (let i = 0; i < 256; i++) perm[i] = i;
            // Seed-based shuffle
            let s = seed;
            for (let i = 255; i > 0; i--) {
                s = (s * 1103515245 + 12345) & 0x7fffffff;
                const j = s % (i + 1);
                [perm[i], perm[j]] = [perm[j], perm[i]];
            }
            for (let i = 0; i < 512; i++) this.p[i] = perm[i & 255];
        }

        fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        lerp(a, b, t) {
            return a + t * (b - a);
        }

        grad(hash, x, y) {
            const h = hash & 3;
            const u = h < 2 ? x : y;
            const v = h < 2 ? y : x;
            return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        }

        noise2D(x, y) {
            const X = Math.floor(x) & 255;
            const Y = Math.floor(y) & 255;
            x -= Math.floor(x);
            y -= Math.floor(y);
            const u = this.fade(x);
            const v = this.fade(y);
            const A = this.p[X] + Y;
            const B = this.p[X + 1] + Y;
            return this.lerp(
                this.lerp(
                    this.grad(this.p[A], x, y),
                    this.grad(this.p[B], x - 1, y),
                    u,
                ),
                this.lerp(
                    this.grad(this.p[A + 1], x, y - 1),
                    this.grad(this.p[B + 1], x - 1, y - 1),
                    u,
                ),
                v,
            );
        }

        // Fractal noise with octaves
        fbm(x, y, octaves) {
            let value = 0;
            let amplitude = 1;
            let frequency = 1;
            let maxValue = 0;
            for (let i = 0; i < octaves; i++) {
                value += amplitude * this.noise2D(x * frequency, y * frequency);
                maxValue += amplitude;
                amplitude *= 0.5;
                frequency *= 2;
            }
            return (value / maxValue + 1) / 2; // Normalize to 0-1
        }
    }

    // Detect device type on mount
    $effect(() => {
        mounted = true;

        // Check if we should use Canvas (mobile or touch devices)
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        // Use canvas on mobile/touch devices, SVG on desktop
        useCanvas = isMobile || (isTouchDevice && window.innerWidth < 1024);
    });

    // Initialize canvas when it becomes available
    $effect(() => {
        if (useCanvas && canvas) {
            initCanvas();

            return () => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            };
        }
    });

    async function initCanvas() {
        const ctx = canvas.getContext("2d");
        const width = 1472;
        const height = 488;

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Load all images
        const loadImage = (src) =>
            new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = () => resolve(null);
                img.src = src;
            });

        const baseLogoImg = await loadImage("/logo/d17e-logo.png");
        const overlayImgs = await Promise.all(
            images.map((img) => loadImage(img.url)),
        );

        if (!baseLogoImg) return;

        // Create noise generator
        const perlin = new PerlinNoise(sharedNoise.seed);

        // Pre-generate noise field at lower resolution for performance
        const noiseScale = 4; // Sample every 4th pixel
        const noiseWidth = Math.ceil(width / noiseScale);
        const noiseHeight = Math.ceil(height / noiseScale);
        const noiseField = new Float32Array(noiseWidth * noiseHeight);

        function generateNoise(timeOffset) {
            const freq = sharedNoise.baseFrequency * 0.5; // Scale frequency for canvas
            for (let y = 0; y < noiseHeight; y++) {
                for (let x = 0; x < noiseWidth; x++) {
                    const nx = x * noiseScale * freq;
                    const ny = y * noiseScale * freq;
                    noiseField[y * noiseWidth + x] = perlin.fbm(
                        nx + timeOffset,
                        ny - timeOffset,
                        sharedNoise.octaves,
                    );
                }
            }
        }

        // Create offscreen canvas for compositing
        const offscreen = document.createElement("canvas");
        offscreen.width = width;
        offscreen.height = height;
        const offCtx = offscreen.getContext("2d");

        // Animation parameters
        const effectiveMin = 0.3;
        const effectiveMax = 0.7;
        const effectiveRange = effectiveMax - effectiveMin;
        const animationDuration = 300000; // 300 seconds
        let startTime = performance.now();

        function render() {
            const elapsed = performance.now() - startTime;
            const progress = (elapsed % animationDuration) / animationDuration;
            const timeOffset = progress * effectiveRange * 0.025; // Shift noise over time

            // Generate noise for current frame
            generateNoise(timeOffset);

            // Clear and draw base logo
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(baseLogoImg, 0, 0, width, height);

            // Draw each overlay with noise-based masking
            for (let i = 0; i < images.length; i++) {
                const overlayImg = overlayImgs[i];
                if (!overlayImg) continue;

                const range = thresholdRangesMobile[i];
                const rangeSize = range.max - range.min;

                // Calculate animated range
                const shift = progress * effectiveRange;
                let newMin =
                    ((range.min - effectiveMin + shift) % effectiveRange) +
                    effectiveMin;
                let newMax = newMin + rangeSize;
                if (newMax > effectiveMax) {
                    newMax = effectiveMin + (newMax - effectiveMax);
                }

                // Draw overlay to offscreen canvas
                offCtx.clearRect(0, 0, width, height);
                offCtx.drawImage(overlayImg, 0, 0, width, height);

                // Get image data for masking
                const imageData = offCtx.getImageData(0, 0, width, height);
                const data = imageData.data;

                // Apply noise mask
                for (let y = 0; y < height; y++) {
                    const ny = Math.floor(y / noiseScale);
                    for (let x = 0; x < width; x++) {
                        const nx = Math.floor(x / noiseScale);
                        const noiseVal = noiseField[ny * noiseWidth + nx];

                        // Check if noise value is in range (handle wrap)
                        let inRange;
                        if (newMin > newMax) {
                            inRange =
                                (noiseVal >= newMin &&
                                    noiseVal <= effectiveMax) ||
                                (noiseVal >= effectiveMin &&
                                    noiseVal <= newMax);
                        } else {
                            inRange = noiseVal >= newMin && noiseVal <= newMax;
                        }

                        // Set alpha based on range
                        const idx = (y * width + x) * 4;
                        if (!inRange) {
                            data[idx + 3] = 0; // Transparent
                        }
                    }
                }

                offCtx.putImageData(imageData, 0, 0);
                ctx.drawImage(offscreen, 0, 0);
            }

            animationId = requestAnimationFrame(render);
        }

        render();
    }
</script>

<div class="logo-container" aria-label="D17E Logo">
    {#if mounted && useCanvas}
        <!-- Canvas version (mobile/touch devices) -->
        <canvas bind:this={canvas} class="logo-canvas"></canvas>
    {:else}
        <!-- SVG version with filters (desktop) -->
        <svg
            width="1472"
            height="488"
            viewBox="0 0 1472 488"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="D17E Logo"
        >
            <defs>
                <!-- Single shared noise turbulence -->
                <filter id="shared-noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency={sharedNoise.baseFrequency}
                        numOctaves={sharedNoise.octaves}
                        seed={sharedNoise.seed}
                        result="noise"
                    />
                </filter>

                <!-- Create a mask for each image using different threshold ranges -->
                {#each images as img, i}
                    <filter id="threshold-{img.id}">
                        <feComponentTransfer>
                            <feFuncA
                                type="discrete"
                                tableValues={Array.from(
                                    { length: 256 },
                                    (_, idx) => {
                                        const val = idx / 255;
                                        const range = thresholdRangesDesktop[i];
                                        return val >= range.min &&
                                            val <= range.max
                                            ? 1
                                            : 0;
                                    },
                                ).join(" ")}
                            >
                                <animate
                                    attributeName="tableValues"
                                    dur="30s"
                                    repeatCount="indefinite"
                                    values={(() => {
                                        const range = thresholdRangesDesktop[i];
                                        const rangeSize = range.max - range.min;
                                        const effectiveMin = 0.3;
                                        const effectiveMax = 0.7;
                                        const effectiveRange =
                                            effectiveMax - effectiveMin;
                                        const steps = 100;

                                        return Array.from(
                                            { length: steps + 1 },
                                            (_, step) => {
                                                const shift =
                                                    (step / steps) *
                                                    effectiveRange;
                                                let newMin =
                                                    ((range.min -
                                                        effectiveMin +
                                                        shift) %
                                                        effectiveRange) +
                                                    effectiveMin;
                                                let newMax = newMin + rangeSize;

                                                if (newMax > effectiveMax) {
                                                    newMax =
                                                        effectiveMin +
                                                        (newMax - effectiveMax);
                                                }

                                                return Array.from(
                                                    { length: 256 },
                                                    (_, idx) => {
                                                        const val = idx / 255;
                                                        if (newMin > newMax) {
                                                            return (val >=
                                                                newMin &&
                                                                val <=
                                                                    effectiveMax) ||
                                                                (val >=
                                                                    effectiveMin &&
                                                                    val <=
                                                                        newMax)
                                                                ? 1
                                                                : 0;
                                                        }
                                                        return val >= newMin &&
                                                            val <= newMax
                                                            ? 1
                                                            : 0;
                                                    },
                                                ).join(" ");
                                            },
                                        ).join("; ");
                                    })()}
                                />
                            </feFuncA>
                        </feComponentTransfer>
                    </filter>

                    <mask id="mask-{img.id}">
                        <rect
                            x="-400"
                            y="-200"
                            width="2272"
                            height="888"
                            fill="white"
                            filter="url(#shared-noise) url(#threshold-{img.id})"
                        />
                    </mask>
                {/each}
            </defs>

            <!-- Render main logo (always fully visible) -->
            <image href="/logo/d17e-logo.png" width="1472" height="488" />

            <!-- Render augmented layers with masks -->
            {#each images as img}
                <image
                    href={img.url}
                    width="1472"
                    height="488"
                    mask="url(#mask-{img.id})"
                />
            {/each}
        </svg>
    {/if}
</div>

<style>
    .logo-container {
        background: #ffffff;
    }

    svg,
    .logo-canvas {
        max-width: 100%;
        height: auto;
        display: block;
    }

    :global(.landing) {
        flex-direction: column;
    }
</style>
