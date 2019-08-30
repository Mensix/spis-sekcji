<template>
  <q-table
    flat
    :grid="$q.screen.lt.md"
    dense
    square
    binary-state-sort
    :loading="loading"
    :columns="columns"
    :rows-per-page-options="[20, 50, 100, 150, 200, 250, 0]"
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
        dense
        debounce="250"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
      <div v-if="taggroups.length !== 0">
        <span>Ostatnia aktualizacja: {{ lastUpdateDate }}</span>
      </div>
    </template>

    <template v-slot:top-right="props">
      <span
        ><a
          href="https://docs.google.com/forms/d/1v1Bk09joesOngMWJHxK21Ly4CSMnZ8DuHYuHqPVmTe0/"
          target="__blank"
          ><img
            src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.15752-9/69469141_472317053618556_1131370282133487616_n.png?_nc_cat=109&_nc_oc=AQnl8xftYX6W-GBPni1Co685nv5CLwF__7o19JVWOdMWQQixRTHNOOb2UaVV0GDOnYg&_nc_ht=scontent-frt3-1.xx&oh=42df6cf5b1273e085ae944806bf7ded2&oe=5E0557DF"
            :style="
              `${isMobileDevice ? 'max-width: 100%' : 'width: 375px'};`
            "/></a
      ></span>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="Name" :props="props">
          <span class="text-grey" style="font-size: 8px;">{{
            props.row.__index + 1
          }}</span>
          <q-icon
            v-if="props.row.members >= 10000"
            name="star"
            color="secondary"
          />
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
      taggroups: []
    }
  },
  mounted() {
    fetch('https://spissekcji.firebaseio.com/taggroups.json')
      .then(response => response.json())
      .then(output => {
        this.taggroups = Array.from(
          output.taggroups.sort((a, b) => b.members - a.members)
        )
        this.lastUpdateDate = output.lastUpdateDate
      })
      .then(callback => (this.loading = false))
  }
}
</script>
