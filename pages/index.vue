<template>
  <q-table
    ref="sectionsTable"
    :loading="loading"
    :columns="columns"
    :grid="isMobileDevice"
    :rows-per-page-options="[]"
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
    flat
    dense
    square
  >
    <template v-slot:top-left>
      <q-input
        v-model="input"
        color="secondary"
        placeholder="Wyszukiwarka sekcji"
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
      <p v-if="sections.length > 0">
        <span>Ostatnia aktualizacja: {{ lastUpdateDate }}</span>
      </p>
    </template>

    <template v-slot:top-right
      ><a
        href="https://docs.google.com/forms/d/1WHa71d4x0qeO_8G6CwUV4XfK-X5kL5--rBk5bTH9NDo/viewform"
        target="_blank"
        rel="noopener noreferer"
        ><img src="baner.svg" class="banner-vote"/></a
    ></template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th class="no-border"/>
        <q-th key="members" :props="props" class="no-border">{{
          props.cols[1].label
        }}</q-th
        ><q-th class="no-border"/><q-th class="no-border"
      /></q-tr>
      <q-tr :props="props">
        <q-th key="name" :props="props">{{ props.cols[0].label }}</q-th>
        <q-th key="membersGrowth" :props="props">{{
          props.cols[4].label
        }}</q-th>
        <q-th key="link" :props="props">{{ props.cols[2].label }}</q-th>
        <q-th key="category" :props="props">{{ props.cols[3].label }}</q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <small class="text-grey">
            {{ props.row.__index }}
          </small>
          <q-icon
            v-if="props.row.members >= 10000"
            name="star"
            color="secondary"
          />
          <small
            v-if="
              props.row.isSection !== undefined && props.row.isSection === false
            "
            class="text-grey"
            ><del>JBWA</del></small
          >
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="members" :props="props">
          <span>{{ props.row.members }}</span>
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
            :href="props.row.link"
            class="text-secondary"
            target="_blank"
            rel="noopener noreferer"
            >{{ props.row.link.replace('https://facebook.com/groups', '') }}</a
          >
        </q-td>
        <q-td key="category" :props="props">
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
                    :href="props.cols[2].value"
                    :id="`${props.row.name.split(' ').join('@')}`"
                    class="text-secondary"
                    target="_blank"
                    rel="noopener noreferer"
                  >
                    {{
                      props.cols[2].value.replace(
                        'https://facebook.com/groups',
                        ''
                      )
                    }}
                  </a>
                </q-item-label>
                <q-item-label
                  v-if="props.cols[3].value !== undefined"
                  caption
                  >{{ props.cols[3].label }}</q-item-label
                >
                <q-item-label v-if="props.cols[3].value !== undefined">
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
import common from '~/mixins/common.js'
export default {
  layout: 'layout',
  mixins: [common],
  data() {
    return {
      sections: [],
      categories: [],
      selectedCategories: []
    }
  },
  mounted() {
    fetch('https://spissekcji.firebaseio.com/sections.json')
      .then(response => response.json())
      .then(output => {
        this.sections = [
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
        this.lastUpdateDate = output.lastUpdateDate
      })
      .then(
        callback =>
          (this.categories = [
            ...new Set(
              this.sections
                .filter(
                  x =>
                    Object.prototype.hasOwnProperty.call(x, 'category') &&
                    x.category
                )
                .map(x => x.category)
                .flat()
                .sort()
            )
          ])
      )
      .then(callback => (this.loading = false))
  }
}
</script>
