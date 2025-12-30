<script>
    // Svelte 5 component - stack of images with noise masks

    // Image data - replace these URLs with your own
    const images = [
        { id: 1, url: "/logo/rstr-01.png" },
        { id: 2, url: "/logo/rstr-02.png" },
        { id: 3, url: "/logo/rstr-03.png" },
        { id: 1, url: "/logo/rstr-04.png" },
        { id: 2, url: "/logo/rstr-05.png" },
        { id: 3, url: "/logo/rstr-06.png" },
    ];

    // Noise parameters for each mask - coverage controls how much is visible
    const noiseParams = [
        { baseFrequency: 0.001, octaves: 3, seed: 1, threshold: 0.66 }, // ~15% visible
        { baseFrequency: 0.015, octaves: 4, seed: 42, threshold: 0.66 }, // ~12% visible
        { baseFrequency: 0.012, octaves: 2, seed: 99, threshold: 0.66 }, // ~13% visible
        { baseFrequency: 0.001, octaves: 3, seed: 11, threshold: 0.66 }, // ~15% visible
        { baseFrequency: 0.015, octaves: 4, seed: 142, threshold: 0.66 }, // ~12% visible
        { baseFrequency: 0.012, octaves: 2, seed: 199, threshold: 0.66 }, // ~13% visible
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
        <!-- Create a noise filter and mask for each image -->
        {#each images as img, i}
            <filter id="noise-{img.id}">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency={noiseParams[i].baseFrequency}
                    numOctaves={noiseParams[i].octaves}
                    seed={noiseParams[i].seed}
                    result="turbulence"
                />
                <!-- Offset animates to simulate moving through the noise field -->
                <feOffset result="offset">
                    <animate
                        attributeName="dx"
                        values="0;100;200;300;200;100;0"
                        dur="{150 + i * 5}s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="dy"
                        values="0;50;100;50;0;-50;0"
                        dur="{300 + i * 4}s"
                        repeatCount="indefinite"
                    />
                </feOffset>
                <!-- Use a threshold to control visibility -->
                <feComponentTransfer in="offset">
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
                    x="-400"
                    y="-200"
                    width="2272"
                    height="888"
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
            opacity="1"
        >
            <!-- Gentle opacity animation -->
            <!-- <animate
                attributeName="opacity"
                values="0.7;0.95;0.7"
                dur="{12 + i * 2}s"
                repeatCount="indefinite"
            /> -->
        </image>
    {/each}
</svg>

<style>
    svg {
        background: #ffffff;
    }
</style>
