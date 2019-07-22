<template>
  <taggroups-table />
</template>

<script>
import { mapGetters } from 'vuex'
import TaggroupsTable from '~/components/ui/taggroups/taggroups-table.vue'
export default {
  layout: 'layout',
  components: {
    'taggroups-table': TaggroupsTable
  },
  computed: {
    ...mapGetters({ taggroups: 'taggroups/taggroups' })
  },
  async mounted() {
    await this.$store.dispatch('taggroups/FETCH_TAGGROUPS')
  }
}
</script>
