<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center">

    <div class="absolute inset-0 bg-black/30" @click="close"></div>

    <div class="relative">
      <div class="w-[507px] h-[806px] relative origin-center scale-75">
        <div class="w-[507px] h-[806px] left-0 top-0 absolute bg-white rounded-[54px] shadow-[0px_2px_2px_0px_rgba(76,76,76,0.25)] border border-gray-200"></div>
        <div class="w-96 h-[467px] left-[36px] top-[179px] absolute bg-white rounded-[19px] border border-gray-200"></div>
        <div class="left-[77px] top-[136px] absolute justify-start text-stone-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">员工</div>
        <div class="left-[320px] top-[136px] absolute justify-start text-stone-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">手机号</div>

        <div class="absolute left-[36px] top-[179px] w-96 h-[467px] overflow-y-auto">
         
            <div
            v-for="(s, idx) in staffList"
            :key="s.id || idx"
            class="relative flex items-center justify-between px-4 py-5 cursor-pointer hover:bg-neutral-50"
            :class="{ 'border-t border-neutral-200': idx !== 0 }"
            @click="onSelect(s)"
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
        <div class="left-[222px] top-[709px] absolute justify-start text-neutral-600 text-xl font-medium font-['Alibaba_PuHuiTi']">
          第{{ staffPage }} / {{ staffTotal && staffPageSize ? Math.max(1, Math.ceil(staffTotal / staffPageSize)) : '—' }}页
        </div>
        <div class="left-[83px] top-[45px] absolute justify-start text-stone-900 text-3xl font-medium font-['Alibaba_PuHuiTi']">员工选择</div>
      </div>
    </div>
  </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'

const emit = defineEmits(['close', 'select'])

const staffList = ref([])

const staffPage = ref(1)
const staffPageSize = ref(10)
const staffTotal = ref(null)

function close() {
  emit('close')
}

function onSelect(item) {
  emit('select', {
    id: item.id,
    name: item.name,
    phone: item.phone,
  })
  emit('close')
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
  const totalPages = staffTotal.value != null && staffPageSize.value > 0
    ? Math.max(1, Math.ceil(staffTotal.value / staffPageSize.value))
    : null
  if (totalPages != null && staffPage.value >= totalPages) return
  const next = staffPage.value + 1
  fetchStaffPage(next, staffPageSize.value)
}



onMounted(() => {
  fetchStaffPage(1, staffPageSize.value)
})
</script>

<style scoped>
</style>


