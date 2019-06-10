<template>
  <q-layout view="hHh lpR fff">
    <sl-header />

    <q-page-container>
      <nuxt />
    </q-page-container>

    <sl-footer />
  </q-layout>
</template>

<script>
import SlHeader from '~/components/sl-header.vue'
import SlFooter from '~/components/sl-footer.vue'
export default {
  components: {
    'sl-header': SlHeader,
    'sl-footer': SlFooter
  }
}
</script>
