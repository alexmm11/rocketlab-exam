<template>
  <v-layout>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-text-field
        v-model="name"
        hide-details
        prepend-icon="search"
        placeholder="Name"
        single-line
        @keyup.enter="getUsersByNameAndFollowers"
      ></v-text-field>
    </v-toolbar>
    <v-layout column style="width: 100%">
      <div v-if="users.length === 0">
        <h2>Welcome!</h2>
        <p>Please use the search bar to get data of <strong>GitHub</strong> users.</p>
      </div>
      <div v-if="users.length > 0">
        <v-layout
          align-center
          wrap
        >
          <strong>Filters: </strong>
          <v-btn @click="clear">Clear</v-btn>
          <v-btn-toggle
            v-model="filterSelected"
            class="filters"
            @change="getUsersByNameAndFollowers"
          >
            <v-btn flat :value="1">
              Less than 10 followers
            </v-btn>
            <v-btn flat :value="2">
              followers between 10 and 100
            </v-btn>
            <v-btn flat :value="3">
              More than 100 followers
            </v-btn>
          </v-btn-toggle>
        </v-layout>
        <div class="users-list">
          <v-list three-line>
            <template v-for="user in users">
              <v-list-tile
                :key="user.id"
              >
                <v-list-tile-avatar>
                  <img :src="user.avatar_url">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{user.name}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.followers}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{user.following}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </div>
      </div>
    </v-layout>
  </v-layout>
</template>

<script>
import {
  getAll,
  getByNameAndFollowers,
  getUser,
} from '~/api/users';

export default {
  data() {
    return {
      users: [],
      name: '',
      filterSelected: 0,
      title: 'RocketLabs Exam'
    };
  },
  methods: {
    /**
     * Function that returns users that match criteria
     * @param {number=} rangeId - The followers range id. 1 for les than 10, 2 for between 10 and 100
     * , and 3 for more thn 100.
     * @return
     */
    async getUsersByNameAndFollowers(rangeId) {
      if (this.name) {
        let range;
        switch (rangeId) {
          case 1:
            range = '+followers:%3C10';
            break;
          case 2:
            range = '+followers:10..100';
            break;
          case 3:
            range = '+followers:%3E100';
            break;
          default:
            range = '';
            break;
        }
        const promisesArray = [];
        const usersTemp = await getByNameAndFollowers({
          name: this.name,
          followersRange: range,
        });
        for (let i = 0; i < usersTemp.length; i++) {
          promisesArray.push(getUser({
            name: usersTemp[i]['login'],
          }));
        }
        Promise
          .all(promisesArray)
          .then((users) => {
            console.log('inside promise.all users: ', users);
            this.users = users;
          }, (err) => {
            console.log('Promise.all error: ', err);
          });
      } else {
        this.users = [];
      }
    },
    clear() {
      this.users = [];
      this.name = '';
      this.filterSelected = 0;
    }
  },
  async created() {
    // Maybe when the view is created can we start showing an all users list
    /*try {
      this.users = await getAllUsers();
    } catch(e) {
      console.log(e);
    }*/
  }
}
</script>

<style scoped>
.filters {
  margin: 0 1rem;
}
.users-list {
  margin-top: 1rem;
}
</style>
