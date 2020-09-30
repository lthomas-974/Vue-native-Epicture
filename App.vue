<template>
  <view class="container">
    <text class="text-color-primary">{{ message }}</text>
    <button v-if="userConnected === false"  title="Login to imgur" @press="login" />
    <text v-if="userConnected === true"  class="text"> Hello {{ userData.params.account_username }} !</text>
    <button v-if="userConnected === true"  title="Logout" @press="logout" />
    <text class="text"> {{ userConnected }} </text>
  </view>
</template>

<script>
  import Store from './store.js';
  import * as AuthSession from 'expo-auth-session';
  export default {
    data() {
      return {
        message: "My Imgur",
        userData: {},
        userConnected: false
      };
    },
    mounted(){
      if(Store.state.UserData != null){
        this.userData = Store.state.UserData
        this.userConnected = true
      }
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
          Store.state.UserData = result;
          this.userData = result;
          this.userConnected = true;
        } catch (e) {
          console.log(e)
        }
      }, 
    async logout(){
      Store.state.UserData = {};
      this.userData = {};
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