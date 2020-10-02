<template>
  <nb-container class="header">
    <nb-header class="header" searchBar rounded>
      <StatusBar barStyle="light-content" backgroundColor="#1bb76e" />
      <nb-item>
        <nb-icon :on-press="search" active name="search" />
        <nb-input placeholder="Search, exemple : otter" v-model="searchInput" @keydown="search" />
        <nb-icon class="icon" :on-press="search" type="FontAwesome" active name="paw" />
      </nb-item>
    </nb-header>
      <nb-form class="picker">
        <nb-picker  class="picker"  mode="dropdown" placeholder="Filter" :selectedValue="selected" :onValueChange="onValueChange">
          <item label="Time" value="time" />
          <item label="Viral" value="viral" />
          <item label="Top" value="top" />
        </nb-picker>
      </nb-form>
      <nb-form class="picker" v-if="selected === 'top'">
        <nb-picker  class="picker" mode="dropdown" placeholder="Top by" :selectedValue="selectedTop" :onValueChange="onValueChangeTop">
          <item label="Day" value="day" />
          <item label="Week" value="week" />
          <item label="Month" value="month" />
          <item label="Year" value="year" />
          <item label="All" value="all" />
        </nb-picker>
      </nb-form>
    <nb-content v-if="ImgurData.length > 1" padder>
      <nb-card v-for="img in ImgurData" v-bind:key="img.id">
        <nb-card-item>
          <nb-left>
            <nb-body>
              <nb-text> {{ img.title }} </nb-text>
              <nb-text note>{{ img.account_url }}</nb-text>
            </nb-body>
          </nb-left>
        </nb-card-item>
        <nb-card-item v-for="image in img.images" v-bind:key="image.id" cardBody>
          <image v-if="image.type.substring(0,5) =='image'" :source="{ uri: image.link }"
            :style="{ width: 300, height: 300 }" />
          <image v-else :source="{ uri: image.gifv }" :style="{ width: 300, height: 300 }" />
        </nb-card-item>
        <nb-card-item>
          <nb-left>
            <nb-button transparent>
              <nb-icon class="bottomButton" name="thumbs-up" active></nb-icon>
              <nb-text class="bottomButton">{{ img.favorite_count}} Likes</nb-text>
            </nb-button>
          </nb-left>
          <nb-body>
            <nb-button transparent>
              <nb-icon class="bottomButton" name="chatbubbles" active></nb-icon>
              <nb-text class="bottomButton">{{ img.comment_count }} Comments</nb-text>
            </nb-button>
          </nb-body>
          <nb-right>
            <nb-button transparent @press="addFavorite(img.images[0].id)">
              <nb-icon class="bottomButton" name="heart" active></nb-icon>
            </nb-button>
          </nb-right>
        </nb-card-item>
      </nb-card>
    </nb-content>
  </nb-container>
</template>

<script>

  import logo from "../assets/logo.png";
  import cardImage from "../assets/drawer-cover.png";
  import store from "../store/index";
  import Vue from "vue-native-core";
  import {
    Alert
  } from 'react-native';
  import {
    StatusBar
  } from 'react-native';
  import React from "react";
  import {
    Picker,
    Icon
  } from "native-base";
  import {
    VueNativeBase
  } from "native-base";
  // registering all native-base components to the global scope of the Vue
  Vue.use(VueNativeBase);

  export default {
    components: {
      Item: Picker.Item
    },
    data() {
      return {
        selectedTop: "all",
        selected: "time",
        imgurData: {},
        logo,
        searchInput: "",
        cardImage,
        stylesObj: {
          cardItemImage: {
            resizeMode: "cover"
          }
        }
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
      async onValueChange(value) {
        this.selected = value;
        await store.dispatch("search", { search:this.searchInput, sort: this.selected, window: this.selectedTop});
      },
      async onValueChangeTop(value) {
        this.selectedTop = value;
        await store.dispatch("search", { search:this.searchInput, sort: this.selected, window: this.selectedTop});
      },
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
      async addFavorite(id) {
        try {
          fetch(
              `https://api.imgur.com/3/image/${id}/favorite`, {
                method: "POST",
                headers: {
                  authorization: "Bearer " + store.state.UserData.params.access_token,
                },
              })
            .then(store.dispatch("updateMyFavorites"))
            .then(
              Alert.alert(
                'New Message',
                'New favorite Added !',
                [{
                  text: 'OK'
                }, ], {
                  cancelable: true
                }
              ));
        } catch (err) {
          Alert.alert(
            'New Message',
            'You need to be login for add favorite picture',
            [{
              text: 'OK'
            }, ], {
              cancelable: true
            }
          )
        }
      },
      async search() {
        await store.dispatch("search", { search:this.searchInput, sort: this.selected,  window: this.selectedTop});
      }
    },
    computed: {
      userData: function () {
        return store.state.UserData;
      },
      ImgurData: function () {
        let tmp = [];
        if (store.state.ImgurData.length < 20) {
          return store.state.ImgurData
        }
        for (let i = 0; i < 20; i++) {
          tmp.push(store.state.ImgurData[i])
        }
        return tmp;
      }
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

  .card-item-image {
    flex: 1;
    height: 200;
  }

  .header {
    background-color: #2e3035;
  }

  .icon {
    color: #1bb76e;
  }

  .bottomButton {
    color: #1bb76e;
  }
  
  .picker{
    marginRight: 10px;
    marginLeft: 12px;
    background-color: #1bb76e;
    color: white;
  }
</style>