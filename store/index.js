import Vue from "vue-native-core";
import Vuex from "vuex";
import { VueNativeBase } from "native-base";
import ENV from "../env.config"
Vue.use(Vuex);
Vue.use(VueNativeBase);

const store = new Vuex.Store({
  state: {
    UserData: {},
    MyFavorites: {},
    MyPictures:{},
    ImgurData:[],
    isConnected:false,
    isLoadingMyPictures:true,
    isLoadingMyFavorites:true,
    isLoadingHome:true


  },

  mutations: {
    resetAll(state){
      state.isConnected=false
      state.UserData={};

      state.MyFavorites={}
      state.MyPictures={}

      state.isLoadingMyPictures=true,
      state.isLoadingMyFavorites=true,
      state.isLoadingHome=true

    },
    setUserData(state, payload) {
      state.UserData = payload
      state.isConnected=true
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
      myHeaders.append("Authorization", "Client-ID " + ENV.CLIENT_ID);
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
      myHeaders.append("Authorization", "Client-ID " + ENV.CLIENT_ID);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      await fetch(
          "https://api.imgur.com/3/gallery/search/"+payload.sort+"/"+ payload.window +"/0?q="+ payload.search + "&q_type=jpg&q_size_px=small&q_any",
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
        context.state.isLoadingMyFavorites=false;
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
        context.state.isLoadingMyPictures=false;

        context.commit("setMyPictures", pictures.data);
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    }
  }

});

export default store;