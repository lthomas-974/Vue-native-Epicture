<template>
  <nb-container>
    <nb-header class="header" rounded>
      <StatusBar barStyle="light-content" backgroundColor="#1bb76e" />
      <nb-item>
        <nb-text> My favorites</nb-text>
      </nb-item>
    </nb-header>

    <nb-button v-if="!isConnected" block primary :onPress="onPressGoProfileScreen">
        <nb-text>Login before</nb-text>
    </nb-button>
    <nb-spinner v-else-if="isLoading" color="red" />

    <nb-text v-else-if="myFavoritesLength == 0">No favorite</nb-text>
    <nb-content class="card-deck" v-else padder>
      <index-favorite
        class="card"
        v-for="favorite in myFavorites"
        v-bind:key="favorite.id"
        :title="favorite.title"
        :data="favorite"
        :remButton="true"
      />
    </nb-content>
  </nb-container>
</template>
<script>
import store from "../store/index";
import indexFavorite from "../components/indexFavorite";

export default {
  components: { indexFavorite },
  props: {
    navigation: {
      type: Object,
    },
  },
  mounted() {
    if (store.state.UserData.params) {
      store.dispatch("updateMyFavorites");
    } else {
      this.navigation.navigate("Profile");
    }
  },
  methods: {
    onPressGoProfileScreen(){
      this.navigation.navigate("Profile");
    },
  },
  computed: {
    isConnected: function () {
      return store.state.isConnected;
    },
    isLoading: function () {
      return store.state.isLoadingMyFavorites;
    },
    myFavorites: function () {
      return store.state.MyFavorites;
    },
    myFavoritesLength: function () {
      return store.state.MyFavorites.length;
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
.text-color-primary {
  color: blue;
  font-size: 30;
}
.text {
  color: red;
  font-size: 20;
}
.header {
  background-color: #be6318;
}

.card-deck {
  background-color: #2e3035;
}
.container {
  justify-content: center;
}
</style>