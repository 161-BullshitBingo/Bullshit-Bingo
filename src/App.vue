<script setup>
import { ref, onMounted } from "vue";
import confetti from "canvas-confetti";
import InfoBoard from "@/components/MainMenu.vue";
import BingoCard from "@/components/BingoCard.vue";
import LeftDrawer from "@/components/LeftDrawer.vue";
import RightDrawer from "@/components/RightDrawer.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const showDialog = ref(false);

const selectedTake = ref(null);
const selection = ref([]);
const newCardTick = ref(0);
const resetTick = ref(0);

function onShowTake(cellOrId) {
  selectedTake.value = cellOrId;
  rightDrawerOpen.value = true;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function onSelectionUpdate(val) {
  selection.value = val;
}

function onNewCard() {
  newCardTick.value++;
}

function onReset() {
  resetTick.value++;
}

onMounted(() => {
  showDialog.value = true;
});
// Script Ende
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <!-- Toolbar -->
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> <bf> FCKNZS </bf> </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <!-- Left -->
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      overlay
      bordered
    >
      <LeftDrawer
        :selection="selection"
        @update:selection="onSelectionUpdate"
        @newCard="onNewCard"
        @reset="onReset"
      />
    </q-drawer>

    <!-- Right -->
    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      overlay
      bordered
    >
      <RightDrawer :take="selectedTake" />
    </q-drawer>

    <!-- Game Field -->
    <q-page-container>
      <q-page class="fit">
        <div class="fit flex flex-center padding">
          <BingoCard
            :selection="selection"
            :new-card-tick="newCardTick"
            :reset-tick="resetTick"
            @show-take="onShowTake"
          />
        </div>
      </q-page>
    </q-page-container>

    <!-- Popup -->
    <q-dialog v-model="showDialog" backdrop-filter="blur(4px) saturate(150%)">
      <InfoBoard />
    </q-dialog>
  </q-layout>
</template>

<style scoped>
.layout-header {
  box-shadow: none;
}
</style>
