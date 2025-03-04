<script lang="ts">

  import BentoBoxGrid from "$root/src/components/bento/BentoBoxGrid.svelte";
  import type {BentoContent} from "$root/src/components/bento/BentoBoxer.ts";

  const {landingPage} = $props<{
    landingPage: any;
  }>();
  let landingPageBentoContent: BentoContent[] = $state([]);

  const svgId = "bento-landing";

  const bentoConfig = {
    insetMin: 1,
    insetMax: 4,
    radiusMin: 0,
    radiusMax: 2,
    color: 'black',
    bgColor: 'white',
    palette: ['darkorange', 'hotpink']
  };

  let isMobile = true;

  $effect(() => {
    isMobile = window ? window.innerWidth < 768 : false;

    if (landingPage) {
      landingPageBentoContent = createBentoGrid(landingPage);
    }
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

    if (isMobile) {
      document.documentElement.style.setProperty('--subtext-padding', '0 .7rem 0 1rem');
    } else {
      document.documentElement.style.setProperty('--subtext-padding', '0 .7rem 0 5rem');
    }
    // Hero section - full width
    bentoContent.push({
      id: 'logo',
      dimensions: [isMobile ? {width: 3, height: 1} : {width: 8, height: 2}],
      html: `
      <div class="logo-blip">
        <div class="logo-text-container"><div class="logo-text">D17E</div></div>

        <div class="logo-subtext">
          <span class="logo-subtext-line">I code.</span>
          <span class="logo-subtext-line">I art.</span>
          <span class="logo-subtext-line">Ideas.</span>
        </div>
      </div>
    `,
      required: true
    });
    console.log('LOGOGOG', bentoContent[bentoContent.length - 1]);

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
      for (let i = 1; i < Math.min(landingPage.data.Posts.length, 5); i++) {
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

</script>

<BentoBoxGrid {svgId} bentoContent={landingPageBentoContent} {bentoConfig}/>

<style>
    :global(.logo-blip) {
        color: black;
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        justify-content: center;
    }

    :global(.logo-text-container) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 1.7rem;
    }

    :global(.logo-text) {
        color: var(--bg-color);
        animation: fadeDropIn 0.6s ease-out forwards;
        transform: translateY(-10px);
        padding: 1rem;
        margin: 0 2rem;
        font-weight: bold;
        font-family: 'nudica_monobold', serif;
        font-size: 19.5rem;
    }

    :global(.logo-subtext) {
        font-size: 3rem;
        font-family: 'nudica_monobold', serif;
        gap: .8rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 3rem 4.4rem;
        justify-content: center;
        background-color: var(--bg-color);
    }

    :global(.logo-subtext-line) {
        line-height: 1.1;
        animation: fadeDropIn 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(-10px);
        animation-delay: 0.3s;
    }


    @media (max-width: 420px) {

        :global(.logo-text-container) {
            padding: 0 .6rem;
        }

        :global(.logo-text) {
            margin: 0;
            font-size: 2.1rem;
        }

        :global(.logo-subtext) {
            gap: 0;
            padding: 0 1rem;
        }

        :global(.logo-subtext-line) {
            font-size: .8rem;
        }
    }

    /* Define the animation */
    @keyframes fadeDropIn {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* If you have multiple subtext lines and want them to appear sequentially */
    :global(.logo-subtext-line:nth-child(1)) {
        animation-delay: 0.3s;
    }

    :global(.logo-subtext-line:nth-child(2)) {
        animation-delay: 0.4s;
    }

    :global(.logo-subtext-line:nth-child(3)) {
        animation-delay: 0.5s;
    }

    :global(.featured-post) {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 0;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    }

    :global(.featured-post img) {
        width: 100%;
        height: 100%;
        transform: scale(1.1);
        object-fit: cover;
    }
</style>