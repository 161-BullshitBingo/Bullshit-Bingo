<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import BingoCardCell from "@/components/BingoCardCell.vue";
import { useBingoStore } from "@/stores/bingo";
import { useQuasar } from "quasar";

/* =====================
 * Store & Mobile Detection
 * ===================== */
const bingo = useBingoStore();
const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.sm);

// falls noch keine Karte existiert: initial erstellen
if (!bingo.grid?.length) {
  bingo.reshuffle();
}

const flatGrid = computed(() => bingo.flatGrid);

const showInfo = (cell) => {
  bingo.showTake(cell);
};

const wrapEl = ref(null);
const cardEl = ref(null);
const scale = ref(1);
let ro;

function recomputeScale() {
  if (isMobile.value) return;

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
  if (isMobile.value) return;

  await nextTick();
  recomputeScale();
  ro = new ResizeObserver(recomputeScale);
  if (wrapEl.value) {
    ro.observe(wrapEl.value);
  }
});

onBeforeUnmount(() => ro?.disconnect());
</script>

<template>
  <div v-if="!isMobile" ref="wrapEl" class="bingo-wrapper-desktop">
    <div
      ref="cardEl"
      class="bingo-container-desktop"
      :style="{ transform: `scale(${scale})` }"
    >
      <BingoCardCell
        v-for="(cell, idx) in flatGrid"
        :key="cell.id"
        :cell="cell"
        :index="idx + 1"
        :compact="false"
        @toggle="bingo.toggleCell"
        @info="showInfo"
      />
    </div>
  </div>

  <div v-else class="bingo-wrapper-mobile">
    <div class="bingo-container-mobile">
      <BingoCardCell
        v-for="(cell, idx) in flatGrid"
        :key="cell.id"
        :cell="cell"
        :index="idx + 1"
        :compact="true"
      />
    </div>
  </div>
</template>

<style scoped>
/* ===== DESKTOP ===== */
.bingo-wrapper-desktop {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

.bingo-container-desktop {
  transform-origin: center center;
  aspect-ratio: 1 / 1;
  width: min(90vmin, 720px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
}

/* ===== MOBILE ===== */
.bingo-wrapper-mobile {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.bingo-container-mobile {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
  padding: 8px;
  box-sizing: border-box;
}
</style>
