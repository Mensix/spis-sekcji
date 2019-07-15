<template>
  <q-input v-model="input" color="secondary" :placeholder="placeholder">
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: null
    }
  },
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
