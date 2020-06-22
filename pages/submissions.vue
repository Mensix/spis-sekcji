<template>
  <div class="column justify-center items-center window-height">
    <q-card :flat="$q.screen.lt.sm" v-if="!wasFormSend" class="q-pa-md">
      <q-card-section>
        <h5 class="text-center q-ma-none q-mb-sm">
          Dodaj nową grupę
        </h5>
        <p class="text-center q-ma-none q-pb-md">lub zaaktualizuj istniejącą</p>
        <q-form
          @submit="onAddSubmit"
          v-if="choice === 'Dodaj nową grupę'"
          class="q-gutter-md"
        >
          <q-select
            v-model="choice"
            :options="['Dodać nową grupę', 'Zaaktualizować istniejącą grupę']"
            :dense="$q.screen.lt.sm"
            :options-dense="$q.screen.lt.sm"
            color="secondary"
            options-selected-class="text-secondary"
            label="Co chcesz zrobić?"
            class="q-mb-md custom-width"
            stack-label
            outlined
          />
          <q-select
            v-model="add.type"
            :options="['Sekcja', 'Tag-grupka']"
            :dense="$q.screen.lt.sm"
            :options-dense="$q.screen.lt.sm"
            color="secondary"
            options-selected-class="text-secondary"
            label="Typ grupy"
            class="custom-width"
            stack-label
            outlined
          />
          <q-input
            v-model="add.name"
            :dense="$q.screen.lt.sm"
            color="secondary"
            label="Nazwa grupy"
            class="custom-width"
            stack-label
            outlined
            required
          >
            <template v-slot:append>
              <q-icon name="create" />
            </template>
          </q-input>
          <q-input
            v-model="add.link"
            :dense="$q.screen.lt.sm"
            color="secondary"
            label="Link"
            class="custom-width"
            prefix="https://facebook.com/groups/"
            stack-label
            outlined
            required
          >
            <template v-slot:append>
              <q-icon name="link" />
            </template>
          </q-input>
          <q-select
            v-model="add.category"
            v-if="add.type === 'Sekcja'"
            :dense="$q.screen.lt.sm"
            :options="categories"
            color="secondary"
            options-selected-class="text-secondary"
            label="Kategoria"
            class="custom-width"
            multiple
            stack-label
            outlined
          />
          <q-input
            v-model="add.keywords"
            v-if="add.type === 'Sekcja'"
            :dense="$q.screen.lt.sm"
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
          <div class="row justify-between">
            <q-btn
              @click="$router.push('/')"
              color="secondary"
              label="Wróć na stronę główną"
              flat
            />
            <q-btn type="submit" color="secondary" label="Wyślij" flat />
          </div>
        </q-form>
        <q-form @submit="onUpdateSubmit" v-else class="q-gutter-md">
          <q-select
            v-model="choice"
            :options="['Dodaj nową grupę', 'Zaaktualizuj istniejącą grupę']"
            :dense="$q.screen.lt.sm"
            :options-dense="$q.screen.lt.sm"
            color="secondary"
            options-selected-class="text-secondary"
            label="Co chcesz zrobić?"
            class="q-mb-md custom-width"
            stack-label
            outlined
          />
          <q-select
            v-model="update.name"
            :dense="$q.screen.lt.sm"
            :options-dense="$q.screen.lt.sm"
            @filter="filterGroups"
            :options="filtered.map(x => x.name)"
            color="secondary"
            options-selected-class="text-secondary"
            label="Nazwa grupy"
            class="custom-width"
            stack-label
            outlined
            use-input
            autocomplete
          />
          <q-select
            v-model="update.categories"
            :options="
              categories.filter(
                x =>
                  !sections
                    .filter(g => g.name === update.name)
                    .map(g => g.category)
                    .includes(x)
              )
            "
            :dense="$q.screen.lt.sm"
            :options-dense="$q.screen.lt.sm"
            color="secondary"
            options-selected-class="text-secondary"
            label="Dodaj kategorię"
            class="custom-width"
            multiple
            stack-label
            outlined
          />
          <q-input
            v-model="update.keywords"
            :dense="$q.screen.lt.sm"
            debounce="250"
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
          <div class="row justify-between">
            <q-btn
              @click="$router.push('/')"
              color="secondary"
              label="Wróć na stronę główną"
              flat
            />
            <q-btn type="submit" color="secondary" label="Wyślij" flat />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card :flat="$q.screen.lt.sm" v-else class="small-width q-pa-md">
      <h5 class="text-center q-ma-none q-mb-sm">
        Dziękujemy!
      </h5>
      <p class="text-center q-ma-none q-mb-md">
        Twoja grupa zostanie dodana/zaaktualizowana wraz z aktalizacją spisu w
        najbliższą niedzielę
      </p>
      <div class="row justify-center">
        <q-btn
          @click="$router.push('/')"
          color="secondary"
          label="Wróć na stronę główną"
          flat
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      choice: 'Dodaj nową grupę',
      filtered: [],
      add: {
        type: 'Sekcja',
        name: '',
        link: '',
        categories: [],
        keywords: ''
      },
      update: {
        name: '',
        categories: [],
        keywords: ''
      },
      wasFormSend: false
    }
  },
  computed: {
    ...mapGetters({
      sections: 'groups/sections',
      categories: 'groups/categories'
    })
  },
  mounted() {
    if (firebase.apps.length === 0) {
      const firebaseConfig = {
        apiKey: 'AIzaSyAF0NQG_JKmIjnHRzsDYxuWMjhyuF0RBeY',
        authDomain: 'spissekcji.firebaseapp.com',
        databaseURL: 'https://spissekcji.firebaseio.com',
        projectId: 'spissekcji',
        storageBucket: 'spissekcji.appspot.com',
        messagingSenderId: '752464608547',
        appId: '1:752464608547:web:7786ca37c8ae1dd0'
      }
      firebase.initializeApp(firebaseConfig)
    }

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
  },
  methods: {
    filterGroups(value, update) {
      if (value === '') {
        update(() => {
          this.filtered = this.sections
        })
        return
      }

      update(() => {
        const needle = value.toLowerCase()
        this.filtered = this.sections.filter(v =>
          v.name.toLowerCase().includes(needle)
        )
      })
    },
    onAddSubmit() {
      firebase
        .database()
        .ref(
          `/submissions/${
            this.add.type === 'Sekcja' ? 'sections' : 'taggroups'
          }`
        )
        .push({
          name: this.add.name,
          link: this.add.link,
          category: this.add.type === 'Sekcja' && this.add.categories,
          keywords: this.add.type === 'Sekcja' && this.add.keywords
        })
      this.add.type = this.add.name = this.add.link = this.add.categories = this.add.keywords =
        ''
      this.wasFormSend = true
    },
    onUpdateSubmit() {
      firebase
        .database()
        .ref(
          `/submissions/${
            this.add.type === 'Sekcja' ? 'sections' : 'taggroups'
          }`
        )
        .push({
          update: true,
          name: this.update.name,
          categories: this.update.categories,
          keywords: this.update.keywords
        })
      this.update.name = this.update.keywords = ''
      this.update.categories = []
      this.wasFormSend = true
    }
  }
}
</script>

<style>
@media (min-width: 1023px) {
  .custom-width {
    width: 30vw;
  }
}

.text-break {
  word-wrap: break-word;
}
</style>
