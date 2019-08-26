<template>
  <taggroups-table />
</template>

<script>
import TaggroupsTable from '~/components/ui/taggroups/taggroups-table.vue'
export default {
  layout: 'layout',
  components: {
    TaggroupsTable
  }
}
</script>

<style>
.q-item--active {
  color: var(--q-color-secondary);
}
</style>
