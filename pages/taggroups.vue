<template>
  <taggroups-mobile-table v-if="$q.screen.lt.md" /><taggroups-table v-else />
</template>

<script>
import TaggroupsTable from '~/components/ui/taggroups/taggroups-table.vue'
import TaggroupsMobileTable from '~/components/ui/taggroups/taggroups-mobile-table.vue'
export default {
  layout: 'layout',
  components: {
    TaggroupsTable,
    TaggroupsMobileTable
  }
}
</script>
