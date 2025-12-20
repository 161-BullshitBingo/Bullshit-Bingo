<script setup>
/* =====================
 * Imports
 * ===================== */
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useQuasar } from "quasar";
import confetti from "canvas-confetti";
import BingoCardCell from "@/components/BingoCardCell.vue";
import {
  filterByTags,
  getRandom25,
  make5x5Grid,
  enrichItems,
  checkForBingoFromCells,
} from "@/utils/game-mechanics.js";
import takes from "@/assets/rechteTakes_v2.json";

/* =====================
 * State & Setup
 * ===================== */
const $q = useQuasar();
const emit = defineEmits(["show-take"]);

const bingoLinesEver = ref(new Set());

const all = [
  "Rechtsextrem / AfD-nah",
  "Verschwörungsideologisch",
  "Populistisch / Anti-Establishment",
  "Antidemokratisch",
  "Migrations- & Islamfeindlich",
  "LGBTQIA+- & Genderfeindlich",
  "Wissenschafts- & Medienfeindlich",
  "Autoritär / Law-and-Order",
];

const filtered = filterByTags(takes, all);
const enriched = enrichItems(getRandom25(takes));
const bingoGrid = ref(make5x5Grid(enriched));
const flatGrid = computed(() => bingoGrid.value.flat());

/* =====================
 * Bingo Logic
 * ===================== */
function toggleCellById(id) {
  for (const row of bingoGrid.value) {
    const cell = row.find((c) => c.id === id);
    if (cell) {
      cell.checked = !cell.checked;
      break;
    }
  }

  const { completedLines } = checkForBingoFromCells(flatGrid.value);

  let newlyCompleted = 0;
  const next = new Set(bingoLinesEver.value);

  for (const lineIdx of completedLines) {
    if (!next.has(lineIdx)) {
      next.add(lineIdx);
      newlyCompleted++;
    }
  }

  if (newlyCompleted > 0) {
    bingoLinesEver.value = next;
    confetti(particle);
    $q.notify({
      type: "positive",
      message:
        newlyCompleted === 1
          ? "🎉 Bingo!"
          : `🎉 ${newlyCompleted} neue Bingos!`,
      timeout: 1500,
      position: "top",
    });
  }
}

const gam = ["#ffa3b5", "#7f7f7f", "#c9c7c5", "#000000", "#1a1a1a"];
const afa = ["#c40008", "#ffffff", "#000000"];

const particle = {
  particleCount: 150,
  spread: 70,
  origin: { y: 0.6 },
  colors: gam,
};
/* =====================
 * Right Drawer Info
 * ===================== */
const showInfo = (cell) => {
  emit("show-take", cell);
};

/* =====================
 * Auto-Fit (Dark Magic)
 * ===================== */
const wrapEl = ref(null);
const cardEl = ref(null);
const scale = ref(1);
let ro;

function recomputeScale() {
  const wrap = wrapEl.value;
  const card = cardEl.value;
  if (!wrap || !card) return;

  const availW = wrap.clientWidth;
  const availH = wrap.clientHeight;

  const rect = card.getBoundingClientRect();
  const baseW = rect.width / scale.value || rect.width;
  const baseH = rect.height / scale.value || rect.height;

  const margin = 0.98;
  const s = Math.min(availW / baseW, availH / baseH) * margin;
  scale.value = Math.min(1, s);
}

onMounted(async () => {
  await nextTick();
  recomputeScale();
  ro = new ResizeObserver(recomputeScale);
  ro.observe(wrapEl.value);
});

onBeforeUnmount(() => ro?.disconnect());
</script>

<template>
  <div ref="wrapEl" class="bingo-wrapper">
    <div
      ref="cardEl"
      class="bingo-container"
      :style="{ transform: `scale(${scale})` }"
    >
      <BingoCardCell
        v-for="cell in flatGrid"
        :key="cell.id"
        :cell="cell"
        @toggle="toggleCellById"
        @info="showInfo"
      />
    </div>
  </div>
</template>

<style scoped>
.bingo-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden; /* wichtig: verhindert “rauslaufen” */
}

.bingo-container {
  transform-origin: center center;

  /* deine Grid-Definition */
  aspect-ratio: 1 / 1;
  width: min(
    90vmin,
    720px
  ); /* Basisgröße: darf gerne groß sein, Scale regelt den Rest */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
}
</style>
