<template>
  <div class="column justify-center items-center window-height">
    <q-card :flat="$q.screen.lt.sm" class="q-pa-lg q-mb-sm">
      <q-card-section>
        <h5 class="text-center q-ma-none q-mb-sm">
          Dodaj nową grupę
        </h5>
        <p class="text-center q-mb-xl">lub zaaktualizuj istniejącą</p>
        <q-form class="q-gutter-md">
          <q-select
            v-model="choice"
            :options="options"
            color="secondary"
            options-selected-class="text-secondary"
            label="Co chcesz zrobić?"
            class="custom-width"
            stack-label
            outlined
          />
          <q-input
            v-model="add.name"
            color="secondary"
            label="Nazwa grupy"
            class="custom-width"
            stack-label
            outlined
          >
            <template v-slot:append>
              <q-icon name="create" />
            </template>
          </q-input>
          <q-input
            v-model="add.link"
            color="secondary"
            label="Link"
            class="custom-width"
            prefix="https://facebook.com/groups/"
            stack-label
            outlined
          >
            <template v-slot:append>
              <q-icon name="link" />
            </template>
          </q-input>
          <q-select
            v-model="add.category"
            :options="categories"
            color="secondary"
            options-selected-class="text-secondary"
            label="Kategoria"
            class="custom-width"
            new-value-mode="add-unique"
            multiple
            stack-label
            outlined
          />
          <q-input
            v-model="add.keywords"
            color="secondary"
            label="Słowa kluczowe"
            class="custom-width"
            stack-label
            outlined
          >
            <template v-slot:append>
              <q-icon name="vertical_split" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <div class="row justify-between">
        <q-btn
          @click="$router.push('/')"
          color="secondary"
          label="Wróć na stronę główną"
          flat
        />
        <q-btn color="secondary" label="Wyślij" flat />
      </div>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      choice: undefined,
      options: ['Dodaj nową grupę', 'Zaaktualizuj istniejącą grupę'],
      add: {
        name: '',
        categories: []
      }
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
          this.$store.dispatch('groups/SET_SECTIONS', [
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
          ])
          this.lastUpdateDate = output.lastUpdateDate
        })
        .then(callback =>
          this.$store.dispatch('groups/SET_CATEGORIES', [
            ...new Set(
              this.sections
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
    }
  }
}
</script>

<style scoped>
@media (min-width: 1023px) {
  .custom-width {
    width: 25vw;
  }
}
</style>
