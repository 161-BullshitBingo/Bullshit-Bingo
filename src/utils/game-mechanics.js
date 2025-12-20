// utils/game-mechanics.js

// Filtert alle Takes nach mindestens einem passenden Tag
export function filterByTags(allTakes, requiredTags) {
  return allTakes;
  return allTakes.filter((entry) =>
    entry.tags.some((tag) => requiredTags.includes(tag)),
  );
}

// Fisher–Yates Shuffle (uniform zufällig)
export function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Nimmt gefilterte Takes und wählt 25 zufällige aus
export function getRandom25(filtered) {
  return shuffle(filtered).slice(0, 25);
}

// Wandelt eine flache Liste in ein 5×5 Grid um
export function make5x5Grid(items) {
  const grid = [];
  for (let i = 0; i < 5; i++) {
    grid.push(items.slice(i * 5, i * 5 + 5));
  }
  return grid;
}

// Reichert eine einzelne Zelle um zusätzliche Felder an
export function enrichCell(entry) {
  return {
    id: entry.id,
    short: entry.short,
    take: entry.example,
    tags: entry.tags.super.concat(entry.tags.topic),
    claim: entry.claim,
    debunk: entry.debunk,
    checked: false,
  };
}

// Reicht alle Zellen an
export function enrichItems(items) {
  return items.map(enrichCell);
}

const winMasks = [
  // horizontal
  0b1111100000000000000000000, //
  0b0000011111000000000000000, //
  0b0000000000111110000000000, //
  0b0000000000000001111100000, //
  0b0000000000000000000011111, //
  // vertical
  0b1000010000100001000010000, //
  0b0100001000010000100001000, //
  0b0010000100001000010000100, //
  0b0001000010000100001000010, //
  0b0000100001000010000100001, //
  // diagonals
  0b1000001000001000001000001, //
  0b0000100010001000100010000, //
];

export function mapCellsToBitmask(cells) {
  let mask = 0;
  for (let idx = 0; idx < cells.length; idx++) {
    if (cells[idx]?.checked) {
      mask |= 1 << idx;
    }
  }
  return mask;
}

// gibt zurück: { score, completedLines, stateMask }
export function checkForBingoFromCells(cells) {
  const stateMask = mapCellsToBitmask(cells);

  const completedLines = [];
  for (let i = 0; i < winMasks.length; i++) {
    const lineMask = winMasks[i];
    if ((stateMask & lineMask) === lineMask) completedLines.push(i);
  }

  return {
    stateMask,
    completedLines,
    score: completedLines.length,
  };
}
