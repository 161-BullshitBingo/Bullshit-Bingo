<script setup>
import { ref, onMounted } from "vue";
import InfoBoard from "@/components/MainMenu.vue";
import BingoCard from "@/components/BingoCard.vue";
import LeftDrawer from "@/components/LeftDrawer.vue";
import RightDrawer from "@/components/RightDrawer.vue";
import confetti from "canvas-confetti";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const selectedTake = ref(null);

function onShowTake(cellOrId) {
  // wenn BingoCard dir schon das cell-Objekt gibt:
  selectedTake.value = cellOrId;

  // Drawer aufklappen
  rightDrawerOpen.value = true;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

const showDialog = ref(false);

onMounted(() => {
  showDialog.value = true;
});
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
      <LeftDrawer />
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
          <BingoCard @show-take="onShowTake" />
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
