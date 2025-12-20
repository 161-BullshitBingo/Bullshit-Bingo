<script setup>
import InfoBoard from "@/components/InfoBoard.vue";
const props = defineProps({
  take: { type: Object, default: null },
});
</script>

<template>
  <div class="q-pa-sm">
    <div v-if="props.take">
      <InfoBoard :take="props.take" />
    </div>

    <div v-else class="text-grey">
      Rechtsklick auf ein Feld, um Details zu sehen.
    </div>
  </div>
</template>
