<template>
  <view class="container">
    <text class="text-color-primary">Favorite</text>
<text v-if="myFavoritesLength== 0" class="text-color-primary">No favorite</text>
<text v-else class="text-color-primary">{{ myFavoritesLength }} favorites found</text>


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

            const imgurApiCall = await fetch(`https://api.imgur.com/3/account/${store.state.UserData.params.account_username}/favorites`,{
              methods:"GET",
              headers:{
                authorization: "Bearer "+store.state.UserData.params.access_token
              }
            });
            const pictures = await imgurApiCall.json();
            console.log(pictures)
            store.commit('setMyFavorites', pictures.data)

        } catch(err) {
            console.log("Error fetching data-----------", err);
        }

  },
  methods: {

  },
  computed: {
    userData: function () {
      return store.state.UserData;
    },
    myFavorites: function(){
      return store.state.MyFavorites;
    },
    myFavoritesLength: function(){
      return store.state.MyFavorites.length;
    }
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