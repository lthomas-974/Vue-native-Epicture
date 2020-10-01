<template>
  <view class="container">
    <status-bar background-color="#3BFFA3" bar-style="light-content" />
    <text class="text-color-primary">Home</text>
    <text v-if="userData.params" class="text">
      Hello {{ userData.params.account_username }} !</text>
    <text v-else class="text">
      Hello unknown :D</text>
    <text v-for="img in ImgurData" v-bind:key="img" class="text-color-primary">{{ img }}</text>
  </view>
</template>

<script>
  import store from "../store/index";
  export default {
    data() {
    return {
      imgurData:{},
    };
  },
    props: {
      navigation: {
        type: Object,
      },
    },
    async mounted() {
      await store.dispatch("updateHome");
    },
    methods: {
      goToUploadPictureScreen() {
        this.navigation.navigate("UploadPicture");
      },
      goToMyPicturesScreen() {
        this.navigation.navigate("MyPictures");
      },
      goToProfileScreen() {
        this.navigation.navigate("Profile");
      },
      goToFavoriteScreen() {
        this.navigation.navigate("Favorite");
      },
    },
    computed: {
      userData: function () {
        return store.state.UserData;
      },
    },
    data() {
      return {
        message: "My Imgur",
      };
    },
  };
</script>

<style>
  .container {
    borderTopWidth: 5px;
    borderTopColor: white;
    flex: 1;
    background-color: #2e3035;
    align-items: center;
  }

  .text-color-primary {
    justify-content: center;
    color: blue;
    font-size: 30;
  }

  .text {
    color: red;
    font-size: 20;
  }
</style>