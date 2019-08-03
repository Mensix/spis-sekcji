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
      <common-input placeholder="Wyszukiwarka sekcji" />
      <sections-combo />
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
    </template>

    <template v-slot:top-right="props">
      Liczba sekcji w spisie: {{ sections.length }}
      <br />
      Ostatnia aktualizacja: {{ lastUpdateDate }}
    </template>

    <template v-slot:body="props">
      <q-tr
        :class="{
          'bg-grey-2': props.row.members >= 10000,
          'bg-grey-4': props.row.members === '-'
        }"
        :props="props"
      >
        <q-td key="Name" :props="props">
          <span class="text-grey" style="font-size: 8px;">{{
            props.row.__index + 1
          }}</span>
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td v-if="props.row.members !== '-'" key="Members" :props="props">
          <span>{{ props.row.members }}</span>
        </q-td>
        <q-td v-else key="Members" :props="props">
          <span>-</span>
          <q-tooltip content-class="bg-secondary" max-width="250px"
            >Grupy mające liczbę członków wynoszącą <b>-</b> są
            <u
              >tajne, zaarchiwizowane, usunięte lub nie dosięgnął ich skrypt do
              aktualizacji spisu</u
            ></q-tooltip
          >
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
import CommonInput from '~/components/ui/common/common-input.vue'
import SectionsCombo from '~/components/ui/sections/sections-combo.vue'
export default {
  layout: 'navbar',
  components: {
    'common-input': CommonInput,
    'sections-combo': SectionsCombo
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
