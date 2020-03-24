<template>
  <q-layout view="hHh lpR fff">
    <layout-header />

    <q-page-container>
      <q-banner
        v-if="!$nuxt.$route.path.includes('submissions')"
        class="q-py-md"
      >
        <template v-slot:avatar
          ><q-icon name="info" color="secondary"
        /></template>
        <span
          >Zachęcamy do skorzystania z wyszukiwarki poniżej. Działa znacznie
          lepiej niż ta na Facebooku :)</span
        >
        <div class="q-py-xs"></div>
        <span
          >Jeżeli brakuje jakiejś grupy, przejdź
          <nuxt-link to="/submissions" class="text-secondary"
            >tu.</nuxt-link
          ></span
        >
      </q-banner>

      <nuxt keep-alive />
    </q-page-container>

    <layout-footer />
  </q-layout>
</template>

<script>
import LayoutHeader from '~/components/layout/layout-header.vue'
import LayoutFooter from '~/components/layout/layout-footer.vue'
export default {
  components: {
    LayoutHeader,
    LayoutFooter
  }
}
</script>
