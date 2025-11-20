<template>

  <div class="w-80 h-[491px] relative">

    <div class="w-87 h-[491px] left-0 top-0 absolute bg-white rounded-[31px]"></div>
    
    <button
        type="button"
        class="absolute left-83 bottom-118 z-10 flex items-center justify-center w-10 h-10 rounded-full  shadow  cursor-pointer transition"
        @click="submit"
        aria-label="关闭"
      >
        <img :src="closeIcon" alt="关闭" class="w-20 h-20" />
      </button>

      
    <div class="absolute left-0 top-0 w-[300px] h-full">

      <div class="left-[46px] top-[38px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">员工信息</div>


     
    
      <img :src="starBlue" class="w-4 h-4 left-[48px] top-[136px] absolute" />
      <div class="left-[78px] top-[134px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">姓名</div>
      <input v-model="editData.staff_name" type="text" class="w-28 h-14 left-[46px] top-[172px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none bg-white" />
    
    
      <img :src="starBlue" class="w-4 h-4 left-[48px] top-[248px] absolute" />
      <div class="left-[78px] top-[246px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">手机号</div>
      <input v-model="editData.phone" type="tel" inputmode="numeric" class="w-64 h-14 left-[46px] top-[281px] absolute rounded-[10px] border border-black px-3 text-2xl text-stone-700 font-['Alibaba_PuHuiTi'] text-center outline-none bg-white tracking-[3px]" />
      
      
      <img :src="starBlue" class="w-4 h-4 left-[211px] top-[136px] absolute" />
      <div class="left-[241px] top-[134px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">性别</div>
      <div class="w-24 h-14 left-[211px] top-[172px] absolute opacity-50 rounded-[10px] border border-black cursor-pointer flex items-center justify-center" @click.stop="toggleSex">
        <span class="text-2xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ editData.sex || '—' }}</span>
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
        <span class="text-xl text-stone-700 font-['Alibaba_PuHuiTi']">{{ editData.postion || '—' }}</span>
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

<script setup>
import { ref, reactive, onMounted } from 'vue'
import starBlue from '../../../Resource/Login/starBlue.svg'
import closeIcon from '../../../Resource/Staff/Close.svg'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'

const emit = defineEmits(['updated'])

const props = defineProps({
  staff: { type: Object, default: () => null },
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


function normalizeSexLabel(value) {
  if (value === 1 || value === '1') return '男'
  if (value === 2 || value === '2') return '女'
  return value || ''
}

function sexLabelToValue(label) {
  if (label === '男') return 1
  if (label === '女') return 2
  return ''
}



onMounted(() => {
  editData.staff_name = props.staff.name || ''
  editData.sex = normalizeSexLabel(props.staff.sex)
  editData.postion = props.staff.postion || ''
  editData.phone = props.staff.phone || ''
})

async function submit() {
 
  const payload = {
    data: JSON.stringify({
      name: editData.staff_name || '',
      sex: sexLabelToValue(editData.sex),
      postion: editData.postion || '',
      postion_type: props.postionTypeMap[editData.postion]?.value || '',
      phone: editData.phone || '',
      staff_id: props.staff.staff_id || '',
    }),
    type: 'update',
  }
  try {
    const res = await postForm(PATHS.STAFF_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      emit('updated')
    } else {
      alert('提交失败')
    }
  } catch (error) {
    console.error('Failed to submit staff info:', error)
  }
}

async function onClearClick() {
  const payload = {
    data: JSON.stringify({
      name: editData.staff_name || '',
      sex: sexLabelToValue(editData.sex),
      postion: editData.postion || '',
      postion_type: props.postionTypeMap[editData.postion]?.value || '',
      phone: editData.phone || '',
      staff_id: props.staff.staff_id || '',
    }),
    type: 'delete',
  }

  try {
    const res = await postForm(PATHS.STAFF_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      emit('updated')
    } else {
      alert('删除失败')
    }
  } catch (error) {
    console.error('Failed to delete staff info:', error)
  }
}



</script>
<style scoped>
</style>



