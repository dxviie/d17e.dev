<script lang="ts">

  import type {BentoContent} from "$root/src/components/bento/BentoBoxer.ts";
  import BentoBoxGrid from "$root/src/components/bento/BentoBoxGrid.svelte";

  const {landingPages} = $props<{
    landingPages: any[];
  }>();
  let landingPageBentoContent: BentoContent[] = $state([]);

  const svgId = "bento-landing";

  // Tooltip state
  let showTooltip = $state(false);
  let tooltipContent = $state('');
  let tooltipX = $state(0);
  let tooltipY = $state(0);
  let isMobileDevice = $state(false);
  let isTouchInteracting = $state(false);
  let lastTouchTimestamp = 0;
  
  // Touch tracking for drag detection
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = $state(false);

  // Handle mouse movements to update tooltip position
  function handleMouseMove(e: MouseEvent) {
    // Only handle mouse events if we're not in touch mode
    if (!isTouchInteracting) {
      tooltipX = e.clientX + 20;
      tooltipY = e.clientY + 20;
    }
  }

  // Handle touch events
  function handleTouchStart(e: TouchEvent) {
    // Indicate we're in touch interaction mode to prevent mouse event handling
    isTouchInteracting = true;
    lastTouchTimestamp = Date.now();
    isDragging = false;
    
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      
      // Store the initial touch position for drag detection
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      // Find element under touch point but don't show tooltip yet
      const tooltipContentLength = updateTooltipFromTouchPosition(touch.clientX, touch.clientY);
      const tooltipPosition = getToolTipPosition(touch.clientX, touch.clientY, tooltipContentLength);
      tooltipX = tooltipPosition.x;
      tooltipY = tooltipPosition.y;

      // Don't prevent default here to allow normal link taps
      // We'll decide based on whether it's a drag in touchmove
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    // If we weren't dragging, allow the link to be followed
    if (!isDragging) {
      // Don't prevent default - let the link navigation happen
      hideTooltip();
    } else {
      // Hide tooltip when dragging ends
      hideTooltip();
    }
    
    // Reset dragging state
    isDragging = false;
    
    // Add a slight delay to reset touch mode to prevent mouse event confusion
    setTimeout(() => {
      isTouchInteracting = false;
    }, 300);
  }

  function handleTouchMove(e: TouchEvent) {
    // Update timestamp of last touch
    lastTouchTimestamp = Date.now();
    
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      
      // Calculate distance moved to determine if this is a drag
      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);
      
      // If moved more than 10px in any direction, consider it a drag
      if (deltaX > 10 || deltaY > 10) {
        isDragging = true;
      }

      const tooltipContentLength = updateTooltipFromTouchPosition(touch.clientX, touch.clientY);
      const tooltipPosition = getToolTipPosition(touch.clientX, touch.clientY, tooltipContentLength);
      tooltipX = tooltipPosition.x;
      tooltipY = tooltipPosition.y;

      // Only prevent default if dragging over an interactive element
      if (isDragging && tooltipContentLength > 0 && showTooltip) {
        e.preventDefault();
      }
    }
  }
  
  // Find element at point and update tooltip accordingly
  function updateTooltipFromTouchPosition(x: number, y: number): number {
    // Get the element under the touch point, adjusted for scroll
    const scrollY = window.scrollY;
    const element = document.elementFromPoint(x, y - scrollY);
    
    if (!element) {
      // Hide tooltip if no element found
      hideTooltip();
      return 0;
    }
    
    // Find the nearest tooltip-enabled element (post-link or link-link)
    const closestLink = element.closest('.post-link, .link-link');
    
    if (closestLink) {
      // Found a link, get tooltip content and show
      let content = '';
      
      if (closestLink.classList.contains('post-link')) {
        // If it's a post link, get content from img/video
        content = closestLink.querySelector('img, video')?.getAttribute('data-title') || 
                 closestLink.querySelector('img, video')?.getAttribute('alt') || 
                 closestLink.getAttribute('aria-label') || 
                 'View details';
      } else {
        // Otherwise get from aria-label
        content = closestLink.getAttribute('data-title') ||
                 closestLink.getAttribute('aria-label') || 
                 'Navigate';
      }
      
      // Show tooltip with the found content
      showTooltipWithContent(content);
      return content.length;
    } else {
      // No relevant element found, hide tooltip
      hideTooltip();
      return 0;
    }
  }

  function getToolTipPosition(touchX: number, touchY: number, tooltipContentLength: number) : {x: number, y: number} {
    // Update tooltip position - above finger for better visibility
    const contentWidth = (tooltipContentLength * 12) ; // Rough estimate of character width
    let tooltipX = Math.max(2, touchX - contentWidth / 2);
    tooltipY = touchY - 80; // Position higher above finger
    if (tooltipY < 10) {
      tooltipY = 10;
      if (tooltipX < window.innerWidth/2) {
        tooltipX = touchX + 10;
      } else {
        tooltipX = touchX - 10 - contentWidth;
      }
    }
    return {x: tooltipX, y: tooltipY};
  }

  // Show tooltip with specific content
  function showTooltipWithContent(content: string) {
    tooltipContent = content;
    showTooltip = true;
  }

  // Hide the tooltip
  function hideTooltip() {
    showTooltip = false;
  }
  
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

  const pastelNeonPink = "#FF9EEE";
  const pastelNeonBlue = "#9EECFF";
  const pastelNeonGreen = "#AFFFA3";
  const pastelNeonYellow = "#FFFFA3";
  const pastelNeonOrange = "#FFD1A3";
  const pastelNeonPurple = "#D9A3FF";
  const pastelNeonTurquoise = "#A3FFF4";
  const pastelNeonCoral = "#FFA3A3";
  const pastelNeonLime = "#D9FFA3";
  const pastelNeonLavender = "#C4A3FF";

  const darkMidnightPurple = "#2A0E42";
  const darkCharcoalTeal = "#0E2A2A";
  const darkBloodRed = "#420E0E";
  const darkForestEmerald = "#0E420E";
  const darkNavyInk = "#0E0E42";
  const darkBurntOrange = "#422A0E";
  const darkMossGreen = "#2A420E";
  const darkBerryWine = "#42082A";
  const darkInkwell = "#1A1A2E";
  const darkEspresso = "#2E1A1A";

  // Main Colors
  const mainBackground = "#E8F0F2"; // Light blue-gray background
  const mainForeground = "#3A1D40"; // Dark purple for text

  // Palette Colors
  const vibrantPurple = "#9C27B0"; // Bright purple accents
  const orangeBlock = "#F4A261"; // Orange section
  const darkBrown = "#402218"; // Dark brown areas
  const lightPurple = "#D8BFD8"; // Lighter purple elements
  const accentMagenta = "#E91E63"; // Magenta highlights
  const paleYellow = "#FCEF98"; // Subtle yellow accents
  const charcoalLines = "#333333"; // Dark lines throughout

  const bentoConfig = $derived({
    insetMin: landingPage.data?.insetMin || 0,
    insetMax: landingPage.data?.insetMax || 0,
    radiusMin: landingPage.data?.radiusMin || 0,
    radiusMax: landingPage.data?.radiusMax || 0,
    color: landingPage.data?.color || 'black',
    bgColor: landingPage.data?.bgColor || 'white',
    palette: landingPage.data?.palette || []
  });

  let isMobile = true;
  let isWide = false;

  $effect(() => {
    isMobile = window ? window.innerWidth < 768 : false;
    isWide = window ? window.innerWidth > 1200 : false;
    
    // Detect if device is mobile
    isMobileDevice = isMobile || (window && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    
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

    // Setup tooltip triggers
    setupTooltips();
    
    // Add touch-specific event handlers for interactive elements
    setupTouchHandlers();
  }
  
  function setupTouchHandlers() {
    // Add touch event handlers to all interactive elements
    const interactiveElements = document.querySelectorAll('.post-link, .link-link');
    interactiveElements.forEach(element => {
      // For link elements, prevent default scrolling during touch interaction
      element.addEventListener('touchstart', (e) => {
        // Detect if we're actually over an interactive element
        //@ts-ignore
        const touch = e.touches[0];
        const hasInteractiveContent = updateTooltipFromTouchPosition(touch.clientX, touch.clientY);
        
        // Don't prevent default here - we'll let the link be tappable
        // Let the main touchstart/touchmove handlers decide
      }, { passive: true });
    });
  }

  function setupTooltips() {
    // Remove title attributes to prevent browser tooltips
    document.querySelectorAll('[title]').forEach(element => {
      const titleValue = element.getAttribute('title');
      element.setAttribute('data-title', titleValue || '');
      element.removeAttribute('title');
    });
    
    // Add tooltip triggers to elements - only for mouse events
    const mediaLinks = document.querySelectorAll('.post-link');
    mediaLinks.forEach(link => {
      const title = link.querySelector('img, video')?.getAttribute('data-title') || 
                   link.querySelector('img, video')?.getAttribute('alt') || 
                   link.getAttribute('aria-label') || 
                   'View details';
      
      // Mouse events
      //@ts-ignore
      link.addEventListener('mousemove', handleMouseMove);
      link.addEventListener('mouseenter', () => {
        if (!isTouchInteracting) {
          showTooltipWithContent(title);
        }
      });
      link.addEventListener('mouseleave', hideTooltip);
    });

    // Add tooltips to navigation links - only for mouse events
    const navLinks = document.querySelectorAll('.link-link');
    navLinks.forEach(link => {
      const label = link.getAttribute('data-title') ||
                   link.getAttribute('aria-label') || 
                   'Navigate';
      
      // Mouse events
      //@ts-ignore
      link.addEventListener('mousemove', handleMouseMove);
      link.addEventListener('mouseenter', () => {
        if (!isTouchInteracting) {
          showTooltipWithContent(label);
        }
      });
      link.addEventListener('mouseleave', hideTooltip);
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
    const mediaAlt = media.title.endsWith("...") ? media.title : media.title + "...";

    if (isVideo) {
      return `
        <a href="/posts/${media.slug}" class="post-link" data-umami-event="lp-click-media" data-umami-event-slug="${media.slug}" aria-label="${mediaAlt}">
          <div class="featured-post ${mediaClass}">
            <div class="video-container">
              <video
                src="/assets/${media.cover.id}.mp4"
                poster="/assets/${media.cover.id}.webp"
                autoplay
                loop
                muted
                playsinline
                preload="none"
                loading="lazy"
                disablePictureInPicture
                data-title="${mediaAlt}"
                alt="${mediaAlt}"
              ></video>
            </div>
          </div>
        </a>
      `;
    } else {
      return `
        <a href="/posts/${media.slug}" class="post-link" data-umami-event="lp-click-media" data-umami-event-slug="${media.slug}" aria-label="${mediaAlt}">
        <div class="featured-post ${mediaClass}">
          <img src="/assets/${media.cover.id}.webp" alt="${mediaAlt}" data-title="${mediaAlt}" loading="lazy" decoding="async"/>
        </div>
        </a>
      `;
    }
  }

  function createBentoGrid(landingPage: any): BentoContent[] {
    const bentoContent: BentoContent[] = [];

    const logoDimensions = isMobile ? {width: 3, height: 1} : isWide ? {width: 8, height: 2} : {width: 4, height: 1};
    const buttonTxt = isMobile ? 'Tap it!' : 'Click it!';
    console.log('buttonTxt', buttonTxt);
    bentoContent.push({
      id: 'logo',
      dimensions: [logoDimensions],
      html: `
      <a href="/" target="_self" class="link-link" data-umami-event="lp-click-logo" aria-label="${buttonTxt}"><div class="logo-blip">
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
      <a href="https://forms.d17e.dev/contact" target="_self" class="link-link" data-umami-event="lp-click-contact" aria-label="Contact..."><div class="link-container">
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
      <a href="/about" target="_self" class="link-link" data-umami-event="lp-click-about" aria-label="About..."><div class="link-container">
        <p class="link-text">?</p>
      </div></a>`,
      required: true
    });

    bentoContent.push({
      id: 'posts-link',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="/posts" target="_self" class="link-link" data-umami-event="lp-click-posts" aria-label="All media...">
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
      id: 'projects-link',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="/projects" target="_self" class="link-link" data-umami-event="lp-click-projects" aria-label="Projects..."><div class="link-container">
        <div class="svg-container">
          <svg
                  class="projects-svg rotating-svg"
                  width="85%"
                  height="85%"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.45-.97 2-.5 2-.5"/>
            <path d="M12 15v5s3.03-.55 4-2c.97-1.45.5-2 .5-2"/>
          </svg>
        </div></div>
      </a>`,
      required: true
    });

    bentoContent.push({
      id: 'dice',
      dimensions: [{width: 1, height: 1}],
      html: `
      <a href="/" target="_self" class="link-link" data-title="Roll the dice" aria-label="Roll the dice" data-umami-event="lp-click-dice"><div class="link-container">
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

<svelte:window 
  on:mousemove={handleMouseMove}
  on:touchmove={handleTouchMove}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
/>

<BentoBoxGrid {svgId} bentoContent={landingPageBentoContent} {bentoConfig}/>

<!-- Tooltip that follows cursor -->
<div 
  class="custom-tooltip" 
  class:mobile={isMobileDevice} 
  class:dragging={isDragging}
  style="left: {tooltipX}px; top: {tooltipY}px;{showTooltip ? '': 'display: none'}"
>
  {tooltipContent}
</div>

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
            font-size: max(.7rem, 12px);
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
        /* Prevent default touch actions on links for better tooltip handling */
        touch-action: none;
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
        /* Prevent default touch actions on links for better tooltip handling */
        touch-action: none;
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

    :global(.projects-svg) {
        animation: etatoragain 12s ease-in-out infinite;
        fill: var(--ldp-bg-color);
        stroke: var(--ldp-bg-color);
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

    /* Custom tooltip styles */
    .custom-tooltip {
        position: fixed;
        padding: 8px 12px;
        background-color: var(--ldp-bg-color);
        color: var(--ldp-color);
        border-radius: var(--ldp-radius);
        font-size: 14px;
        font-family: 'nudica_monobold', serif;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        opacity: 0.95;
        transform-origin: center;
        backdrop-filter: blur(3px);
        animation: tooltipPulse 3s infinite ease-in-out;
        transition: opacity 0.3s ease-out;
    }

    /* Styling for mobile tooltip */
    .custom-tooltip.mobile {
        background-color: var(--ldp-color);
        color: var(--ldp-bg-color);
        font-weight: bold;
        padding: 10px 16px;
        border: 1px solid var(--ldp-bg-color);
        border-radius: var(--ldp-radius);
        text-align: center;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        margin: 0 auto;
    }

    /* Special styling when dragging */
    .custom-tooltip.dragging {
        /*transform: translateY(-40px); !* Move tooltip higher when dragging *!*/
        transition: transform 0.2s ease-out, opacity 0.3s ease-out;
    }

    @keyframes tooltipPulse {
        0% {
            transform: scale(1);
        }
        30% {
            transform: scale(1.05, 1.03);
        }
        50% {
            transform: scale(1.03, 1.05);
        }
        70% {
            transform: scale(1.05, 1.03);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes etator {
        0% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    @keyframes etatoragain {
        0% {
            transform: rotate(360deg);
        }
        30% {
            transform: rotate(180deg);
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
        
        .custom-tooltip {
            font-size: 12px;
            padding: 6px 10px;
        }
        
        .custom-tooltip.mobile {
            font-size: 14px;
            padding: 8px 14px;
        }
    }
</style>