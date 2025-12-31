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
        // Resolution scale (lower = better performance, 1 = full res)
        resolutionScale = 0.5,
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
            // Clean up Hydra instance
            if (hydra) {
                try {
                    // Stop the render loop if possible
                    if (hydra.loop) {
                        hydra.loop.stop();
                    }
                } catch (e) {
                    // Ignore cleanup errors
                }
            }
        };
    });

    // Initialize Hydra when canvas is available
    $effect(() => {
        if (canvas && container && mounted && !initialized) {
            initHydra();
        }
    });

    // Re-execute code when it changes (but only after initialization)
    $effect(() => {
        if (hydra && code && initialized) {
            executeCode(code);
        }
    });

    async function initHydra() {
        if (!canvas || !container || initialized) return;

        try {
            // Dynamically import Hydra to avoid SSR issues
            const Hydra = (await import("hydra-synth")).default;

            // Get container dimensions and apply resolution scale
            const rect = container.getBoundingClientRect();
            const width = Math.max(Math.floor(rect.width * resolutionScale), 1);
            const height = Math.max(
                Math.floor(rect.height * resolutionScale),
                1,
            );

            // Set canvas size (scaled down for performance)
            canvas.width = width;
            canvas.height = height;

            // Initialize Hydra
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

            // Set up resize observer (throttled) - but skip during active scroll
            let resizeTimeout = null;
            let isScrolling = false;
            let scrollTimeout = null;

            const handleScroll = () => {
                isScrolling = true;
                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 150);
            };

            window.addEventListener("scroll", handleScroll, { passive: true });

            resizeObserver = new ResizeObserver((entries) => {
                // Skip resize during scroll to prevent jank
                if (isScrolling) return;
                if (resizeTimeout) return;

                resizeTimeout = setTimeout(() => {
                    resizeTimeout = null;
                    for (const entry of entries) {
                        const { width, height } = entry.contentRect;
                        const scaledWidth = Math.floor(width * resolutionScale);
                        const scaledHeight = Math.floor(
                            height * resolutionScale,
                        );
                        if (
                            canvas &&
                            hydra &&
                            scaledWidth > 0 &&
                            scaledHeight > 0
                        ) {
                            canvas.width = scaledWidth;
                            canvas.height = scaledHeight;
                            hydra.setResolution(scaledWidth, scaledHeight);
                        }
                    }
                }, 200);
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
        /* Tell browser this content can be skipped when off-screen */
        content-visibility: auto;
        contain-intrinsic-size: auto 100vh;
    }

    .hydra-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        /* Promote to GPU layer for smoother compositing */
        will-change: contents;
        transform: translateZ(0);
    }

    .hydra-content {
        position: relative;
        z-index: 1;
    }
</style>
