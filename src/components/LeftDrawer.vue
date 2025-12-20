<script setup>
import { ref } from "vue";

const group = ref([]);

const options = [
  { label: "Battery too low", value: "bat" },
  { label: "Friend request", value: "friend" },
  { label: "Picture uploaded", value: "upload" },
];

const emit = defineEmits(["reset", "newCard"]);
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
        <q-option-group :options="options" type="checkbox" v-model="group" />
      </q-expansion-item>

      <q-expansion-item icon="info" label="Info">
        <q-item>
          <q-item-section>
            Rechtsklick / Long-Press auf ein Feld zeigt Info.
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
  </div>
</template>
