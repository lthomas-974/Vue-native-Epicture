<template>
  <view class="container">
    <text class="text-color-primary">Upload picture</text>
    <nb-button v-if="!isConnected" block primary :onPress="onPressGoProfileScreen">
            <nb-text>Login before</nb-text>
        </nb-button>
    <button
      v-if="isConnected && !isPictureSelected"
      :on-press="onPressSelectFile"
      title="Select"
      color="#841584"
      accessibility-label="Learn more about this purple button"
    />
    <text v-if="file"> {{ file.name }}</text>
    <button
      v-if="isPictureSelected"
      :on-press="onPressUnselectFile"
      title="Unselect"
      color="#841584"
      accessibility-label="Learn more about this purple button"
    />

    <button
      v-if="isConnected && isPictureSelected"
      :on-press="onPressUploadPicture"
      title="Upload"
      color="#841584"
      accessibility-label="Learn more about this purple button"
    />
  </view>
</template>

<script>
import store from "../store/index";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system"

export default {
  props: {
    navigation: {
      type: Object,
    },
    file: {
      type: Object,
    },
  },
  mounted() {},
  methods: {
    onPressGoProfileScreen(){
      this.navigation.navigate("Profile");
    },
    async onPressSelectFile() {
      this.file = await DocumentPicker.getDocumentAsync({});
      this.isPictureSelected = true;

    },
    async onPressUnselectFile() {
      this.file = '';
      this.isPictureSelected = false;
    },

    async onPressUploadPicture() {



      try {
        const pictureBase64 = await FileSystem.readAsStringAsync(this.file.uri,{ encoding: 'base64'  });
        let body = new FormData()
        body.append("title",this.file.name)
        body.append("image",pictureBase64,this.file.name)
        console.log(body)
        this.isLoading = true
        const uploadApiCall = await fetch(`https://api.imgur.com/3/upload`, {
          method: "POST",
          headers: {
            authorization: "Bearer " + store.state.UserData.params.access_token,
            "content-type":"multipart/form-data; boundary=epicture",
          },
          body:body
        }).then((res) => res.json());
        console.log(uploadApiCall)

        if (uploadApiCall.success) {
          alert('success')
          this.isLoading=false
          this.onPressUnselectFile()
          store.dispatch("updateMyPictures");
        } else {
          this.isLoading=false
          this.onPressUnselectFile()
          alert('Something wrong. Try again later')
        }

      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    },
  },
  computed: {
    isConnected: function () {
      return store.state.isConnected;
    },
    userData: function () {
      return store.state.UserData;
    },
  },
  data() {
    return {
      isPictureSelected: false,
      isLoading:false
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