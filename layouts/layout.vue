<template>
  <q-layout view="hHh lpR fff">
    <layout-header />

    <q-page-container>
      <layout-info v-if="$q.screen.lt.md" />
      <nuxt />
    </q-page-container>

    <layout-footer />
  </q-layout>
</template>

<script>
import LayoutHeader from '~/components/layout/layout-header.vue'
import LayoutInfo from '~/components/layout/layout-info.vue'
import LayoutFooter from '~/components/layout/layout-footer.vue'
export default {
  components: {
    LayoutHeader,
    LayoutInfo,
    LayoutFooter
  }
}
</script>
