export const state = () => ({
  message: '',
  updateStatus: {},
  categories: [],
  sections: []
})

export const getters = {
  message: state => state.message,
  updateStatus: state => state.updateStatus,
  categories: state => state.categories,
  sections: state => state.sections
}

export const mutations = {
  SET_MESSAGE(state, message) {
    state.message = message
  },
  SET_UPDATESTATUS(state, updateStatus) {
    state.updateStatus = updateStatus
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_SECTIONS(state, groups) {
    state.sections = groups
  }
}

export const actions = {
  SET_MESSAGE({ commit }, message) {
    commit('SET_MESSAGE', message)
  },
  SET_UPDATESTATUS({ commit }, updateStatus) {
    commit('SET_UPDATESTATUS', updateStatus)
  },
  SET_CATEGORIES({ commit }, categories) {
    commit('SET_CATEGORIES', categories)
  },
  SET_SECTIONS({ commit }, groups) {
    commit('SET_SECTIONS', groups)
  }
}
