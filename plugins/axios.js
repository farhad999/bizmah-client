export default function (app) {

  /*app.$axios.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.common = {Authorization: `Bearer ${accessToken}`};
    }
    return config;
  });*/

  app.$axios.onError(error => {
    if (error.response === undefined) {
      // Display a flash notification
      app.$toast.error('Network Error: Please refresh and try again.')
      throw error
    }
    throw error
  })

}
