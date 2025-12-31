<script>
    import { onMount } from "svelte";

    /**
     * HydraBackground - A wrapper component that renders Hydra visuals behind its content
     *
     * This component creates a canvas that fills its container and renders Hydra code
     * as a background for the slotted content.
     *
     * Usage:
     * <HydraBackground code="osc(10, 0.1, 0.8).out()">
     *   <section>Your content here</section>
     * </HydraBackground>
     */

    // Polyfill for Node.js globals that hydra-synth dependencies expect
    if (typeof window !== "undefined") {
        window.global = window.global || window;
        window.process = window.process || { env: {} };
    }

    // Props
    let {
        // The Hydra code to execute
        code = "solid(0, 0, 0).out()",
        // CSS blend mode for the canvas
        blendMode = "normal",
        // Opacity of the hydra canvas
        opacity = 1,
        // Children content
        children,
    } = $props();

    // State
    let container = $state(null);
    let canvas = $state(null);
    let hydra = $state(null);
    let mounted = $state(false);
    let initialized = $state(false);
    let resizeObserver = null;

    onMount(() => {
        mounted = true;

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    });

    // Initialize Hydra when canvas is available
    $effect(() => {
        if (canvas && mounted && !initialized) {
            initHydra();
        }
    });

    // Re-execute code when it changes
    $effect(() => {
        if (hydra && code && initialized) {
            executeCode(code);
        }
    });

    async function initHydra() {
        if (!canvas || !container) return;

        try {
            // Dynamically import Hydra to avoid SSR issues
            const Hydra = (await import("hydra-synth")).default;

            // Get container dimensions
            const rect = container.getBoundingClientRect();
            const width = Math.max(rect.width, 1);
            const height = Math.max(rect.height, 1);

            // Set canvas size
            canvas.width = width;
            canvas.height = height;

            // Initialize Hydra with this canvas
            hydra = new Hydra({
                canvas: canvas,
                detectAudio: false,
                enableStreamCapture: false,
                width: width,
                height: height,
                autoLoop: true,
            });

            initialized = true;

            // Execute initial code
            executeCode(code);

            // Set up resize observer to handle container size changes
            resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const { width, height } = entry.contentRect;
                    if (canvas && hydra && width > 0 && height > 0) {
                        canvas.width = width;
                        canvas.height = height;
                        hydra.setResolution(width, height);
                    }
                }
            });
            resizeObserver.observe(container);
        } catch (e) {
            console.error("[HydraBackground] Initialization error:", e);
        }
    }

    function executeCode(rawCode) {
        if (!hydra) return;

        // Clean up the code for evaluation
        const cleanCode = rawCode
            .split("\n")
            .filter((line) => !line.trim().startsWith("//"))
            .map((line) => line.trim())
            .join("")
            .replace(/\s+/g, " ")
            .replace(/\s*([{,();}])\s*/g, "$1")
            .replace(/\s+/g, "")
            .replace(/return(\w)/, "return $1");

        if (!cleanCode) return;

        try {
            eval(cleanCode);
        } catch (e) {
            console.warn("[HydraBackground] Code execution error:", e);
        }
    }
</script>

<div class="hydra-wrapper" bind:this={container}>
    <canvas
        bind:this={canvas}
        class="hydra-canvas"
        style:mix-blend-mode={blendMode}
        style:opacity
        aria-hidden="true"
    ></canvas>
    <div class="hydra-content">
        {@render children?.()}
    </div>
</div>

<style>
    .hydra-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .hydra-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
    }

    .hydra-content {
        position: relative;
        z-index: 1;
    }
</style>
