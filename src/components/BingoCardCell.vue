<script setup>
import { QCard, QTooltip } from "quasar";

const props = defineProps({
  cell: Object,
});

const emit = defineEmits(["toggle", "info"]);
</script>

<template>
  <div class="cell-wrapper">
    <q-card
      class="bingo-cell q-pa-sm"
      flat
      :class="{ checked: props.cell.checked }"
      @click="emit('toggle', props.cell.id)"
      @contextmenu.prevent="emit('info', props.cell)"
    >
      <div class="bingo-text">
        {{ props.cell.short }}
      </div>
    </q-card>
  </div>
</template>

<style scoped>
.cell-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.bingo-cell {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.bingo-cell.checked {
  background: #ffa3b5;
  /* border-color: #42b883; */
}

.bingo-text {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
