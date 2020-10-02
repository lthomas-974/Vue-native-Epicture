<template>
  <nb-card>
    <nb-card-item header>
        <nb-right>
          <nb-body>
        <nb-text>Added the {{ data.datetime }} </nb-text>
          </nb-body>
      </nb-right>
    </nb-card-item>
    <nb-card-item cardBody>
      <nb-body>
        <image
          v-if="data.type.substring(0, 5) == 'image'"
          :source="{ uri: data.link }"
          :style="{ width: 385, height: 300 }"
        />
        <image
          v-else
          :source="{ uri: data.gifv }"
          :style="{ width: 385, height: 300 }"
        />
      </nb-body>
    </nb-card-item>
    <nb-card-item footer >
      <nb-right >
        <nb-button danger button :onPress="onPressDeleteThisPicture">
          <nb-icon  name="trash" active></nb-icon>
        </nb-button>
      </nb-right>
    </nb-card-item>
  </nb-card>
</template>

<script>
import store from "../store/index";
import { Alert } from 'react-native';

export default {
  props: {
    data: {
      Type: Object,
    },
    addButton: {
      Type: Boolean,
    },
    remButton: {
      Type: Boolean,
    },
    delButton: {
      Type: Boolean,
    },
  },
  mounted() {
  },
  methods: {
    async onPressDeleteThisPicture() {
      if (Alert.alert("Confirmation",
          "Do you want to delete this picture?",
          [
            {text:"Confirm",onPress:async ()=> {
              try {

        const imgurApiCall = await fetch(
          `https://api.imgur.com/3/image/${this.data.deletehash}`,
          {
            method: "delete",
            headers: {
              authorization:
                "Bearer " + store.state.UserData.params.access_token,
            },
          }
        ).then(res=>res.json())
        if (imgurApiCall.success){
             store.dispatch("updateMyPictures");
          }

        } catch (err) {
          console.log("Error fetching data-----------", err);
        }
            }},
            {text:"Cancel"}

          ])){
      };

    },

    onPressAddToMyFavorite() {
      try {
        fetch(
          `https://api.imgur.com/3/image/${this.data.id}/favorite`,
          {
            method: "POST",
            headers: {
              authorization:
                "Bearer " + store.state.UserData.params.access_token,
            },
          }
        ).then(store.dispatch("updateMyFavorites"));
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    },
    getPic() {
      return this.data.link;
    },
  },
};
</script>
<style >
.card-item-image {
    flex: 1;
    height: 300;

  }
</style>