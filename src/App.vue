<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useBingoStore } from "@/stores/bingo";

import InfoBoard from "@/components/MainMenu.vue";
import BingoCard from "@/components/BingoCard.vue";
import MobileView from "@/components/MobileView.vue";
import BingoCardCell from "@/components/BingoCardCell.vue";
import LeftDrawer from "@/components/LeftDrawer.vue";
import RightDrawer from "@/components/RightDrawer.vue";

const bingo = useBingoStore();
const flatGrid = computed(() => bingo.flatGrid);
const showInfo = (cell) => {
  bingo.showTake(cell);
  rightDrawerOpen.value = true;
};

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.sm);

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const showDialog = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

onMounted(() => {
  if (!bingo.grid?.length) {
    bingo.reshuffle();
  }
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <!-- Toolbar -->
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title><b>FCKNZS</b></q-toolbar-title>
        <q-btn
          v-if="!isMobile"
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
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
      <RightDrawer />
    </q-drawer>

    <!-- Game Field -->
    <q-page-container>
      <q-page
        class="column no-wrap q-pa-sm"
        style="height: 90vh; overflow: hidden"
      >
        <!-- DESKTOP -->
        <div v-if="!isMobile" class="full-height column">
          <BingoCard />
        </div>

        <!-- MOBILE -->
        <template v-else>
          <div style="width: 100%">
            <BingoCard />
          </div>
          <q-card
            class="col q-mt-sm q-ma-sm column no-wrap"
            style="min-height: 0"
          >
            <q-scroll-area class="col">
              <q-list separator>
                <q-item v-for="(cell, idx) in flatGrid" :key="cell.id">
                  <!-- Checkbox (nur hier wird gehakt) -->
                  <q-item-section avatar>
                    <q-checkbox
                      :model-value="cell.checked"
                      @update:model-value="bingo.toggleCell(cell.id)"
                      @click.stop
                    />
                  </q-item-section>

                  <!-- Text inkl. Nummer -->
                  <q-item-section>
                    <div>{{ cell.short }}</div>
                  </q-item-section>

                  <!-- Info Button -->
                  <q-item-section avatar>
                    <q-btn
                      flat
                      dense
                      round
                      icon="info"
                      color="primary"
                      @click.stop="showInfo(cell)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card>
        </template>
      </q-page>
    </q-page-container>

    <!-- Popup -->
    <q-dialog v-model="showDialog" backdrop-filter="blur(4px) saturate(150%)">
      <InfoBoard />
    </q-dialog>
  </q-layout>
</template>

<style scoped>
/* Komplett ohne Custom CSS! */
</style>
