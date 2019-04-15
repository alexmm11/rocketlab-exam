/**
 * Users api module
 * @module UsersApi
 */
// import { $get } from '@nuxtjs/axios';

/**
 * Function that returns all users
 */
export async function getAllUsers() {
  console.log($axios);
  // const ip = await $get('https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000')
}

/**
 * Function that returns users filtered by name and followers range
 * @param {object} params
 * @param {string} params.name
 * @param {string} params.followersRange
 */
export function getUsersByNameAndFollowers() {

}
