<template>
  <div class="w-screen min-h-screen flex justify-center bg-white overflow-y-auto">
    <div class="relative" :style="outerStyle">
      <div class="relative origin-top-left rounded-[31px] overflow-hidden" :style="canvasBaseStyle">
        <div class="w-[1920px] h-[1080px] relative bg-white rounded-[31px] overflow-hidden">
          <div class="w-24 h-6 left-[64px] top-[26px] absolute bg-neutral-700 rounded-[10px]"></div>

          <div class="left-[260px] top-[247px] absolute text-neutral-600 text-6xl font-normal font-['Alibaba_PuHuiTi']">欢迎回来！</div>
          <div class="left-[260px] top-[319px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">输入您的账号密码</div>

          <!-- Labels -->
          <div class="left-[260px] top-[390px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">账号</div>
          <div class="left-[260px] top-[495px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">密码</div>

          <!-- Inputs -->
          <form class="absolute inset-0" @submit.prevent="onSubmit">
            <input
              id="account"
              type="text"
              v-model="form.account"
              placeholder="请输入您的账号"
              class="w-96 h-14 left-[260px] top-[422px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />
            <input
              id="password"
              type="password"
              v-model="form.password"
              placeholder="请输入您的密码"
              class="w-96 h-14 left-[260px] top-[527px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />

            <!-- Remember + Forgot -->
            <input
              id="remember"
              type="checkbox"
              v-model="remember"
              class="w-5 h-4 left-[260px] top-[620px] absolute rounded-sm border border-black opacity-50"
            />
            <label for="remember" class="left-[286px] top-[618px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">记住我的密码</label>
            <a href="#" class="left-[631px] top-[616px] absolute text-black text-xl font-normal font-['Alibaba_PuHuiTi']">忘记密码？</a>

            <!-- Submit -->
            <button
              type="submit"
              class="w-96 h-14 left-[260px] top-[671px] absolute bg-black rounded-[10px] text-white text-xl font-normal font-['Alibaba_PuHuiTi']"
            >
              登录
            </button>

            <!-- Bottom link -->
            <div class="left-[398px] top-[745px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">
              暂时没有账号？
              <router-link to="/createaccounts" class="text-black">注册</router-link>
            </div>
          </form>

          <!-- Right panel and image -->
          <div class="w-[921px] h-[1080px] left-[999px] top-0 absolute bg-zinc-300"></div>
          <img class="w-[921px] h-[1080px] left-[999px] top-0 absolute object-cover" :src="loginImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postForm } from '../httpClient/client';
import { PATHS } from '../httpClient/paths';
import loginImage from '../../Resource/Login/LoginImage.jpg';
export default {
  name: 'Login',
  data() {
    return {
      form: { account: '', password: '' },
      remember: false,
      scale: 1,
      loginImage,
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
    async onSubmit() {
      try {
        const res = await postForm(PATHS.LOGIN, {
          account: this.form.account,
          password: this.form.password,
        });
        const body = res?.data;
        if (body?.success === true || body?.code === 200) {
          const token = body?.data?.token;
          if (token) localStorage.setItem('token', token);
          // Update current login credentials
          localStorage.removeItem('currentAccount');
          localStorage.removeItem('currentPassword');
          localStorage.setItem('currentAccount', this.form.account);
          localStorage.setItem('currentPassword', this.form.password);
          if (this.remember) {
            localStorage.setItem('remembered_account', this.form.account);
            localStorage.setItem('remembered_password', this.form.password);
          } else {
            localStorage.removeItem('remembered_account');
            localStorage.removeItem('remembered_password');
          }
          this.$router.push({ name: 'Home' });
          return;
        }
        alert(body?.message || '登录失败');
      } catch (err) {
        console.error(err?.response?.data || err);
        const msg = err?.response?.data?.message || err?.message || '请求失败';
        alert(msg);
      }
    },
  },
  mounted() {
    // restore remembered credentials
    const savedAccount = localStorage.getItem('remembered_account');
    if (savedAccount) {
      this.form.account = savedAccount;
      this.remember = true;
    }
    const savedPassword = localStorage.getItem('remembered_password');
    if (savedPassword) {
      this.form.password = savedPassword;
      this.remember = true;
    }
    // init responsive scale
    this.updateScale();
    window.addEventListener('resize', this.updateScale);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScale);
  },
  watch: {
    remember(newVal) {
      if (!newVal) {
        localStorage.removeItem('remembered_account');
        localStorage.removeItem('remembered_password');
      }
    },
  },
}
export {};
</script>

<style scoped>
</style>

