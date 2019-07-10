<template>
  <sl-sections-table />
</template>

<script>
import { mapGetters } from 'vuex'
import SlSectionsTable from '~/components/sections/sl-sections-table.vue'
export default {
  layout: 'layout',
  components: {
    'sl-sections-table': SlSectionsTable
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
