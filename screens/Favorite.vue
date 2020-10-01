<template>
  <view class="container">
    <text class="text-color-primary">Your Favorite</text>
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
      <index-picture
        class="text-container"
        v-for="picture in myFavorites"
        :key="picture.id"
        :data="picture"
        :remButton="true"
        :addButton="false"
      />

    </scroll-view>
  </view>
</template>

<script>
import store from "../store/index";
import indexPicture from "../components/indexPicture";

export default {
  components: { indexPicture },
  props: {
    navigation: {
      type: Object,
    },
  },
  async mounted() {
    store.dispatch("updateMyFavorites");
  },
  methods: {
    onPressRemoveToMyFavorite() {
      alert("remove");
    },
    async onPressAddToMyFavorite(imageHash) {
      console.log(imageHash)
      try {
        //Assign the promise unresolved first then get the data using the json method.

        const imgurApiCall = await fetch(
          `https://api.imgur.com/3/image/${imageHash}/favorite`,
          {
            methods: "POST",
            headers: {
              authorization:
                "Bearer " + store.state.UserData.params.access_token,
            },
          }
        ).then(store.dispatch("updateMyFavorites"));
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    },
    getPic(picture) {
      return `https://i.imgur.com/${picture.cover}.jpeg`;
    },
  },
  computed: {
    userData: function () {
      return store.state.UserData;
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