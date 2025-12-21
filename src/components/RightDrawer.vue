<script setup>
import InfoBoard from "@/components/InfoBoard.vue";
import { useBingoStore } from "@/stores/bingo";

const bingo = useBingoStore();
</script>

<template>
  <div class="q-pa-sm">
    <div v-if="bingo.selectedTake">
      <InfoBoard :take="bingo.selectedTake" />
    </div>

    <div v-else class="text-grey">
      Rechtsklick auf ein Feld, um Details zu sehen.
    </div>
  </div>
</template>
