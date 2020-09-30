<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import HomeScreen from "./screens/Home.vue";
import ProfileScreen from "./screens/Profile.vue";
import FavoriteScreen from "./screens/Favorite.vue";
import MyPicturesScreen from "./screens/MyPictures.vue";
import UploadPictureScreen from "./screens/UploadPicture.vue";


const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Favorite: FavoriteScreen,
    MyPictures: MyPicturesScreen,
    UploadPicture: UploadPictureScreen


  },
  {
    initialRouteName: 'Home',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>
