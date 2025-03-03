export type Tile = {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
};

type Point = { x: number; y: number };
type Edge = { start: Point; end: Point };

export type BentoBox = {
  shape: Tile[];
  path: string;
  pathAlt?: string;
  color: string;
  contentTiles: BentoContent[];
  inset: number;
};

export type BentoContent = {
  id: string;
  dimensions: { width: number; height: number }[]
  html: string
  required: boolean
  tile?: Tile
}

/******** GRID HELPERS ********/

export function calculateSquareGridDimensions(
  width: number,
  height: number,
  targetTileSize: number
): {
  columns: number;
  rows: number;
  tileWidth: number;
  tileHeight: number;
} {
  // Try fitting tiles at target size
  const initialCols = Math.floor(width / targetTileSize);
  const initialRows = Math.floor(height / targetTileSize);

  // Try increasing tile size to fill space better
  const maxTileSizeForCols = width / initialCols;
  const maxTileSizeForRows = height / initialRows;
  const actualTileSize = Math.min(maxTileSizeForCols, maxTileSizeForRows);
  const actualCols = Math.floor(width / actualTileSize);
  const actualRows = Math.floor(height / actualTileSize);
  const tileWidth = width / actualCols;
  const tileHeight = height / actualRows;

  return {
    columns: actualCols,
    rows: actualRows,
    tileWidth,
    tileHeight
  };
}

export function buildTileGrid(
  cols: number,
  rows: number,
  tileWidth: number = 100,
  tileHeight: number = 100
): Tile[] {
  const tiles: Tile[] = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      tiles.push({
        x: i * tileWidth,
        y: j * tileHeight,
        width: tileWidth,
        height: tileHeight,
        index: i * rows + j
      });
    }
  }
  return tiles;
}

/********* TILE HELPERS *********/

export function isRectangle(tiles: Tile[]): boolean {
  const minX = Math.min(...tiles.map((t) => t.x));
  const minY = Math.min(...tiles.map((t) => t.y));
  const maxX = Math.max(...tiles.map((t) => t.x + t.width));
  const maxY = Math.max(...tiles.map((t) => t.y + t.height));
  const totalArea = (maxX - minX) * (maxY - minY);
  const tilesArea = tiles.reduce((acc, t) => acc + t.width * t.height, 0);
  return Math.round(totalArea) === Math.round(tilesArea);
}

export function buildRectangleTile(tiles: Tile[]): Tile {
  const minX = Math.min(...tiles.map((t) => t.x));
  const minY = Math.min(...tiles.map((t) => t.y));
  const maxX = Math.max(...tiles.map((t) => t.x + t.width));
  const maxY = Math.max(...tiles.map((t) => t.y + t.height));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
    index: 0
  };
}

/******** PATH HELPERS ********/

export function generatePathFromTiles(tiles: Tile[]): string {
  if (tiles.length === 0) return '';

  // Generate all edges for each tile
  const edges: Edge[] = [];
  tiles.forEach((tile) => {
    // For each tile, create 4 edges
    edges.push(
      {start: {x: tile.x, y: tile.y}, end: {x: tile.x + tile.width, y: tile.y}}, // top
      {
        start: {x: tile.x + tile.width, y: tile.y},
        end: {x: tile.x + tile.width, y: tile.y + tile.height}
      }, // right
      {
        start: {x: tile.x + tile.width, y: tile.y + tile.height},
        end: {x: tile.x, y: tile.y + tile.height}
      }, // bottom
      {start: {x: tile.x, y: tile.y + tile.height}, end: {x: tile.x, y: tile.y}} // left
    );
  });

  // Remove internal edges (edges that appear twice)
  const uniqueEdges: Edge[] = [];
  edges.forEach((edge) => {
    const isDuplicate =
      edges.filter(
        (e) =>
          (arePointsEqual(e.start, edge.start) && arePointsEqual(e.end, edge.end)) ||
          (arePointsEqual(e.start, edge.end) && arePointsEqual(e.end, edge.start))
      ).length > 1;

    if (!isDuplicate) {
      uniqueEdges.push(edge);
    }
  });

  // Sort edges to create a continuous path
  const path: Point[] = [];
  let currentEdge = uniqueEdges[0];
  let currentPoint = currentEdge.start;
  path.push(currentPoint);

  while (uniqueEdges.length > 0) {
    // Add the end point of current edge
    path.push(currentEdge.end);

    // Remove the current edge from uniqueEdges
    uniqueEdges.splice(uniqueEdges.indexOf(currentEdge), 1);

    // Find the next edge that connects to current end point
    currentPoint = currentEdge.end;
    currentEdge = uniqueEdges.find(
      (edge) => arePointsEqual(edge.start, currentPoint) || arePointsEqual(edge.end, currentPoint)
    )!;

    // If the edge is in wrong direction, flip it
    if (currentEdge && currentEdge.end && arePointsEqual(currentEdge.end, currentPoint)) {
      const temp = currentEdge.start;
      currentEdge.start = currentEdge.end;
      currentEdge.end = temp;
    }
    if (!currentEdge) break;
  }

  // Convert points to SVG path string
  return (
    `M ${path[0].x} ${path[0].y} ` +
    path
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(' ') +
    ' Z'
  );
}

export function roundAndInsetPath(
  pathTiles: Tile[],
  pathData: string,
  radius = 20,
  inset = 0
): string {
  // Parse the path into points
  const points = pathData
    .split(/(?=[MLZ])/g)
    .filter((cmd) => cmd.trim())
    .map((cmd) => {
      const parts = cmd.trim().split(/\s+/);
      if (parts[0] === 'Z') return null;
      return {
        x: parseFloat(parts[1]),
        y: parseFloat(parts[2])
      };
    })
    .filter((p) => p !== null);

  // Close the path by adding the first point at the end if needed
  if (points[0].x !== points[points.length - 1].x || points[0].y !== points[points.length - 1].y) {
    points.push({...points[0]});
  }
  // console.debug('extracted points', points);

  // Apply inset if specified
  if (inset > 0) {
    const len = points.length - 1; // -1 because last point is same as first
    const newPoints = points.map((_, i) => ({...points[i]})); // Create a copy to avoid modifying while iterating

    for (let i = 0; i < len; i++) {
      const prev = points[(i - 1 + len) % len];
      const current = points[i];
      const next = points[(i + 1) % len];

      // Calculate vectors to previous and next points
      const toPrev = {x: prev.x - current.x, y: prev.y - current.y};
      const toNext = {x: next.x - current.x, y: next.y - current.y};

      // Normalize vectors
      const toPrevLen = Math.hypot(toPrev.x, toPrev.y);
      const toNextLen = Math.hypot(toNext.x, toNext.y);

      if (toPrevLen === 0 || toNextLen === 0) continue;

      toPrev.x /= toPrevLen;
      toPrev.y /= toPrevLen;
      toNext.x /= toNextLen;
      toNext.y /= toNextLen;

      // Calculate normal vector (average of normals from both segments)
      const normal = {
        x: (toPrev.x + toNext.x) / 2,
        y: (toPrev.y + toNext.y) / 2
      };

      if (normal.x === 0 && normal.y === 0) {
        if (prev.x === current.x && next.x === current.x) {
          normal.x = -1;
          normal.y = 0;
        } else if (prev.y === current.y && next.y === current.y) {
          normal.x = 0;
          normal.y = -1;
        }
      }
      // console.debug('toPrev', toPrev, 'toNext', toNext, 'normal', normal);
      // Normalize the normal vector
      const normalLen = Math.hypot(normal.x, normal.y);
      if (normalLen > 0) {
        normal.x /= normalLen;
        normal.y /= normalLen;

        const newX = normal.x * inset;
        const newY = normal.y * inset;
        // check if new point is inside any of the tiles
        const insideTile = pathTiles.some((tile) => {
          return (
            current.x + newX >= tile.x &&
            current.x + newX <= tile.x + tile.width &&
            current.y + newY >= tile.y &&
            current.y + newY <= tile.y + tile.height
          );
        });
        if (!insideTile) {
          normal.x *= -1;
          normal.y *= -1;
        }

        // Apply inset along the normal direction
        newPoints[i].x += normal.x * inset;
        newPoints[i].y += normal.y * inset;
      }
    }

    // Update the last point to match the first point
    newPoints[len] = {...newPoints[0]};

    // Replace the original points with the inset points
    points.length = 0;
    points.push(...newPoints);
  }

  // Generate rounded path
  let path = '';
  const len = points.length - 1; // -1 because last point is same as first

  for (let i = 0; i < len; i++) {
    const current = points[i];
    const next = points[(i + 1) % len];
    const prev = points[(i - 1 + len) % len];

    // Calculate direction vectors
    const toPrev = {x: prev.x - current.x, y: prev.y - current.y};
    const toNext = {x: next.x - current.x, y: next.y - current.y};

    // Normalize vectors
    const toPrevLen = Math.hypot(toPrev.x, toPrev.y);
    const toNextLen = Math.hypot(toNext.x, toNext.y);

    if (toPrevLen === 0 || toNextLen === 0) continue;

    toPrev.x /= toPrevLen;
    toPrev.y /= toPrevLen;
    toNext.x /= toNextLen;
    toNext.y /= toNextLen;

    // Calculate corner radius for this point
    const actualRadius = Math.min(radius, toPrevLen / 2, toNextLen / 2);

    // Calculate control points
    const cp1 = {
      x: current.x + toPrev.x * actualRadius,
      y: current.y + toPrev.y * actualRadius
    };

    const cp2 = {
      x: current.x + toNext.x * actualRadius,
      y: current.y + toNext.y * actualRadius
    };

    // Start path if first point
    if (i === 0) {
      path += `M ${cp1.x} ${cp1.y}`;
    }

    // Add the rounded corner
    path += ` L ${cp1.x} ${cp1.y} Q ${current.x} ${current.y} ${cp2.x} ${cp2.y}`;
  }

  return path + ' Z';
}

/****** BENTO BOX FUNCTIONALITY ******/

export function getContentTiles(tiles: Tile[], minimumTileSize: number = 1): Tile[] {
  if (tiles.length === 0) return [];

  const result: Tile[] = [];
  const used = new Set<number>();

  let count = 0;

  while (used.size < tiles.length && count < tiles.length * 2) {
    count++;

    const unusedTiles = tiles.filter((t) => !used.has(t.index));
    if (unusedTiles.length < minimumTileSize) {
      break;
    }

    // First check if all tiles form a rectangle
    if (isRectangle(unusedTiles)) {
      unusedTiles.forEach((t) => used.add(t.index));
      result.push(buildRectangleTile(unusedTiles));
      break;
    }

    const n = Math.min(calculateMaxSearchDepth(unusedTiles.length), unusedTiles.length - minimumTileSize);
    const allRectangles: Tile[][] = [];
    for (let i = 1; i <= n; i++) {
      allRectangles.push(...findRectangleWithMissingTiles(unusedTiles, i));
    }
    if (allRectangles && allRectangles.length > 0) {
      const mostSquare = findMostSquareRectangle(allRectangles);
      mostSquare.forEach((t) => used.add(t.index));
      result.push(buildRectangleTile(mostSquare));
    }

    // Find the top-left most unused tile
    const startTile = unusedTiles
      .filter((t) => !used.has(t.index))
      .reduce((topLeft, current) => {
        if (current.y < topLeft.y || (current.y === topLeft.y && current.x < topLeft.x)) {
          return current;
        }
        return topLeft;
      }, unusedTiles[0]);
    console.log('startTile', startTile);

    let addedRight = false;
    let neighborRight = tiles.find(
      (t) =>
        !used.has(t.index) &&
        Math.round(t.x) === Math.round(startTile.x + startTile.width) &&
        Math.round(t.y) === Math.round(startTile.y)
    );
    console.log('neighborRight', neighborRight);
    if (neighborRight) {
      addedRight = true;
      // create a new tile combining startTile and neighborRight
      const contentTile = {
        x: startTile.x,
        y: startTile.y,
        width: startTile.width + neighborRight.width,
        height: startTile.height,
        index: result.length
      };
      used.add(startTile.index);
      used.add(neighborRight.index);

      neighborRight = tiles.find(
        (t) =>
          !used.has(t.index) &&
          Math.round(t.x) === Math.round(contentTile.x + contentTile.width) &&
          Math.round(t.y) === Math.round(startTile.y)
      );
      while (neighborRight) {
        contentTile.width += neighborRight.width;
        used.add(neighborRight.index);
        neighborRight = tiles.find(
          (t) =>
            !used.has(t.index) &&
            Math.round(t.x) === Math.round(contentTile.x + contentTile.width) &&
            Math.round(t.y) === Math.round(startTile.y)
        );
      }
      result.push(contentTile);
    }

    let neighborDown = tiles.find(
      (t) =>
        !used.has(t.index) &&
        Math.round(t.x) === Math.round(startTile.x) &&
        Math.round(t.y) === Math.round(startTile.y + startTile.height)
    );
    console.log('neighborDown', neighborDown, 'result', result);
    if (!addedRight && neighborDown) {
      // create a new tile combining startTile and neighborDown
      const contentTile = {
        x: startTile.x,
        y: startTile.y,
        width: startTile.width,
        height: startTile.height + neighborDown.height,
        index: result.length
      };
      used.add(startTile.index);
      used.add(neighborDown.index);

      neighborDown = tiles.find(
        (t) =>
          !used.has(t.index) &&
          Math.round(t.x) === Math.round(startTile.x) &&
          Math.round(t.y) === Math.round(contentTile.y + contentTile.height)
      );
      console.log('next neighborDown', neighborDown);
      while (neighborDown) {
        contentTile.height += neighborDown.height;
        used.add(neighborDown.index);
        neighborDown = tiles.find(
          (t) =>
            !used.has(t.index) &&
            Math.round(t.x) === Math.round(startTile.x) &&
            Math.round(t.y) === Math.round(contentTile.y + contentTile.height)
        );
      }
      result.push(contentTile);
    }

    if (!neighborDown && !neighborRight && !used.has(startTile.index)) {
      used.add(startTile.index);
      const singleTile = {
        x: startTile.x,
        y: startTile.y,
        width: startTile.width,
        height: startTile.height,
        index: result.length
      };
      result.push(singleTile);
    }
  }

  if (count >= tiles.length * 2) {
    console.error('Could not find content tiles');
  }
  return result;
}

/****** INTERNAL HELPERS ******/
function arePointsEqual(p1: Point, p2: Point): boolean {
  return Math.abs(p1.x - p2.x) < 0.001 && Math.abs(p1.y - p2.y) < 0.001;
}

function findRectangleWithMissingTiles(unusedTiles: Tile[], n: number): Tile[][] {
  const subsets: Tile[][] = [];

  // Generate all possible combinations of n tiles to remove
  function combinations<T>(arr: T[], n: number): T[][] {
    const result: T[][] = [];

    // Helper function to generate combinations
    function generate(current: T[], start: number, remaining: number) {
      if (remaining === 0) {
        result.push([...current]);
        return;
      }

      for (let i = start; i <= arr.length - remaining; i++) {
        current.push(arr[i]);
        generate(current, i + 1, remaining - 1);
        current.pop();
      }
    }

    generate([], 0, n);
    return result;
  }

  // Get indices from 0 to unusedTiles.length - 1
  const indices = Array.from({length: unusedTiles.length}, (_, i) => i);

  // Generate all possible combinations of n indices to remove
  const combos = combinations(indices, n);

  // Check each combination
  for (const combo of combos) {
    const subset = unusedTiles.filter((_, index) => !combo.includes(index));
    if (isRectangle(subset)) {
      subsets.push(subset);
    }
  }
  return subsets;
}

function findMostSquareRectangle(rectangles: Tile[][]): Tile[] {
  if (rectangles.length === 0) return [];

  // get the maximum length of the provided rectangles
  const maxLength = Math.max(...rectangles.map((r) => r.length));
  // filter out rectangles that are not the maximum length
  const maxRectangles = rectangles.filter((r) => r.length === maxLength);

  function getDimensions(tiles: Tile[]): { width: number; height: number } {
    const minX = Math.min(...tiles.map((t) => t.x));
    const maxX = Math.max(...tiles.map((t) => t.x));
    const minY = Math.min(...tiles.map((t) => t.y));
    const maxY = Math.max(...tiles.map((t) => t.y));

    return {
      width: maxX - minX + 1,
      height: maxY - minY + 1
    };
  }

  function getScore(tiles: Tile[]): { squareness: number; tileCount: number } {
    const {width, height} = getDimensions(tiles);
    return {
      squareness: Math.abs(1 - width / height),
      tileCount: tiles.length
    };
  }

  return maxRectangles.reduce((best, current) => {
    if (best.length === 0) return current;

    const currentScore = getScore(current);
    const bestScore = getScore(best);

    // If squareness is significantly different (using a small epsilon)
    const EPSILON = 0.001;
    if (Math.abs(currentScore.squareness - bestScore.squareness) > EPSILON) {
      return currentScore.squareness < bestScore.squareness ? current : best;
    }

    // If squareness is the same, prefer more tiles
    return currentScore.tileCount > bestScore.tileCount ? current : best;
  }, [] as Tile[]);
}

function calculateMaxSearchDepth(unusedTilesLength: number): number {
  if (unusedTilesLength <= 3) return 0;
  if (unusedTilesLength <= 5) return 1;
  if (unusedTilesLength <= 6) return 2;
  if (unusedTilesLength <= 7) return 3;
  if (unusedTilesLength <= 8) return 4;
  return 5; // Cap at 5 for larger sets to maintain performance
}


/********* BENTO BOX GENERATION *********/

export function getShapeInTiles(
  tiles: Tile[],
  shapeTileCountX: number,
  shapeTileCountY: number,
  gridRows: number,
  gridColumns: number,
  allowedExtraTiles: number = 2
): Tile[] {
  // Validate inputs
  if (shapeTileCountX < 1 || shapeTileCountY < 1 || !tiles.length || gridRows < 1 || gridColumns < 1) {
    return [];
  }
  // Create a set of indices of available tiles for quick lookup
  const availableTileIndices = new Set(tiles.map(t => t.index));

  // Keep track of tiles we've tried as starting points
  const triedStartIndices = new Set<number>();

  while (triedStartIndices.size < tiles.length) {
    // Randomly select a tile we haven't tried yet
    const availableStartTiles = tiles.filter(t => !triedStartIndices.has(t.index));
    const startTile = availableStartTiles[Math.floor(Math.random() * availableStartTiles.length)];
    triedStartIndices.add(startTile.index);

    // Calculate the starting position (row, col) from the index
    const startRow = Math.floor(startTile.index % gridRows);
    const startCol = Math.floor(startTile.index / gridRows);

    // Check if shape would fit within grid bounds
    if (startCol + shapeTileCountX > gridColumns ||
      startRow + shapeTileCountY > gridRows) {
      continue;
    }

    // Calculate all needed indices for the shape
    const neededIndices: number[] = [];
    for (let dy = 0; dy < shapeTileCountY; dy++) {
      for (let dx = 0; dx < shapeTileCountX; dx++) {
        neededIndices.push(startTile.index + dy + dx * gridRows);
      }
    }
    // Check if all needed tiles are available
    if (neededIndices.every(index => availableTileIndices.has(index))) {
      // Return the tiles that form the shape
      const shape = tiles.filter(t => neededIndices.includes(t.index));
      let extraTileCount = 0;
      while (extraTileCount < allowedExtraTiles) {
        const indi = new Set<number>();
        shape.forEach(t => {
          getNeighborIndices(t.index, gridColumns, gridRows).forEach(i => {
            if (!neededIndices.includes(i)) {
              indi.add(i);
            }
          });
        });
        // select random index from indi
        const extraIndex = getRandomFromSet(indi);
        const extraTile = tiles.find(t => t.index === extraIndex);

        if (extraTile) {
          shape.push(extraTile);
        }
        extraTileCount++;
      }
      return shape;
    }
  }
  // If we've tried all possible start tiles and found nothing
  return [];
}

function getRandomFromSet<T>(set: Set<T>): T {
  const arr = Array.from(set);
  return arr[Math.floor(Math.random() * arr.length)];
}


function getNeighborIndices(index: number, gridColumns: number, gridRows: number): number[] {
  const row = Math.floor(index % gridRows);
  const col = Math.floor(index / gridRows);
  const neighbors: number[] = [];

  // Check left
  if (col > 0) neighbors.push(index - gridRows);
  // Check right
  if (col < gridColumns - 1) neighbors.push(index + gridRows);
  // Check up
  if (row > 0) neighbors.push(index - 1);
  // Check down
  if (row < gridRows - 1) neighbors.push(index + 1);

  return neighbors;
}

export function findAllConnectedShapes(tiles: Tile[], gridColumns: number, gridRows: number): Tile[][] {
  if (!tiles.length) return [];

  // Create a map of tile indices to tiles for quick lookup
  const tileMap = new Map<number, Tile>();
  tiles.forEach(tile => tileMap.set(tile.index, tile));

  const shapes: Tile[][] = [];
  const visitedIndices = new Set<number>();

  // Find connected shape starting from a specific tile using flood fill
  function findConnectedShape(startTile: Tile): Tile[] {
    const connectedTiles: Tile[] = [];
    const queue: Tile[] = [startTile];
    const shapeVisited = new Set<number>();

    while (queue.length > 0) {
      const currentTile = queue.shift()!;
      if (shapeVisited.has(currentTile.index)) continue;

      shapeVisited.add(currentTile.index);
      visitedIndices.add(currentTile.index);
      connectedTiles.push(currentTile);

      // Check adjacent tiles
      const adjacentIndices = getNeighborIndices(currentTile.index, gridColumns, gridRows);
      for (const adjIndex of adjacentIndices) {
        const adjacentTile = tileMap.get(adjIndex);
        if (adjacentTile && !shapeVisited.has(adjIndex)) {
          queue.push(adjacentTile);
        }
      }
    }

    return connectedTiles;
  }

  // Process all tiles
  for (const tile of tiles) {
    if (!visitedIndices.has(tile.index)) {
      const shape = findConnectedShape(tile);
      shapes.push(shape);
    }
  }

  return shapes;
}
