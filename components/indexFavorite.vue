<template>
  <nb-card>
    <nb-card-item>
      <nb-right>
        <nb-text>Added the {{ data.datetime }} </nb-text>
      </nb-right>
    </nb-card-item>
    <nb-card-item class="card-item-image" cardBody>
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
    <nb-card-item >
      <nb-right>
        <nb-button danger button :onPress="onPressToggleToMyFavorite">
          <nb-icon  name="trash" active></nb-icon>
        </nb-button>
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
  methods: {
    async onPressToggleToMyFavorite() {
      if (
        Alert.alert(
          "Confirmation",
          "Do you want to delete this picture from your favorites?",
          [
            {
              text: "Confirm",
              onPress: async () => {
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
            { text: "Cancel" },
          ]
        )
      ) {
      }
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