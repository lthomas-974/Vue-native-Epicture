<template>
    <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
} from "vue-native-router";
import { VueNativeBase } from "native-base";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import HomeScreen from "./screens/Home.vue";
import ProfileScreen from "./screens/Profile.vue";
import FavoriteScreen from "./screens/Favorite.vue";
import MyPicturesScreen from "./screens/MyPictures.vue";
import UploadPictureScreen from "./screens/UploadPicture.vue";

const DrawerNavigator = createDrawerNavigator(
    {
      Home: HomeScreen,
      Profile: ProfileScreen,
      Favorite: FavoriteScreen,
      MyPictures: MyPicturesScreen,
      UploadPicture: UploadPictureScreen
    },
    {
      initialRouteName: 'Home'
    }
  );

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },

);

const AppNavigator = createAppContainer(DrawerNavigator);

export default {
  components: { AppNavigator},
  data() {
    return {
      isAppReady: false
    };
  },
  created() {
    this.loadFonts();
  },
  methods: {
    async loadFonts() {
      try {
        await Font.loadAsync({
          Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
        });
      } catch (error) {
        console.log("some error occured", error);
      }
    }
  }
}
</script>
