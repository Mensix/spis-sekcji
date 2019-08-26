<template>
  <sections-mobile-table v-if="$q.screen.lt.md" /><sections-table v-else />
</template>

<script>
import SectionsMobileTable from '../components/ui/sections/sections-mobile-table.vue'
import SectionsTable from '~/components/ui/sections/sections-table.vue'
export default {
  layout: 'layout',
  components: {
    SectionsTable,
    SectionsMobileTable
  }
}
</script>
