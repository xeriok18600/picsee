const path = ''

export default (apiWoker) => ({
  postUrl: (payload) => apiWoker.post(`${path}`, payload),
})
