<template>
  <view class="container">
    <text class="text-color-primary">Upload picture</text>


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
  mounted(){


  },
  methods: {

  },
  computed: {
    userData: function () {
      return store.state.UserData;
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