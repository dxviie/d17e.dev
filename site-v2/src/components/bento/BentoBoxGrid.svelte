<script lang="ts">
  import {
    buildTileGrid,
    calculateSquareGridDimensions,
    findAllConnectedShapes,
    generatePathFromTiles,
    getContentTiles,
    getShapeInTiles,
    roundAndInsetPath,
    type Tile
  } from "$root/src/components/bento/BentoBoxer.ts";

  const {svgId} = $props();
  let containerElement: HTMLDivElement;

  let gridTiles: Tile[] = $state([]);
  let bentoTiles: Tile[] = $state([]);
  let contentTiles: Tile[] = $state([]);
  let bentoPaths: string[] = $state([]);
  let usedTileIndices = new Set<number>();
  let translateX = $state(0);
  let translateY = $state(0);
  let gridDimensions = $state({columns: 0, rows: 0, tileSize: 0});

  let animationId: number;
  let frameCount = 0;
  let noAddCount = 0;

  $effect(() => {
    if (containerElement) {
      frameCount = 0;
      setupGrid();
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  });

  function animate() {
    let stop = false;
    const unusedTiles = gridTiles.filter(tile => !usedTileIndices.has(tile.index));
    const shape = getShapeInTiles(unusedTiles, Math.round(Math.random() * 3) + 1, Math.round(Math.random() * 3) + 1, gridDimensions.rows, gridDimensions.columns, Math.round(Math.random()));
    if (shape.length > 0) {
      shape.forEach(tile => usedTileIndices.add(tile.index));
      const path = generatePathFromTiles(shape);
      const roundedPath = roundAndInsetPath(shape, path, 10, 10);
      const content = getContentTiles(shape);
      bentoPaths = [...bentoPaths, roundedPath];
      bentoTiles = [...bentoTiles, ...shape];
      contentTiles = [...contentTiles, ...content];
      noAddCount = 0;
    } else {
      noAddCount++;
      if (noAddCount > 10) {
        console.log('STOOOOOOOOOOOOOOP')

        let connectedShapes = findAllConnectedShapes(unusedTiles, gridDimensions.columns, gridDimensions.rows);
        for (let i = 0; i < connectedShapes.length; i++) {
          // console.log("CONNNNN", connectedShapes[i].map(t => t.index));
          const path = generatePathFromTiles(connectedShapes[i]);
          const roundedPath = roundAndInsetPath(connectedShapes[i], path, 0, 5);
          // const content = getContentTiles(connectedShapes[i]);
          bentoPaths = [...bentoPaths, roundedPath];
          bentoTiles = [...bentoTiles, ...connectedShapes[i]];
          // contentTiles = [...contentTiles, ...content];
        }
        stop = true;
      }
    }
    // if (bentoPaths.length > 5) {
    //   stop = true;
    // }
    // lastFrameTime = now;
    // }
    frameCount++;
    if (!stop)
      animationId = requestAnimationFrame(animate);
  }

  function setupGrid() {
    if (containerElement) {
      const {columns, rows, tileSize} = calculateSquareGridDimensions(
        containerElement.clientWidth - 20,
        containerElement.clientHeight - 20,
        100
      );
      translateX = (containerElement.clientWidth - (columns * tileSize)) / 2;
      translateY = (containerElement.clientHeight - (rows * tileSize)) / 2;
      gridTiles = buildTileGrid(columns, rows, tileSize, tileSize);
      setTimeout(() => {
        gridDimensions = {columns, rows, tileSize};
        bentoTiles = [];
        contentTiles = [];
        bentoPaths = [];
        usedTileIndices.clear();
        animationId = requestAnimationFrame(animate);
      }, 0);
    }
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
                fill="white"
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

      {#each bentoPaths as path}
        <path d={path} fill="darkorange" stroke="none" stroke-width="5" opacity=".5"/>
      {/each}

      {#each contentTiles as tile}
        <rect
                x={tile.x + 20}
                y={tile.y + 20}
                width={tile.width - 40}
                height={tile.height - 40}
                fill={'none'}
                stroke="none"
                opacity=".7"
        />
        <foreignObject xmlns="http://www.w3.org/1999/xhtml" x={tile.x + 20} y={tile.y + 20} width={tile.width - 40}
                       height={tile.height - 40}>
          <div class="bento-content">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod.
          </div>
        </foreignObject>
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
        font-size: .8rem;
        color: black;
        padding: 5px;
        background-color: rgba(255, 255, 255, .33);
        border-radius: 5px;
        text-decoration: underline;
        height: 100%;
    }
</style>