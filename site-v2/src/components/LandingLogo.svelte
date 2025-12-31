<script>
    // Svelte 5 component - stack of images with noise masks
    // All masks share the same noise field but use different non-overlapping threshold ranges

    // All available images (01 to 13)
    const allImages = Array.from({ length: 13 }, (_, i) => ({
        id: i + 1,
        url: `/logo/rstr-${String(i + 1).padStart(2, "0")}.png`,
    }));

    // Fisher-Yates shuffle and pick 6 random images
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

    const thresholdRanges = [
        { min: 0.3, max: 0.37 },
        { min: 0.37, max: 0.4 },
        { min: 0.45, max: 0.5 },
        { min: 0.5, max: 0.5667 },
        { min: 0.5667, max: 0.6333 },
        { min: 0.66, max: 0.72 },
    ];
</script>

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
                <!-- Threshold the noise to create a specific range -->
                <feComponentTransfer>
                    <feFuncA
                        type="discrete"
                        tableValues={Array.from({ length: 256 }, (_, idx) => {
                            const val = idx / 255;
                            const range = thresholdRanges[i];
                            return val >= range.min && val <= range.max ? 1 : 0;
                        }).join(" ")}
                    >
                        <!-- Animate the threshold range moving upward and looping -->
                        <animate
                            attributeName="tableValues"
                            dur="30s"
                            repeatCount="indefinite"
                            values={(() => {
                                const range = thresholdRanges[i];
                                const rangeSize = range.max - range.min;
                                const effectiveMin = 0.3;
                                const effectiveMax = 0.7;
                                const effectiveRange =
                                    effectiveMax - effectiveMin;
                                const steps = 100;

                                return Array.from(
                                    { length: steps + 1 },
                                    (_, step) => {
                                        // Calculate shift to move the range forward incrementally
                                        const shift =
                                            (step / steps) * effectiveRange;
                                        let newMin =
                                            ((range.min -
                                                effectiveMin +
                                                shift) %
                                                effectiveRange) +
                                            effectiveMin;
                                        let newMax = newMin + rangeSize;

                                        // Handle wrap around when range crosses the boundary
                                        if (newMax > effectiveMax) {
                                            newMax =
                                                effectiveMin +
                                                (newMax - effectiveMax);
                                        }

                                        return Array.from(
                                            { length: 256 },
                                            (_, idx) => {
                                                const val = idx / 255;
                                                // Handle wrapping case when range crosses the boundary
                                                if (newMin > newMax) {
                                                    return (val >= newMin &&
                                                        val <= effectiveMax) ||
                                                        (val >= effectiveMin &&
                                                            val <= newMax)
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
    {#each images as img, i}
        <image
            href={img.url}
            width="1472"
            height="488"
            mask="url(#mask-{img.id})"
        />
    {/each}
</svg>

<style>
    svg {
        background: #ffffff;
    }

    :global(.landing) {
        flex-direction: column;
    }
</style>
