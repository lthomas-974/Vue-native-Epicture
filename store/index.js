import Vue from "vue-native-core";
import Vuex from "vuex";
import { VueNativeBase } from "native-base";
Vue.use(Vuex);
Vue.use(VueNativeBase);

const store = new Vuex.Store({
  state: {
    UserData: {},
    MyFavorites: {},
    MyPictures:{},
    ImgurData:[]
  },

  mutations: {
    setUserData(state, payload) {
      state.UserData = payload
      console.log("------------> In Store UserData")
    },
    setMyFavorites(state, payload) {
      state.MyFavorites = payload
    },
    setMyPictures(state, payload) {
      state.MyPictures = payload
    },
    setImgurData(state, payload){
      state.ImgurData = payload
    }
  },

  actions: {
    async updateHome(context){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Client-ID ffea18b10c6e973");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      await fetch(
          "https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/1?q=otter&q_type=jpg&q_size_px=small&",
          requestOptions)
        .then(response => response.json())
        .then(result => store.commit('setImgurData', result.data))
        .catch(error => console.log('error', error));
    },
    async search(context, payload){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Client-ID ffea18b10c6e973");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      await fetch(
          "https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/1?q="+ payload + "&q_type=jpg&q_size_px=small&",
          requestOptions)
        .then(response => response.json())
        .then(result => store.commit('setImgurData', result.data))
        .catch(error => console.log('error', error));
    },
    async updateMyFavorites(context) {
      try {
        const imgurApiCall = await fetch(
          `https://api.imgur.com/3/account/${store.state.UserData.params.account_username}/favorites`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + store.state.UserData.params.access_token,
            },
          }
        );
        const pictures = await imgurApiCall.json();
        context.commit("setMyFavorites", pictures.data);
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    },
    async updateMyPictures(context) {
      try {
        const imgurApiCall = await fetch(
          `https://api.imgur.com/3/account/me/images`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + store.state.UserData.params.access_token,
            },
          }
        );
        const pictures = await imgurApiCall.json();
        context.commit("setMyPictures", pictures.data);
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    }
  }

});

export default store;