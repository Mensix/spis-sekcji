<template>
  <div>
    <div
      v-if="sections.groups && sections.groups.length > 0"
      :class="{
        'row fixed-height justify-center items-center': true,
        'q-my-md': $q.screen.lt.sm
      }"
    >
      <q-banner class="bg-white q-mr-auto q-mb-sm">
        <template v-slot:avatar>
          <q-icon name="info" color="secondary" />
        </template>
        Jeśli chcesz pomóc spisowi sekcji, to w tym miejscu możesz
        podporządkowywać grupom pasujące do nich kategorie. W przypadku, gdy
        sekcji nie można przyporządkować żadnej z dostępnych kategorii, kliknij
        przycisk Pomiń.
      </q-banner>
      <div class="row justify-center items-center">
        <div class="col-12">
          <h4 class="text-center q-ma-none q-mb-xl">
            {{ pickedSection.name }}
          </h4>
        </div>
        <q-btn
          :label="category"
          v-for="category in categories"
          :key="category"
          @click="sendCategory(category)"
          flat
          no-caps
          class="q-btn--fixed-width q-mr-sm q-mb-sm"
        />
        <q-btn
          @click="pickSection()"
          class="q-btn--fixed-width q-mr-sm q-mb-sm"
          label="Pomiń"
          text-color="secondary"
          flat
          no-caps
        />
      </div>
    </div>
    <div v-else class="row fixed-height justify-center items-center">
      <q-spinner color="secondary" class="text-h2" />
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
  .q-btn--fixed-width {
    width: 200px;
  }
}

@media (max-width: 599px) {
  .q-btn--fixed-width {
    width: 75px;
  }
}
</style>
