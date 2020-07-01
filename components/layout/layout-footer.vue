<template>
  <q-footer class="bg-grey-10 text-white">
    <q-toolbar>
      <q-toolbar-title class="q-mt-md q-mb-md">
        <p
          class="text-white text-caption text-center text-whitespace-normal q-ma-none"
        >
          Autorzy spisu dziękują Aleksandrze Marczuk i Adamowi Firynowiczowi za
          <a
            href="https://docs.google.com/spreadsheets/d/1b0oBrpdNXqfWx35kT4xhG0OiPY2OnYJmklGHshlv7_E/edit?fbclid=IwAR3f5V_DlCrZbtxYhKdDMV7hTiCpRaNtx5OvpZYTNpTBhkokxKafz7xzOfo"
            class="text-white"
            target="_blank"
            rel="noopener noreferer"
            >poprzedni spis sekcji</a
          >
          oraz Wojciechowi Kukli za
          <a
            href="http://akapedia.pl/Jak_b%C4%99dzie_w_akapie%3F"
            class="text-white"
            target="_blank"
            rel="noopener noreferer"
            >spis sekcji na Akapedii.</a
          >
        </p>
        <q-separator dark inset class="q-mt-md q-mb-md" />
        <p class="text-caption text-center text-whitespace-normal q-ma-none">
          <nuxt-link to="/privacy" class="text-white"
            >Polityka prywatności</nuxt-link
          >
        </p>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}

.text-whitespace-normal {
  white-space: normal;
}
</style>
