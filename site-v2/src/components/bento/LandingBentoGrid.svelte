<script lang="ts">

  import type {BentoContent} from "$root/src/components/bento/BentoBoxer.ts";
  import BentoBoxGrid from "$root/src/components/bento/BentoBoxGrid.svelte";

  const {landingPages} = $props<{
    landingPages: any[];
  }>();
  let landingPageBentoContent: BentoContent[] = $state([]);

  const svgId = "bento-landing";

  function getStoreDiceCount() {
    if (!localStorage.getItem('diceCount')) {
      localStorage.setItem('diceCount', '0');
    }
    let counter = parseInt(localStorage.getItem('diceCount') || '0');
    counter = (counter + 1) % landingPages.length;
    localStorage.setItem('diceCount', counter.toString());
    return counter;
  }

  const landingPageIndex = $state(getStoreDiceCount());
  const landingPage = $derived(landingPages[landingPageIndex]);

  const INSET = 10 / window.devicePixelRatio;
  const RADIUS = 10;
  const COLOR = '#8F427B';
  const BG_COLOR = '#FED2D2';

  // const bentoConfig = $state({
  //   insetMin: INSET, //landingPage.data?.insetMin || 1,
  //   insetMax: INSET, // landingPage.data?.insetMax || 4,
  //   radiusMin: RADIUS, //landingPage.data?.radiusMin || 0,
  //   radiusMax: RADIUS, //landingPage.data?.radiusMax || 2,
  //   color: COLOR,//landingPage.data?.color || 'black',
  //   bgColor: BG_COLOR, //landingPage.data?.bgColor || 'white',
  //   palette: contrasting
  // });

  const bentoConfig = $state({
    insetMin: landingPage.data?.insetMin || 1,
    insetMax: landingPage.data?.insetMax || 4,
    radiusMin: landingPage.data?.radiusMin || 0,
    radiusMax: landingPage.data?.radiusMax || 2,
    color: landingPage.data?.color || 'black',
    bgColor: landingPage.data?.bgColor || 'white',
    palette: landingPage.data?.palette || []
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
    // Get all media items
    const mediaItems = document.querySelectorAll('.media-item');

    // Configuration
    const minDelay = 300; // Minimum delay in ms
    const maxAdditionalDelay = 900; // Maximum additional random delay
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

  function generateDiceSvg(number: number, strokeColor = '#000000', fillColor = '#ffffff') {
    // Validate input
    if (number < 1 || number > 6 || !Number.isInteger(number)) {
      throw new Error('Dice number must be an integer between 1 and 6');
    }

    // Base SVG with dice outline
    let svg = `<svg id="dice-svg" class="dice-svg" width="90%" height="90%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="80" height="80" rx="15" ry="15"
          fill="${fillColor}" stroke="${strokeColor}" stroke-width="3"/>`;

    // Dot positions for each dice face
    const dotPositions = {
      1: [[50, 50]],
      2: [[30, 30], [70, 70]],
      3: [[30, 30], [50, 50], [70, 70]],
      4: [[30, 30], [30, 70], [70, 30], [70, 70]],
      5: [[30, 30], [30, 70], [50, 50], [70, 30], [70, 70]],
      6: [[30, 30], [30, 50], [30, 70], [70, 30], [70, 50], [70, 70]]
    };

    // Add dots based on the number
    //@ts-ignore
    const dots = dotPositions[number];
    for (const [cx, cy] of dots) {
      svg += `<circle cx="${cx}" cy="${cy}" r="8" fill="${strokeColor}"/>`;
    }

    // Close SVG
    svg += '</svg>';

    return svg;
  }

  function createMediaHtml(media: any): string {
    const isVideo = media.cover.type?.startsWith("video/");
    // Add a fade-in class to all media items
    const mediaClass = "media-item fade-in";

    if (isVideo) {
      return `
        <a href="/posts/${media.slug}" class="post-link" data-umami-event="lp-click-media" data-umami-event-slug="${media.slug}" aria-label="View post ${media.title}">
          <div class="featured-post ${mediaClass}">
            <div class="video-container">
              <video
                src="/assets/${media.cover.id}.mp4"
                poster="/assets/${media.cover.id}.webp"
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
        <a href="/posts/${media.slug}" class="post-link" data-umami-event="lp-click-media" data-umami-event-slug="${media.slug}" aria-label="View post ${media.title}">
        <div class="featured-post ${mediaClass}">
          <img src="/assets/${media.cover.id}.webp" alt="${media.title}"/>
        </div>
        </a>
      `;
    }
  }

  function createBentoGrid(landingPage: any): BentoContent[] {
    const bentoContent: BentoContent[] = [];

    const logoDimensions = isMobile ? {width: 3, height: 1} : isWide ? {width: 8, height: 2} : {width: 4, height: 1};
    bentoContent.push({
      id: 'logo',
      dimensions: [logoDimensions],
      html: `
      <a href="/" target="_self" class="link-link"><div class="logo-blip" data-umami-event="lp-click-logo" aria-label="Refresh the page">
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

    const aboutDimensions = isMobile ? {width: 3, height: 3} : isWide ? {width: 3, height: 1} : {width: 2, height: 1};
    const aboutBox = {
      id: 'about',
      dimensions: [aboutDimensions],
      html: `
      <div class="about-container">
        <p class="about-text">
          Hi! I'm <b>David Vandenbogaerde</b><br/> or <i>d17e</i> for short. <span class="smiley">:)</span>
        </p>
        <p class="about-text">Welcome 🥳 & happy clicking!<br/>
        Need some magic? <a href="https://forms.d17e.dev/contact" target="_blank" class="about-link" data-umami-event="lp-click-contact" aria-label="Fill out my contact form">Get in touch!</a></p>
      </div>`,
      required: true
    };
    if (isWide) {
      bentoContent.push(aboutBox);
    }
    bentoContent.push({
      id: 'about-link',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="https://forms.d17e.dev/contact" target="_self" class="link-link" data-umami-event="lp-click-contact" aria-label="Fill out my contact form"><div class="link-container">
        <div class="svg-container">
          <svg width="90%" height="90%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotating-contact">
            <path d="M3.29289 5.29289C3.47386 5.11193 3.72386 5 4 5H20C20.2761 5 20.5261 5.11193 20.7071 5.29289M3.29289 5.29289C3.11193 5.47386 3 5.72386 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.72386 20.8881 5.47386 20.7071 5.29289M3.29289 5.29289L10.5858 12.5857C11.3668 13.3668 12.6332 13.3668 13.4142 12.5857L20.7071 5.29289" stroke="${bentoConfig.bgColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div></a>`,
      required: true
    });


    bentoContent.push({
      id: 'about-link',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="/about" target="_self" class="link-link" data-umami-event="lp-click-about" aria-label="View the about page"><div class="link-container">
        <p class="link-text">?</p>
      </div></a>`,
      required: true
    });

    bentoContent.push({
      id: 'posts-link',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="/posts" target="_self" class="link-link" data-umami-event="lp-click-posts" aria-label="View all posts">
        <div class="svg-container">
          <svg
                  class="rotating-svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 1024 1024"
          >
            <g id="Layer2">
              <path d="M510,20C780.438,20 1000,239.562 1000,510C1000,780.438 780.438,1000 510,1000C239.562,1000 20,780.438 20,510C20,239.562 239.562,20 510,20ZM308.909,694.39L308.909,736.969L716.135,736.969L716.135,685.847L716.309,685.847L716.309,281.531L716.135,281.531L716.135,277.757L310.147,277.757L310.147,290.073L308.873,290.073L308.873,694.39L308.909,694.39ZM674.695,648.877L350.487,648.877L350.487,319.199L674.695,319.199L674.695,648.877Z"/>
            </g>
          </svg>
        </div>
      </a>`,
      required: true
    })

    bentoContent.push({
      id: 'dice',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="/" target="_self" data-umami-event="lp-click-dice"><div class="link-container" aria-label="Refresh the page">
        <div class="svg-container">
          ${generateDiceSvg(landingPageIndex + 1, bentoConfig.color, bentoConfig.bgColor)}
        </div>
      </div></a>`,
      required: true
    })

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
        padding: .8rem 0;
        background-color: var(--ldp-color);

    }

    :global(.logo-text) {
        color: var(--ldp-bg-color);
        animation: fadeDropIn 0.6s ease-out forwards;
        transform: translateY(-10px);
        padding: 1rem;
        margin: 0 2rem;
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
            padding: 1rem;
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
            font-size: 17.5rem;
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
        padding: 1.5rem 2rem;
        font-size: 16px;
        gap: 0;
        display: flex;
        flex-direction: column;
        align-items: start;

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

    :global(.about-link) {
        color: var(--ldp-color);
        font-weight: bold;
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
            transform: scale(0.88);
        }
        to {
            opacity: 1;
            transform: scale(1);
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
        line-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: var(--bento-tile-width);
        height: var(--bento-tile-width);
        transform: scale(.75);
        background-color: var(--ldp-color);
        color: var(--ldp-bg-color);
        border-radius: 50%;
    }

    :global(.link-text) {
        font-family: 'nudica_monobold', serif;
        font-size: 6rem;
        animation: rotate 12s linear infinite;
        display: inline-block; /* Important for rotation to work properly */
        transform-origin: center; /* Rotate around the center */
    }

    :global(.svg-container) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: scale(.75);
    }

    :global(.rotating-svg) {
        animation: etator 7s ease-in-out infinite;
        fill: var(--ldp-color);
    }

    :global(.dice-svg) {
        animation: dice-rotate 30s linear infinite;

    }

    :global(.icon-font) {
        font-family: 'bariol_icons', serif;
        margin-top: 3rem;
        margin-left: 1rem;
    }

    :global(.rotating-contact) {
        animation: rotate 24s ease-in-out infinite;
    }

    :global(.smiley) {
        margin-left: 10rem;
        display: inline-block;
        animation: etator 15s ease-in-out infinite;
    }

    @keyframes etator {
        0% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    @keyframes dice-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
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