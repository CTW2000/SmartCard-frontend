<template>
  <div class="w-80 h-[491px] relative" @click="closeDropdowns">
    <div class="w-87 h-[491px] left-0 top-0 absolute bg-white rounded-[31px]"></div>
    <div class="absolute left-0 top-0 w-[300px] h-full">
      <div class="left-[46px] top-[38px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">员工信息</div>
      <img :src="starBlue" class="w-4 h-4 left-[48px] top-[136px] absolute" />
      <div class="left-[78px] top-[134px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">姓名</div>
      <input v-model="name" type="text" class="w-28 h-14 left-[46px] top-[172px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none bg-white" />
      <img :src="starBlue" class="w-4 h-4 left-[48px] top-[248px] absolute" />
      <div class="left-[78px] top-[246px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">手机号</div>
      <input v-model="phone" type="tel" inputmode="numeric" class="w-64 h-14 left-[46px] top-[281px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none bg-white tracking-[3px]" />
      <img :src="starBlue" class="w-4 h-4 left-[211px] top-[136px] absolute" />
      <div class="left-[241px] top-[134px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">性别</div>
      <div class="w-24 h-14 left-[211px] top-[172px] absolute opacity-50 rounded-[10px] border border-black cursor-pointer flex items-center justify-center" @click.stop="toggleSex">
        <span class="text-2xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ selectedSex }}</span>
      </div>
      <div v-if="showSexDropdown" class="w-24 h-32 left-[211px] top-[226px] absolute">
        <div class="w-24 h-32 left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500"></div>
        <div class="left-[35px] top-[18px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectSex('男')">男</div>
        <div class="left-[35px] top-[77px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectSex('女')">女</div>
        <div class="w-16 h-0 left-[11px] top-[62px] absolute outline outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
      </div>
      <div class="w-64 h-0 left-[36px] top-[110px] absolute shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>
      <img :src="starBlue" class="w-4 h-4 left-[48px] top-[355px] absolute" />
      <div class="left-[78px] top-[353px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">岗位</div>
      <div class="w-28 h-14 left-[46px] top-[388px] absolute opacity-50 rounded-[10px] border border-black cursor-pointer flex items-center justify-center" @click.stop="togglePosition">
        <span class="text-xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ selectedPosition }}</span>
      </div>
      <div v-if="showPositionDropdown" class="w-28 h-28 left-[46px] top-[444px] absolute">
        <div class="w-28 h-28 left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500"></div>
        <div class="left-[37px] top-[18px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectPosition('店长')">店长</div>
        <div class="left-[27px] top-[74px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700" @click.stop="selectPosition('服务岗')">服务岗</div>
        <div class="w-16 h-0 left-[23px] top-[60px] absolute outline outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
      </div>
      <div class="w-24 h-14 left-[204px] top-[388px] absolute bg-teal-600 rounded-xl cursor-pointer flex items-center justify-center text-white text-base font-medium font-['Alibaba_PuHuiTi']" @click.stop="onClearClick">清除信息</div>
    </div>
  </div>
</template>

<script>
import starBlue from '../../Resource/Login/starBlue.svg'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
export default {
  name: 'UpdateStaffInfo',
  props: {
    staff: { type: Object, default: () => null }
  },
  beforeDestroy() {
    if (typeof this.submit === 'function') this.submit('update')
  },
  beforeUnmount() {
    if (typeof this.submit === 'function') this.submit('update')
  },
  data() {
    return {
      starBlue,
      selectedSex: '',
      selectedPosition: '',
      name: '',
      phone: '',
      showSexDropdown: false,
      showPositionDropdown: false,
    }
  },
  watch: {
    staff: {
      immediate: true,
      handler(val) {
        if (val && typeof val === 'object') {
          this.name = val.name || ''
          this.phone = val.phone || ''
          this.selectedPosition = val.postion || ''
          this.selectedSex = val.sex || ''
        }
      }
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
    async onClearClick() {
      // Close the window immediately
      this.$emit('close')
      // Fire-and-forget delete request
      try {
        await this.submit('delete')
      } catch (e) {
        // ignore
      }
    },
    
    async submit(type = 'update') {
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
        type
      }
      try {
        const res = await postForm(PATHS.STAFF_EDIT, payload)
        if (res && res.status >= 200 && res.status < 300) {
          // success: no alert
          return true
        } else {
          alert('提交失败')
          return false
        }
      } catch (e) {
        console.error(e)
        alert('提交失败')
        return false
      }
    }
  }
}
</script>

<style scoped>
</style>



