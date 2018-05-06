<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot></slot>
    </div>
    <div v-show="showDot" class="dots">
      <span class="dot"
            :class="{active: currentPageIndex === index}"
            v-for="(item, index) in dots"
            :key="index"
      ></span>
    </div>
  </div>
</template>

<script>
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        if (this.showDot) this._initDots()
        this._initSlider()

        if (this.autoPlay) this._play()
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slider) return
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    // 当组件中用到了计时器时，要在destroyed中进行clearTimeout，
    // 释放内存资源，这是一种好的编程习惯
    destoryed() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.slideGroup.children
        let width = 0
        let slideWidth = this.$refs.slide.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slide-item')
          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.slideGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          }
        })

        this.slider.on('scrollEnd', () => {
          this.currentPageIndex = this.slider.getCurrentPage().pageX
          if (this.autoPlay) this._play()
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slide
    min-height: 1px
    .slide-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slide-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
