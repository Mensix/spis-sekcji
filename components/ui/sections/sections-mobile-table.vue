<template>
  <q-table
    hide-bottom
    flat
    dense
    square
    binary-state-sort
    grid
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
      <div v-if="sections.length !== 0">
        <span>Liczba sekcji w spisie: {{ sections.length }}</span>
        <br />
        <span>Ostatnia aktualizacja: {{ lastUpdateDate }}</span>
      </div>
      <div v-else>
        <span>Ładowanie..</span>
      </div>
    </template>

    <template v-slot:item="props">
      <div class="col-12">
        <q-card flat class="q-pb-md" :props="props">
          <q-list dense>
            <q-item>
              <q-item-section>
                <q-item-label caption>{{ props.cols[0].label }}</q-item-label>
                <q-item-label
                  ><span class="text-grey" style="font-size: 10px;"
                    >{{ props.row.__index + 1 }}&nbsp;</span
                  >{{ props.cols[0].value }}</q-item-label
                >
                <q-item-label caption>{{ props.cols[1].label }}</q-item-label>
                <q-item-label>{{ props.cols[1].value }}</q-item-label>
                <q-item-label caption>{{ props.cols[2].label }}</q-item-label>
                <q-item-label>
                  <a
                    :href="props.cols[2].value"
                    class="text-secondary"
                    target="_blank"
                  >
                    {{
                      props.cols[2].value.replace(
                        'https://facebook.com/groups',
                        ''
                      )
                    }}
                  </a></q-item-label
                >
                <q-item-label caption>{{ props.cols[3].label }}</q-item-label>
                <q-item-label>{{
                  !Array.isArray(props.cols[3].value)
                    ? props.cols[3].value
                    : props.cols[3].value.join(', ')
                }}</q-item-label>
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
