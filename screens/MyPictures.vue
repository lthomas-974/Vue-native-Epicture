<template>
  <nb-container >
    <nb-header class="header" rounded>
      <StatusBar barStyle="light-content" backgroundColor="#1bb76e" />
      <nb-item >
        <nb-text> My pictures</nb-text>
      </nb-item>
    </nb-header>
            <nb-spinner v-if="isLoading" color="green" />
    <nb-text v-else-if="myPicturesLength == 0">No picture</nb-text>
    <nb-content class="card-deck"  v-else padder>
      <index-picture class="card" v-for="picture in myPictures" v-bind:key="picture.id"
                :data="picture"
                :delButton="true"/>
    </nb-content>
  </nb-container>

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
  mounted(){
    if (store.state.UserData.params){
    store.dispatch("updateMyPictures");

    } else {

      this.navigation.navigate("Profile");
    }
  },
  methods: {

  },

  computed: {
    isLoading: function () {
      return store.state.isLoadingMyPictures;
    },
    userData: function () {
      return store.state.UserData;
    },
    myPictures: function () {
      return store.state.MyPictures;
    },
    myPicturesLength: function () {
      return store.state.MyPictures.length;
    },
  },
};
</script>

<style>
.container {

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
.header {
  background-color: #1bb76e;
}

.card-deck {
  background-color:#2e3035;
}
</style>