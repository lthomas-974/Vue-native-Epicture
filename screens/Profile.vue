<template>
  <view class="container">
    <text class="text-color-primary">{{ message }}</text>
    <button v-if="!userData.params" title="Login to imgur" @press="login" />
    <text v-if="userData.params" class="text">
      {{ userData.params.account_username }}, you're connected !</text
    >
    <button v-if="userData.params" title="Logout" @press="logout" />

  </view>
</template>

<script>
import store from "../store/index";
import * as AuthSession from "expo-auth-session";
export default {
  data() {
    return {
      message: "My Imgur",

    };
  },
  props: {
    navigation: {
      type: Object
    }
  },
  mounted() {},
  computed: {
    userData: function () {
      return store.state.UserData;
    },
  },
  watch: {},
  methods: {

    async login() {
      const authUrl =
        "https://api.imgur.com/oauth2/authorize?client_id=ffea18b10c6e973&response_type=token&state=Epicture";
      try {
        const result = await AuthSession.startAsync({
          authUrl,
          returnUrl: "exp://127.0.0.1:19000/",
        });
        store.commit("setUserData", result);
      } catch (e) {
        console.log(e);
      }
    },
    async logout() {
      store.commit("resetAll")

    },
  },
};
</script>

<style>
.container {
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
}

.text-color-primary {
  color: blue;
  font-size: 30;
}
.text {
  color: red;
  font-size: 20;
}
</style>