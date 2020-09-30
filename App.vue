<template>
  <view class="container">
    <text class="text-color-primary">{{ message }}</text>
    <button title="Login to imgur" @press="login" />
    <text class="text">{{ userData }}</text>
  </view>
</template>

<script>
  import * as AuthSession from 'expo-auth-session';
  export default {
    data() {
      return {
        message: "My Imgur",
        userData: {}
      };
    },
    methods: {
      async login() {
        const authUrl =
          'https://api.imgur.com/oauth2/authorize?client_id=ffea18b10c6e973&response_type=token&state=Epicture';
        try {
          const result = await AuthSession.startAsync({
            authUrl,
            returnUrl: "exp://127.0.0.1:19000/",
          });
          console.log(result)
          this.userData = result
        } catch (e) {
          console.log(e)
        }
      }
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