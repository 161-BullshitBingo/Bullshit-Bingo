<script setup>
import { computed } from "vue";

const props = defineProps({
  cell: { type: Object, required: true },
  index: { type: Number, required: true }, // 1..25
  compact: { type: Boolean, default: false }, // mobile: true
});

const emit = defineEmits(["toggle", "info"]);

const label = computed(() =>
  props.compact ? String(props.index) : props.cell.short,
);
</script>

<template>
  <div class="cell-wrapper">
    <q-card
      class="bingo-cell q-pa-sm"
      flat
      :class="{
        checked: props.cell.checked,
        compact: props.compact,
      }"
      :style="props.compact ? { cursor: 'default' } : undefined"
      @click="props.compact ? null : emit('toggle', props.cell.id)"
      @contextmenu.prevent="props.compact ? null : emit('info', props.cell)"
    >
      <div class="bingo-text">
        {{ label }}
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
}

.bingo-cell.checked {
  background: #ffa3b5;
}

.bingo-cell.compact .bingo-text {
  font-size: 1.2rem;
  font-weight: 700;
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
