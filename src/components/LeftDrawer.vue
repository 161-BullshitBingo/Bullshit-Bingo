<script setup>
import { ref, watch } from "vue";

const selection = ref([
  "afd",
  "vt",
  "pop",
  "anti",
  "mig",
  "lgbt",
  "wis",
  "aut",
]);

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

const emit = defineEmits(["reset", "newCard", "update:selection"]);

watch(
  selection,
  (val) => {
    emit("update:selection", val);
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div class="q-pa-sm">
    <q-list>
      <q-item-label header>Menü</q-item-label>

      <q-expansion-item icon="grid_view" label="Spiel">
        <q-item clickable v-ripple @click="emit('newCard')">
          <q-item-section>Neue Karte</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="emit('reset')">
          <q-item-section>Alle Felder zurücksetzen</q-item-section>
        </q-item>
      </q-expansion-item>

      <q-expansion-item icon="settings" label="Einstellungen">
        <q-option-group
          :options="options"
          type="checkbox"
          v-model="selection"
        />
      </q-expansion-item>

      <q-expansion-item icon="info" label="Info">
        <q-item>
          <q-item-section>
            1. Rechtsklick / Long-Press auf ein Feld zeigt Info.
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            2. Für eine neue Bingo Karte derzeit noch bitte einmal Seite neu
            laden.
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            3. Derzeit sind Auswahl der Themen sowie die Punkte im 'Spiel'
            Reiter noch Platzhalter und funktionieren nicht.
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
  </div>
</template>
