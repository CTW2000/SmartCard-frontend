<template>
  <div class="w-96 h-[506px] relative" @click="closeDropdowns">
    <div class="w-96 h-[506px] left-0 top-0 absolute bg-white rounded-[31px]"></div>
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[139px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[251px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[358px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[241px] top-[139px] absolute" />
    <div class="left-[48px] top-[41px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">新员工信息录入</div>
    <div class="left-[80px] top-[137px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">姓名</div>
    <div class="left-[80px] top-[249px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">手机号</div>
    <div class="left-[80px] top-[356px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">岗位</div>
    <div class="left-[271px] top-[137px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">性别</div>
    <input v-model="name" type="text" class="w-36 h-14 left-[48px] top-[175px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none" />
    <input v-model="phone" type="tel" inputmode="numeric" class="w-80 h-14 left-[48px] top-[284px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none" />
    <!-- Position select box -->
    <div class="w-48 h-14 left-[48px] top-[391px] absolute opacity-50 rounded-[10px] border border-black cursor-pointer flex items-center justify-center" @click.stop="togglePosition">
      <span class="text-2xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ selectedPosition }}</span>
    </div>
    <!-- Sex select box -->
    <div class="w-24 h-14 left-[239px] top-[175px] absolute opacity-50 rounded-[10px] border border-black cursor-pointer flex items-center justify-center" @click.stop="toggleSex">
      <span class="text-2xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ selectedSex }}</span>
    </div>

    <!-- Position dropdown window -->
    <div v-if="showPositionDropdown" class="w-28 h-28 left-[48px] top-[447px] absolute">
      <div class="w-28 h-28 left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500"></div>
      <div class="left-[37px] top-[18px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectPosition('店长')">店长</div>
      <div class="left-[27px] top-[74px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectPosition('服务岗')">服务岗</div>
      <div class="w-16 h-0 left-[23px] top-[60px] absolute outline outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
    </div>

    <!-- Sex dropdown window -->
    <div v-if="showSexDropdown" class="w-24 h-32 left-[239px] top-[231px] absolute">
      <div class="w-24 h-32 left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500"></div>
      <div class="left-[35px] top-[18px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectSex('男')">男</div>
      <div class="left-[35px] top-[77px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectSex('女')">女</div>
      <div class="w-16 h-0 left-[11px] top-[62px] absolute outline outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
    </div>
    <div class="w-80 h-0 left-[38px] top-[113px] absolute shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>
  </div>
</template>

<script>
import starBlue from '../../Resource/Login/starBlue.svg'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
export default {
  name: 'AddStaffInfo',
  beforeDestroy() {
    // Vue 2
    if (typeof this.submit === 'function') this.submit()
  },
  beforeUnmount() {
    // Vue 3
    if (typeof this.submit === 'function') this.submit()
  },
  data() {
    return {
      starBlue,
      selectedSex: '',
      selectedPosition: '',
      name: '',
      phone: '',
      showSexDropdown: false,
      showPositionDropdown: false
    }
  },
  methods: {
    toggleSex() {
      this.showSexDropdown = !this.showSexDropdown
      if (this.showSexDropdown) this.showPositionDropdown = false
    },
    togglePosition() {
      this.showPositionDropdown = !this.showPositionDropdown
      if (this.showPositionDropdown) this.showSexDropdown = false
    },
    selectSex(val) {
      this.selectedSex = val
      this.showSexDropdown = false
    },
    selectPosition(val) {
      this.selectedPosition = val
      this.showPositionDropdown = false
    },
    closeDropdowns() {
      this.showSexDropdown = false
      this.showPositionDropdown = false
    },
    async submit() {
      const sexMap = { '男': 1, '女': 2 }
      const positionTypeMap = { '店长': 1, '服务岗': 2 }
      const payload = {
        data: JSON.stringify({
          name: this.name || '',
          sex: sexMap[this.selectedSex] || '',
          postion: this.selectedPosition || '',
          postion_type: positionTypeMap[this.selectedPosition] || '',
          phone: this.phone || ''
        }),
        type: 'add'
      }
      try {
        const res = await postForm(PATHS.STAFF_EDIT, payload)
        // Consider any 2xx status as success
        if (res && res.status >= 200 && res.status < 300) {
          // success: no alert
        } else {
          alert('提交失败')
        }
      } catch (e) {
        console.error(e)
        alert('提交失败')
      }
    }
  }
}
</script>

<style scoped>
</style>


