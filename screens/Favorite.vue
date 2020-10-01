<template>
  <nb-container >
    <nb-header class="header" rounded>
      <StatusBar barStyle="light-content" backgroundColor="#1bb76e" />
      <nb-item>
        <nb-text> My favorites</nb-text>
      </nb-item>
    </nb-header>
    <nb-text v-if="myFavoritesLength == 0">No favorite</nb-text>
    <nb-content class="card-deck"  v-else padder>
      <index-gallery v-for="favorite in myFavorites" v-bind:key="favorite.id" :title="favorite.title"
                :data="favorite"
                :remButton="true"/>
    </nb-content>
  </nb-container>
</template>
<script>
import store from "../store/index";
import indexGallery from "../components/indexGallery";

export default {
  components: { indexGallery },
  props: {
    navigation: {
      type: Object,
    },
  },
  async mounted() {
    store.dispatch("updateMyFavorites");
  },
  methods: {},
  computed: {
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
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
  borderTopWidth: 5px;
  borderTopColor: white;
  background-color: #2e3035;

}

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
  background-color:#2e3035;
  borderWidth: 5px;
}
</style>