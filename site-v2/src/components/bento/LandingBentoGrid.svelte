<script lang="ts">

  import type {BentoContent} from "$root/src/components/bento/BentoBoxer.ts";
  import BentoBoxGrid from "$root/src/components/bento/BentoBoxGrid.svelte";

  const {landingPages} = $props<{
    landingPages: any[];
  }>();
  let landingPageBentoContent: BentoContent[] = $state([]);

  const svgId = "bento-landing";

  const landingPage = $state(landingPages[Math.floor(Math.random() * landingPages.length)]);

  const bentoConfig = $state({
    insetMin: landingPage.data?.insetMin || 1,
    insetMax: landingPage.data?.insetMax || 4,
    radiusMin: landingPage.data?.radiusMin || 0,
    radiusMax: landingPage.data?.radiusMax || 2,
    color: landingPage.data?.color || 'black',
    bgColor: landingPage.data?.bgColor || 'white',
    palette: ['darkorange', 'hotpink']
  });

  let isMobile = true;
  let isWide = false;

  $effect(() => {
    isMobile = window ? window.innerWidth < 768 : false;
    isWide = window ? window.innerWidth > 1200 : false;
    document.documentElement.style.setProperty('--ldp-color', bentoConfig.color);
    document.documentElement.style.setProperty('--ldp-bg-color', bentoConfig.bgColor);
    document.documentElement.style.setProperty('--ldp-radius', bentoConfig.radiusMin + (bentoConfig.radiusMax - bentoConfig.radiusMin) / 2 + 'px');

    if (landingPage) {
      landingPageBentoContent = createBentoGrid(landingPage);
      setTimeout(setupMediaDisplayDelays, 150);
    }
  });

  function setupMediaDisplayDelays() {
    // document.addEventListener('DOMContentLoaded', () => {
    // Get all media items
    const mediaItems = document.querySelectorAll('.media-item');

    // Configuration
    const minDelay = 600; // Minimum delay in ms
    const maxAdditionalDelay = 1500; // Maximum additional random delay
    const minTimeBetweenAnimations = 150; // Minimum time between animations

    // Sort the items by a random delay, but respect minimum time between animations
    const itemsWithDelay = Array.from(mediaItems).map((item, index) => {
      // Generate a random delay for each item
      const randomDelay = Math.floor(Math.random() * maxAdditionalDelay);
      return {
        element: item,
        delay: minDelay + randomDelay
      };
    });

    // Sort by delay
    itemsWithDelay.sort((a, b) => a.delay - b.delay);

    // Ensure minimum time between animations
    let currentDelay = 0;
    itemsWithDelay.forEach(item => {
      if (item.delay < currentDelay + minTimeBetweenAnimations) {
        item.delay = currentDelay + minTimeBetweenAnimations;
      }
      currentDelay = item.delay;

      // Schedule the animation
      setTimeout(() => {
        item.element.classList.add('visible');
      }, item.delay);
    });

  }

  function getExtForType(type: string) {
    let ext = "jpg"; // default extension
    if (type) {
      if (type === "image/png") ext = "png";
      else if (type === "image/gif") ext = "gif";
      else if (type === "image/webp") ext = "webp";
      else if (type === "image/svg+xml") ext = "svg";
      else if (type === "image/avif") ext = "avif";
    }
    return ext;
  }

  function createMediaHtml(media: any): string {
    const isVideo = media.cover.type?.startsWith("video/");
    // Add a fade-in class to all media items
    const mediaClass = "media-item fade-in";

    if (isVideo) {
      return `
        <a href="/posts/${media.slug}" class="post-link">
          <div class="featured-post ${mediaClass}">
            <div class="video-container">
              <video
                src="/assets/${media.cover.id}.mp4"
                poster="/assets/${media.cover.id}.jpg"
                autoplay
                loop
                muted
                playsinline
                preload="auto"
                disablePictureInPicture
                title="${media.title}"
              ></video>
            </div>
          </div>
        </a>
      `;
    } else {
      return `
        <a href="/posts/${media.slug}" class="post-link">
        <div class="featured-post ${mediaClass}">
          <img src="/assets/${media.cover.id}.${getExtForType(media.cover.type)}" alt="${media.title}"/>
        </div>
        </a>
      `;
    }
  }

  function createBentoGrid(landingPage: any): BentoContent[] {
    const bentoContent: BentoContent[] = [];

    if (isMobile) {
      document.documentElement.style.setProperty('--subtext-padding', '0 .7rem 0 1rem');
    } else {
      document.documentElement.style.setProperty('--subtext-padding', '0 .7rem 0 5rem');
    }
    const logoDimensions = isMobile ? {width: 3, height: 1} : isWide ? {width: 8, height: 2} : {width: 4, height: 1};

    bentoContent.push({
      id: 'logo',
      dimensions: [logoDimensions],
      html: `
      <a href="/" target="_self" class="link-link"><div class="logo-blip">
        <div class="logo-text-container"><div class="logo-text">D17E</div></div>

        <div class="logo-subtext">
          <span class="logo-subtext-line">I code.</span>
          <span class="logo-subtext-line">I art.</span>
          <span class="logo-subtext-line">Ideas.</span>
        </div>
      </div></a>
    `,
      required: true
    });

    // const aboutDimensions = isMobile ? {width: 3, height: 3} : isWide ? {width: 3, height: 1} : {width: 2, height: 1};
    // bentoContent.push({
    //   id: 'about',
    //   dimensions: [aboutDimensions],
    //   html: `
    //   <div class="about-container">
    //     <p class="about-text">
    //       Hi! :)<br/>
    //       I'm <b>David Vandenbogaerde</b> or <i>d17e</i> for short.
    //     </p>
    //     <p class="about-text">Welcome to my website.<br/> Have a look around or <a href="https://forms.d17e.dev/contact" target="_blank">get in touch!</a></p>
    //   </div>`,
    //   required: true
    // });

    bentoContent.push({
      id: 'about-link',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="/about" target="_self" class="link-link"><div class="link-container">
        <p class="link-text">?</p>
      </div></a>`,
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
        html: createMediaHtml(firstPost),
        required: true
      });
      usedPosts.add(firstIndex);

      // Other posts - smaller tiles
      for (let i = 1; i < Math.min(landingPage.data.Posts.length, Math.round(2 + Math.random() * 5)); i++) {
        let postIndex = Math.floor(Math.random() * landingPage.data.Posts.length);
        while (usedPosts.has(postIndex)) {
          postIndex = Math.floor(Math.random() * landingPage.data.Posts.length);
        }
        const post = landingPage.data.Posts[postIndex];
        const r = Math.random();
        const size = r > 0.3 ? (r > 0.9 ? 3 : 1) : 2;
        bentoContent.push({
          id: `post-${post.id}-${i}`, // Ensure unique IDs
          dimensions: [{width: size, height: size}],
          html: createMediaHtml(post),
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
        border-radius: var(--ldp-radius);
        overflow: hidden;
    }

    :global(.logo-text-container) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: .8rem 1.5rem;
        background-color: var(--ldp-color);

    }

    :global(.logo-text) {
        color: var(--ldp-bg-color);
        animation: fadeDropIn 0.6s ease-out forwards;
        transform: translateY(-10px);
        padding: 1rem;
        margin: 0 2.7rem;
        font-weight: bold;
        font-family: 'nudica_monobold', serif;
        font-size: 7.3rem;
    }

    :global(.logo-subtext) {
        font-size: 2rem;
        font-family: 'nudica_monobold', serif;
        gap: .1rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 0 3rem;
        justify-content: center;
        background-color: var(--ldp-bg-color);
        color: var(--ldp-color);
    }

    :global(.logo-subtext-line) {
        line-height: 1;
        animation: fadeDropIn 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(-10px);
        animation-delay: 0.3s;
    }


    @media (max-width: 768px) {
        :global(.logo-text-container) {
            padding: 0 .7rem;
        }

        :global(.logo-text) {
            margin: 0;
            font-size: 2.1rem;
        }

        :global(.logo-subtext) {
            gap: 0;
            padding: 0 .88rem;
        }

        :global(.logo-subtext-line) {
            font-size: .7rem;
        }
    }

    @media (min-width: 1200px) {
        :global(.logo-text-container) {
            padding-top: 2.1rem;
        }

        :global(.logo-text) {
            padding: 1rem;
            margin: 0 2rem;
            font-size: 19.5rem;
        }

        :global(.logo-subtext) {
            gap: .8rem;
            padding: 3rem 4rem;
        }

        :global(.logo-subtext-line) {
            line-height: .8;
            font-size: 2.5rem;
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

    :global(.about-container) {
        padding: 0 .5rem;
        font-size: 16px;
        gap: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-color: var(--ldp-bg-color);
        color: var(--ldp-color);
        border-radius: var(--ldp-radius);
        overflow: hidden;
    }

    :global(.about-text) {
        margin: 0;
        word-break: break-word;
        font-family: 'nudica_monobold', serif;
    }

    :global(.post-link) {
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
    }

    :global(.featured-post) {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 0;
    }

    :global(.featured-post img) {
        width: 100%;
        height: 100%;
        transform: scale(1.1);
        object-fit: cover;
    }

    :global(.video-container) {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    :global(.video-container video) {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Base styling for media items - initially invisible */
    :global(.media-item) {
        opacity: 0;
        transform: translateY(20px);
        will-change: opacity, transform;
        border-radius: var(--ldp-radius);
        overflow: hidden;
    }

    /* Animation for fading in */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Class that will be applied by JavaScript */
    :global(.media-item.visible) {
        animation: fadeIn 0.8s ease-out forwards;
    }

    :global(.link-link) {
        text-decoration: none !important;
    }

    :global(.link-container) {
        text-decoration: none !important;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--ldp-bg-color);
        color: var(--ldp-color);
        border-radius: var(--ldp-radius);
    }

    :global(.link-text) {
        font-family: 'nudica_monobold', serif;
        font-size: 6rem;
        animation: rotate 12s linear infinite;
        display: inline-block; /* Important for rotation to work properly */
        transform-origin: center; /* Rotate around the center */
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 768px) {
        :global(.link-text) {
            font-size: 3rem;
        }
    }

</style>