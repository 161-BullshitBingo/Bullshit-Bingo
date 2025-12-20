<script setup>
const props = defineProps({
  take: { type: Object, default: null },
});

const sources = [
  {
    name: "Bundeszentrale für politische Bildung",
    url: "https://www.bpb.de",
  },
  {
    name: "Robert Koch-Institut",
    url: "https://www.rki.de",
  },
  {
    name: "WHO",
    url: "https://www.who.int",
  },
];
</script>

<template>
  <div class="q-py-sm">
    <div class="text-h6">Details zum Eintrag:</div>
    <q-separator />
  </div>

  <div class="q-py-sm">
    <div class="text-subtitle2 bg-secondary">Die Aussage:</div>
    <div class="text-subtitle1 text-weight-bold text-primary">
      {{ props.take.take }}
    </div>
  </div>

  <!-- Take, Tags -->
  <div class="q-py-sm">
    <div class="q-mt-sm">
      <q-badge
        v-for="tag in props.take.tags ?? []"
        :key="tag"
        outline
        color="primary"
        :label="tag"
        class="q-mr-sm q-mt-sm"
      />
    </div>
  </div>

  <q-separator />

  <!-- Take, Claim -->
  <div class="q-py-sm">
    <div class="text-subtitle2 bg-secondary">Beschreibung:</div>
    <div class="text-body2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
      aliquid ad quas sunt voluptatum officia dolorum cumque, possimus nihil
      molestias sapiente necessitatibus dolor saepe inventore, soluta id
      accusantium voluptas beatae.
    </div>
  </div>

  <q-separator />

  <!-- Take, Richtigstellung -->
  <div class="q-py-sm">
    <div class="text-subtitle2 bg-secondary">Richtigstellung</div>
    <div class="text-body2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
      aliquid ad quas sunt voluptatum officia dolorum cumque, possimus nihil
      molestias sapiente necessitatibus dolor saepe inventore, soluta id
      accusantium voluptas beatae.
    </div>
  </div>

  <q-separator />

  <!-- Take, Quellen Richtigstellung -->
  <div class="q-py-sm">
    <div class="text-subtitle2 bg-secondary">Quellen</div>

    <q-list dense class="q-pa-none">
      <q-item
        v-for="source in sources"
        :key="source.url"
        clickable
        tag="a"
        :href="source.url"
        target="_blank"
        class="q-pa-none"
      >
        <q-item-section class="q-pa-none">
          <q-item-label overline>
            {{ source.name }}
          </q-item-label>
          <q-item-label caption>
            {{ source.url }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
