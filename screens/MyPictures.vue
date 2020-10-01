<template>
  <view class="container">
    <text class="text-color-primary">My pictures</text>
    <text v-if="myPicturesLength && myPicturesLength == 0" class="text-color-primary"
      >You don't have images</text
    >
    <scroll-view v-else
      :content-container-style="{
        contentContainer: {
          paddingVertical: 20,
        },
      }"
    >
      <text class="text-color-primary">{{ myPicturesLength }} pictures found</text>
      <index-picture
        class="text-container"
        v-for="picture in myPictures"
        :key="picture.id"
        :data="picture"
        :remButton="false"
        :addButton="false"
        :delButton="true"
      >
      </index-picture>

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
  mounted(){
    store.dispatch("updateMyPictures");
  },
  methods: {

  },

  computed: {

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