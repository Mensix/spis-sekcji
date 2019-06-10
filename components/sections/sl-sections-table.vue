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
    :pagination.sync="pagination"
  >
    <template v-slot:top-left="props">
      <sl-input />
      <sl-combo />
    </template>

    <template v-slot:top-right="props">
      Liczba sekcji w spisie: {{ sections.length }}
      <!-- <br />
      Wyświetlanych:
      {{
        sections.filter(
          x =>
            !input ||
            Object.values(x).find(s =>
              (s + '').toLowerCase().includes(input.toLowerCase())
            )
        ).length
      }} -->
      <br />
      Ostatnia aktualizacja: {{ lastUpdateDate }}
    </template>

    <template v-slot:body="props">
      <q-tr
        v-if="props.row.members === 2137"
        style="background-image: url('https://i.imgur.com/4uYxy3B.jpg');"
        :props="props"
      >
        <q-td key="Name" :props="props">
          <span class="text-white">{{ props.row.name }}</span>
        </q-td>
        <q-td key="Members" :props="props">
          <span class="text-white">{{ props.row.members }}</span>
        </q-td>
        <q-td key="Link" :props="props">
          <a :href="props.row.link" class="text-white" target="_blank">
            {{ props.row.link.replace('https://facebook.com/groups', '') }}
          </a>
        </q-td>
        <q-td key="Category" :props="props">
          <span>{{ props.row.category }}</span>
        </q-td>
      </q-tr>
      <q-tr
        v-else-if="props.row.members >= 10000"
        style="background-color: #F2F2F2"
        :props="props"
      >
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
      <q-tr v-else :props="props">
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
  }
}
</script>
