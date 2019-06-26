export const state = () => ({
  sections: null,
  lastUpdateDate: null
})

export const getters = {
  sections: state => state.sections,
  lastUpdateDate: state => state.lastUpdateDate
}

export const mutations = {
  FETCH_SECTIONS(state, sections) {
    state.sections = sections
  },
  SET_DATE(state, lastUpdateDate) {
    state.lastUpdateDate = lastUpdateDate
  }
}

export const actions = {
  FETCH_SECTIONS(context) {
    fetch('https://api.github.com/gists/2c9b9e0c06b6efa6e0f78584ec37b5fb')
      .then(response => response.json())
      .then(output => JSON.parse(output.files['sections.json'].content))
      .then(output => {
        context.commit('FETCH_SECTIONS', Array.from(output.sections))
        context.commit('SET_DATE', output.lastUpdateDate)
      })
  }
}
