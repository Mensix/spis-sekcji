export const state = () => ({
  taggroups: [],
  lastUpdateDate: null
})
export const getters = {
  taggroups: state => state.taggroups,
  lastUpdateDate: state => state.lastUpdateDate
}
export const mutations = {
  FETCH_TAGGROUPS(state, taggroups) {
    state.taggroups = taggroups
  },
  SET_DATE(state, lastUpdateDate) {
    state.lastUpdateDate = lastUpdateDate
  }
}
export const actions = {
  FETCH_TAGGROUPS(context) {
    fetch('https://api.github.com/gists/6b007ed50d2c90a1e44a9ce0c2bf328f')
      .then(response => response.json())
      .then(output => JSON.parse(output.files['taggroups.json'].content))
      .then(output => {
        context.commit('FETCH_TAGGROUPS', Array.from(output.taggroups))
        context.commit('SET_DATE', output.lastUpdateDate)
      })
  }
}
