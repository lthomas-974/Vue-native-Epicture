<template>
  <text>
    <text  class="text-container"> {{ title}}</text>
        <!-- <text  class="text-c/ontainer"> {{ data}}</text> -->

    <image :style="{ width: 300, height: 300 }" :source="{ uri: getPic() }" />

    <button
      v-if="remButton"
      :on-press="onPressToggleToMyFavorite"
      title="Remove"
      color="#841584"
    />

  </text>
</template>

<script>
import store from "../store/index";
import { Alert } from 'react-native';

export default {
  props: {
    title: {
      Type: Object,
    },
    data: {
      Type: Object,
    },
    remButton: {
      Type: Boolean,
    },

  },
  mounted() {
  },
  methods: {
    async onPressToggleToMyFavorite() {

      try {
        const favoriteApiCall = await fetch(`https://api.imgur.com/3/image/${this.data.id}/favorite`,
          {
            method: "POST",
            headers: {
              authorization:
                "Bearer " + store.state.UserData.params.access_token,
            },
          }
        ).then(res=>res.json())
        if (favoriteApiCall.success){
          store.dispatch("updateMyFavorites")
          }

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