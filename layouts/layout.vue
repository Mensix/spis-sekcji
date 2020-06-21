<template>
  <q-layout view="hHh lpR fff">
    <layout-header />
    <q-page-container>
      <q-banner v-if="!$nuxt.$route.path.match(/\/status/)" class="q-py-md">
        <template v-slot:avatar
          ><q-icon name="info" color="secondary"
        /></template>
        <p
          v-if="!isNotInProgress && Object.keys(updateStatus).length > 0"
          class="q-mb-xs"
        >
          Trwa aktualizacja spisu sekcji,
          <nuxt-link to="/status" class="text-secondary"
            >kliknij by zobaczyć postępy.</nuxt-link
          >
        </p>
        <p v-if="message.length > 0" v-html="message" class="q-mb-xs"></p>
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
      <nuxt :keep-alive="!$nuxt.$route.path.match(/\/status/)" />
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
              class="full-width q-mb-md"
              type="submit"
              color="secondary"
              label="Wyślij"
            />
          </q-form>
          <q-separator />
          <small
            >Prosimy o niewysyłanie grup tajnych, ponieważ skrypt do
            aktualizacji ich nie wykrywa.</small
          >
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import LayoutHeader from '~/components/layout/layout-header.vue'
import LayoutFooter from '~/components/layout/layout-footer.vue'
export default {
  components: {
    LayoutHeader,
    LayoutFooter
  },
  data() {
    return {
      message: '',
      updateStatus: {},
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
    isNotInProgress() {
      return (
        Object.values(this.updateStatus).length > 0 &&
        this.updateStatus.sections.current === 0 &&
        this.updateStatus.sections.total === 0 &&
        this.updateStatus.taggroups.current === 0 &&
        this.updateStatus.taggroups.total === 0
      )
    }
  },
  mounted() {
    fetch('https://spissekcji.firebaseio.com/info.json')
      .then(response => response.json())
      .then(output => (this.message = output.message))
    fetch('https://spissekcji.firebaseio.com/update.json')
      .then(response => response.json())
      .then(output => {
        this.updateStatus = output
      })
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
