export default {
  namespaced: true,

  state: function () {
    return {
      settings: {},
    }
  },
  getters: {},
  mutations: {
    SET_SETTINGS: function (state, value) {
      state.settings = value;
    },
  },
  actions: {
    async getSettings({commit}) {
      try {
        let settings = await this.$axios.$get('/settings');
        commit('SET_SETTINGS', settings)
      } catch (e) {

      }
    }
  },
}
