<template>
  <text>
    <image :style="{ width: 300, height: 300 }" :source="{ uri: getPic() }" />

    <button v-if="addButton" :on-press="onPressAddToMyFavorite" title="Add" color="#841584" />
    <button v-if="remButton" :on-press="onPressRemoveToMyFavorite" title="Remove" color="#841584" />

  </text>
</template>

<script>
import store from "../store/index";

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
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    onPressRemoveToMyFavorite() {
      alert("remove");
    },
    async onPressAddToMyFavorite() {
      try {
        //Assign the promise unresolved first then get the data using the json method.
        console.log(this.data);
        const imgurApiCall = await fetch(
          `https://api.imgur.com/3/image/${this.data.id}/favorite`,
          {
            methods: "POST",
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
      return `https://i.imgur.com/${this.data.cover}.jpeg`;
    },
  },
};
</script>