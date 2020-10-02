<template>
  <view class="container">
    <text class="text-color-primary">Upload picture</text>

    <button
      v-if="!isPictureSelected"
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
      v-if="isPictureSelected"
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
    async onPressSelectFile() {
      this.file = await DocumentPicker.getDocumentAsync({});
      this.isPictureSelected = true;

    },
    async onPressUnselectFile() {
      this.file = '';
      this.isPictureSelected = false;
    },

    async onPressUploadPicture() {


      let bodyData = new FormData();
      bodyData.append('image', this.file);
      bodyData.append('title', this.file.name);
      bodyData.append('Authorization', 'Client-ID '+store.state.UserData.params.account_id);
      console.log(bodyData)


      try {
        this.isLoading = true
        const uploadApiCall = await fetch(`https://api.imgur.com/3/upload`, {
          method: "POST",
          headers: {
            authorization: "Bearer " + store.state.UserData.params.access_token,
            "content-type":'multipart/form-data'
          },
          body: bodyData,
        }).then((res) => res.json());
        if (uploadApiCall.success) {
          alert('success')
          this.isLoading=false
          this.onPressUnselectFile()
          store.dispatch("updateMyPictures");
        }
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    },
  },
  computed: {
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