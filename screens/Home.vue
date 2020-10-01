<template>
<nb-container>
    <nb-header />
    <nb-content padder>
      <nb-card v-for="img in ImgurData" v-bind:key="img.id" >
        <nb-card-item >
          <nb-left>
            <nb-body>
              <nb-text> {{ img.title }} </nb-text>
              <nb-text note>{{ img.account_url }}</nb-text>
            </nb-body>
          </nb-left>
        </nb-card-item> 
        <nb-card-item v-for="image in img.images" v-bind:key="image.id" cardBody>
            <image v-if="image.type.substring(0,5) =='image'" :source="{ uri: image.link }"  :style="{ width: 300, height: 300 }" />
            <image v-else :source="{ uri: image.gifv }"  :style="{ width: 300, height: 300 }" />
        </nb-card-item>
        <nb-card-item>
          <nb-left>
            <nb-button transparent  @press="addFavorite(img.images[0].id)">
              <nb-icon name="thumbs-up" active></nb-icon>
              <nb-text>{{ img.favorite_count}} Likes</nb-text>
            </nb-button>
          </nb-left>
          <nb-body>
            <nb-button transparent>
              <nb-icon name="chatbubbles" active></nb-icon>
              <nb-text>{{ img.comment_count }} Comments</nb-text>
            </nb-button>
          </nb-body>
        </nb-card-item>
      </nb-card>
    </nb-content>
  </nb-container>


    <!-- <scroll-view :content-container-style="{
        contentContainer: {
          paddingVertical: 20,
        },
      }">
      <text v-for="img in ImgurData" v-bind:key="img.id">
        <text v-for="image in img.images" v-bind:key="image.id">
          <text  v-if="image.type.substring(0,5) =='image'">{{ img.title }}</text>
          <image v-if="image.type.substring(0,5) =='image'" :style="{width: image.width/5, height: image.height/5}"
            :source="{uri: image.link }" />
            
        </text>
      </text>
    </scroll-view> -->

</template>

<script>
  import logo from "../assets/logo.png";
  import cardImage from "../assets/drawer-cover.png";
  import store from "../store/index";
  import Vue from "vue-native-core";
  import { VueNativeBase } from "native-base";
  // registering all native-base components to the global scope of the Vue
  Vue.use(VueNativeBase);

  export default {
    data() {
      return {
        imgurData: {},
        logo,
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
      async addFavorite(id){
        console.log(id)
      }
    },
    computed: {
      userData: function () {
        return store.state.UserData;
      },
      ImgurData: function () {
        let tmp = [];
        for(let i = 0; i < 20 ; i++){
          tmp.push(store.state.ImgurData[i])
        }
        return tmp;
      }

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
</style>