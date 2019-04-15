<template>
  <div>
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
        @keyup="getUsersByNameAndFollowers"
      ></v-text-field>
    </v-toolbar>
    <div>
      <v-list two-line>
        <template v-for="(user, index) in users">
          <v-list-tile
            :key="user.login"
            avatar
          >
            <v-list-tile-avatar>
              <img :src="user.avatar_url">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="user.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="user.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      name: '',
      title: 'RocketLabs Exam'
    };
  },
  methods: {
    /**
     * Function that returns users that match criteria
     * @return {Promise<any>}
     */
    async getUsersByNameAndFollowers() {
      const result = await this.$axios
        .$get(`https://api.github.com/search/users?q=${this.name}`);

      this.users = result.items;
      console.log('see result: ', result);
    },
  },
}
</script>
