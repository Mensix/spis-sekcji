<template>
  <sl-taggroups-table />
</template>

<script>
import { mapGetters } from 'vuex'
import SlTaggroupsTable from '~/components/taggroups/sl-taggroups-table.vue'
export default {
  layout: 'layout',
  components: {
    'sl-taggroups-table': SlTaggroupsTable
  },
  computed: {
    ...mapGetters({ taggroups: 'taggroups/taggroups' })
  },
  async mounted() {
    await this.$store.dispatch('taggroups/FETCH_TAGGROUPS')
  }
}
</script>
