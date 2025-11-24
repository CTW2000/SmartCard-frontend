<template>

  <div class="min-w-[1920px] min-h-screen w-full relative ">
      <img class=" left-30 top-10 absolute" :src="loginImage" />
       
       
      <div class="left-[1282px] top-[181px] absolute text-neutral-600 text-6xl font-normal font-['Alibaba_PuHuiTi']">创建您的账户！</div>
      <div class="left-[1292px] top-[253px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">您好！欢迎加入我们</div>

      <!-- Labels -->
      <div class="left-[1318px] top-[309px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">手机号</div>
      <div class="left-[1318px] top-[421px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">密码</div>
      <div class="left-[1318px] top-[529px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">门店名称</div>
      <div class="left-[1318px] top-[636px] absolute text-stone-500 text-xl font-medium font-['Alibaba_PuHuiTi']">邀请码</div>

      <!-- Bullet accents -->
      <img class="w-2.5 h-2.5 left-[1300px] top-[315px] absolute" :src="starBlue" />
      <img class="w-2.5 h-2.5 left-[1300px] top-[427px] absolute" :src="starBlue" />
      <img class="w-2.5 h-2.5 left-[1300px] top-[535px] absolute" :src="starBlue" />
      <img class="w-2.5 h-2.5 left-[1300px] top-[643px] absolute" :src="starBlue" />

      <!-- Form -->
      <form class="absolute inset-0" @submit.prevent="onSubmit">
        <!-- Phone input -->
        <input
          id="phone"
          type="text"
          v-model="form.account"
          placeholder="输入您的手机号"
          class="w-96 h-14 left-[1292px] top-[340px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Password input -->
        <input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="输入您的密码"
          class="w-96 h-14 left-[1292px] top-[450px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Store name -->
        <input
          id="name"
          type="text"
          v-model="form.name"
          placeholder="门店名称"
          class="w-96 h-14 left-[1292px] top-[560px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Invitation code -->
        <input
          id="invitation"
          type="text"
          v-model="form.invitationCode"
          placeholder="邀请码"
          class="w-96 h-14 left-[1292px] top-[670px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
        />

        <!-- Agree -->
        <input
          id="agree"
          type="checkbox"
          v-model="agree"
          class="w-5 h-4 left-[1292px] top-[745px] absolute rounded-sm border border-black opacity-50"
        />
        <label for="agree" class="left-[1318px] top-[743px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">同意隐私协议</label>

        <!-- Submit -->
        <button
          type="submit"
          class="w-96 h-14 left-[1292px] top-[798px] absolute bg-black rounded-[10px] text-white text-xl font-normal font-['Alibaba_PuHuiTi'] hover:cursor-pointer"
        >
          创建账户
        </button>

        <!-- Login link -->
        <div class="left-[1300px] top-[865px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">
          已经拥有一个账号？
          <a href="/login" class="text-black">登录</a>
        </div>
      </form>
   


</div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'

import loginImage from '../../Resource/Login/loginImage.svg'
import starBlue from '../../Resource/Login/starBlue.svg'

const router = useRouter()

const form = reactive({
  account: '',
  name: '',
  password: '',
  invitationCode: '',
})

const agree = ref(false)

async function onSubmit() {
  if (!agree.value) {
    alert('请先同意隐私协议')
    return
  }

  try {
    const res = await postForm(PATHS.REGISTER, {
      account: form.account,
      password: form.password,
      invitation_code: form.invitationCode,
      name: form.name,
    })
    const body = res?.data
    if (body?.success === true || body?.code === 200) {
      const token = body?.data?.token
      if (token) localStorage.setItem('token', token)
      alert(body?.message || '注册成功')
      router.push({ name: 'Login' })
      return
    }
    alert(body?.message || '注册失败')
  } catch (err) {
    console.error(err?.response?.data || err)
    const msg = err?.response?.data?.message || err?.message || '请求失败'
    alert(msg)
  }
}
</script>


