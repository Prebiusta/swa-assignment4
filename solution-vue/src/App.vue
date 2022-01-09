<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-row align="center" class="text-center" justify="center" no-gutters>
        <v-col cols="12">
          <v-row align="center" justify="center" no-gutters>
            <router-link class="mx-2" to="/">Weather</router-link>
            <router-link class="mx-2" to="/submit">Add Data</router-link>
            <router-link class="mx-2" to="/warning">Warnings</router-link>
            <router-link class="mx-2" to="/warning-pooling">Warning Pooling</router-link>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import axios from "axios";

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style scoped>
a {
  color: white !important;
  text-decoration: none;
}

a:hover {
  color: aqua !important;
}

.router-link-exact-active {
  color: aqua !important;
}
</style>
