<template>
  <q-layout view="hHh lpR fff">
    <layout-header />

    <q-page-container>
      <nuxt />
    </q-page-container>

    <layout-footer />
  </q-layout>
</template>

<script>
import LayoutHeader from '~/components/layout/layout-header.vue'
import LayoutFooter from '~/components/layout/layout-footer.vue'
export default {
  components: {
    LayoutHeader,
    LayoutFooter
  }
}
</script>
