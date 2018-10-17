<template>
  <div id="transfer-animation">
  <!-- <div class="header"></div> -->

  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: browser.isMobile ? 'slide-left' : ''
      }
    },
    beforeRouteUpdate (to, from, next) {
      if(browser.isMobile){
        let isBack = this.$router.isBack
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      }
      next()
    }
  }

  let browser={

    isMobile:function(){

        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/IPHONE os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        //是否为移动终端
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    }()
}
</script>

<style scoped>
  .child-view {
    position: absolute;
    top:0;
    left: 0;
    transition: .35s cubic-bezier(.55, 0, .1, 1);
  }
  /* .slide-left-enter-active,.slide-left-leave-active,.slide-right-enter-active,.slide-right-leave-active{
    transition: .35s cubic-bezier(.55,0,.1,1);
  } */
  .slide-left-enter {
    opacity: 0;
    -webkit-transform: translate(200%);
    transform: translate(200%);
  }
  .slide-right-enter{
    opacity: 0;
    -webkit-transform: translate(-200%);
    transform: translate(-200%);
  }
</style>
