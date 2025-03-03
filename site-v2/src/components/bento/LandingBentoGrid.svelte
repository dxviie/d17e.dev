<script lang="ts">

  import BentoBoxGrid from "$root/src/components/bento/BentoBoxGrid.svelte";
  import type {BentoContent} from "$root/src/components/bento/BentoBoxer.ts";

  const {landingPage} = $props<{
    landingPage: any;
  }>();

  const svgId = "bento-landing";

  let isMobile = false;

  $effect(() => {
    isMobile = window ? window.innerWidth < 768 : false;
  });

  function getExtForType(type: string) {
    let ext = "jpg"; // default extension
    if (type) {
      if (type === "image/png") ext = "png";
      else if (type === "image/gif") ext = "gif";
      else if (type === "image/webp") ext = "webp";
      else if (type === "image/svg+xml") ext = "svg";
      else if (type === "image/avif") ext = "avif";
      else if (type === "image/jpeg") ext = "jpeg";
    }
    return ext;
  }

  function createBentoGrid(landingPage: any): BentoContent[] {
    const bentoContent: BentoContent[] = [];

    // Hero section - full width
    bentoContent.push({
      id: 'logo',
      dimensions: [{width: isMobile ? 3 : 4, height: 1}],
      html: `
      <div class="logo-blip">
        <span class="logo-text">D17E</span>
        <div class="logo-subtext">
          <span class="logo-subtext-line">I code.</span>
          <span class="logo-subtext-line">I art.</span>
          <span class="logo-subtext-line">Ideas.</span>
        </div>
      </div>
    `,
      required: true
    });

    const usedPosts = new Set<number>();

    // Featured posts from landingPage.Posts
    if (landingPage.data.Posts && landingPage.data.Posts.length > 1) {
      // First featured post - medium size
      const firstIndex = Math.floor(Math.random() * landingPage.data.Posts.length);
      const firstPost = landingPage.data.Posts[firstIndex];

      bentoContent.push({
        id: firstPost.id,
        dimensions: [{width: 2, height: 2}],
        html: `
        <div class="featured-post">
          <img src="/assets/${firstPost.cover.id}.${getExtForType(firstPost.cover.type)}" alt="${firstPost.title}"/>
        </div>
      `,
        required: true
      });
      usedPosts.add(firstIndex);

      // Other posts - smaller tiles
      for (let i = 1; i < Math.min(landingPage.data.Posts.length, 8); i++) {
        let postIndex = Math.floor(Math.random() * landingPage.data.Posts.length);
        while (usedPosts.has(postIndex)) {
          postIndex = Math.floor(Math.random() * landingPage.data.Posts.length);
        }
        const post = landingPage.data.Posts[postIndex];
        const size = Math.random() > 0.7 ? 1 : 2;
        bentoContent.push({
          id: `post-${post.id}-${i}`, // Ensure unique IDs
          dimensions: [{width: size, height: size}],
          html: `
          <div class="featured-post">
            <img src="/assets/${post.cover.id}.${getExtForType(post.cover.type)}" alt="${post.title}"/>
          </div>
        `,
          required: false
        });
        usedPosts.add(postIndex);
      }
    }

    // Add more tiles based on Articles and other content...
    return bentoContent;
  }

  const bentoContent = createBentoGrid(landingPage);

</script>

<BentoBoxGrid {svgId} {bentoContent}/>

<style>
    :global(.logo-blip) {
        color: black;
        display: flex;
        flex-direction: row;
        line-height: unset;
    }

    :global(.logo-text) {
        font-weight: bold;
        font-family: 'nudica_monobold', serif;
        font-size: var(--tile-font-size, 2em);
        line-height: 1.05;
        background-color: var(--color);
        color: var(--bg-color);
        padding: 0 0.1em;
    }

    :global(.logo-subtext) {
        font-family: 'nudica_monolight', serif;
        display: flex;
        flex-direction: column;
        padding: 0 .7rem 0 1rem;
        margin-left: 1rem;
        justify-content: center;
        background-color: var(--bg-color);
    }

    :global(.logo-subtext-line) {
        font-size: calc(var(--tile-font-size-small, .7rem));
        line-height: 1.1;
    }
</style>