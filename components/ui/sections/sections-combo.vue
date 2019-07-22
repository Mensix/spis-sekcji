<template>
  <q-select
    v-model="selectedCategories"
    color="secondary"
    multiple
    label="Pokaż kategorie"
    options-selected-class="text-secondary"
    :options="categories"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      categories: 'categories/categories'
    }),
    selectedCategories: {
      get() {
        return this.$store.state.categories.selectedCategories
      },
      set(value) {
        this.$store.dispatch('categories/SET_SELECTEDCATEGORIES', value)
      }
    }
  }
}
</script>
