export const state = () => ({
  categories: null,
  selectedCategories: null
})

export const getters = {
  categories: state => state.categories,
  selectedCategories: state => state.selectedCategories
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_SELECTEDCATEGORIES(state, selectedCategories) {
    state.selectedCategories = selectedCategories
  }
}

export const actions = {
  SET_CATEGORIES({ commit }, categories) {
    commit('SET_CATEGORIES', categories)
  },
  SET_SELECTEDCATEGORIES({ commit }, selectedCategories) {
    commit('SET_SELECTEDCATEGORIES', selectedCategories)
  }
}
