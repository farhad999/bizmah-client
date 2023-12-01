export default function (app) {

  app.$axios.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.common = {Authorization: `Bearer ${accessToken}`};
    }
    return config;
  });
}
