<template>
  <view class="container">
    <text class="text-color-primary">Your Favorites</text>
    <text v-if="myFavoritesLength == 0" class="text-color-primary"
      >No favorite</text
    >
    <scroll-view v-else
      :content-container-style="{
        contentContainer: {
          paddingVertical: 20,
        },
      }"
    >
      <text class="text-color-primary">{{ myFavoritesLength }} favorites found</text>
      <index-gallery
        class="text-container"
        v-for="picture in myFavorites"
        :key="picture.id"
        :title="picture.title"
        :data="picture"
        :remButton="true"

      />

    </scroll-view>
  </view>
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
  methods: {
  },
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