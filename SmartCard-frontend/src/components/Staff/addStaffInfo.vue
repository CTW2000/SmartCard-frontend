<template>

   <div class="w-96 h-[550px] relative" >

    <div class="w-96 h-[550px] left-0 top-0 absolute bg-white rounded-[31px]"></div>
    
    <div class="w-80 h-0 left-[38px] top-[113px] absolute shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>
  

    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[139px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[251px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[358px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[241px] top-[139px] absolute" />

    <div class="left-[48px] top-[41px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">新员工信息录入</div>

    <button
      type="button"
      class="absolute left-93 bottom-133 z-10 flex items-center justify-center w-10 h-10 rounded-full shadow cursor-pointer transition"
      @click="emit('close')"
      aria-label="关闭"
    >
      <img :src="closeIcon" alt="关闭" class="w-20 h-20" />
    </button>

    
    <div class="left-[80px] top-[137px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">姓名</div>
    <div class="left-[80px] top-[249px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">手机号</div>
    <div class="left-[80px] top-[356px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">岗位</div>
    <div class="left-[271px] top-[137px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">性别</div>

    
    <input v-model="editData.staff_name" type="text" class="w-36 h-14 left-[48px] top-[175px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none" />
    <input v-model="editData.phone" type="tel" inputmode="numeric" class="w-72 h-14 left-[48px] top-[284px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none" />
    
    
    <!-- Position select box -->
    <div class="w-48 h-14 left-[48px] top-[391px] absolute opacity-50 rounded-[10px] border border-black cursor-pointer flex items-center justify-center" @click.stop="togglePosition">
      <span class="text-2xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ editData.postion }}</span>
    </div>


    <!-- Sex select box -->
    <div class="w-24 h-14 left-[239px] top-[175px] absolute opacity-50 rounded-[10px] border border-black cursor-pointer flex items-center justify-center" @click.stop="toggleSex">
      <span class="text-2xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ editData.sex }}</span>
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


    <div class="absolute left-[248px] bottom-8">
      <button
        type="button"
        class="w-28 h-11 bg-white rounded-2xl border border-stone-300 
        text-neutral-700 text-xl font-medium font-['Alibaba_PuHuiTi'] 
        flex items-center justify-center hover:bg-stone-50 transition"
        @click="submit"
        aria-label="确认新增员工"
      >
        确认
      </button>


    </div>
  
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import starBlue from '../../../Resource/Login/starBlue.svg'
import closeIcon from '../../../Resource/Staff/Close.svg'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'

const emit = defineEmits(['staff-added', 'close'])

const props = defineProps({
  postionTypeMap: { type: Object, default: () => ({}) }
})


const editData = reactive({
  staff_name: '',
  sex: '',
  postion: '',
  phone: '',
})


const showSexDropdown = ref(false)
const showPositionDropdown = ref(false)

function toggleSex() {
  showSexDropdown.value = !showSexDropdown.value
 
}

function togglePosition() {
  showPositionDropdown.value = !showPositionDropdown.value
}

function selectSex(val) {
  editData.sex = val
  showSexDropdown.value = false
}

function selectPosition(val) {
  editData.postion = val
  showPositionDropdown.value = false
}

function sexLabelToValue(label) {
  if (label === '男') return 1
  if (label === '女') return 2
  return ''
}



async function submit() {
  
  const payload = {
    data: JSON.stringify({
      name: editData.staff_name || '',
      sex: sexLabelToValue(editData.sex),
      postion: editData.postion || '',
      postion_type: props.postionTypeMap[editData.postion] || '',
      phone: editData.phone || '',
    }),
    type: 'add',
  }
  try {
    const res = await postForm(PATHS.STAFF_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      emit('staff-added')
    } else {
      alert('提交失败')
    }
  } catch (error) {
    console.error('Failed to submit staff info:', error)
  }
}





</script>
<style scoped>
</style>


