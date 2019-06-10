<template>
  <q-input
    v-model="input"
    color="secondary"
    placeholder="Wyszukiwarka sekcji"
  />
</template>

<script>
export default {
  computed: {
    input: {
      get() {
        return this.$store.state.input.input
      },
      set(value) {
        this.$store.dispatch('input/SET_INPUT', value)
      }
    }
  }
}
</script>
