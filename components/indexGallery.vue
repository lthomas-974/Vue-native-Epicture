<template>
  <nb-card>
    <nb-card-item>
      <nb-left>
        <!-- <nb-body>
          <nb-text> {{ title }} </nb-text>
        </nb-body> -->
      </nb-left>
    </nb-card-item>
    <nb-card-item cardBody>
      <image
        v-if="data.type.substring(0, 5) == 'image'"
        :source="{ uri: data.link }"
        :style="{ width: 300, height: 300 }"
      />
      <image
        v-else
        :source="{ uri: data.gifv }"
        :style="{ width: 300, height: 300 }"
      />
    </nb-card-item>
    <nb-card-item footer >
      <nb-right >
        <nb-text button :onPress="onPressToggleToMyFavorite">Del</nb-text>

      </nb-right>
    </nb-card-item>
  </nb-card>
</template>

<script>
import store from "../store/index";
import { Alert } from "react-native";

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
  mounted() {},
  methods: {
    async onPressToggleToMyFavorite() {
      try {
        const favoriteApiCall = await fetch(
          `https://api.imgur.com/3/image/${this.data.id}/favorite`,
          {
            method: "POST",
            headers: {
              authorization:
                "Bearer " + store.state.UserData.params.access_token,
            },
          }
        ).then((res) => res.json());
        if (favoriteApiCall.success) {
          store.dispatch("updateMyFavorites");
        }
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    },

  },
};
</script>