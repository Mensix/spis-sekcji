export const state = () => ({
  categories: [],
  sections: []
})

export const getters = {
  categories: state => state.categories,
  sections: state => state.sections
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_SECTIONS(state, groups) {
    state.sections = groups
  }
}

export const actions = {
  SET_CATEGORIES({ commit }, categories) {
    commit('SET_CATEGORIES', categories)
  },
  SET_SECTIONS({ commit }, groups) {
    commit('SET_SECTIONS', groups)
  }
}
