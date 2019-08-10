<template>
  <sections-table />
</template>

<script>
import SectionsTable from '~/components/ui/sections/sections-table.vue'
export default {
  layout: 'layout',
  components: {
    'sections-table': SectionsTable
  }
}
</script>
