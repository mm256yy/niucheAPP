<template>
  <view class="tabs">
    <view class="bar" :style="barStyle"><view class="inner"></view></view>
    <view v-for="(it, index) of tabs" :key="it" class="item" :class="{ active: active === index }" @click="onClick(index, $event)">
      <text>{{ it }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-tabs',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },

    // 选中默认index
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      barStyle: {
        transform: 'translateX(0%)'
      }
    };
  },
  methods: {
    onClick(index, $event) {
      this.$emit('onClick', index);
      if (index !== this.active) {
        this.$emit('onChange', index);
      }
    }
  },
  watch: {
    tabs: {
      handler: function(val) {
        this.barStyle.width = `${100 / val.length}%`;
      },
      immediate: true
    },
    active: {
      handler: function(val) {
        // animated
        this.barStyle.transform = `translateX(${val * 100}%)`;
      },
      immediate: true
    }
  }
};
</script>

<style lang="stylus" scoped>
.tabs
  position relative
  display flex
  align-items center
  background-color #fff
  .item
    display flex
    flex 1
    align-items center
    justify-content center
    padding 30rpx
    font-size 30rpx
    transition ease 0.3s
    &.active
      color red
      transition color ease 0.3s
.bar
  position absolute
  left 0
  bottom 0
  height 6rpx
  transition transform ease 0.3s
  display flex
  align-items center
  justify-content center
  .inner
    width 100%
    height 100%
    box-sizing border-box
    margin 0 20rpx
    border-radius 18rpx
    background-color red
</style>
