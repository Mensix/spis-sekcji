<template>
  <div class="row items-center justify-center fixed-height">
    <div v-if="pickedSection && sections.groups && sections.groups.length > 1">
      <div class="col-12 q-mb-xl">
        <h4 class="text-center q-ma-none q-mx-md">{{ pickedSection.name }}</h4>
      </div>
      <q-separator class="q-mb-xl" color="secondary" />
      <div class="col-12 q-mx-md">
        <q-btn
          v-for="category in categories"
          @click="sendCategory(category)"
          :key="category"
          :disable="pickedSection.category"
          :ripple="false"
          no-caps
          flat
          class="q-mr-xs q-mb-xs"
          >{{ category }}</q-btn
        >
        <q-btn
          @click="pickSection()"
          :ripple="false"
          flat
          no-caps
          class="q-mr-xs q-mb-xs"
          text-color="secondary"
          >Pomiń</q-btn
        >
      </div>
    </div>
    <div v-else class="row justify-center">
      <q-spinner color="secondary" size="3em" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'layout',
  data() {
    return {
      pickedSection: []
    }
  },
  computed: {
    ...mapGetters({
      sections: 'groups/sections',
      categories: 'groups/categories'
    })
  },
  mounted() {
    if (Object.values(this.sections).length === 0) {
      fetch('https://spissekcji.firebaseio.com/sections.json')
        .then(response => response.json())
        .then(output => {
          this.$store.dispatch('groups/SET_SECTIONS', {
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
        })
        .then(callback =>
          this.$store.dispatch('groups/SET_CATEGORIES', [
            ...new Set(
              this.sections.groups
                .filter(
                  x =>
                    Object.prototype.hasOwnProperty.call(x, 'category') &&
                    x.category
                )
                .flatMap(x => x.category)
                .sort()
            )
          ])
        )
        .then(callback => this.pickSection())
    } else {
      this.pickSection()
    }
  },
  methods: {
    pickSection() {
      this.pickedSection = this.sections.groups[
        Math.floor(Math.random() * this.sections.groups.length)
      ]
    },
    sendCategory(category) {
      fetch('https://spis-sekcji.herokuapp.com/v1/submissions/categories', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.pickedSection.name,
          link: this.pickedSection.link,
          category: category
        })
      }).then(response => response.json())
      this.pickSection()
    }
  }
}
</script>

<style>
@media (min-width: 600px) {
  .fixed-height {
    height: calc(100vh - 155px);
  }
}

@media (max-width: 599px) {
  .fixed-height {
    height: calc(100vh - 123px);
  }
}
</style>
