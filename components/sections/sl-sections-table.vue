<template>
  <q-table
    hide-bottom
    flat
    dense
    square
    :columns="columns"
    :data="
      selectedCategories === null || selectedCategories.length === 0
        ? sections
        : sections.filter(x => selectedCategories.includes(x.category))
    "
    :filter="input"
    :filter-method="filterSections"
    :pagination.sync="pagination"
  >
    <template v-slot:top-left="props">
      <sl-input placeholder="Wyszukiwarka sekcji" />
      <sl-combo />
    </template>

    <template v-slot:top-right="props">
      Liczba sekcji w spisie: {{ sections.length }}
      <br />
      Ostatnia aktualizacja: {{ lastUpdateDate }}
    </template>

    <template v-slot:body="props">
      <q-tr :class="{ 'bg-grey-2': props.row.members >= 10000 }" :props="props">
        <q-td key="Name" :props="props">
          <sub class="text-grey">{{ props.row.__index + 1 }}</sub>
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="Members" :props="props">
          <span>{{ props.row.members }}</span>
        </q-td>
        <q-td key="Link" :props="props">
          <a :href="props.row.link" class="text-secondary" target="_blank">
            {{ props.row.link.replace('https://facebook.com/groups', '') }}
          </a>
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
import SlCombo from '~/components/sl-combo.vue'
export default {
  layout: 'navbar',
  components: {
    'sl-input': SlInput,
    'sl-combo': SlCombo
  },
  computed: {
    ...mapGetters({
      columns: 'table/columns',
      sections: 'sections/sections',
      lastUpdateDate: 'sections/lastUpdateDate',
      input: 'input/input',
      selectedCategories: 'categories/selectedCategories'
    }),
    pagination: {
      get() {
        return this.$store.state.table.pagination
      },
      set(value) {
        this.$store.dispatch('table/SET_PAGINATION', value)
      }
    }
  },
  methods: {
    filterSections(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(row =>
        cols.some(
          col =>
            col.name === 'name' ||
            col.name === 'link' ||
            (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1
        )
      )
    }
  }
}
</script>
