<template>
  <q-layout view="hHh lpR fff">
    <sl-header />

    <q-page-container>
      <sl-info v-if="$q.screen.lt.md" />
      <nuxt />
    </q-page-container>

    <sl-footer />
  </q-layout>
</template>

<script>
import SlHeader from '~/components/sl-header.vue'
import SlInfo from '~/components/sl-info.vue'
import SlFooter from '~/components/sl-footer.vue'
export default {
  components: {
    'sl-header': SlHeader,
    'sl-info': SlInfo,
    'sl-footer': SlFooter
  }
}
</script>
