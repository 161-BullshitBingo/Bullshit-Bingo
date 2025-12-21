import { defineStore } from "pinia";
import confetti from "canvas-confetti";
import { Notify } from "quasar";

import takes from "@/assets/rechteTakes_v2.json";
import {
  filterByTags,
  getRandom25,
  make5x5Grid,
  enrichItems,
  checkForBingoFromCells,
} from "@/utils/game-mechanics.js";

const tagMap = {
  afd: "Rechtsextrem / AfD-nah",
  vt: "Verschwörungsideologisch",
  pop: "Populistisch / Anti-Establishment",
  anti: "Antidemokratisch",
  mig: "Migrations- & Islamfeindlich",
  lgbt: "LGBTQIA+- & Genderfeindlich",
  wis: "Wissenschafts- & Medienfeindlich",
  aut: "Autoritär / Law-and-Order",
};

export const useBingoStore = defineStore("bingo", {
  state: () => ({
    selection: ["afd", "vt", "pop", "anti", "mig", "lgbt", "wis", "aut"],
    grid: [],
    bingoLinesEver: new Set(),
    selectedTake: null,
  }),

  getters: {
    selectedTags(state) {
      return state.selection.map((k) => tagMap[k]).filter(Boolean);
    },
    filteredTakes(state) {
      const required = this.selectedTags;
      if (!required.length) return takes;

      // match gegen tags.super (Labels!)
      return takes.filter((entry) =>
        (entry.tags?.super ?? []).some((tag) => required.includes(tag)),
      );
    },
    flatGrid(state) {
      return state.grid.flat();
    },
  },

  actions: {
    reshuffle() {
      const enriched = enrichItems(getRandom25(this.filteredTakes));
      this.grid = make5x5Grid(enriched);
      this.bingoLinesEver = new Set();
      console.log("selection:", this.selection);
      console.log("example take tags:", takes[0]?.tags);
    },

    resetBoard() {
      for (const cell of this.flatGrid) {
        cell.checked = false;
      }
      this.bingoLinesEver = new Set();
    },

    toggleCell(id) {
      for (const row of this.grid) {
        const cell = row.find((c) => c.id === id);
        if (cell) {
          cell.checked = !cell.checked;
          break;
        }
      }

      const { completedLines } = checkForBingoFromCells(this.flatGrid);
      let newlyCompleted = 0;
      const next = new Set(this.bingoLinesEver);

      for (const line of completedLines) {
        if (!next.has(line)) {
          next.add(line);
          newlyCompleted++;
        }
      }

      if (newlyCompleted > 0) {
        this.bingoLinesEver = next;
        confetti({ particleCount: 150, spread: 70 });

        Notify.create({
          type: "positive",
          message:
            newlyCompleted === 1
              ? "🎉 Bingo!"
              : `🎉 ${newlyCompleted} neue Bingos!`,
        });
      }
    },

    showTake(cell) {
      this.selectedTake = cell;
    },
  },
});
