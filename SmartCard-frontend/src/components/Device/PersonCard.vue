<template>

  <div class="relative inline-block">
    <div class="relative rounded-[16px] bg-card border border-border p-5 w-[220px]" style="box-shadow: 0 8px 20px rgba(16,24,40,0.12)">
     
      <!-- Close button -->
      <button
        v-if="editMode"
        class="absolute bottom-68 left-50 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center cursor-pointer"
        style="border-color: rgba(0,0,0,0.16)"
        aria-label="Close"
        @click="onCloseClick"
      >
        ✕
      </button>

      <!-- state color -->
      <div class="w-2.5 h-2.5 rounded-full" :class="props.device_status === '在线' ? 'bg-green-400' : 'bg-red-400'"></div>


      <!-- Portrait + Title -->
      <div class="flex flex-col items-center">
        <img :src="props.sex === 2 ? AvatarWoman : AvatarMan" alt="avatar" class="w-[96px] h-[96px] rounded-full object-cover ring-2" style="--tw-ring-color: rgba(0,0,0,0.08)" />
        <h3 class="mt-1 mb-2  tracking-[-0.01em]  text-center max-w-[260px] text-black text-[20px] font-normal font-['Alibaba_PuHuiTi']">{{ props.staff_name || '—' }}</h3>
      </div>


      <!-- Divider -->
      <div class="h-px my-1 mb-3" style="background: rgba(0,0,0,0.08)"></div>



      <!-- Minimal info list -->
        <div class="flex items-center justify-center gap-2 ">
          <span class="text-black text-[15px] font-light font-['Alibaba_PuHuiTi']">工牌状态:</span>
          <span class="text-black text-[15px] font-light font-['Alibaba_PuHuiTi']">{{ props.device_status || '—' }}</span>
        </div>
        
        <div class="text-teal-600 text-[15px] font-normal font-['Alibaba_PuHuiTi'] text-center">{{ props.device_name || '—' }}</div>
     



      
      <!-- Inline bottom edit action (inside card) -->
      <div class="mt-3 flex items-center justify-center" v-if="editMode">
        <button
          class="w-8 h-8 rounded-full bg-white border flex items-center justify-center"
          style="border-color: rgba(0,0,0,0.12)"
          aria-label="Edit"
          @click="onEditClick"
        >
          ✎
        </button>
      </div>

      
    </div>



    <!-- Modal: Edit Device (same layout as add staff info panel) -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center">

      <div class="absolute inset-0 bg-black/30" @click="showEditModal = false"></div>

      <div class="relative">

        <div class="w-96 h-80 relative">

          <div class="w-96 h-80 left-0 top-0 absolute bg-white rounded-[31px]"></div>
          
          <div class="left-[51px] top-[37px] absolute justify-start text-black text-2xl font-normal font-['Alibaba_PuHuiTi']">编辑设备</div>
          <div class="w-64 h-0 left-[53px] top-[93px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          
          <div class="left-[54px] top-[117px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">绑定人员</div>
          <div class="left-[54px] top-[165px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备号</div>
          <div class="left-[53px] top-[214px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备名称</div>
 
          <div class="w-28 h-10 left-[129px] top-[260px] absolute bg-white rounded-[20px] border border-zinc-300 cursor-pointer"></div>
          <div class="left-[164px] top-[267px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer " @click="submitEditDevice">完成</div>



          <!-- Inputs -->
          <div
            class="w-24 h-9 left-[219px] top-[112px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm flex items-center cursor-pointer"
            @click="openSelectStaffPanel"
          >
            <span class="truncate text-zinc-600">{{ editData.staff_name || props.staff_name || '选择人员' }}</span>
          </div>


          <input
            v-model="props.device_number"
            type="text"
            readonly
            aria-readonly="true"
            class="w-24 h-9 left-[219px] top:[160px] top-[160px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none bg-gray-100 cursor-not-allowed"
            placeholder="设备号"
          />


          <input
            v-model="editData.device_name"
            type="text"
            class="w-24 h-9 left-[219px] top-[208px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none"
            placeholder="设备名称"
          />
        </div>

      </div>
    </div>


  <!-- Select Staff Panel Component -->
  <StaffSelect
    v-if="showSelectStaffPanel"
    @close="showSelectStaffPanel = false"
    @select="onStaffSelected"
  />

  <!-- Delete Confirmation Dialog -->
  <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30" @click="cancelDelete"></div>
    <div class="relative">
      <div class="w-80 h-48 relative">
        <div class="w-80 h-48 left-0 top-0 absolute bg-white rounded-[30px]"></div>
        <div class="left-[124px] top-[30px] absolute justify-start text-neutral-800 text-2xl font-medium font-['Alibaba_PuHuiTi']">系统通知</div>
        <div class="left-[63px] top-[73px] absolute justify-start text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi']">确定要删除这项内容吗？</div>
        <button
          class="w-24 h-10 left-[183px] top-[116px] absolute bg-stone-50 rounded-[19.50px] border border-gray-200 cursor-pointer flex items-center justify-center"
          @click="cancelDelete"
        >
          <div class="text-neutral-700 text-xl font-normal font-['Alibaba_PuHuiTi']">取消</div>
        </button>
        <button
          class="w-24 h-10 left-[57px] top-[116px] absolute bg-teal-500 rounded-[19.50px] shadow-[0px_2px_2px_0px_rgba(196,196,196,0.25)] border border-white cursor-pointer flex items-center justify-center"
          @click="confirmDelete"
        >
          <div class="text-white text-xl font-normal font-['Alibaba_PuHuiTi']">确定</div>
        </button>
      </div>
    </div>
  </div>
  
  </div>
</template>



<script setup>
import { reactive, ref } from 'vue'

import AvatarMan from '../../../Resource/Staff/AvatarMan.svg'
import AvatarWoman from '../../../Resource/Staff/AvatarWoman.svg'
import StaffSelect from '../Staff/StaffSelect.vue'


import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'




const props = defineProps({
  staff_name: { type: String, default: '' },
  device_id: { type: String, default: '' },
  device_name: { type: String, default: '' },
  device_number: { type: String, default: '' },
  device_status: { type: String, default: '' },
  staff_id: { type: String, default: '' },
  group_id: { type: String, default: '' },
  sex: { type: Number, default: null },
  editMode: { type: Boolean, default: false },
})


const emit = defineEmits(['close', 'updated'])


const showEditModal = ref(false)
const showSelectStaffPanel = ref(false)
const showDeleteConfirm = ref(false)

const editData = reactive({
  device_name: '',
  staff_name: '',
  staff_id: '',
})


function onEditClick() {
  editData.device_name = props.device_name || ''
  showEditModal.value = true
}

function onCloseClick() {
  showDeleteConfirm.value = true
}

function cancelDelete() {
  showDeleteConfirm.value = false
}

async function confirmDelete() {
  const payload = {
    type: 'delete',
    data: JSON.stringify({
      device_number: props.device_number || '',
      staff_id: props.staff_id || '',
      device_name: props.device_name || '',
      type: 'delete',
      device_id: props.device_id || '',
      group_id: props.group_id || '',
    })
  }
  
  try {
    const res = await postForm(PATHS.DEVICE_EDIT, payload)

    if (res && res.status >= 200 && res.status < 300) {
      emit('close')
    } else {
      alert('删除失败')
    }
  } catch (e) {
    console.error('[PersonCard] delete device error:', e)
    alert('删除失败')
  }
  
  showDeleteConfirm.value = false
}

async function submitEditDevice() {
  
  const payload = {
    type: 'update',
    data: JSON.stringify({
      device_number: (props.device_number || '').trim(),
      staff_id: (editData.staff_id || props.staff_id || '').trim(),
      device_name: (editData.device_name || '').trim(),
      type: 'update',
      device_id: (props.device_id || '').trim(),
      group_id: (props.group_id || '').trim(),
    })
  }
  
  try {
    const res = await postForm(PATHS.DEVICE_EDIT, payload)

    if (res && res.status >= 200 && res.status < 300) {
      // Update card view
      showEditModal.value = false
      emit('updated')
    }
  } catch (_) {}
}

function openSelectStaffPanel() {
  showSelectStaffPanel.value = true
}

function onStaffSelected(item) {
  editData.staff_name = item.name || ''
  editData.staff_id = item.id || ''
  showSelectStaffPanel.value = false
}



</script>

<style scoped>
</style>






