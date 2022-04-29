<template>
  <v-app>
    <v-app-bar
      v-if="token && client_secret"
      app
      color="primary"
      dark
      class="elevation-0"
    >
      <div @click="goHomePage()">
        <h1 style="cursor: pointer; -webkit-user-select: none">
          Admin-Dashboard
        </h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="showDialog()"
        text
        icon
        style="background: #fff; color: #3f87ff"
        class="mx-3"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn @click="logOut()" text icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view class="pa-3" />
    </v-main>

    <add-or-edit-dialog />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import addOrEditDialog from "./components/add-or-edit-dialog";
export default {
  name: "App",
  components: { addOrEditDialog },

  computed: {
    ...mapGetters({ data: "login/data" }),
  },
  created() {
    this.goPage();
  },
  data() {
    return {
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      token: window.localStorage.getItem("access_token"),
    };
  },
  methods: {
    goHomePage() {
      let page_route = this.$route.path;
      if (page_route !== "/") {
        this.$router.push("/");
      }
    },
    showDialog() {
      this.$store.dispatch("addDialog/showDialog");
    },
    async logOut() {
      await window.localStorage.removeItem("access_token");
      await window.location.reload();
      this.$router.push("login");
    },
    goPage() {
      let token = window.localStorage.getItem("access_token");

      if (!token || !process.env.VUE_APP_CLIENT_SECRET) {
        this.$router.push("/login");
      }
    },
  },
};
</script>
