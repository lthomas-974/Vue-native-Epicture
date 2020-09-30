<template>
  <view class="container">
    <button
      v-bind:onPress="handleBtnClickCount"
      :title="btnTitle" 
    />
    <text
      class="text-container"
    >
      {{btnClickCount}}
    </text>
  </view>
</template>

<script>
import Store from './store';
export default {
  data: function() {
    return {
      btnTitle: "Click Me",
      btnClickCount: Store.state.count
    };
  },
  methods: {
    handleBtnClickCount: function() {
      Store.dispatch('increment');
    }
  }
};
</script>