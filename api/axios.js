/**
 * This module sets axios accessible for external js files
 */
let axios;

/**
 * Sets the Vue instance variable $axios to the local axios variable.
 * @param axiosInstance
 */
function setAxios(axiosInstance) {
  console.log('inside setAxios: ', axiosInstance);
  axios = axiosInstance;
}

export {
  setAxios,
  axios,
}
