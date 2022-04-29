<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div
      style="
        width: 500px;
        height: 410px;
        box-shadow: 0px 0px 15px -10px black;
        border-radius: 10px;
        text-align: center;
        padding: 25px;
      "
    >
      <h1 class="mt-1">KIRISH</h1>
      <div class="mt-8">
        <v-text-field outlined label="Username" v-model="login.username" />
        <v-text-field
          outlined
          v-if="login.show_password"
          label="Password"
          v-model="login.password"
          append-icon="mdi-eye-off"
          type="password"
          @click:append="login.show_password = !login.show_password"
          @keyup.enter="sendForm()"
        />
        <v-text-field
          outlined
          v-else
          label="Password"
          v-model="login.password"
          append-icon="mdi-eye"
          @click:append="login.show_password = !login.show_password"
          @keyup.enter="sendForm()"
        />
        <v-btn
          style="background: #3f87ff; color: #fff"
          block
          depressed
          height="55px"
          @click="sendForm()"
        >
          kirish
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",

  data() {
    return {
      login: {
        show_password: true,
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async sendForm() {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/admin/login/",
          {
            username: this.login.username,
            password: this.login.password,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
          }
        );
        window.localStorage.setItem(
          "access_token",
          response.data.token.access_token
        );
        await this.$router.push("/");
        await window.location.reload();
      } catch (e) {
        this.$toast.error(
          e.response?.data?.message || "Kirishda xatolik yuz berdi"
        );
      }
    },
  },
};
</script>
