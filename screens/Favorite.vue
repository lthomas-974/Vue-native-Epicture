<template>
  <view class="container">
    <text class="text-color-primary">Favorite</text>

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
  async mounted(){
    try {
            //Assign the promise unresolved first then get the data using the json method.
            const imgurApiCall = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const picture = await imgurApiCall.json();

        } catch(err) {
            console.log("Error fetching data-----------", err);
        }

  },
  methods: {
    goToHomeScreen() {
      this.navigation.navigate("Home");
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