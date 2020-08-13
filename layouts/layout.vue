<template>
  <q-layout :view="$q.screen.lt.sm ? 'hHh lpR fFf' : 'hHh lpR fff'">
    <layout-header />
    <q-page-container>
      <q-banner
        v-if="
          !$nuxt.$route.path.match(/(\/status)|(\/privacy)|(\/submissions)/)
        "
        class="q-py-md"
      >
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
          Jeżeli w spisie brakuje jakiejś grupy, jakaś sekcja nie ma kategorii
          lub słów kluczowych,
          <nuxt-link to="/submissions" class="text-secondary"
            >kliknij tu.</nuxt-link
          >
        </p>
      </q-banner>
      <nuxt :keep-alive="!$nuxt.$route.path.match(/\/submissions/)" />
    </q-page-container>
    <layout-bottom-mobile v-if="$q.screen.lt.sm" />
    <layout-footer v-else />
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'
import LayoutHeader from '~/components/layout/layout-header.vue'
import LayoutFooter from '~/components/layout/layout-footer.vue'
import LayoutBottomMobile from '~/components/layout/layout-bottom-mobile'
export default {
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutBottomMobile
  },
  computed: {
    ...mapGetters({
      message: 'groups/message',
      updateStatus: 'groups/updateStatus'
    }),
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
    if (this.message === '' && Object.values(this.updateStatus).length === 0) {
      fetch('https://spissekcji.firebaseio.com/info.json')
        .then(response => response.json())
        .then(output =>
          this.$store.dispatch('groups/SET_MESSAGE', output.message)
        )
      fetch('https://spissekcji.firebaseio.com/update.json')
        .then(response => response.json())
        .then(output => this.$store.dispatch('groups/SET_UPDATESTATUS', output))
    }

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
  }
}
</script>
