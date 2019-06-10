<template>
  <div v-if="sections !== null">
    <sl-sections-table />
  </div>
</template>

<script>
import SlSectionsTable from '~/components/sections/sl-sections-table.vue'
import { mapGetters } from 'vuex'
export default {
  layout: 'layout',
  components: {
    'sl-sections-table': SlSectionsTable
  },
  computed: {
    ...mapGetters({ sections: 'sections/sections' })
  },
  mounted() {
    this.$store.dispatch('sections/FETCH_SECTIONS')
  }
}
</script>
