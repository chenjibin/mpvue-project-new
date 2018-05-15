<template>
  <div class="container">
    <div class="">
      <img :src="img" @load="_imgLoadhander" v-show="false">
      <button @click="chooseImage">选择图片</button>
      <div class="canvas-wrapper">
        <canvas
          class="fs-canvas"
          v-bind:style="{ width: imgWidth + 'px', height: imgHeight + 'px'}"
          canvas-id="myCanvas"></canvas>
      </div>
      <div class="fs-input-wrapper">
        <label class="fs-input-label">图片文字</label>
        <input v-model="picText" class="fs-input" @confirm="confirmTextAdd"/>
      </div>
      <button @click="addTextToCanvasB">点击添加文字</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canvasDom: null,
      img: '',
      winWidth: wx.getSystemInfoSync().windowWidth,
      imgWidth: '100%',
      imgHeight: '200px',
      picText: ''
    }
  },
  methods: {
    confirmTextAdd(data) {
      this.addTextToCanvas(data.target.value);
    },
    addTextToCanvas(text) {
      this.canvasDom.fillText(text, 20, 20);
      this.canvasDom.draw(true);
    },
    addTextToCanvasB() {
      this.canvasDom.fillText(this.picText, 20, 20);
      this.canvasDom.draw(true);
    },
    _imgLoadhander(data) {
      let imgWidth = data.target.width;
      let imgHeight = data.target.height;
      let radio = 1;
      if (imgWidth > this.winWidth) {
        radio = this.winWidth / imgWidth;
      }
      this.imgWidth = Math.min(imgWidth, this.winWidth);
      this.imgHeight = imgHeight * radio;
      this.canvasDom.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);
      this.canvasDom.save();
      this.canvasDom.draw();
      console.log(this.imgWidth, this.imgHeight);
    },
    chooseImage() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          console.log(res);
          this.img = res.tempFilePaths[0];
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        }
      })
    }
  },
  mounted () {
    this.canvasDom = wx.createCanvasContext('myCanvas');
  }
}
</script>

<style scoped>
  .fs-canvas {
    margin-top:16rpx;
    border:1rpx solid #ddd;
  }
  .fs-input-wrapper {
    font-size: 14px;
  }
  .fs-input-label {
    display: block;
    padding: 16rpx 32rpx;
  }
  .fs-input {
    border-top: 1rpx solid #ddd;
    border-bottom: 1rpx solid #ddd;
    padding: 16rpx 32rpx;
  }
  .canvas-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
