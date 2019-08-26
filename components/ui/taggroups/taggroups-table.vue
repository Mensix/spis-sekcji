<template>
  <q-table
    hide-bottom
    flat
    :grid="$q.screen.lt.md"
    dense
    square
    binary-state-sort
    :columns="columns"
    :visible-columns="['Name', 'Members', 'Link']"
    :data="taggroups"
    :filter="input"
    :filter-method="filterData"
    :pagination.sync="pagination"
  >
    <template v-slot:top-left="props">
      <q-input
        v-model="input"
        color="secondary"
        placeholder="Wyszukiwarka tag-grupek"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
    </template>

    <template v-slot:top-right="props">
      <div v-if="taggroups.length !== 0">
        <span>Liczba tag-grupek w spisie: {{ taggroups.length }}</span>
        <br />
        <span>Ostatnia aktualizacja: {{ lastUpdateDate }}</span>
      </div>
      <div v-else>
        <span>Ładowanie..</span>
      </div>
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
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :class="{ 'bg-grey-3': props.row.members >= 10000 }" :props="props">
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
import common from '~/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      taggroups: [],
      lastUpdateDate: null,
      input: null
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
