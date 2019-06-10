<template>
  <div v-if="taggroups !== null">
    <sl-taggroups-table />
  </div>
</template>

<script>
import SlTaggroupsTable from '~/components/taggroups/sl-taggroups-table.vue'
import { mapGetters } from 'vuex'
export default {
  layout: 'layout',
  components: {
    'sl-taggroups-table': SlTaggroupsTable
  },
  computed: {
    ...mapGetters({ taggroups: 'taggroups/taggroups' })
  },
  mounted() {
    this.$store.dispatch('taggroups/FETCH_TAGGROUPS')
  }
}
</script>
