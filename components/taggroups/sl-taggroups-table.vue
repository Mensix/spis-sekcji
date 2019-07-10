<template>
  <q-table
    hide-bottom
    flat
    dense
    square
    :columns="columns"
    :visible-columns="['Name', 'Members', 'Link']"
    :data="taggroups"
    :filter="input"
    :pagination.sync="pagination"
  >
    <template v-slot:top-left="props">
      <sl-input placeholder="Wyszukiwarka tag-grupek" />
    </template>

    <template v-slot:top-right="props">
      Liczba tag-grupek w spisie: {{ taggroups.length }}
      <br />
      Ostatnia aktualizacja: {{ lastUpdateDate }}
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="Index" :props="props">
          <span>{{ props.row.__index + 1 }}</span>
        </q-td>
        <q-td key="Name" :props="props">
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="Members" :props="props">
          <span>{{ props.row.members }}</span>
        </q-td>
        <q-td key="Link" :props="props">
          <a :href="props.row.link" class="text-secondary" target="_blank">{{
            props.row.link.replace('https://facebook.com/groups', '')
          }}</a>
        </q-td>
        <q-td key="Category" :props="props">
          <span>{{ props.row.category }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapGetters } from 'vuex'
import SlInput from '~/components/sl-input.vue'
export default {
  layout: 'navbar',
  components: {
    'sl-input': SlInput
  },
  computed: {
    ...mapGetters({
      columns: 'table/columns',
      taggroups: 'taggroups/taggroups',
      lastUpdateDate: 'taggroups/lastUpdateDate',
      input: 'input/input'
    }),
    pagination: {
      get() {
        return this.$store.state.table.pagination
      },
      set(value) {
        this.$store.dispatch('table/SET_PAGINATION', value)
      }
    }
  }
}
</script>
