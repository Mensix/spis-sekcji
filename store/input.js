export const state = () => ({
  input: null
})

export const getters = {
  input: state => state.input
}

export const mutations = {
  SET_INPUT(state, input) {
    state.input = input
  }
}

export const actions = {
  SET_INPUT({ commit }, input) {
    commit('SET_INPUT', input)
  }
}
