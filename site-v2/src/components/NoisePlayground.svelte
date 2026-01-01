<script>
    // Svelte 5 component - interactive noise playground

    let baseFrequency = $state(0.01);
    let octaves = $state(3);
    let seed = $state(1);
    let threshold = $state(0.85);
    let offsetDxDuration = $state(25);
    let offsetDyDuration = $state(30);
    let offsetDxMax = $state(300);
    let offsetDyMax = $state(100);
    let enableAnimation = $state(true);

    // Create a reactive key to force SVG updates
    let updateKey = $derived(
        `${baseFrequency}-${octaves}-${seed}-${threshold}-${offsetDxMax}-${offsetDyMax}`,
    );
</script>

<div class="playground">
    <div class="controls">
        <h2>Noise Parameters</h2>

        <div class="control-group">
            <label>
                Base Frequency: {baseFrequency.toFixed(3)}
                <input
                    type="range"
                    bind:value={baseFrequency}
                    min="0.001"
                    max="0.1"
                    step="0.001"
                />
            </label>
        </div>

        <div class="control-group">
            <label>
                Octaves: {octaves}
                <input
                    type="range"
                    bind:value={octaves}
                    min="1"
                    max="10"
                    step="1"
                />
            </label>
        </div>

        <div class="control-group">
            <label>
                Seed: {seed}
                <input
                    type="range"
                    bind:value={seed}
                    min="1"
                    max="200"
                    step="1"
                />
            </label>
        </div>

        <div class="control-group">
            <label>
                Threshold (visibility): {threshold.toFixed(2)}
                <input
                    type="range"
                    bind:value={threshold}
                    min="0.5"
                    max="0.95"
                    step="0.01"
                />
            </label>
        </div>

        <h2>Animation Parameters</h2>

        <div class="control-group">
            <label>
                Enable Animation
                <input type="checkbox" bind:checked={enableAnimation} />
            </label>
        </div>

        <div class="control-group">
            <label>
                Offset DX Max: {offsetDxMax}px
                <input
                    type="range"
                    bind:value={offsetDxMax}
                    min="0"
                    max="500"
                    step="10"
                />
            </label>
        </div>

        <div class="control-group">
            <label>
                Offset DY Max: {offsetDyMax}px
                <input
                    type="range"
                    bind:value={offsetDyMax}
                    min="0"
                    max="300"
                    step="10"
                />
            </label>
        </div>

        <div class="control-group">
            <label>
                Offset DX Duration: {offsetDxDuration}s
                <input
                    type="range"
                    bind:value={offsetDxDuration}
                    min="5"
                    max="60"
                    step="1"
                />
            </label>
        </div>

        <div class="control-group">
            <label>
                Offset DY Duration: {offsetDyDuration}s
                <input
                    type="range"
                    bind:value={offsetDyDuration}
                    min="5"
                    max="60"
                    step="1"
                />
            </label>
        </div>

        <div class="code-output">
            <h3>Current Config:</h3>
            <pre>{JSON.stringify(
                    {
                        baseFrequency,
                        octaves,
                        seed,
                        threshold,
                        offsetDxDuration,
                        offsetDyDuration,
                        offsetDxMax,
                        offsetDyMax,
                    },
                    null,
                    2,
                )}</pre>
        </div>
    </div>

    <div class="preview">
        {#key updateKey}
            <svg
                width="800"
                height="600"
                viewBox="0 0 800 600"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="noise-playground">
                        <feTurbulence
                            type="fractalNoise"
                            {baseFrequency}
                            numOctaves={octaves}
                            {seed}
                            result="turbulence"
                        />
                        <feOffset result="offset">
                            {#if enableAnimation}
                                <animate
                                    attributeName="dx"
                                    values="0;{offsetDxMax};{offsetDxMax *
                                        0.66};{offsetDxMax};0"
                                    dur="{offsetDxDuration}s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="dy"
                                    values="0;{offsetDyMax};{offsetDyMax *
                                        0.66};{offsetDyMax * 0.33};0"
                                    dur="{offsetDyDuration}s"
                                    repeatCount="indefinite"
                                />
                            {/if}
                        </feOffset>
                        <feComponentTransfer in="offset">
                            <feFuncA
                                type="linear"
                                slope="10"
                                intercept={-threshold * 10}
                            />
                        </feComponentTransfer>
                        <feComponentTransfer>
                            <feFuncA type="table" tableValues="0 1 1" />
                        </feComponentTransfer>
                        <!-- Convert to visible output -->
                        <feFlood flood-color="black" result="black" />
                        <feComposite
                            in="black"
                            in2="SourceGraphic"
                            operator="in"
                        />
                    </filter>
                </defs>

                <!-- Show the noise pattern itself -->
                <rect
                    x="-100"
                    y="-100"
                    width="1000"
                    height="800"
                    fill="white"
                    filter="url(#noise-playground)"
                />
            </svg>
        {/key}
    </div>
</div>

<style>
    .playground {
        display: flex;
        gap: 2rem;
        padding: 2rem;
        min-height: 100vh;
        background: #f5f5f5;
    }

    .controls {
        width: 400px;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        max-height: 100vh;
    }

    .preview {
        flex: 1;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h2 {
        margin: 1.5rem 0 1rem 0;
        font-size: 1.2rem;
        color: #333;
    }

    h2:first-child {
        margin-top: 0;
    }

    h3 {
        margin: 1rem 0 0.5rem 0;
        font-size: 1rem;
        color: #555;
    }

    .control-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 0.5rem;
    }

    input[type="range"] {
        width: 100%;
        margin-top: 0.5rem;
    }

    input[type="checkbox"] {
        margin-left: 0.5rem;
    }

    .code-output {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #eee;
    }

    pre {
        background: #f8f8f8;
        padding: 1rem;
        border-radius: 4px;
        font-size: 0.85rem;
        overflow-x: auto;
    }

    svg {
        max-width: 100%;
        height: auto;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #e0e0e0;
    }
</style>
