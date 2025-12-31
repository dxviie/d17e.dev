<script>
    import { onMount } from "svelte";

    /**
     * HydraBackground - A wrapper component that renders Hydra visuals behind its content
     *
     * This component creates a canvas that fills its container and renders Hydra code
     * as a background for the slotted content. It pauses rendering when off-screen
     * to prevent scroll jank on mobile.
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
    let isVisible = $state(false);
    let animationId = null;
    let resizeObserver = null;
    let visibilityObserver = null;

    onMount(() => {
        mounted = true;

        return () => {
            // Cleanup
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            if (visibilityObserver) {
                visibilityObserver.disconnect();
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

    // Control animation based on visibility
    $effect(() => {
        if (hydra && initialized) {
            if (isVisible) {
                startRendering();
            } else {
                stopRendering();
            }
        }
    });

    async function initHydra() {
        if (!canvas || !container) return;

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

            // Initialize Hydra with autoLoop disabled - we'll control it manually
            hydra = new Hydra({
                canvas: canvas,
                detectAudio: false,
                enableStreamCapture: false,
                width: width,
                height: height,
                autoLoop: false, // We control the loop manually for perf
            });

            initialized = true;

            // Execute initial code
            executeCode(code);

            // Set up visibility observer to pause when off-screen
            visibilityObserver = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        isVisible = entry.isIntersecting;
                    }
                },
                {
                    threshold: 0,
                    rootMargin: "50px", // Start rendering slightly before visible
                },
            );
            visibilityObserver.observe(container);

            // Set up resize observer (throttled)
            let resizeTimeout = null;
            resizeObserver = new ResizeObserver((entries) => {
                // Throttle resize handling
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
                }, 100);
            });
            resizeObserver.observe(container);
        } catch (e) {
            console.error("[HydraBackground] Initialization error:", e);
        }
    }

    function startRendering() {
        if (animationId || !hydra) return;

        function tick(dt) {
            if (!isVisible) return;
            hydra.tick(dt);
            animationId = requestAnimationFrame(tick);
        }
        animationId = requestAnimationFrame(tick);
    }

    function stopRendering() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
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
        /* Use GPU compositing but reduce quality slightly */
        image-rendering: auto;
    }

    .hydra-content {
        position: relative;
        z-index: 1;
    }
</style>
