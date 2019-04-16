/**
 * This plugin sets the Vue instance variable $axios to the api axios variable.
 */
import { setAxios } from '~/api/axios.js';

export default ({ app }) => {
  // app.$axios.defaults.headers.common['User-Agent'] = 'request';
  setAxios(app.$axios);
}
