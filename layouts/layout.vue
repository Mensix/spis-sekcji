<template>
  <q-layout view="hHh lpR fff">
    <layout-header />
    <q-page-container>
      <q-banner class="q-py-md">
        <template v-slot:avatar
          ><q-icon name="info" color="secondary"
        /></template>
        <p class="q-mb-sm">
          14 czerwca o godzinie 12:00 odbędzie się testowa w pełni automatyczna
          aktualizacja spisu sekcji.
          <a
            @click="isInfoDialogShown = !isInfoDialogShown"
            href="#"
            class="text-secondary"
            >Kliknij, aby dowiedzieć się więcej.</a
          >
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
    <q-dialog v-model="isInfoDialogShown">
      <q-card>
        <q-card-section>
          <div class="text-h6">Testowa aktualizacja spisu sekcji</div>
          <q-separator class="q-mt-sm q-mb-sm" />
          <p>
            14 czerwca o godzinie 12:00 rozpocznie się testowa w pełni
            automatyczna aktualizacja spisu sekcji. Potrwa ona mniej niż
            godzinę, wobec czego dane na stronie (nazwy grup, liczba ich
            członków i reszta) powinny pojawić się przed godziną 13. Jako
            pierwsze tag-grupki (ok. 12:10), a następnie sekcje (ok 12:40).
          </p>
          <p>
            Czy to znaczy, że wcześniej siedzieliśmy od północy i wpisywaliśmy
            dane? W żadnym wypadku, poprzednia metoda, której używaliśmy ma
            swoje ograniczenia i jest dosyć powolna. Dane pojawiały się w różnym
            czasie, najczęściej w godzinach 9 - 10. Nowy sposób (a raczej
            skrypt) jest ok. 2 razy szybszy niż poprzedni i pomyślnie przeszedł
            testy na produkcji.
          </p>
          <p>
            Jeżeli wszystko się powiedzie, to zgodnie z tym jak spis działa,
            dane aktualizowane będą w niedzielę. W tą niedzielę możecie się też
            spodziewać dodania nawet 1000 kolejnych sekcji, które gdzieś tam
            cały czas powstają.
          </p>
          <p class="q-ma-none">Pozdrawiamy :)</p>
          <p>Grzegorz Perun i Daniel Nguyen</p>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isFormDialogShown">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Formularz do zgłaszania brakujących grup
          </div>
          <q-separator class="q-mt-sm" />
          <q-form @submit="onSubmit" class="q-gutter-xs">
            <q-select
              v-model="form.groupType"
              :options="['Sekcja', 'Tag-grupka']"
              color="secondary"
              options-selected-class="text-secondary"
              hint="Typ grupy"
              dense
              options-dense
            />
            <q-input
              v-model="form.name"
              color="secondary"
              hint="Nazwa grupy"
              dense
            >
              <template v-slot:append>
                <q-icon name="create" />
              </template>
            </q-input>
            <q-input
              v-model="form.link"
              prefix="https://facebook.com/groups/"
              type="link"
              color="secondary"
              hint="Link"
              dense
            >
              <template v-slot:append>
                <q-icon name="link" />
              </template>
            </q-input>
            <q-input
              v-model="form.category"
              :disable="form.groupType === 'Tag-grupka'"
              color="secondary"
              hint="Kategoria"
              dense
            >
              <template v-slot:append>
                <q-icon name="list" />
              </template>
            </q-input>
            <q-input
              v-model="form.keywords"
              :disable="form.groupType === 'Tag-grupka'"
              :rules="[val => validateKeywords(val)]"
              color="secondary"
              hint="Słowa kluczowe"
              dense
            />
            <q-btn
              class="q-mt-md full-width"
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
      isInfoDialogShown: false,
      isFormDialogShown: false,
      form: {
        groupType: '',
        name: '',
        link: '',
        category: '',
        keywords: ''
      }
    }
  },
  mounted() {
    if (!firebase.apps.length) {
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
          category:
            this.form.groupType === 'Sekcja' ? this.form.category : null,
          keywords: this.form.groupType === 'Sekcja' ? this.form.keywords : null
        })

      this.form.groupType = this.form.name = this.form.link = this.form.category = this.form.keywords =
        ''
    },
    validateKeywords(val) {
      if (val.length === 0) return true
      else if (
        val.length > 0 &&
        [this.form.name, this.form.link, this.form.category]
          .map(x => x.toLowerCase())
          .every(x => !x.includes(val.toLowerCase()))
      )
        return true
      else
        return 'Słowa kluczowe nie mogą zawierać nazwy grupy, jej linku lub kategorii'
    }
  }
}
</script>
