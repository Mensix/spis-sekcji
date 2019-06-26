export const state = () => ({
  categories: [
    'Filmy',
    'Gry',
    'Historia',
    'Hobby',
    'Humor',
    'Jedzenie',
    'Kraje świata',
    'Muzyka',
    'Nauka',
    'Negatywne',
    'Polityka',
    'Prawo',
    'Przyroda',
    'Pytania i dyskusje',
    'Shitpost',
    'Spierdolenie',
    'Sport',
    'Sztuka',
    'Technologie',
    'Wsparcie',
    'Wygląd i moda',
    'Zwiedzanie'
  ],
  selectedCategories: null
})

export const getters = {
  categories: state => state.categories,
  selectedCategories: state => state.selectedCategories
}

export const mutations = {
  SET_CATEGORIES(state, selectedCategories) {
    state.selectedCategories = selectedCategories
  }
}

export const actions = {
  SET_CATEGORIES({ commit }, selectedCategories) {
    commit('SET_CATEGORIES', selectedCategories)
  }
}
