<template>
  <div v-if="open" class="relative inline-block">
    <div class="relative rounded-[16px] bg-card border border-border p-5 w-[220px]" style="box-shadow: 0 8px 20px rgba(16,24,40,0.12)">
      <!-- Close button -->
      <button
        v-if="editMode"
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center"
        style="border-color: rgba(0,0,0,0.16)"
        aria-label="Close"
        @click="onCloseClick"
      >
        ✕
      </button>

      <!-- Portrait + Title -->
      <div class="flex flex-col items-center">
        <img :src="person.avatarUrl || props.avatarUrl" alt="avatar" class="w-[96px] h-[96px] rounded-full object-cover ring-2" style="--tw-ring-color: rgba(0,0,0,0.08)" />
        <h3 class="mt-1 mb-2 text-[18px] font-bold tracking-[-0.01em] text-foreground text-center max-w-[260px]">{{ displayName }}</h3>
      </div>

      <!-- Divider -->
      <div class="h-px my-3" style="background: rgba(0,0,0,0.08)"></div>

      <!-- Minimal info list -->
      <div class="grid grid-cols-[96px_1fr] gap-y-2 items-baseline">
        <div class="text-[14px] font-semibold text-[rgba(15,23,42,0.65)]">在线状态</div>
        <div class="text-[14px] font-medium text-foreground">{{ person.role }}</div>

        <div class="text-[14px] font-semibold text-[rgba(15,23,42,0.65)]">设备号</div>
        <div class="text-[14px] font-medium text-foreground">{{ person.deviceName || person.identifier }}</div>
      </div>

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

    <!-- Edit Panel -->
    <DeviceEditPanel
      v-if="isEditing"
      :modelValue="person"
      @save="onSave"
      @close="isEditing = false"
    />
    <!-- Modal: Edit Device (same layout as add staff info panel) -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="showEditModal = false"></div>
      <div class="relative">
        <div class="w-96 h-80 relative">
          <div class="w-96 h-80 left-0 top-0 absolute bg-white rounded-[31px]"></div>
          <div class="w-64 h-0 left-[53px] top-[93px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          <div class="left-[54px] top-[117px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">绑定人员</div>
          <div class="left-[54px] top-[165px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备号</div>
          <div class="left-[53px] top-[214px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备名称</div>
          <div class="left-[51px] top-[37px] absolute justify-start text-black text-2xl font-normal font-['Alibaba_PuHuiTi']">编辑设备</div>
          <div class="w-28 h-10 left-[129px] top-[272px] absolute bg-white rounded-[20px] border border-zinc-300"></div>
          <div class="left-[164px] top-[279px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="submitEditDevice">完成</div>

          <!-- Inputs -->
          <div
            class="w-24 h-9 left-[219px] top-[112px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm flex items-center cursor-pointer"
            @click="openSelectStaffPanel"
          >
            <span class="truncate text-zinc-600">{{ editForm.staffName || person.name || '选择人员' }}</span>
          </div>
          <input
            v-model="editForm.deviceNumber"
            type="text"
            readonly
            aria-readonly="true"
            class="w-24 h-9 left-[219px] top:[160px] top-[160px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none bg-gray-100 cursor-not-allowed"
            placeholder="设备号"
          />
          <input
            v-model="editForm.deviceName"
            type="text"
            class="w-24 h-9 left-[219px] top-[208px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none"
            placeholder="设备名称"
          />
        </div>
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
import { reactive, ref, watch, computed, onMounted, onUnmounted } from 'vue'
import DeviceEditPanel from './DeviceEditPanel.vue'
import AvatarMan from '../../Resource/Staff/AvatarMan.svg'
import AvatarMan1 from '../../Resource/Staff/AvatarMan1.svg'
import AvatarWoman from '../../Resource/Staff/AvatarWoman.svg'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'

const props = defineProps({
  open: { type: Boolean, default: true },
  name: { type: String, default: 'Alice Doe' },
  role: { type: String, default: '在线' },
  identifier: { type: String, default: 'ID-01873' },
  email: { type: String, default: 'alice@example.com' },
  phone: { type: String, default: '138-0000-0000' },
  location: { type: String, default: '上海市 浦东新区' },
  avatarUrl: { type: String, default: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&q=80&auto=format&fit=crop' },
  editMode: { type: Boolean, default: false },
  organizeId: { type: String, default: '' },
  groupId: { type: String, default: '' },
  deviceNumber: { type: String, default: '' },
  deviceName: { type: String, default: '' },
  deviceId: { type: String, default: '' },
  staffId: { type: String, default: '' },
})

const emit = defineEmits(['edit', 'save', 'close', 'updated'])

const isEditing = ref(false)
const showEditModal = ref(false)
const avatarPool = [AvatarMan, AvatarMan1, AvatarWoman]
const randomAvatarUrl = avatarPool[Math.floor(Math.random() * avatarPool.length)]

const person = reactive({
  name: props.name,
  role: props.role,
  identifier: props.identifier,
  periods: Array.isArray((props).periods) ? props.periods : [],
  avatarUrl: randomAvatarUrl,
  organizeId: props.organizeId,
  groupId: props.groupId,
  deviceNumber: props.deviceNumber,
  deviceName: props.deviceName,
  deviceId: props.deviceId,
  staffId: props.staffId,
})

watch(
  () => ({
    name: props.name,
    role: props.role,
    identifier: props.identifier,
    organizeId: props.organizeId,
    groupId: props.groupId,
    deviceNumber: props.deviceNumber,
    deviceName: props.deviceName,
    deviceId: props.deviceId,
    staffId: props.staffId,
  }),
  (next) => {
    Object.assign(person, next)
  }
)

function parseTimeToMinutes(hhmm) {
  if (!hhmm || typeof hhmm !== 'string') return null
  const parts = hhmm.split(':')
  if (parts.length !== 2) return null
  const h = Number(parts[0])
  const m = Number(parts[1])
  if (Number.isNaN(h) || Number.isNaN(m)) return null
  if (h < 0 || h > 23 || m < 0 || m > 59) return null
  return h * 60 + m
}

function isNowInRange(nowMin, startMin, endMin) {
  if (startMin == null || endMin == null) return false
  if (startMin === endMin) return false
  if (startMin < endMin) {
    return nowMin >= startMin && nowMin < endMin
  }
  return nowMin >= startMin || nowMin < endMin
}

function getNowMinutes() {
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

const nowMinutes = ref(getNowMinutes())
let timerId = null

onMounted(() => {
  timerId = setInterval(() => {
    nowMinutes.value = getNowMinutes()
  }, 60000)
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})

const displayName = computed(() => {
  const periods = Array.isArray(person.periods) ? person.periods : []
  for (let i = 0; i < periods.length; i++) {
    const p = periods[i] || {}
    const s = parseTimeToMinutes(p.start)
    const e = parseTimeToMinutes(p.end)
    if (isNowInRange(nowMinutes.value, s, e)) {
      if (typeof p.person === 'string' && p.person.trim().length > 0) {
        return p.person.trim()
      }
    }
  }
  return person.name
})

function onEditClick() {
  // Open edit modal similar to add staff panel
  // Prefer the in-card state (person) which reflects latest API-loaded data
  editForm.deviceNumber = person.deviceNumber || person.identifier || props.deviceNumber || props.identifier || ''
  editForm.deviceName = person.deviceName || props.deviceName || ''
  editForm.staffId = person.staffId || props.staffId || ''
  editForm.groupId = person.groupId || props.groupId || ''
  editForm.deviceId = person.deviceId || props.deviceId || ''
  editForm.staffName = person.name || ''
  showEditModal.value = true
}

function onSave(updated) {
  Object.assign(person, updated)
  isEditing.value = false
  emit('save', updated)
}

async function onCloseClick() {
  // Call API to delete the device
  const payload = {
    type: 'delete',
    data: JSON.stringify({
      device_number: person.deviceNumber || person.identifier || props.deviceNumber || props.identifier || '',
      staff_id: person.staffId || props.staffId || '',
      device_name: person.deviceName || props.deviceName || '',
      type: 'delete',
      device_id: person.deviceId || props.deviceId || '',
      group_id: person.groupId || props.groupId || '',
    })
  }
  
  try {
    const res = await postForm(PATHS.DEVICE_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      // Emit close event with identifier for parent to remove from list
      emit('close', person.identifier)
      // Emit updated event to refresh the page
      emit('updated')
    } else {
      alert('删除失败')
    }
  } catch (e) {
    console.error('[PersonCard] delete device error:', e)
    alert('删除失败')
  }
}

// Edit modal state and submit
const editForm = reactive({
  deviceNumber: '',
  deviceName: '',
  staffId: '',
  groupId: '',
  deviceId: '',
  staffName: '',
})

async function submitEditDevice() {
  const payload = {
    type: 'update',
    data: JSON.stringify({
      device_number: (editForm.deviceNumber || '').trim(),
      staff_id: (editForm.staffId || '').trim(),
      device_name: (editForm.deviceName || '').trim(),
      type: 'update',
      device_id: (editForm.deviceId || '').trim(),
      group_id: (editForm.groupId || '').trim(),
    })
  }
  
  try {
    const res = await postForm(PATHS.DEVICE_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      // Update card view
      person.identifier = editForm.deviceNumber
      person.deviceNumber = editForm.deviceNumber
      person.deviceName = editForm.deviceName
      person.name = editForm.staffName || person.name
      person.staffId = editForm.staffId || person.staffId
      showEditModal.value = false
      emit('save', { identifier: person.identifier, device_name: editForm.deviceName, device_number: editForm.deviceNumber, staff_id: editForm.staffId })
      emit('updated')
    }
  } catch (_) {}
}

// Staff selection logic
const showSelectStaffPanel = ref(false)
const staffList = ref([])
const staffPage = ref(1)
const staffPageSize = ref(7)
const staffTotal = ref(null)

function openSelectStaffPanel() {
  showSelectStaffPanel.value = true
  staffPage.value = 1
  fetchStaffPage(staffPage.value, staffPageSize.value)
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
  } catch (e) {}
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
  editForm.staffName = item.name
  editForm.staffId = item.id
  showSelectStaffPanel.value = false
}
</script>

<style scoped>
</style>



