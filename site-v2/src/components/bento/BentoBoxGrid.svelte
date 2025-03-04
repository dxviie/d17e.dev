<script lang="ts">
  import {
    type BentoBox,
    type BentoConfig,
    type BentoContent,
    buildTileGrid,
    calculateSquareGridDimensions,
    findAllConnectedShapes,
    generatePathFromTiles,
    getContentTiles,
    getShapeInTiles,
    roundAndInsetPath,
    type Tile
  } from "$root/src/components/bento/BentoBoxer.ts";

  const {svgId, bentoContent, bentoConfig} = $props<{
    svgId: string;
    bentoContent: BentoContent[]
    bentoConfig: BentoConfig
  }>();
  let containerElement: HTMLDivElement;

  let gridTiles: Tile[] = $state([]);
  let bentoBoxes: BentoBox[] = $state([]);
  let shownBentoContent = $state<string[]>([]);
  let usedTileIndices = $state(new Set<number>());
  let translateX = $state(0);
  let translateY = $state(0);
  let gridDimensions = $state({columns: 0, rows: 0, tileWidth: 0, tileHeight: 0});

  let animationId: number;
  let frameCount = 0;
  let noAddCount = 0;
  let isAnimating = $state(false);

  const INSET = 10;

  $effect(() => {
    if (containerElement) {
      frameCount = 0;
      const isMobile = window ? window.innerWidth < 768 : false;
      setupGrid(isMobile);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });

  function getRandomValue(min: number, max: number, round: boolean = false): number {
    const rand = (Math.random() * (max - min + 1)) + min;
    return round ? Math.round(rand) : rand;
  }

  function animate(time: DOMHighResTimeStamp) {
    // if (!isAnimating) return;

    // Create a snapshot of the current state at the beginning of the frame
    const currentShownContent = new Set(shownBentoContent);
    let unusedTiles = gridTiles.filter(tile => !usedTileIndices.has(tile.index));

    const inset = getRandomValue(bentoConfig.insetMin, bentoConfig.insetMax, true);
    const radius = getRandomValue(bentoConfig.radiusMin, bentoConfig.radiusMax, true);

    // Process each content item that hasn't been shown yet
    for (const content of bentoContent) {
      // Skip if we already have this content
      if (currentShownContent.has(content.id)) continue;

      // Find tiles for this content
      const shape = getShapeInTiles(
        unusedTiles,
        content.dimensions[0].width,
        content.dimensions[0].height,
        gridDimensions.rows,
        gridDimensions.columns,
        0
      );

      // If we found a valid shape
      if (shape.length > 0) {
        // Mark these tiles as used for future iterations
        shape.forEach(tile => usedTileIndices.add(tile.index));

        // Generate the path
        const path = generatePathFromTiles(shape);
        const roundedPath = roundAndInsetPath(shape, path, radius, inset);

        // Find content tiles
        const contentTiles = getContentTiles(shape, 2);
        const bentoContentTiles = contentTiles.map(contentTile => ({
          id: content.id,
          dimensions: content.dimensions,
          html: content.html,
          required: content.required,
          tile: contentTile
        }));

        // Create bento box
        bentoBoxes.push({
          shape: shape,
          path: roundedPath,
          pathAlt: path,
          color: bentoConfig.color,
          contentTiles: bentoContentTiles,
          inset: inset
        });
      }
      unusedTiles = gridTiles.filter(tile => !usedTileIndices.has(tile.index));
    }

    let connectedShapes = findAllConnectedShapes(unusedTiles, gridDimensions.columns, gridDimensions.rows);
    for (let i = 0; i < connectedShapes.length; i++) {
      const path = generatePathFromTiles(connectedShapes[i]);
      const roundedPath = roundAndInsetPath(connectedShapes[i], path, radius, inset);
      const bento = {
        shape: connectedShapes[i],
        path: roundedPath,
        pathAlt: path,
        color: bentoConfig.color,
        contentTiles: [],
        inset: 10
      }
      bentoBoxes = [...bentoBoxes, bento];
    }
  }

  function setupGrid(isMobile: boolean = false) {
    if (!containerElement) return;

    // Calculate grid dimensions
    const tileSize = Math.min(containerElement.clientWidth / 5, 150);
    const {columns, rows, tileHeight, tileWidth} = calculateSquareGridDimensions(
      containerElement.clientWidth /*- 20*/ || 1,
      containerElement.clientHeight /*- 20*/ || 1,
      tileSize
    );

    // Position the grid
    translateX = (containerElement.clientWidth - (columns * tileWidth)) / 2;
    translateY = (containerElement.clientHeight - (rows * tileHeight)) / 2;

    // Build the grid
    gridTiles = buildTileGrid(columns, rows, tileWidth, tileHeight);

    // Set CSS variables for styling
    const margin = 7 * window.devicePixelRatio || 1;
    const factor = isMobile ? .95 : 2;
    document.documentElement.style.setProperty('--tile-font-size', `${(tileHeight * factor) - margin}px`);
    document.documentElement.style.setProperty('--tile-font-size-small',
      ((tileHeight * factor) - margin) / (8 / Math.min(2, window.devicePixelRatio || 1)) + 'px');

    // Reset state and start animation after a brief delay to ensure DOM is ready
    setTimeout(() => {
      gridDimensions = {columns, rows, tileWidth, tileHeight};
      bentoBoxes = [];
      shownBentoContent = [];
      usedTileIndices.clear();

      // Start animation
      isAnimating = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      animationId = requestAnimationFrame(animate);
    }, 0);
  }

  // Helper to keep number in range
  function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  }

  // Helper to convert OKLAB to RGB to HEX
  function oklabToHex(L: number, a: number, b: number): string {
    // Convert OKLAB to linear RGB
    const l = L + 0.3963377774 * a + 0.2158037573 * b;
    const m = L - 0.1055613458 * a - 0.0638541728 * b;
    const s = L - 0.0894841775 * a - 1.2914855480 * b;

    // Convert to regular RGB
    const r = clamp(Math.pow(Math.max(l, 0), 3), 0, 1);
    const g = clamp(Math.pow(Math.max(m, 0), 3), 0, 1);
    const b_val = clamp(Math.pow(Math.max(s, 0), 3), 0, 1);

    // Convert to hex
    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b_val)}`;
  }

  function generateOKLABPalette(numColors: number): string[] {
    // Generate random colors in OKLAB space
    const palette: string[] = [];

    for (let i = 0; i < numColors; i++) {
      // L (lightness) between 0.4 and 0.8 for good visibility
      const L = 0.4 + Math.random() * 0.4;

      // a and b components (color) between -0.2 and 0.2 for balanced colors
      const a = -0.2 + Math.random() * 0.4;
      const b = -0.2 + Math.random() * 0.4;

      palette.push(oklabToHex(L, a, b));
    }

    return palette;
  }

  // For vibrant colors:
  function generateVibrantOKLABPalette(numColors: number): string[] {
    const palette: string[] = [];
    const baseHue = Math.random() * Math.PI * 2;

    for (let i = 0; i < numColors; i++) {
      const hue = baseHue + (Math.PI * 2 * i / numColors);
      const radius = 0.15 + Math.random() * 0.1; // Higher chroma for vibrant colors
      const a = radius * Math.cos(hue);
      const b = radius * Math.sin(hue);
      const L = 0.45 + Math.random() * 0.2; // Mid-range lightness

      palette.push(oklabToHex(L, a, b));
    }

    return palette;
  }
</script>

<svelte:window on:resize={() => setupGrid()}/>
<div class="container" bind:this={containerElement}>
  <svg id={svgId} xmlns="http://www.w3.org/2000/svg">
    <g id="bento-grid-root" transform={`translate(${translateX}, ${translateY})`}>

      <g id="grid-tile" opacity="0.7">
        {#each gridTiles as tile}
          <rect
                  x={tile.x}
                  y={tile.y}
                  width={tile.width}
                  height={tile.height}
                  fill={bentoConfig.bgColor}
                  stroke={bentoConfig.color}
                  stroke-width={.1}
                  tabindex={tile.index}
                  role="button"
                  aria-roledescription="tile selection"
                  data-index={tile.index}
          />
          <line
                  x1={tile.x}
                  y1={tile.y}
                  x2={tile.x + tile.width}
                  y2={tile.y + tile.height}
                  stroke="var(--color)"
                  stroke-width={.1}
          />
          <line
                  x1={tile.x + tile.width}
                  y1={tile.y}
                  x2={tile.x}
                  y2={tile.y + tile.height}
                  stroke="var(--color)"
                  stroke-width={.1}
          />
          <circle r={tile.width/2} cx={tile.x + tile.width / 2} cy={tile.y + tile.height / 2} fill="none" stroke={bentoConfig.color}
                  stroke-width="0.1"/>
        {/each}
      </g>

      {#each bentoBoxes as box}
        <path d={box.path} fill="var(--color)" stroke="none" stroke-width="5" opacity="1"/>

        {#each box.contentTiles as bentoContent}
          {#if bentoContent.tile}
            <rect
                    x={bentoContent.tile.x + box.inset}
                    y={bentoContent.tile.y+ box.inset}
                    width={bentoContent.tile.width - box.inset * 2}
                    height={bentoContent.tile.height - box.inset * 2}
                    fill="none"
            />
            <foreignObject xmlns="http://www.w3.org/1999/xhtml"
                           x={bentoContent.tile.x + box.inset}
                           y={bentoContent.tile.y + box.inset}
                           width={bentoContent.tile.width - box.inset * 2}
                           height={bentoContent.tile.height - box.inset * 2 }>
              <div class="bento-content" style={`font-size:${(16 + Math.random() * 16) / window.devicePixelRatio || 1}px`}>
                {@html bentoContent.html}
              </div>
            </foreignObject>
          {/if}
        {/each}
      {/each}

    </g>
  </svg>
</div>

<style>
    .container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    .bento-content {
        background-color: transparent;
        padding: 0;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
</style>