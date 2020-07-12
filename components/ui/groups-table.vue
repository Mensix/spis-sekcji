<template>
  <q-table
    :loading="loading"
    :columns="columns"
    :grid="isMobileDevice"
    :rows-per-page-options="[]"
    :visible-columns="
      hasCategories === false
        ? ['name', 'members', 'membersGrowth', 'link']
        : ['name', 'link', 'membersGrowth', 'members', 'category']
    "
    :data="computedDataset"
    :filter="input"
    :filter-method="filterData"
    :pagination.sync="pagination"
    flat
    dense
    square
    binary-state-sort
  >
    <template v-slot:top-left>
      <q-input
        v-model="input"
        debounce="250"
        color="secondary"
        label="Wyszukiwarka grup"
        dense
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-select
        v-model="selectedCategories"
        v-if="hasCategories === true"
        :options="categories"
        color="secondary"
        multiple
        dense
        options-dense
        label="Pokaż kategorie"
        options-selected-class="text-secondary"
      />
      <p class="q-mt-xs q-mb-none">Autorzy: Grzegorz Perun & Daniel Nguyen</p>
      <p v-if="Object.values(dataset).length > 0" class="q-mb-none">
        Ostatnia aktualizacja: {{ dataset.lastUpdateDate }}
      </p>
    </template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th class="no-border"/>
        <q-th key="members" :props="props" class="no-border">{{
          props.cols[1].label
        }}</q-th
        ><q-th class="no-border"/><q-th
          v-if="hasCategories === true"
          class="no-border"
      /></q-tr>
      <q-tr :props="props">
        <q-th key="name" :props="props">{{ props.cols[0].label }}</q-th>
        <q-th key="membersGrowth" :props="props">{{
          hasCategories === true ? props.cols[4].label : props.cols[3].label
        }}</q-th>
        <q-th key="link" :props="props">{{ props.cols[2].label }}</q-th>
        <q-th key="category" v-if="hasCategories === true" :props="props">{{
          props.cols[3].label
        }}</q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <small class="text-grey q-mr-xxs">
            {{ props.row.__index }}
          </small>
          <q-icon
            v-if="props.row.members >= 10000"
            class="q-mr-xxs"
            name="star"
            color="secondary"
          />
          <q-icon
            v-if="props.row.isOpen !== undefined && props.row.isOpen === true"
            class="q-mr-xxs"
            name="lock_open"
            color="secondary"
          />
          <small
            v-if="
              props.row.isSection !== undefined && props.row.isSection === false
            "
            class="text-grey q-mr-xxs"
            ><del>JBWA</del></small
          >
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="members" :props="props">
          <span class="q-mr-xxs">{{ props.row.members }}</span>
          <small
            :class="{
              'text-green': props.row.membersGrowth > 0,
              'text-red': props.row.membersGrowth < 0
            }"
          >
            <q-icon
              :name="
                props.row.membersGrowth > 0
                  ? 'arrow_upward'
                  : props.row.membersGrowth < 0
                  ? 'arrow_downward'
                  : null
              "
            /><span>
              {{
                props.row.membersGrowth > 0
                  ? `+${props.row.membersGrowth}`
                  : props.row.membersGrowth &lt; 0
                  ? props.row.membersGrowth
                  : null
              }}
            </span>
          </small>
        </q-td>
        <q-td key="link" :props="props">
          <a
            :id="`${props.row.name.split(' ').join('@')}`"
            :href="`https://facebook.com/groups/${props.row.link}`"
            class="text-secondary"
            target="_blank"
            rel="noopener noreferer"
            >/{{ props.row.link }}</a
          >
        </q-td>
        <q-td key="category" v-if="hasCategories === true" :props="props">
          <span>
            {{
              !Array.isArray(props.row.category)
                ? props.row.category
                : props.row.category.join(', ')
            }}
          </span>
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
                <q-item-label>
                  <small class="text-grey">
                    {{ props.row.__index }}
                  </small>
                  <q-icon
                    v-if="props.row.members >= 10000"
                    name="star"
                    color="secondary"
                  />
                  <q-icon
                    v-if="
                      props.row.isOpen !== undefined &&
                        props.row.isOpen === true
                    "
                    name="lock_open"
                    color="secondary"
                  />
                  <small
                    v-if="
                      props.row.isSection !== undefined &&
                        props.row.isSection === false
                    "
                    class="text-grey"
                    ><del>JBWA</del></small
                  >
                  {{ props.cols[0].value }}
                </q-item-label>
                <q-item-label caption>{{ props.cols[1].label }}</q-item-label>
                <q-item-label
                  >{{ props.cols[1].value }}
                  <small
                    :class="{
                      'text-green': props.row.membersGrowth > 0,
                      'text-red': props.row.membersGrowth < 0
                    }"
                  >
                    <q-icon
                      :name="
                        props.row.membersGrowth > 0
                          ? 'arrow_upward'
                          : props.row.membersGrowth < 0
                          ? 'arrow_downward'
                          : null
                      "
                    /><span>
                      {{
                        props.row.membersGrowth > 0 ? 
                          `+${props.row.membersGrowth}`
                          : props.row.membersGrowth &lt; 0
                          ? props.row.membersGrowth
                          : null
                      }}</span
                    ></small
                  ></q-item-label
                >
                <q-item-label caption>{{ props.cols[2].label }}</q-item-label>
                <q-item-label>
                  <a
                    :href="`https://facebook.com/groups/${props.cols[2].value}`"
                    :id="`${props.row.name.split(' ').join('@')}`"
                    class="text-secondary"
                    target="_blank"
                    rel="noopener noreferer"
                  >
                    /{{ props.cols[2].value }}
                  </a>
                </q-item-label>
                <q-item-label
                  v-if="
                    hasCategories === true && props.cols[3].value !== undefined
                  "
                  caption
                  >{{ props.cols[3].label }}</q-item-label
                >
                <q-item-label
                  v-if="
                    hasCategories === true && props.cols[3].value !== undefined
                  "
                >
                  {{
                    !Array.isArray(props.cols[3].value)
                      ? props.cols[3].value
                      : props.cols[3].value.join(', ')
                  }}
                </q-item-label>
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
  mixins: [common],
  props: {
    name: {
      type: String,
      default: ''
    },
    hasCategories: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedCategories: []
    }
  },
  computed: {
    ...mapGetters({
      categories: 'groups/categories'
    }),
    dataset() {
      return this.$store.state.groups[this.name]
    },
    computedDataset() {
      let dataset
      if (this.hasCategories === true) {
        if (this.selectedCategories.length === 0) {
          dataset = this.dataset.groups
        } else {
          dataset = this.dataset.groups.filter(x =>
            Array.isArray(x.category)
              ? this.selectedCategories.some(g => x.category.includes(g))
              : this.selectedCategories.includes(x.category)
          )
        }
      } else {
        dataset = this.dataset.groups
      }
      return dataset
    }
  },
  mounted() {
    if (Object.values(this.dataset).length === 0) {
      fetch(`https://spissekcji.firebaseio.com/${this.name}.json`)
        .then(response => response.json())
        .then(output => {
          this.hasCategories === true
            ? this.$store.dispatch(`groups/SET_${this.name.toUpperCase()}`, {
                lastUpdateDate: output.lastUpdateDate,
                groups: [
                  ...output.groups
                    .sort((a, b) => b.members - a.members)
                    .map((_, idx) => ({
                      ..._,
                      category: Array.isArray(_.category)
                        ? [..._.category.sort()]
                        : _.category,
                      membersGrowth: _.membersGrowth || 0,
                      __index: idx + 1
                    }))
                ]
              })
            : this.$store.dispatch(`groups/SET_${this.name.toUpperCase()}`, {
                lastUpdateDate: output.lastUpdateDate,
                groups: [
                  ...output.groups
                    .sort((a, b) => b.members - a.members)
                    .map((_, idx) => ({
                      ..._,
                      membersGrowth: _.membersGrowth || 0,
                      __index: idx + 1
                    }))
                ]
              })
        })
        .then(callback => {
          if (this.hasCategories === true) {
            this.$store.dispatch('groups/SET_CATEGORIES', [
              ...new Set(
                this.dataset.groups
                  .filter(
                    x =>
                      Object.prototype.hasOwnProperty.call(x, 'category') &&
                      x.category
                  )
                  .flatMap(x => x.category)
                  .sort()
              )
            ])
          }
        })
        .then(callback => (this.loading = false))
    } else {
      this.loading = false
    }
  }
}
</script>

<style>
.q-mr-xxs {
  margin-right: 1px;
}
</style>
