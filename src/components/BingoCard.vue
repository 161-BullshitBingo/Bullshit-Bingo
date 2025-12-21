<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import BingoCardCell from "@/components/BingoCardCell.vue";
import { useBingoStore } from "@/stores/bingo";

/* =====================
 * Store
 * ===================== */
const bingo = useBingoStore();

// falls noch keine Karte existiert: initial erstellen
if (!bingo.grid?.length) {
  bingo.reshuffle();
}

// flaches Grid kommt direkt aus dem Store (Getter)
const flatGrid = computed(() => bingo.flatGrid);

/* =====================
 * Right Drawer Info
 * ===================== */
const showInfo = (cell) => {
  bingo.showTake(cell);
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
        @toggle="bingo.toggleCell"
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
  overflow: hidden;
}

.bingo-container {
  transform-origin: center center;
  aspect-ratio: 1 / 1;
  width: min(90vmin, 720px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
}
</style>
