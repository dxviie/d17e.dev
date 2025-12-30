<script>
    // Svelte 5 component - stack of images with noise masks
    // All masks share the same noise field but use different non-overlapping threshold ranges

    // Image data
    const images = [
        { id: 1, url: "/logo/rstr-01.png" },
        { id: 2, url: "/logo/rstr-02.png" },
        { id: 3, url: "/logo/rstr-03.png" },
        { id: 4, url: "/logo/rstr-04.png" },
        { id: 5, url: "/logo/rstr-05.png" },
        { id: 6, url: "/logo/rstr-12.png" },
    ];

    // Shared noise parameters
    const sharedNoise = {
        baseFrequency: 0.008,
        octaves: 4,
        seed: 43,
    };

    // Non-overlapping threshold ranges - each layer gets a narrow slice
    // Effective range is 0.3 to 0.7, divided into 6 equal slices
    // Total coverage is small, so main logo remains mostly visible
    const thresholdRanges = [
        { min: 0.3, max: 0.31 }, // ~6.67% slice
        { min: 0.37, max: 0.39 }, // ~6.67% slice
        { min: 0.4333, max: 0.47 }, // ~6.67% slice
        { min: 0.5, max: 0.53 }, // ~6.67% slice
        { min: 0.5667, max: 0.6 }, // ~6.67% slice
        { min: 0.6333, max: 0.66 }, // ~6.67% slice
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

<!-- Debug visualization of masks -->
<svg
    width="1472"
    height="300"
    viewBox="0 0 1472 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Mask Visualization"
>
    <defs>
        <!-- Reuse the shared noise filter -->
        <filter id="debug-shared-noise">
            <feTurbulence
                type="fractalNoise"
                baseFrequency={sharedNoise.baseFrequency}
                numOctaves={sharedNoise.octaves}
                seed={sharedNoise.seed}
                result="noise"
            />
        </filter>

        <!-- Create debug filters for visualization -->
        {#each images as img, i}
            <filter id="debug-threshold-{img.id}">
                <feComponentTransfer>
                    <feFuncA
                        type="discrete"
                        tableValues={Array.from({ length: 256 }, (_, idx) => {
                            const val = idx / 255;
                            const range = thresholdRanges[i];
                            return val >= range.min && val <= range.max ? 1 : 0;
                        }).join(" ")}
                    />
                </feComponentTransfer>
            </filter>
        {/each}
    </defs>

    <!-- Display each mask as a BW rectangle with label -->
    {#each images as img, i}
        <g transform="translate({i * 245}, 0)">
            <!-- Label -->
            <text
                x="120"
                y="15"
                text-anchor="middle"
                font-family="monospace"
                font-size="12"
                fill="#333"
            >
                Mask {i + 1}: {thresholdRanges[i].min.toFixed(
                    2,
                )}-{thresholdRanges[i].max.toFixed(2)}
            </text>

            <!-- Mask visualization -->
            <rect
                x="0"
                y="30"
                width="240"
                height="80"
                fill="white"
                stroke="#ccc"
                filter="url(#debug-shared-noise) url(#debug-threshold-{img.id})"
            />
        </g>
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
