<!-- components/BingoCard.vue -->
<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

import BingoCardCell from "@/components/BingoCardCell.vue";
import {
  filterByTags,
  getRandom25,
  make5x5Grid,
  enrichItems,
} from "@/utils/game-mechanics.js";
import takes from "@/assets/rechteTakes.json";

const $q = useQuasar();

// 1. filtern
const filtered = filterByTags(takes, ["klima"]);

// 2. 25 zufällige + anreichern
const enriched = enrichItems(getRandom25(filtered));

// 3. 5×5 Grid
const bingoGrid = ref(make5x5Grid(enriched));

// flache Liste für das einfache Grid (25 Einträge)
const flatGrid = computed(() => bingoGrid.value.flat());

function toggleCellById(id) {
  for (const row of bingoGrid.value) {
    const cell = row.find((c) => c.id === id);
    if (cell) {
      cell.checked = !cell.checked;
      break;
    }
  }
}

function showInfo(id) {
  const cell = bingoGrid.value.flat().find((c) => c.id === id);
  if (!cell) return;

  $q.dialog({
    title: "Info",
    message: cell.info || "Keine weiteren Informationen vorhanden.",
  });
}
</script>

<template>
  <q-card square flat>
    <q-card-section class="q-pa-none">
      <div v-for="r in 5" :key="r" class="row no-wrap">
        <div v-for="c in 5" :key="c" class="col q-pa-xs">
          <!-- Quadratischer Container dank ratio="1" -->
          <q-responsive ratio="1">
            <!-- Button füllt den quadratischen Bereich -->
            <q-btn
              unelevated
              color="primary"
              class="full-width full-height"
              :label="(r - 1) * 5 + c"
            />
          </q-responsive>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
