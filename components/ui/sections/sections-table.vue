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
        ? sections
        : sections.filter(x =>
            Array.isArray(x.category)
              ? selectedCategories.some(g => x.category.includes(g))
              : selectedCategories.includes(x.category)
          )
    "
    :filter="input"
    :filter-method="filterData"
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
      Liczba sekcji w spisie: {{ sections.length }}
      <br />
      Ostatnia aktualizacja: {{ lastUpdateDate }}
    </template>

    <template v-slot:top-row>
      <q-tr>
        <q-td key="Name">
          <span><b>Sekcja mniej nostalgiczna (2016)</b></span>
        </q-td>
        <q-td key="Members">
          <span><b>Zapraszamy! :)</b></span>
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
          <span><b>Roleplay</b></span>
        </q-td>
      </q-tr>
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
        <q-td key="Members" :props="props">
          <span>{{ props.row.members }}</span>
        </q-td>
        <q-td key="Link" :props="props">
          <a :href="props.row.link" class="text-secondary" target="_blank">
            {{ props.row.link.replace('https://facebook.com/groups', '') }}
          </a>
        </q-td>
        <q-td key="Category" :props="props">
          <span>{{
            !Array.isArray(props.row.category)
              ? props.row.category
              : props.row.category.join(', ')
          }}</span>
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
      sections: [],
      lastUpdateDate: null,
      categories: [],
      selectedCategories: [],
      input: null
    }
  },
  async mounted() {
    await fetch('https://api.github.com/gists/2c9b9e0c06b6efa6e0f78584ec37b5fb')
      .then(response => response.json())
      .then(output => JSON.parse(output.files['sections.json'].content))
      .then(output => {
        this.sections = Array.from(
          output.sections.sort((a, b) => b.members - a.members)
        )
        this.lastUpdateDate = output.lastUpdateDate
      })
    this.categories = Array.from(
      new Set(
        this.sections
          .map(x => x.category)
          .filter(x => x !== null && !Array.isArray(x))
          .sort()
      )
    )
  }
}
</script>
