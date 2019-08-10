<template>
  <taggroups-table />
</template>

<script>
import TaggroupsTable from '~/components/ui/taggroups/taggroups-table.vue'
export default {
  layout: 'layout',
  components: {
    'taggroups-table': TaggroupsTable
  }
}
</script>
