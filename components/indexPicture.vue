<template>
  <text>
    <image :style="{ width: 300, height: 300 }" :source="{ uri: getPic() }" />
    <button
      v-if="addButton"
      :on-press="onPressAddToMyFavorite"
      title="Add"
      color="#841584"
    />
    <button
      v-if="remButton"
      :on-press="onPressRemoveToMyFavorite"
      title="Remove"
      color="#841584"
    />
    <button
      v-if="delButton"
      :on-press="onPressDeleteThisPicture"
      title="Delete"
      color="#841584"
    />
  </text>
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
      if (Alert.alert("Confirmatiion",
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