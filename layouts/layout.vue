<template>
  <q-layout view="hHh lpR fff">
    <layout-header />
    <q-page-container>
      <q-banner class="q-py-md">
        <template v-slot:avatar
          ><q-icon name="info" color="secondary"
        /></template>
        <p
          v-if="updateStatus.current > 0 && updateStatus.total > 0"
          class="q-mb-xs"
        >
          Trwa aktualizacja spisu sekcji,
          <a
            @click="isUpdaterDialogShown = !isUpdaterDialogShown"
            href="#"
            class="text-secondary"
            >kliknij by zobaczyć postępy.</a
          >
        </p>
        <p class="q-mb-xs">
          W wyniku błędu w kodzie, nie działało zgłaszanie tag-grupek, wobec
          czego prosimy <b>o ponowne przesłanie próśb o dodanie grupy.</b>
        </p>
        <p class="q-ma-none">
          Jeżeli w spisie brakuje jakiejś grupy,
          <a
            @click="isFormDialogShown = !isFormDialogShown"
            href="#"
            class="text-secondary"
            >kliknij tu.</a
          >
        </p>
      </q-banner>
      <nuxt keep-alive />
    </q-page-container>
    <layout-footer />
    <q-dialog v-model="isFormDialogShown">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Formularz do zgłaszania brakujących grup
          </div>
          <q-separator class="q-mt-sm" />
          <small v-if="wasFormSend === true" class="text-green"
            >Dziękujemy! Twoja grupa zostanie dodana po aktualizacji spisu w
            najbliższą niedzielę.</small
          >
          <q-form @submit="onSubmit" class="q-gutter-xs">
            <q-select
              v-model="form.groupType"
              :options="['Sekcja', 'Tag-grupka']"
              color="secondary"
              options-selected-class="text-secondary"
              label="Typ grupy"
              options-dense
            />
            <q-input
              v-model="form.name"
              color="secondary"
              label="Nazwa grupy"
              required
            >
              <template v-slot:append>
                <q-icon name="create" />
              </template>
            </q-input>
            <q-input
              v-model="form.link"
              type="link"
              color="secondary"
              label="Link"
              required
            >
              <template v-slot:append>
                <q-icon name="link" />
              </template>
            </q-input>
            <q-input
              v-model="form.category"
              :disable="form.groupType === 'Tag-grupka'"
              color="secondary"
              label="Kategoria"
            >
              <template v-slot:append>
                <q-icon name="list" />
              </template>
            </q-input>
            <q-input
              v-model="form.keywords"
              :disable="form.groupType === 'Tag-grupka'"
              :rules="[value => validateKeywords(value)]"
              color="secondary"
              label="Słowa kluczowe"
            />
            <q-btn
              class="full-width"
              type="submit"
              color="secondary"
              label="Wyślij"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isUpdaterDialogShown">
      <q-card>
        <q-card-section>
          <div class="text-h6 q-mb-sm">
            Aktualizacja spisu sekcji - {{ todayDate }}
          </div>
          <q-linear-progress
            :value="updateStatus.current / updateStatus.total"
            color="secondary"
            size="25px"
          >
            <div class="absolute-full flex flex-center">
              <q-badge
                :label="percentageStatus"
                color="white"
                text-color="secondary"
              /></div
          ></q-linear-progress>
          <small>{{ updateStatus.current }} / {{ updateStatus.total }}</small>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import roundTo from 'round-to'
import { format } from 'date-fns'
import LayoutHeader from '~/components/layout/layout-header.vue'
import LayoutFooter from '~/components/layout/layout-footer.vue'
export default {
  components: {
    LayoutHeader,
    LayoutFooter
  },
  data() {
    return {
      updateStatus: {},
      isUpdaterDialogShown: true,
      isFormDialogShown: false,
      wasFormSend: false,
      form: {
        groupType: 'Sekcja',
        name: '',
        link: '',
        category: '',
        keywords: ''
      }
    }
  },
  computed: {
    todayDate() {
      return format(new Date(), 'dd/MM/yyyy')
    },
    percentageStatus() {
      return `${roundTo(
        this.updateStatus.current / this.updateStatus.total,
        3
      ) * 100}%`
    }
  },
  mounted() {
    fetch('https://spissekcji.firebaseio.com/update.json')
      .then(response => response.json())
      .then(output => (this.updateStatus = output))

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
  },
  methods: {
    onSubmit() {
      firebase
        .database()
        .ref(
          `/submissions/${
            this.form.groupType === 'Sekcja' ? 'sections' : 'taggroups'
          }`
        )
        .push({
          name: this.form.name,
          link: this.form.link,
          category: this.form.groupType === 'Sekcja' && this.form.category,
          keywords: this.form.groupType === 'Sekcja' && this.form.keywords
        })

      this.form.groupType = this.form.name = this.form.link = this.form.category = this.form.keywords =
        ''
      this.wasFormSend = true
    },
    validateKeywords(value) {
      if (value.length === 0) {
        return true
      } else if (
        value.length > 0 &&
        [this.form.name, this.form.link, this.form.category]
          .map(x => x.toLowerCase())
          .every(x => !x.includes(value.toLowerCase()))
      ) {
        return true
      } else {
        return 'Słowa kluczowe nie mogą zawierać nazwy grupy, jej linku lub kategorii'
      }
    }
  }
}
</script>
