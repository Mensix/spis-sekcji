<template>
  <sections-table />
</template>

<script>
import { mapGetters } from 'vuex'
import SectionsTable from '~/components/ui/sections/sections-table.vue'
export default {
  layout: 'layout',
  components: {
    'sections-table': SectionsTable
  },
  computed: {
    ...mapGetters({ sections: 'sections/sections' })
  },
  async mounted() {
    await this.$store.dispatch('sections/FETCH_SECTIONS')
    await this.$store.dispatch(
      'categories/SET_CATEGORIES',
      Array.from(
        new Set(
          this.sections
            .map(x => x.category)
            .filter(x => x !== null)
            .sort()
        )
      )
    )
  }
}
</script>
