<script setup>
import { computed } from "vue";
import { useBingoStore } from "@/stores/bingo";

const bingo = useBingoStore();

const options = [
  { label: "Rechtsextrem / AfD-nah", value: "afd" },
  { label: "Verschwörungsideologisch", value: "vt" },
  { label: "Populistisch / Anti-Establishment", value: "pop" },
  { label: "Antidemokratisch", value: "anti" },
  { label: "Migrations- & Islamfeindlich", value: "mig" },
  { label: "LGBTQIA+- & Genderfeindlich", value: "lgbt" },
  { label: "Wissenschafts- & Medienfeindlich", value: "wis" },
  { label: "Autoritär / Law-and-Order", value: "aut" },
  { label: "Klima", value: "klima" }, // TODO: add 'Klima' Takes
];

// v-model Adapter auf den Store (damit QOptionGroup sauber funktioniert)
const selectionModel = computed({
  get: () => bingo.selection,
  set: (v) => {
    bingo.selection = v;
    // optional: sofort neu mischen bei Filteränderung
    bingo.reshuffle();
  },
});
</script>

<template>
  <div class="q-pa-sm">
    <q-list>
      <q-item-label header>Menü</q-item-label>

      <q-expansion-item icon="grid_view" label="Spiel">
        <q-item clickable v-ripple @click="bingo.reshuffle()">
          <q-item-section>Neue Karte</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="bingo.resetBoard()">
          <q-item-section>Alle Felder zurücksetzen</q-item-section>
        </q-item>
      </q-expansion-item>

      <q-expansion-item icon="settings" label="Einstellungen">
        <q-option-group
          :options="options"
          type="checkbox"
          v-model="selectionModel"
        />
      </q-expansion-item>

      <q-expansion-item icon="info" label="Info">
        <q-item>
          <q-item-section>
            1. Rechtsklick / Long-Press auf ein Feld zeigt Info.
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section> 2. FTZ FRZ </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
  </div>
</template>
