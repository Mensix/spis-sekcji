<template>
  <div class="q-py-md q-px-sm">
    <div class="text-body1">
      Jeżeli w spisie brakuje jakiejś grupy, wypełnij poniższy formularz.
    </div>
    <div v-if="isInvalid === true" class="text-body2 text-red">
      Przesłanie grupy nie powiodło się! Sprawdź, czy poprawnie wypełniłeś
      formularz.
    </div>
    <div v-else-if="isInvalid === false" class="text-body2 text-green">
      Twoja grupa została przesłana! Proszę czekać na jej dodanie.
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-5 col-sm-12 col-xs-12">
        <q-form @submit="onSubmit" class="q-my-md q-gutter-sm">
          <q-input
            v-model="groupName"
            color="secondary"
            placeholder="Nazwa grupy"
            dense
            ><template v-slot:append><q-icon name="info"/></template
          ></q-input>
          <q-input
            v-model="groupLink"
            color="secondary"
            placeholder="Link do grupy"
            dense
            ><template v-slot:append><q-icon name="link"/></template
          ></q-input>
          <q-select
            v-model="selectedType"
            :options="['Sekcja', 'Tag-grupka']"
            dense
            options-dense
            label="Typ grupy"
            color="secondary"
            options-selected-class="text-secondary"
          />
          <q-input
            v-model="groupCategory"
            :disable="selectedType === 'Tag-grupka'"
            color="secondary"
            placeholder="Kategoria"
            dense
            ><template v-slot:append><q-icon name="list"/></template
          ></q-input>
          <q-btn
            label="Wyślij"
            type="submit"
            color="secondary"
            style="width: 100%;"
          />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  layout: 'layout',
  data() {
    return {
      groupName: '',
      groupLink: '',
      selectedType: '',
      groupCategory: '',
      isInvalid: null
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
      if (
        this.groupName.length > 0 &&
        this.groupLink.match(
          /(?:https:\/\/)?(?:www\.)?(facebook\.com\/groups\/[\w-]*)/i
        ) &&
        this.selectedType.length > 0
      ) {
        firebase
          .database()
          .ref(
            `/submissions/${
              this.selectedType === 'Sekcja' ? 'sections' : 'taggroups'
            }`
          )
          .push({
            name: this.groupName,
            link: this.groupLink,
            category: this.groupCategory || null
          })

        this.isInvalid = false
        this.groupName = this.groupLink = this.groupCategory = this.selectedType =
          ''
      } else {
        this.isInvalid = true
      }
    }
  }
}
</script>
