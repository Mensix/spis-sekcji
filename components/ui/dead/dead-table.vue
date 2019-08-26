<template>
  <q-table
    flat
    dense
    :grid="isMobileDevice"
    square
    binary-state-sort
    hide-bottom
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
        dense
        debounce="250"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-select
        v-model="selectedCategories"
        color="secondary"
        multiple
        dense
        options-dense
        label="Pokaż kategorie"
        options-selected-class="text-secondary"
        :options="categories"
      />
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
    </template>

    <template v-slot:top-right="props">
      <div v-if="deadgroups.length !== 0">
        <span>Liczba sekcji w spisie: {{ deadgroups.length }}</span>
        <br />
        <span>Ostatnia aktualizacja: {{ lastUpdateDate }}</span>
      </div>
      <div v-else>
        <span>Ładowanie..</span>
      </div>
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

    <template v-slot:item="props">
      <div class="col-12">
        <q-card flat class="q-pb-md" :props="props">
          <q-list dense>
            <q-item>
              <q-item-section>
                <q-item-label caption>{{ props.cols[0].label }}</q-item-label>
                <q-item-label>{{ props.cols[0].value }}</q-item-label>
                <q-item-label caption>{{ props.cols[1].label }}</q-item-label>
                <q-item-label>
                  <a
                    :href="props.cols[1].value"
                    class="text-secondary"
                    target="_blank"
                  >
                    {{
                      props.cols[1].value.replace(
                        'https://facebook.com/groups',
                        ''
                      )
                    }}
                  </a></q-item-label
                >
                <q-item-label caption>{{ props.cols[2].label }}</q-item-label>
                <q-item-label>{{ props.cols[2].value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
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
  computed: {
    isMobileDevice() {
      return this.$q.screen.lt.md
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
      .then(
        callback =>
          (this.categories = Array.from(
            new Set(this.deadgroups.map(x => x.category).sort())
          ))
      )
  }
}
</script>
