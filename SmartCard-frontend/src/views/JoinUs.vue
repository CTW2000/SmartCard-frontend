<template>
  <div class="w-screen min-h-screen flex justify-center bg-white overflow-y-auto">
    <div class="relative" :style="outerStyle">
      <div class="relative origin-top-left rounded-[31px] overflow-hidden" :style="canvasBaseStyle">
        <div class="w-[1920px] h-[1080px] relative bg-white rounded-[31px] overflow-hidden">
          <div class="w-[922px] h-[1080px] left-0 top-0 absolute bg-zinc-300"></div>
          <img class="w-[934px] h-[1244.01px] left-[-12px] top-[-24.56px] absolute object-cover" :src="loginImage" />
          <div class="w-24 h-6 left-[64px] top-[26px] absolute bg-neutral-700 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(221,221,221,0.25)]"></div>

          <!-- Headings -->
          <div class="left-[1180px] top-[183px] absolute justify-start text-neutral-600 text-6xl font-normal font-['Alibaba_PuHuiTi']">欢迎您加入我们</div>
          <div class="left-[1190px] top-[255px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">您好！欢迎加入我们</div>

          <!-- Labels -->
          <div class="left-[1216px] top-[311px] absolute justify-start text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">品牌方</div>
          <div class="left-[1216px] top-[423px] absolute justify-start text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">大区</div>
          <div class="left-[1388px] top-[421px] absolute justify-start text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">门店</div>
          <div class="left-[1216px] top-[535px] absolute justify-start text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">ID号码</div>
          <div class="left-[1216px] top-[645px] absolute justify-start text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">手机号</div>

          <!-- Bullet accents -->
          <img class="w-2.5 h-2.5 left-[1198px] top-[317px] absolute" :src="starBlue" />
          <img class="w-2.5 h-2.5 left-[1198px] top-[429px] absolute" :src="starBlue" />
          <img class="w-2.5 h-2.5 left-[1370px] top-[427px] absolute" :src="starBlue" />
          <img class="w-2.5 h-2.5 left-[1198px] top-[542px] absolute" :src="starBlue" />
          <img class="w-2.5 h-2.5 left-[1198px] top-[652px] absolute" :src="starBlue" />

          <!-- Form (UI only, no backend yet) -->
          <form class="absolute inset-0" @submit.prevent="onSubmit">
            <!-- Brand -->
            <input
              id="brand"
              type="text"
              v-model="form.brand"
              placeholder="品牌方"
              class="w-96 h-14 left-[1190px] top-[342px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />

            <!-- Region -->
            <input
              id="region"
              type="text"
              v-model="form.region"
              placeholder="大区"
              class="w-36 h-14 left-[1190px] top-[452px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />

            <!-- Store -->
            <input
              id="store"
              type="text"
              v-model="form.store"
              placeholder="门店"
              class="w-72 h-14 left-[1362px] top-[452px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />

            <!-- ID number -->
            <input
              id="idNumber"
              type="text"
              v-model="form.idNumber"
              placeholder="ID号码"
              class="w-96 h-14 left-[1190px] top-[569px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />

            <!-- Phone -->
            <input
              id="phone"
              type="text"
              v-model="form.phone"
              placeholder="手机号"
              class="w-96 h-14 left-[1190px] top-[679px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />

            <!-- Agree -->
            <input
              id="agree"
              type="checkbox"
              v-model="agree"
              class="w-5 h-4 left-[1190px] top-[754px] absolute rounded-sm border border-black opacity-50"
            />
            <label for="agree" class="left-[1216px] top-[752px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">同意隐私协议</label>

            <!-- Submit -->
            <button
              type="submit"
              class="w-96 h-14 left-[1190px] top-[808px] absolute bg-neutral-700 rounded-[10px] text-white text-xl font-normal font-['Alibaba_PuHuiTi']"
            >
              申请账户
            </button>

            <!-- Login link -->
            <div class="left-[1322px] top-[875px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">
              已经拥有一个账号？
              <a href="/login" class="text-black">登录</a>
            </div>
          </form>

          <!-- Success modal -->
          <div v-if="showDialog" class="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
            <div class="w-[420px] h-[360px] relative">
              <div class="w-[420px] h-[360px] left-0 top-0 absolute bg-white rounded-[31px]"></div>
              <img class="w-24 h-24 absolute left-1/2 -translate-x-1/2 top-14" :src="redBg" />
              <div class="absolute top-[168px] left-0 right-0 w-full text-center text-black text-3xl font-normal font-['Alibaba_PuHuiTi']">感谢您的申请！</div>
              <div class="absolute top-[210px] left-6 right-6 text-center text-neutral-500 text-base leading-relaxed font-normal font-['Alibaba_PuHuiTi']">
                账号信息将在审核完成后通过短信的方式<br/>发送到您的手机！
              </div>

              <!-- CTA button -->
              <button type="button" @click="closeDialog" class="absolute left-1/2 -translate-x-1/2 top-[276px]">
                <img class="w-28 h-10" :src="redBgSmall" />
                <span class="absolute inset-0 flex items-center justify-center text-white text-sm font-normal font-['Alibaba_PuHuiTi']">知道啦</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
import loginImage from '../../Resource/Login/LoginImage.jpg';
import starBlue from '../../Resource/Login/starBlue.svg';
import redBg from '../../Resource/Login/RedBG.svg';
import redBgSmall from '../../Resource/Login/RedBGSmall.svg';
export default {
  name: 'JoinUs',
  data() {
    return {
      form: {
        brand: '',
        region: '',
        store: '',
        idNumber: '',
        phone: '',
      },
      agree: false,
      scale: 1,
      loginImage,
      starBlue,
      showDialog: false,
      redBg,
      redBgSmall,
    }
  },
  computed: {
    outerStyle() {
      return {
        width: `${1920 * this.scale}px`,
        height: `${1080 * this.scale}px`,
      };
    },
    canvasBaseStyle() {
      return {
        width: '1920px',
        height: '1080px',
        transform: `scale(${this.scale})`,
        transformOrigin: 'top left',
      };
    },
  },
  methods: {
    updateScale() {
      const vw = window.innerWidth;
      const sx = vw / 1920;
      this.scale = sx;
    },
    onSubmit() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
  mounted() {
    this.updateScale();
    window.addEventListener('resize', this.updateScale);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScale);
  },
}
export {};
</script>

<style scoped>
</style>



