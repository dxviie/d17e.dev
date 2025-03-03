<script lang="ts">

  import BentoBoxGrid from "$root/src/components/bento/BentoBoxGrid.svelte";
  import type {BentoContent} from "$root/src/components/bento/BentoBoxer.ts";

  const {landingPage} = $props<{
    landingPage: any;
  }>();

  const svgId = "bento-landing";

  const isMobile = window ? window.innerWidth < 768 : false;

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

    // Featured posts from landingPage.Posts
    if (landingPage.data.Posts && landingPage.data.Posts.length > 1) {
      // First featured post - medium size
      const firstPost = landingPage.data.Posts[Math.floor(Math.random() * landingPage.data.Posts.length)];
      bentoContent.push({
        id: firstPost.id,
        dimensions: [{width: 2, height: 2}],
        html: `
        <div class="featured-post">
          <img src="/assets/${firstPost.cover.id}.jpg" alt="${firstPost.title}"/>
        </div>
      `,
        required: true
      });

      // Other posts - smaller tiles
      for (let i = 1; i < Math.min(landingPage.data.Posts.length, 4); i++) {
        const post = landingPage.data.Posts[Math.floor(Math.random() * landingPage.data.Posts.length)];
        bentoContent.push({
          id: post.id,
          dimensions: [{width: 2, height: 2}],
          html: `
          <div class="featured-post">
          <img src="/assets/${firstPost.cover.id}.jpg" alt="${firstPost.title}"/>
        </div>
        `,
          required: false
        });
      }
    }

    // Add more tiles based on Articles and other content...
    console.log('bentoContent', bentoContent);
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