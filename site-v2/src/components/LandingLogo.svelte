<script>
    // Svelte 5 component - stack of images with noise masks

    // Image data - replace these URLs with your own
    const images = [
        { id: 1, url: "/logo/rstr-01.png" },
        { id: 2, url: "/logo/rstr-02.png" },
        { id: 3, url: "/logo/rstr-03.png" },
    ];

    // Noise parameters for each mask - coverage controls how much is visible
    const noiseParams = [
        { baseFrequency: 0.01, octaves: 3, seed: 1, threshold: 0.66 }, // ~15% visible
        { baseFrequency: 0.015, octaves: 4, seed: 42, threshold: 0.66 }, // ~12% visible
        { baseFrequency: 0.012, octaves: 2, seed: 99, threshold: 0.66 }, // ~13% visible
    ];

    let mouseX = $state(0);
    let mouseY = $state(0);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX = (event.clientX - rect.left) / rect.width;
        mouseY = (event.clientY - rect.top) / rect.height;
    }
</script>

<svg
    width="1472"
    height="488"
    viewBox="0 0 1472 488"
    xmlns="http://www.w3.org/2000/svg"
    onmousemove={handleMouseMove}
    role="img"
    aria-label="D17E Logo"
>
    <defs>
        <!-- Create a noise filter and mask for each image -->
        {#each images as img, i}
            <filter id="noise-{img.id}">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency={noiseParams[i].baseFrequency}
                    numOctaves={noiseParams[i].octaves}
                    seed={noiseParams[i].seed}
                />
                <!-- Use a threshold to control visibility -->
                <feComponentTransfer>
                    <feFuncA
                        type="linear"
                        slope="10"
                        intercept={-noiseParams[i].threshold * 10}
                    />
                </feComponentTransfer>
                <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 1 1" />
                </feComponentTransfer>
            </filter>

            <mask id="mask-{img.id}">
                <rect
                    x={-10 + (mouseX - 0.5) * 30 * (i + 1)}
                    y={-10 + (mouseY - 0.5) * 30 * (i + 1)}
                    width="1492"
                    height="508"
                    fill="white"
                    filter="url(#noise-{img.id})"
                />
            </mask>
        {/each}
    </defs>

    <!-- Render main logo (always fully visible) -->
    <image href="/logo/d17e-logo.png" width="1472" height="488" />

    <!-- Render augmented layers with masks -->
    {#each images as img, i}
        <image
            href={img.url}
            width="1472"
            height="488"
            mask="url(#mask-{img.id})"
            opacity={0.7 + mouseX * 0.3}
        />
    {/each}
</svg>

<style>
    svg {
        background: #ffffff;
        cursor: crosshair;
    }
</style>
