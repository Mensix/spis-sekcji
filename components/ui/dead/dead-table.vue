<template>
  <q-table
    hide-bottom
    flat
    dense
    square
    binary-state-sort
    :columns="columns"
    :data="
      selectedCategories.length === 0
        ? deadgroups
        : deadgroups.filter(x => selectedCategories.includes(x.category))
    "
    :visible-columns="['Name', 'Link', 'Category']"
    :filter="input"
    :pagination.sync="pagination"
  >
    <template v-slot:top-left="props">
      <q-input
        v-model="input"
        color="secondary"
        placeholder="Wyszukiwarka sekcji"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-select
        v-model="selectedCategories"
        color="secondary"
        multiple
        label="Pokaż kategorie"
        options-selected-class="text-secondary"
        :options="categories"
      />
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
    </template>

    <template v-slot:top-right="props">
      Liczba sekcji w spisie: {{ deadgroups.length }}
      <br />
      Ostatnia aktualizacja: {{ lastUpdateDate }}
    </template>

    <template v-slot:top-row>
      <q-tr>
        <q-td key="Name">
          <span><b>Sekcja mniej nostalgiczna (2016)</b></span>
        </q-td>
        <q-td key="Link">
          <a
            href="https://facebook.com/groups/2715767105118248"
            class="text-secondary"
            target="_blank"
            ><b>/2715767105118248</b></a
          >
        </q-td>
        <q-td key="Category">
          <span><b>Zapraszamy! :)</b></span>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="Name" :props="props">
          <span>{{ props.row.name }}</span>
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
import common from '~/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      deadgroups: [],
      lastUpdateDate: null,
      input: null,
      categories: [],
      selectedCategories: [],
      pagination: {
        sortBy: 'Name',
        descending: false,
        page: 0,
        rowsPerPage: 0,
        rowsCount: 0
      }
    }
  },
  async mounted() {
    await fetch('https://api.github.com/gists/2a158f92e7a6f17bf7cc01a90aeed33e')
      .then(response => response.json())
      .then(output => JSON.parse(output.files['deadgroups.json'].content))
      .then(output => {
        this.deadgroups = Array.from(output.deadgroups)
        this.lastUpdateDate = output.lastUpdateDate
      })
    this.categories = Array.from(
      new Set(
        this.deadgroups
          .map(x => x.category)
          .filter(x => x !== 'Zapraszamy! :)')
          .sort()
      )
    )
  }
}
</script>
