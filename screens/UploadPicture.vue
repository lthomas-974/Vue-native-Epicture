<template>
  <view class="container">
    <text class="text-color-primary">Upload picture</text>
    <text-input
      type="file"
      :style="{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }"
      v-model="file"
    />
  </view>
</template>

<script>
import store from "../store/index";
export default {
  props: {
    navigation: {
      type: Object,
    },
    file: {
      type: Object,
    },
  },
  mounted(){


  },
  methods: {
    async uploadPicture(){
      let bodyData = new FormData()
      bodyData.append(file,this.file)

      console.log(body)
      try {
        const uploadApiCall = await fetch(`https://api.imgur.com/3/upload`,
          {
            method: "POST",
            headers: {
              authorization:
                "Bearer " + store.state.UserData.params.access_token,
            },
            body:bodyData
          }
        ).then(res=>res.json())
        if (uploadApiCall.success){
          store.dispatch("updateMyPictures")
          }

      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    }

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