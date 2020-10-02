<template>
<nb-container>
    <nb-header class="header" rounded>
      <StatusBar barStyle="light-content" backgroundColor="#1bb76e" />
      <nb-item>
        <nb-text> Upload a picture</nb-text>
      </nb-item>
    </nb-header>
    <nb-button v-if="!isConnected" block primary :onPress="onPressGoProfileScreen">
        <nb-text>Login before</nb-text>
    </nb-button>
    <nb-spinner v-else-if="isLoading" color="green" />
    <nb-content class="card-deck" v-else padder>
      <nb-card>
        <nb-card-item>
          <nb-button v-if="isConnected && !isPictureSelected" block primary :onPress="onPressSelectFile">
              <nb-text>Select a picture</nb-text>
          </nb-button>
          <nb-text v-if="file">{{ file.name }}</nb-text>
        </nb-card-item>
        <nb-card-item>
          <nb-left>
            <nb-button v-if="isConnected && isPictureSelected" block primary :onPress="onPressUnselectFile">
                <nb-text>Unselect a picture</nb-text>
            </nb-button>
          </nb-left>
          <nb-right>
            <nb-button v-if="isConnected && isPictureSelected" block primary :onPress="onPressUploadPicture">
                <nb-text>Upload the file selected</nb-text>
            </nb-button>
          </nb-right>
        </nb-card-item>
      </nb-card>
    </nb-content>

  </nb-container>
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
        let bodyData = new FormData()
        bodyData.append("title",this.file.name)
        bodyData.append("image",pictureBase64,this.file.name)
                bodyData.append("type","base64")

        this.isLoading = true
        const uploadApiCall = await fetch(`https://api.imgur.com/3/upload`, {
          method: "POST",
          headers: {
            authorization: "Bearer " + store.state.UserData.params.access_token,
          },
          body:bodyData
        }).then((res) => res.json());
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