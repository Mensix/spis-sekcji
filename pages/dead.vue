<template>
  <dead-mobile-table v-if="$q.screen.lt.md" /><dead-table v-else />
</template>

<script>
import DeadMobileTable from '../components/ui/dead/dead-mobile-table.vue'
import DeadTable from '~/components/ui/dead/dead-table.vue'
export default {
  layout: 'layout',
  components: {
    DeadTable,
    DeadMobileTable
  }
}
</script>
