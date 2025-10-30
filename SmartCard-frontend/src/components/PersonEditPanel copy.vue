<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/20" @click="$emit('close')"></div>

    <!-- Panel -->
    <div class="relative z-10 w-[90%] max-w-[480px] rounded-[8px] bg-white border border-[#E5E5E5] p-6" style="box-shadow: 0 8px 20px rgba(16,24,40,0.12)">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between">
        <div class="text-[18px] font-semibold tracking-[-0.01em] text-black">编辑排班</div>
        <button class="w-8 h-8 rounded-full bg-white border border-[#DADADA] flex items-center justify-center" @click="$emit('close')">✕</button>
      </div>

      <!-- Body -->
      <div class="space-y-4">
        <div class="grid grid-cols-[120px_1fr] gap-4">
          <!-- Left: 时间段 buttons -->
          <div class="flex flex-col gap-2">
            <button
              v-for="(btn, idx) in 3"
              :key="idx"
              class="w-full rounded-[8px] border bg-white px-3 py-2 text-[14px] text-left hover:bg-[#F4F4F4] transition"
              :class="selectedPeriodIndex === idx ? 'border-[#007AFF] text-[#007AFF]' : 'border-[#DADADA] text-[rgba(0,0,0,0.80)]'"
              @click="selectPeriod(idx)"
            >
              时间段 {{ idx + 1 }}
            </button>
          </div>

          <!-- Right: Single editor for selected period -->
          <div class="space-y-2">
            <div class="text-[14px] font-semibold text-[rgba(0,0,0,0.80)]">时间段 {{ selectedPeriodIndex + 1 }}</div>
            <div class="flex items-center justify-center gap-2">
              <input v-model="form.periods[selectedPeriodIndex].start" type="time" class="w-[45%] rounded-[8px] border border-[#DADADA] bg-[#F9F9F9] px-3 py-2 text-[16px] text-center" />
              <span class="text-[16px] text-[rgba(0,0,0,0.65)]">→</span>
              <input v-model="form.periods[selectedPeriodIndex].end" type="time" class="w-[45%] rounded-[8px] border border-[#DADADA] bg-[#F9F9F9] px-3 py-2 text-[16px] text-center" />
            </div>
            <div class="grid grid-cols-[96px_1fr] items-center">
              <div class="text-[14px] font-medium text-[rgba(0,0,0,0.65)]">负责人</div>
              <input v-model="form.periods[selectedPeriodIndex].person" type="text" class="w-full rounded-[8px] border border-[#DADADA] bg-[#F9F9F9] px-3 py-2 text-[16px] text-right" placeholder="请输入负责人" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-[14px] font-medium text-[rgba(0,0,0,0.65)] mb-1">设备号</label>
          <input v-model="form.identifier" type="text" class="w-full rounded-[8px] border border-[#DADADA] bg-[#F9F9F9] px-3 py-2 text-[16px]" placeholder="设备标识" />
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-6 flex items-center justify-center gap-3">
        <button class="px-3 py-2 text-[14px] text-[rgba(0,0,0,0.65)]" @click="$emit('close')">取消</button>
        <button class="rounded-[24px] border border-[#DADADA] bg-white px-5 py-2 text-[14px] font-medium text-black hover:bg-[#F4F4F4] transition" @click="onSave">保存</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['save', 'close'])

function buildEmptyPeriods() {
  return [
    { start: '', end: '', person: '' },
    { start: '', end: '', person: '' },
    { start: '', end: '', person: '' },
  ]
}

const form = reactive({
  periods: Array.isArray(props.modelValue?.periods) && props.modelValue.periods.length === 3
    ? props.modelValue.periods.map(p => ({ start: p.start || '', end: p.end || '', person: p.person || '' }))
    : buildEmptyPeriods(),
  identifier: props.modelValue?.identifier ?? '',
})

const selectedPeriodIndex = ref(0)

function selectPeriod(index) {
  if (index < 0 || index > 2) return
  // primitive number assign works though reactive is overkill; left simple
  selectedPeriodIndex.value = index
}

watch(
  () => props.modelValue,
  (next) => {
    if (!next) return
    form.identifier = next.identifier ?? ''
    const incoming = Array.isArray(next.periods) ? next.periods : []
    const base = buildEmptyPeriods()
    for (let i = 0; i < 3; i++) {
      const src = incoming[i] || {}
      base[i].start = src.start || ''
      base[i].end = src.end || ''
      base[i].person = src.person || ''
    }
    form.periods = base
  },
  { deep: true }
)

function onSave() {
  const merged = { ...(props.modelValue || {}), periods: form.periods.map(p => ({ ...p })), identifier: form.identifier }
  emit('save', merged)
}
</script>

<style scoped>
</style>

