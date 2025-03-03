<script lang="ts">
  import {
    type BentoBox,
    type BentoContent,
    buildTileGrid,
    calculateSquareGridDimensions,
    generatePathFromTiles,
    getContentTiles,
    getShapeInTiles,
    roundAndInsetPath,
    type Tile
  } from "$root/src/components/bento/BentoBoxer.ts";

  const {svgId, bentoContent} = $props<{
    svgId: string;
    bentoContent: BentoContent[];
  }>();
  let containerElement: HTMLDivElement;

  let gridTiles: Tile[] = $state([]);
  let bentoBoxes: BentoBox[] = $state([]);
  let shownBentoContent = $state<number[]>([]);
  let usedTileIndices = $state(new Set<number>());
  let translateX = $state(0);
  let translateY = $state(0);
  let gridDimensions = $state({columns: 0, rows: 0, tileWidth: 0, tileHeight: 0});

  let contentColors = generateOKLABPalette(3);
  let fillColors = generateVibrantOKLABPalette(50);

  let animationId: number;
  let frameCount = 0;
  let noAddCount = 0;

  const INSET = 10;

  $effect(() => {
    if (containerElement) {
      frameCount = 0;
      setupGrid();
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  });

  function animate(time: DOMHighResTimeStamp) {
    let stop = false;
    const unusedTiles = gridTiles.filter(tile => !usedTileIndices.has(tile.index));

    //@ts-ignore
    bentoContent.forEach(content => {
      if (shownBentoContent.includes(content.id)) return;
      const shape = getShapeInTiles(unusedTiles, content.dimensions[0].width, content.dimensions[0].height, gridDimensions.rows, gridDimensions.columns, 0);//Math.round(Math.random()));

      if (shape.length > 0) {
        shape.forEach(tile => usedTileIndices.add(tile.index));
        const path = generatePathFromTiles(shape);
        const inset = content.id === 'logo' ? 0 : INSET / window.devicePixelRatio || 1;
        const roundedPath = roundAndInsetPath(shape, path, 0, inset);
        const contentTiles = getContentTiles(shape, 3);
        const bentoContent = contentTiles.map(contentTile => {
          return {
            id: content.id,
            dimensions: content.dimensions,
            html: content.html,
            required: content.required,
            tile: contentTile
          };
        });

        const bento = {
          shape: shape,
          path: roundedPath,
          pathAlt: path,
          color: 'green',
          contentTiles: bentoContent,
          inset: inset
        }
        shownBentoContent = [...shownBentoContent, content.id];
        bentoBoxes = [...bentoBoxes, bento];
        noAddCount = 0;
      }
    });
    frameCount++;
  }

  function setupGrid() {
    if (containerElement) {
      const tileSize = Math.min(containerElement.clientWidth / 5, 150);
      const {columns, rows, tileHeight, tileWidth} = calculateSquareGridDimensions(
        containerElement.clientWidth - 20 || 1,
        containerElement.clientHeight - 20 || 1,
        tileSize
      );
      translateX = (containerElement.clientWidth - (columns * tileWidth)) / 2;
      translateY = (containerElement.clientHeight - (rows * tileHeight)) / 2;
      gridTiles = buildTileGrid(columns, rows, tileWidth, tileHeight);
      // set a css variable
      const margin = 7 * window.devicePixelRatio || 1;
      document.documentElement.style.setProperty('--tile-font-size', `${tileHeight - margin}px`);
      document.documentElement.style.setProperty('--tile-font-size-small', (tileHeight - margin) / (10 / Math.min(2, window.devicePixelRatio || 1)) + 'px');
      setTimeout(() => {
        gridDimensions = {columns, rows, tileWidth, tileHeight};
        bentoBoxes = [];
        usedTileIndices.clear();
        animationId = requestAnimationFrame(animate);
      }, 0);
    }
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

  // Example usage:
  // Generate 5 colors
  // const colors = generateOKLABPalette(5);

  // For more harmonious palettes, you could modify the generation:
  function generateHarmoniosOKLABPalette(numColors: number): string[] {
    // Base hue angle in radians
    const baseHue = Math.random() * Math.PI * 2;

    const palette: string[] = [];

    for (let i = 0; i < numColors; i++) {
      // Distribute hues evenly around the circle
      const hue = baseHue + (Math.PI * 2 * i / numColors);

      // Convert polar coordinates to a/b coordinates
      const radius = 0.1 + Math.random() * 0.1; // Chroma
      const a = radius * Math.cos(hue);
      const b = radius * Math.sin(hue);

      // Vary lightness slightly
      const L = 0.45 + Math.random() * 0.3;

      palette.push(oklabToHex(L, a, b));
    }

    return palette;
  }

  // For pastel colors:
  function generatePastelOKLABPalette(numColors: number): string[] {
    const palette: string[] = [];
    const baseHue = Math.random() * Math.PI * 2;

    for (let i = 0; i < numColors; i++) {
      const hue = baseHue + (Math.PI * 2 * i / numColors);
      const radius = 0.05 + Math.random() * 0.05; // Lower chroma for pastels
      const a = radius * Math.cos(hue);
      const b = radius * Math.sin(hue);
      const L = 0.7 + Math.random() * 0.2; // Higher lightness for pastels

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

      {#each gridTiles as tile}
        <rect
                x={tile.x}
                y={tile.y}
                width={tile.width}
                height={tile.height}
                fill="darkgray"
                stroke="black"
                stroke-width={.5}
                opacity={.4}
                tabindex={tile.index}
                role="button"
                aria-roledescription="tile selection"
                data-index={tile.index}
        />
        <text x={tile.x + 5} y={tile.y + 15} font-size={10} fill="black">{tile.index}</text>
      {/each}

      {#each bentoBoxes as box}
        <path d={box.path} fill={box.color} stroke="none" stroke-width="5" opacity="1"/>

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
    }
</style>