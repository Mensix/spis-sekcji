<template>
  <groups-table :has-categories="false" name="taggroups" />
</template>

<script>
import GroupsTable from '~/components/ui/groups-table'
export default {
  layout: 'layout',
  components: {
    GroupsTable
  }
}
</script>
