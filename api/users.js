/**
 * Users api module
 * @module UsersApi
 */
import { axios } from '~/api/axios';

const baseUsersApiUrl = 'https://api.github.com/users/';
const baseSearchApiUrl = 'https://api.github.com/search/';

/**
 * Function that returns all users {@see https://developer.github.com/v3/users/#get-all-users}
 * @return {array | Promise} - If the api call was successful returns an array with users,
 * if the api call fails, returns a rejected promise.
 */
export async function getAll() {
  console.log('inside getAll: ', axios);
  try {
    return await axios.$get(`${baseUsersApiUrl}?since=135`);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Function that returns users filtered
 * by name and followers range  {@see https://developer.github.com/v3/search/#search-users}
 * @param {object} params
 * @param {string} params.name
 * @param {string} params.followersRange
 */
export async function getByNameAndFollowers(params) {
  try {
    const result = await axios
      .$get(`${baseSearchApiUrl}users?q=${params.name}${params.followersRange}`);
    return result.items;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Get al user's followers. {@see https://developer.github.com/v3/users/followers/#list-followers-of-a-user}
 * @param {object} params
 * @param {string} params.url - User's followers url
 * @return {Promise<*>}
 */
export async function getFollowers(params) {
  try {
    const result = await axios
      .$get(params.url);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Get only one user by its name {@see https://developer.github.com/v3/users/#get-a-single-user}
 * @param {object} params
 * @param {string} params.name - Users name
 * @return {Promise<*>}
 */
export async function getUser(params) {
  try {
    return axios.$get(`${baseUsersApiUrl}${params.name}`);
  } catch(error) {
    console.log(error);
    return Promise.reject(error);
  }
}
