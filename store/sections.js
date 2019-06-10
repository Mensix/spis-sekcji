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
    fetch('https://api.github.com/gists/7269150e817feed9132bdf9597a9b071')
      .then(response => response.json())
      .then(output => JSON.parse(output.files['sections.json'].content))
      .then(output => {
        context.commit('FETCH_SECTIONS', Array.from(output.sections))
        context.commit('SET_DATE', output.lastUpdateDate)
      })
  }
}
