export default {
  namespaced: true,

  state: function () {
    return {
      settings: {},
      homeSlides: [],
    }
  },
  getters: {},
  mutations: {
    SET_SETTINGS: function (state, value) {
      state.settings = value;
    },
    SET_HOME_SLIDES: function (state, value) {
      state.homeSlides = value;
    }
  },
  actions: {
    async getSettings({commit}) {
      try {
        let settings = await this.$axios.$get('/settings');
        commit('SET_SETTINGS', settings)
      } catch (e) {

      }
    },
    async getHomeSlides({commit}) {
      try {
        let homeSlides = await this.$axios.$get('/home-slides');
        commit('SET_HOME_SLIDES', homeSlides)
      } catch (e) {
        console.log(e)
      }
    }
  },
}
