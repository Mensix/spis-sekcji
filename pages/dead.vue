<template>
  <q-table
    :grid="isMobileDevice"
    :rows-per-page-options="[]"
    :columns="columns"
    :loading="loading"
    :data="
      selectedCategories.length === 0
        ? deadgroups.groups
        : deadgroups.groups.filter(x => selectedCategories.includes(x.category))
    "
    :visible-columns="['name', 'link', 'category']"
    :filter="input"
    :pagination.sync="pagination"
    flat
    dense
    square
    binary-state-sort
  >
    <template v-slot:top-left>
      <q-input
        v-model="input"
        color="secondary"
        label="Wyszukiwarka sekcji"
        dense
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-select
        v-model="selectedCategories"
        :options="categories"
        color="secondary"
        multiple
        dense
        options-dense
        label="Pokaż kategorie"
        options-selected-class="text-secondary"
      />
      <p class="q-mt-xs q-mb-none">Autorzy: Grzegorz Perun & Daniel Nguyen</p>
      <p v-if="Object.values(deadgroups).length > 0" class="q-mb-none">
        Ostatnia aktualizacja: {{ deadgroups.lastUpdateDate }}
      </p>
    </template>

    <template v-slot:top-right
      ><a
        href="https://docs.google.com/forms/d/1WHa71d4x0qeO_8G6CwUV4XfK-X5kL5--rBk5bTH9NDo/viewform"
        target="_blank"
        rel="noopener noreferer"
        ><img src="baner.svg" class="banner-vote"/></a
    ></template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="link" :props="props">
          <a
            :href="`https://facebook.com/groups/${props.row.link}`"
            class="text-secondary"
            target="_blank"
            rel="noopener noreferer"
          >
            /{{ props.row.link }}
          </a>
        </q-td>
        <q-td key="category" :props="props">
          <span>{{ props.row.category }}</span>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:item="props">
      <div class="col-12">
        <q-card :props="props" flat class="q-mb-md">
          <q-list dense>
            <q-item>
              <q-item-section>
                <q-item-label caption>{{ props.cols[0].label }}</q-item-label>
                <q-item-label>{{ props.cols[0].value }}</q-item-label>
                <q-item-label caption>{{ props.cols[1].label }}</q-item-label>
                <q-item-label>
                  <a
                    :href="`https://facebook.com/groups/${props.cols[1].value}`"
                    class="text-secondary"
                    target="_blank"
                    rel="noopener noreferer"
                  >
                    /{{ props.cols[1].value }}
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
import { mapGetters } from 'vuex'
import common from '~/mixins/common.js'
export default {
  layout: 'layout',
  mixins: [common],
  data() {
    return {
      categories: [],
      selectedCategories: [],
      pagination: {
        sortBy: 'Name',
        descending: false
      }
    }
  },
  computed: {
    ...mapGetters({
      deadgroups: 'groups/deadgroups'
    })
  },
  mounted() {
    if (Object.values(this.deadgroups).length === 0) {
      fetch('https://spissekcji.firebaseio.com/deadgroups.json')
        .then(response => response.json())
        .then(output => this.$store.dispatch('groups/SET_DEADGROUPS', output))
        .then(
          callback =>
            (this.categories = [
              ...new Set(this.deadgroups.groups.map(x => x.category).sort())
            ])
        )
        .then(callback => (this.loading = false))
    }
  }
}
</script>
