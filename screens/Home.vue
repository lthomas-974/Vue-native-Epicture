<template>
  <view class="container">
    <text class="text-color-primary">Home</text>
    <button title="My profile" @press="goToProfileScreen"></button>
    <button title="My favorite" @press="goToFavoriteScreen"></button>
        <button title="My pictures" @press="goToMyPicturesScreen"></button>
        <button title="Upload picture" @press="goToUploadPictureScreen"></button>

    <text v-if="userData.params" class="text">
      Hello {{ userData.params.account_username }} !</text>
      <text v-else class="text">
      Hello unknown :D</text>
  </view>
</template>

<script>
import store from "../store/index";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  mounted(){


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