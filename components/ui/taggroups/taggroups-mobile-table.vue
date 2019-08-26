<template>
  <q-table
    hide-bottom
    flat
    dense
    square
    binary-state-sort
    grid
    :columns="columns"
    :data="taggroups"
    :visible-columns="['Name', 'Members', 'Link']"
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
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
      <div v-if="taggroups.length !== 0">
        <span>Liczba sekcji w spisie: {{ taggroups.length }}</span>
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
                <q-item-label>{{ props.cols[0].value }}</q-item-label>
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
      taggroups: [],
      lastUpdateDate: null,
      input: null,
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
    await fetch('https://api.github.com/gists/9c2ddd305a04e353e29bc65ea403bcfb')
      .then(response => response.json())
      .then(output => JSON.parse(output.files['taggroups.json'].content))
      .then(output => {
        this.taggroups = Array.from(
          output.taggroups.sort((a, b) => b.members - a.members)
        )
        this.lastUpdateDate = output.lastUpdateDate
      })
  }
}
</script>
