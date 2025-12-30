<script>
    // Svelte 5 component - stack of images with noise masks

    // Image data - replace these URLs with your own
    const images = [
        { id: 1, url: "/logo/rstr-01.png" },
        { id: 2, url: "/logo/rstr-02.png" },
        { id: 3, url: "/logo/rstr-03.png" },
    ];

    // Noise parameters for each mask - easy to tweak
    const noiseParams = [
        { baseFrequency: 0.02, octaves: 3, seed: 1 },
        { baseFrequency: 0.03, octaves: 4, seed: 42 },
        { baseFrequency: 0.025, octaves: 2, seed: 99 },
    ];
</script>

<svg
    width="1472"
    height="488"
    viewBox="0 0 1472 488"
    xmlns="http://www.w3.org/2000/svg"
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
                <feComponentTransfer>
                    <feFuncA type="discrete" tableValues="0 1" />
                </feComponentTransfer>
            </filter>

            <mask id="mask-{img.id}">
                <rect
                    x="0"
                    y="0"
                    width="1472"
                    height="488"
                    fill="white"
                    filter="url(#noise-{img.id})"
                />
            </mask>
        {/each}
    </defs>

    <!-- Render each image with its noise mask -->
    <image href="/logo/d17e-logo.png" width="1472" height="488" />
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
</style>
