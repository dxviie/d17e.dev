<script>
    import { onMount } from "svelte";

    /**
     * HydraBackground - A full-screen background component powered by Hydra live coding visuals
     *
     * This component creates a fixed canvas that fills the viewport and observes
     * code snippets scattered throughout the page. When a code snippet scrolls into view,
     * its Hydra code is evaluated and the visuals update accordingly.
     *
     * Usage: Add elements with data-hydra attribute containing Hydra code:
     * <pre data-hydra class="hydra-code">osc(10, 0.1, 0.8).out()</pre>
     */

    // Polyfill for Node.js globals that hydra-synth dependencies expect
    // Must be applied before any hydra-synth import
    if (typeof window !== "undefined") {
        window.global = window.global || window;
        window.process = window.process || { env: {} };
    }

    // Props
    let {
        // CSS blend mode for the canvas overlay
        blendMode = "multiply",
        // Opacity of the hydra canvas
        opacity = 0.8,
        // Intersection threshold (0-1) for triggering code
        threshold = 0.5,
        // Whether to show the code snippets (for debugging)
        showCodeSnippets = false,
        // Default/initial hydra code to run on startup
        initialCode = "solid(0, 0, 0).out()",
    } = $props();

    // State
    let canvas = $state(null);
    let hydra = $state(null);
    let mounted = $state(false);
    let observers = [];
    let currentCodeElement = $state(null);

    onMount(() => {
        mounted = true;
        initHydra();

        return () => {
            // Cleanup observers
            observers.forEach((obs) => obs.disconnect());
            observers = [];
        };
    });

    async function initHydra() {
        if (!canvas) return;

        // Dynamically import Hydra to avoid SSR issues
        const Hydra = (await import("hydra-synth")).default;

        // Set canvas size to viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Initialize Hydra
        hydra = new Hydra({
            canvas: canvas,
            detectAudio: false,
            enableStreamCapture: false,
            width: window.innerWidth,
            height: window.innerHeight,
        });

        // Run initial code
        try {
            eval(initialCode);
        } catch (e) {
            console.warn("[HydraBackground] Initial code error:", e);
        }

        // Set up resize handler
        const handleResize = () => {
            if (canvas && hydra) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                hydra.setResolution(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener("resize", handleResize);

        // Set up scroll observers for code snippets
        setupScrollObservers();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }

    function setupScrollObservers() {
        // Find all elements with data-hydra attribute
        const codeBlocks = document.querySelectorAll("[data-hydra]");

        if (codeBlocks.length === 0) {
            console.log(
                "[HydraBackground] No code blocks found with data-hydra attribute",
            );
            return;
        }

        console.log(`[HydraBackground] Found ${codeBlocks.length} code blocks`);

        codeBlocks.forEach((block) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            executeHydraCode(block);
                        }
                    });
                },
                { threshold: [threshold] },
            );

            observer.observe(block);
            observers.push(observer);
        });
    }

    function executeHydraCode(element) {
        // Get the code from the element
        const rawCode = element.textContent || element.innerText;

        // Clean up the code for evaluation
        const code = rawCode
            .split("\n")
            .filter((line) => !line.trim().startsWith("//")) // Remove comments
            .map((line) => line.trim())
            .join("")
            .replace(/\s+/g, " ") // Normalize whitespace
            .replace(/\s*([{,();}])\s*/g, "$1") // Remove spaces around brackets
            .replace(/\s+/g, "") // Remove remaining spaces
            .replace(/return(\w)/, "return $1"); // Preserve space after return

        if (!code) return;

        // Update current element reference
        currentCodeElement = element;

        // Render to ensure clean state, then evaluate code
        try {
            render(o0);
            setTimeout(() => {
                try {
                    eval(code);
                    console.log(
                        "[HydraBackground] Executed:",
                        code.substring(0, 50) + "...",
                    );
                } catch (e) {
                    console.warn("[HydraBackground] Code execution error:", e);
                }
            }, 60);
        } catch (e) {
            console.warn("[HydraBackground] Render error:", e);
        }
    }

    // Re-setup observers when canvas becomes available
    $effect(() => {
        if (canvas && mounted) {
            initHydra();
        }
    });
</script>

<canvas
    bind:this={canvas}
    class="hydra-canvas"
    class:show-code={showCodeSnippets}
    style:mix-blend-mode={blendMode}
    style:opacity
    aria-hidden="true"
></canvas>

<style>
    .hydra-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
    }

    /* Global styles for hydra code snippets */
    :global([data-hydra]) {
        opacity: 0;
        position: absolute;
        pointer-events: none;
        height: 0;
        overflow: hidden;
    }

    /* When debugging, show the code snippets */
    :global(.hydra-debug [data-hydra]) {
        opacity: 0.8;
        position: relative;
        pointer-events: auto;
        height: auto;
        font-family: monospace;
        font-size: 0.75rem;
        background: rgba(0, 0, 0, 0.8);
        color: #99cc99;
        padding: 1rem;
        border-radius: 0.5rem;
        white-space: pre-wrap;
        margin: 1rem 0;
    }
</style>
