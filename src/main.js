import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Notify, Dark } from "quasar";

// Import Quasar css+icons
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: { Notify }, // import Quasar plugins and add here
});

// Enforce Dark Mode
Dark.set(true); // Dark Mode ON

// Verwende Pinia Store für State Handling
myApp.use(createPinia());

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
