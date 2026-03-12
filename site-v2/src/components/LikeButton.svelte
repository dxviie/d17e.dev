<script lang="ts">
  /**
   * LikeButton - A reusable like button for posts, articles, etc.
   * - Heart icon, accent color when liked
   * - Only allows liking (no un-like)
   * - localStorage tracks count per machine
   * - Umami event tracking for analytics
   */
  interface Props {
    /** Content type (e.g. "posts", "articles", "art") */
    type: string;
    /** Unique identifier (e.g. post slug) */
    id: string;
    /** Optional size in em */
    size?: number;
    /** Optional class for styling */
    class?: string;
    /** If true, stop click propagation (e.g. when inside a link) */
    stopPropagation?: boolean;
    /** If true, show "Like this? Let me know!" hint to the right of the button */
    showHint?: boolean;
  }

  let { type, id, size = 1.25, class: className = "", stopPropagation = false, showHint = false }: Props = $props();

  const STORAGE_KEY = "d17e-likes";

  function getStoredCount(contentType: string, contentId: string): number {
    if (typeof window === "undefined") return 0;
    try {
      const key = `${contentType}:${contentId}`;
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return Number(data[key]) || 0;
    } catch {
      return 0;
    }
  }

  function setStoredCount(contentType: string, contentId: string, count: number): void {
    if (typeof window === "undefined") return;
    try {
      const key = `${contentType}:${contentId}`;
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      data[key] = count;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  let count = $state(0);

  $effect(() => {
    count = getStoredCount(type, id);
  });

  const ANIMATION_DURATION = 700;
  let plusOnes = $state<{ id: number; offsetX: number; offsetY: number }[]>([]);

  function handleClick(e: MouseEvent) {
    if (stopPropagation) e.stopPropagation();
    if (stopPropagation) e.preventDefault();

    count += 1;
    setStoredCount(type, id, count);

    const id_ = performance.now();
    const offsetX = (Math.random() - 0.5) * 24;
    const offsetY = (Math.random() - 0.5) * 16;
    plusOnes = [...plusOnes, { id: id_, offsetX, offsetY }];

    setTimeout(() => {
      plusOnes = plusOnes.filter((p) => p.id !== id_);
    }, ANIMATION_DURATION);

    // Umami event tracking - see https://umami.is/docs/track-events
    if (typeof window !== "undefined" && "umami" in window && typeof (window as any).umami?.track === "function") {
      (window as any).umami.track("like", {
        type,
        id,
        count: String(count),
      });
    }
  }
</script>

<div class="like-button-wrapper {className}" class:liked={count > 0} class:with-hint={showHint}>
  <button
    type="button"
    class="like-button"
    class:liked={count > 0}
    onclick={handleClick}
    aria-label={count > 0 ? `Liked ${count} time${count === 1 ? "" : "s"}` : "Like"}
    title={count > 0 ? `Liked ${count} time${count === 1 ? "" : "s"}` : "Like"}
  >
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      width="{size}em"
      height="{size}em"
      aria-hidden="true"
    >
      <path
        d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
      />
    </svg>
  </button>
  {#each plusOnes as plusOne (plusOne.id)}
    <span
      class="plus-one"
      style="--offset-x: {plusOne.offsetX}px; --offset-y: {plusOne.offsetY}px"
    >+1</span>
  {/each}
  {#if showHint}
    <span class="like-hint">Like this?<br />Let me know!</span>
  {/if}
</div>

<style>
  .like-button-wrapper {
    position: relative;
    display: inline-flex;
  }

  .like-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.35em 0.5em;
    background: transparent;
    border: 1px solid var(--border-color, rgba(128, 128, 128, 0.3));
    border-radius: 8px;
    color: var(--color);
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.15s;
  }

  .like-button:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .like-button:active {
    transform: scale(0.95);
  }

  .like-button.liked {
    color: var(--accent-color);
    border-color: var(--accent-color);
    background: rgba(var(--accent-rgb), 0.08);
  }

  .like-button.liked:hover {
    background: rgba(var(--accent-rgb), 0.15);
  }

  .like-button svg {
    flex-shrink: 0;
  }

  .plus-one {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(calc(-100% + var(--offset-x, 0px)), calc(-50% + var(--offset-y, 0px)));
    font-family: "nudica_monolight", serif;
    font-size: 0.85rem;
    color: var(--accent-color);
    font-weight: 600;
    pointer-events: none;
    z-index: 10;
    animation: plusOneFloat 0.7s ease-out forwards;
  }

  .like-hint {
    font-family: "nudica_monolight", serif;
    font-size: 0.65rem;
    line-height: 1.3;
    color: var(--color);
    opacity: 0.7;
    margin-left: 0.5rem;
  }

  .like-button-wrapper.with-hint {
    align-items: center;
  }

  @keyframes plusOneFloat {
    0% {
      opacity: 1;
      transform: translate(calc(-100% + var(--offset-x, 0px)), calc(-50% + var(--offset-y, 0px))) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(calc(-100% + var(--offset-x, 0px)), calc(-120% + var(--offset-y, 0px))) scale(1.2);
    }
  }
</style>
