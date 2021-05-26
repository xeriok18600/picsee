export const state = () => ({
  urlHistory: [],
})

export const mutations = {
  setUrlHistory(state, payload) {
    state.urlHistory.push(payload)
  },
}

export const actions = {}

export const getters = {}
