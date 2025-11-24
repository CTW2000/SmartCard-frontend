<template>


  <div class="min-w-[1920px] min-h-screen w-full flex items-center justify-center py-10 px-6">
       <!-- Right panel and image -->
         <img class="w-[921px] h-[1080px] left-250 top-10 absolute object-cover" :src="loginImage" />
        

          <div class="left-[290px] top-[247px] absolute text-neutral-600 text-6xl font-normal font-['Alibaba_PuHuiTi']">欢迎回来！</div>
          <div class="left-[290px] top-[319px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">输入您的账号密码</div>

          <!-- Labels -->
          <div class="left-[290px] top-[390px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">账号</div>
          <div class="left-[290px] top-[495px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">密码</div>

          <!-- Inputs -->
          <form class="absolute inset-0" @submit.prevent="onSubmit">
            <input
              id="account"
              type="text"
              v-model="form.account"
              placeholder="请输入您的账号"
              class="w-96 h-14 left-[290px] top-[422px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />
            <input
              id="password"
              type="password"
              v-model="form.password"
              placeholder="请输入您的密码"
              class="w-96 h-14 left-[290px] top-[527px] absolute rounded-[10px] border border-black opacity-50 px-4 text-stone-700 placeholder-stone-500"
            />

            <!-- Remember + Forgot -->
            <input
              id="remember"
              type="checkbox"
              v-model="remember"
              class="w-5 h-4 left-[290px] top-[625px] absolute rounded-sm border border-black opacity-50"
            />
            <label for="remember" class="left-[316px] top-[618px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">记住我的密码</label>
            <a href="#" class="left-[580px] top-[616px] absolute text-black text-xl font-normal font-['Alibaba_PuHuiTi']">忘记密码？</a>

            <!-- Submit -->
            <button
              type="submit"
              class="w-96 h-14 left-[290px] top-[671px] absolute bg-black rounded-[10px] text-white text-xl font-normal font-['Alibaba_PuHuiTi'] hover:cursor-pointer"
            >
              登录
            </button>

            <!-- Bottom link -->
            <div class="left-[300px] top-[745px] absolute text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">
              暂时没有账号？
              <router-link to="/createaccounts" class="text-black">注册</router-link>
            </div>
          </form>  
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
import loginImage from '../../Resource/Login/loginImage.svg'

const router = useRouter()

const form = reactive({ account: '', password: '' })
const remember = ref(false)

async function onSubmit() {

  try {
    const res = await postForm(PATHS.LOGIN, {
      account: form.account,
      password: form.password,
    })
    const body = res?.data
    if (body?.success === true || body?.code === 200) {
      const token = body?.data?.token
      
      if (token) localStorage.setItem('token', token)
      localStorage.removeItem('currentAccount')
      localStorage.removeItem('currentPassword')
      localStorage.setItem('currentAccount', form.account)
      localStorage.setItem('currentPassword', form.password)
      if (remember.value) {
        localStorage.setItem('remembered_account', form.account)
        localStorage.setItem('remembered_password', form.password)
      } else {
        localStorage.removeItem('remembered_account')
        localStorage.removeItem('remembered_password')
      }
      router.push({ name: 'Home' })
      return
    }
    alert(body?.message || '登录失败')
  } catch (err) {
    console.error(err?.response?.data || err)
    const msg = err?.response?.data?.message || err?.message || '请求失败'
    alert(msg)
  }
}

onMounted(() => {
  const savedAccount = localStorage.getItem('remembered_account')
  if (savedAccount) {
    form.account = savedAccount
    remember.value = true
  }
  const savedPassword = localStorage.getItem('remembered_password')
  if (savedPassword) {
    form.password = savedPassword
    remember.value = true
  }
})


</script>

<style scoped>
</style>

