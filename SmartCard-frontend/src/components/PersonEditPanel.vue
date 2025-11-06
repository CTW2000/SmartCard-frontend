<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/30" @click="$emit('close')"></div>

    <!-- Add Person Panel -->
    <div class="relative">
      <div class="w-96 h-80 relative">
        <div class="w-96 h-80 left-0 top-0 absolute bg-white rounded-[31px]"></div>
        <div class="w-64 h-0 left-[53px] top-[93px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>
        <div class="left-[54px] top-[117px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">绑定人员</div>
        <div class="left-[54px] top-[165px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备号</div>
        <div class="left-[53px] top-[214px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备名称</div>
        <div class="left-[51px] top-[37px] absolute justify-start text-black text-2xl font-normal font-['Alibaba_PuHuiTi']">添加设备</div>
        <div class="w-28 h-10 left-[129px] top-[272px] absolute bg-white rounded-[20px] border border-zinc-300"></div>
        <div class="left-[164px] top-[279px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="onSave">完成</div>
        <!-- Inputs -->
        <div
          class="w-24 h-9 left-[219px] top-[112px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm flex items-center cursor-pointer"
          @click="openSelectStaffPanel"
        >
          <span class="truncate text-zinc-600">{{ form.staffName || '选择人员' }}</span>
        </div>
        <input
          v-model="form.deviceNumber"
          type="text"
          class="w-24 h-9 left-[219px] top-[160px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none"
          placeholder="设备号"
        />
        <input
          v-model="form.deviceName"
          type="text"
          class="w-24 h-9 left-[219px] top-[208px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none"
          placeholder="设备名称"
        />
      </div>
    </div>

    <!-- Select Staff Panel -->
    <div v-if="showSelectStaffPanel" class="fixed inset-0 z-[60] flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="showSelectStaffPanel = false"></div>
      <div class="relative">
        <div class="w-[507px] h-[806px] relative origin-center scale-75">
          <div class="w-[507px] h-[806px] left-0 top-0 absolute bg-white rounded-[54px] shadow-[0px_2px_2px_0px_rgba(76,76,76,0.25)] border border-gray-200"></div>
          <div class="w-96 h-[467px] left-[36px] top-[179px] absolute bg-white rounded-[19px] border border-gray-200"></div>
          <div class="left-[77px] top-[136px] absolute justify-start text-stone-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">员工</div>
          <div class="left-[215px] top-[136px] absolute justify-start text-stone-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">手机号</div>
          <!-- Dynamic staff list -->
          <div class="absolute left-[36px] top-[179px] w-96 h-[467px] overflow-y-auto">
            <div
              v-for="(s, idx) in staffList"
              :key="s.id || idx"
              class="relative flex items-center justify-between px-4 py-5 cursor-pointer hover:bg-neutral-50"
              :class="{ 'border-t border-neutral-200': idx !== 0 }"
              @click="selectStaff(s)"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
                <div class="text-zinc-800 text-xl">{{ s.name }}</div>
              </div>
              <div class="text-stone-500 text-xl">{{ s.phone || '-' }}</div>
            </div>
          </div>
          <div class="w-28 h-14 left-[80px] top-[695px] absolute bg-white rounded-2xl border border-stone-300"></div>
          <div class="w-28 h-14 left-[317px] top-[695px] absolute bg-white rounded-2xl border border-stone-300"></div>
          <div class="left-[104px] top-[706px] absolute justify-start text-zinc-800 text-2xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="prevStaffPage">上一页</div>
          <div class="left-[341px] top-[706px] absolute justify-start text-zinc-800 text-2xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="nextStaffPage">下一页</div>
          <div class="left-[222px] top-[709px] absolute justify-start text-neutral-600 text-xl font-medium font-['Alibaba_PuHuiTi']">第{{ staffPage }} / {{ staffTotal && staffPageSize ? Math.max(1, Math.ceil(staffTotal / staffPageSize)) : '—' }}页</div>
          <div class="left-[83px] top-[45px] absolute justify-start text-stone-900 text-3xl font-medium font-['Alibaba_PuHuiTi']">员工选择</div>
          <div class="w-4 h-7 left-[68.33px] top-[82px] absolute origin-top-left -rotate-180 bg-zinc-900"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'

const props = defineProps({
  groupId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'save', 'deviceAdded'])

const form = reactive({
  staffName: '',
  deviceNumber: '',
  deviceName: '',
})

const showSelectStaffPanel = ref(false)
const staffList = ref([])
const staffPage = ref(1)
const staffPageSize = ref(7)
const staffTotal = ref(null)
const selectedStaffId = ref('')

function openSelectStaffPanel() {
  showSelectStaffPanel.value = true
  staffPage.value = 1
  fetchStaffPage(1, staffPageSize.value)
}

async function fetchStaffPage(page = staffPage.value, limit = staffPageSize.value) {
  try {
    const res = await postForm(PATHS.STAFF_LIST, { 
      page: String(page), 
      limit: String(limit), 
      name: '' 
    })
    const data = res && res.data && res.data.data
    const rawList = (data && Array.isArray(data.staff_list)) ? data.staff_list : []
    staffList.value = rawList.map(it => ({
      id: it._id || it.id || '',
      name: it.name || '',
      phone: it.phone || '',
    }))
    const detectedTotal = data && data.total
    if (typeof detectedTotal === 'number' && detectedTotal >= 0) staffTotal.value = detectedTotal
    staffPage.value = page
    staffPageSize.value = limit
  } catch (e) {
    console.error('[PersonEditPanel] fetch staff page error:', e)
  }
}

function prevStaffPage() {
  if (staffPage.value <= 1) return
  const prev = Math.max(1, staffPage.value - 1)
  fetchStaffPage(prev, staffPageSize.value)
}

function nextStaffPage() {
  const totalPages = staffTotal.value != null && staffPageSize.value > 0 ? Math.max(1, Math.ceil(staffTotal.value / staffPageSize.value)) : null
  if (totalPages != null && staffPage.value >= totalPages) return
  const next = staffPage.value + 1
  fetchStaffPage(next, staffPageSize.value)
}

function selectStaff(item) {
  form.staffName = item.name
  selectedStaffId.value = item.id
  try {
    localStorage.setItem('staff_id', selectedStaffId.value || '')
  } catch (_) {}
  showSelectStaffPanel.value = false
}

async function onSave() {
  let staffId = ''
  try {
    staffId = localStorage.getItem('staff_id') || ''
  } catch (_) {}

  const deviceNumber = (form.deviceNumber || '').trim()
  const deviceName = (form.deviceName || '').trim()
  const payload = {
    type: 'add',
    data: JSON.stringify({
      device_number: deviceNumber,
      staff_id: staffId,
      device_name: deviceName,
      type: 'add',
      device_id: '',
      group_id: props.groupId || '',
    })
  }
  try {
    const res = await postForm(PATHS.DEVICE_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      console.log('[PersonEditPanel] device edit success:', res.data)
      emit('save', {
        staffName: form.staffName,
        deviceNumber,
        deviceName,
      })
      // Reset form
      form.staffName = ''
      form.deviceNumber = ''
      form.deviceName = ''
      selectedStaffId.value = ''
      emit('close')
      emit('deviceAdded')
    } else {
      alert('提交失败')
    }
  } catch (e) {
    console.error('[PersonEditPanel] device edit error:', e)
    alert('提交失败')
  }
}
</script>

<style scoped>
</style>
