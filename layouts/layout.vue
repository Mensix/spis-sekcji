<template>
  <q-layout view="hHh lpR fff">
    <layout-header />
    <q-page-container>
      <q-banner class="q-py-md">
        <template v-slot:avatar
          ><q-icon name="info" color="secondary"
        /></template>
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
          link: `https://facebook.com/groups/${this.form.link}`,
          category:
            this.form.groupType === 'Sekcja' ? this.form.category : undefined,
          keywords:
            this.form.groupType === 'Sekcja' ? this.form.keywords : undefined
        })

      this.form.groupType = this.form.name = this.form.link = this.form.category = this.form.keywords =
        ''
      this.wasFormSend = true
    },
    validateKeywords(value) {
      if (value.length === 0) return true
      else if (
        value.length > 0 &&
        [this.form.name, this.form.link, this.form.category]
          .map(x => x.toLowerCase())
          .every(x => !x.includes(value.toLowerCase()))
      )
        return true
      else
        return 'Słowa kluczowe nie mogą zawierać nazwy grupy, jej linku lub kategorii'
    }
  }
}
</script>
