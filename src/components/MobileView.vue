<script setup>
import { computed, onMounted } from "vue";
import { useBingoStore } from "@/stores/bingo";
import BingoCardCell from "@/components/BingoCardCell.vue";

const bingo = useBingoStore();
const flatGrid = computed(() => bingo.flatGrid);

onMounted(() => {
  if (!bingo.grid?.length) bingo.reshuffle();
});

const toggle = (id) => bingo.toggleCell(id);
const showInfo = (cell) => bingo.showTake(cell);
</script>

<template>
  <!-- Grid: Feste Größe, volle Breite -->
  <div style="width: 100%">
    <BingoCard />
  </div>

  <!-- Liste: Nimmt restlichen Platz -->
  <q-card class="col q-mt-sm column no-wrap" style="min-height: 0">
    <q-scroll-area class="col">
      <q-list separator>
        <q-item v-for="item in heavyList" :key="item.id" clickable>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-card>
</template>

<style scoped>
.mobile-rooot {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mini-grid-wrapper {
  flex: 0 0 auto;
  overflow: hidden;
}

.mini-grid {
  width: min(96vw, 420px);
  margin: 12px auto 6px auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 1fr;
  gap: 6px;
}
</style>
