<template>
  <div class="w-screen min-h-screen flex justify-center bg-white overflow-y-auto">
    <div class="relative" :style="outerStyle">
      <div class="relative origin-top-left rounded-[31px] overflow-hidden" :style="canvasBaseStyle">
      <div class="w-[922px] h-[1080px] left-0 top-0 absolute bg-zinc-300"></div>
      <img class="w-[922px] h-[1080px] left-0 top-0 absolute object-cover" :src="loginImage" />
      <div class="w-24 h-6 left-[64px] top-[26px] absolute bg-neutral-700 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(221,221,221,0.25)]"></div>

      <div class="left-[1182px] top-[181px] absolute text-neutral-600 text-6xl font-normal font-['Alibaba_PuHuiTi']">创建您的账户！</div>
      <div class="left-[1192px] top-[253px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">您好！欢迎加入我们</div>

      <!-- Labels -->
      <div class="left-[1218px] top-[309px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">手机号</div>
      <div class="left-[1218px] top-[421px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">密码</div>
      <div class="left-[1218px] top-[529px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">门店名称</div>
      <div class="left-[1218px] top-[636px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">邀请码</div>

      <!-- Bullet accents -->
      <img class="w-2.5 h-2.5 left-[1200px] top-[315px] absolute" :src="starBlue" />
      <img class="w-2.5 h-2.5 left-[1200px] top-[427px] absolute" :src="starBlue" />
      <img class="w-2.5 h-2.5 left-[1200px] top-[535px] absolute" :src="starBlue" />
      <img class="w-2.5 h-2.5 left-[1200px] top-[643px] absolute" :src="starBlue" />

      <!-- Form -->
      <form class="absolute inset-0" @submit.prevent="onSubmit">
        <!-- Phone input -->
        <input
          id="phone"
          type="text"
          v-model="form.account"
          placeholder="输入您的手机号"
          class="w-96 h-14 left-[1192px] top-[340px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Password input -->
        <input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="输入您的密码"
          class="w-96 h-14 left-[1192px] top-[450px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Store name -->
        <input
          id="name"
          type="text"
          v-model="form.name"
          placeholder="门店名称"
          class="w-96 h-14 left-[1192px] top-[560px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Invitation code -->
        <input
          id="invitation"
          type="text"
          v-model="form.invitationCode"
          placeholder="邀请码"
          class="w-96 h-14 left-[1192px] top-[670px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Agree -->
        <input
          id="agree"
          type="checkbox"
          v-model="agree"
          class="w-5 h-4 left-[1192px] top-[745px] absolute rounded-sm border border-black opacity-50"
        />
        <label for="agree" class="left-[1218px] top-[743px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">同意隐私协议</label>

        <!-- Submit -->
        <button
          type="submit"
          class="w-96 h-14 left-[1192px] top-[798px] absolute bg-black rounded-[10px] text-white text-xl font-normal font-['Alibaba_PuHuiTi']"
        >
          创建账户
        </button>

        <!-- Login link -->
        <div class="left-[1324px] top-[865px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">
          已经拥有一个账号？
          <a href="/login" class="text-black">登录</a>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import client from '../httpClient/client';
import { PATHS } from '../httpClient/paths';
import loginImage from '../../Resource/Login/LoginImage.jpg';
import starBlue from '../../Resource/Login/starBlue.svg';
export default {
  name: 'CreateAccounts',
  data() {
    return {
      form: {
        account: '',
        name: '',
        password: '',
        invitationCode: '',
      },
      agree: false,
      scale: 1,
      loginImage,
      starBlue,
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
        const data = new URLSearchParams();
        data.append('account', this.form.account);
        data.append('password', this.form.password);
        data.append('invitation_code', this.form.invitationCode);
        data.append('name', this.form.name);

        const res = await client.post(PATHS.REGISTER, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const body = res?.data;
        console.log(body);
        if (body?.success === true || body?.code === 200) {
          const token = body?.data?.token;
          if (token) localStorage.setItem('token', token);
          alert(body?.message || '注册成功');
          this.$router.push({ name: 'Login' });
          return;
        }
        alert(body?.message || '注册失败');
      } catch (err) {
        console.error(err?.response?.data || err);
        const msg = err?.response?.data?.message || err?.message || '请求失败';
        alert(msg);
      }
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


