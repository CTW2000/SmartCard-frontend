<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- backdrop -->
    <div class="absolute inset-0 bg-black/30" @click="$emit('close')"></div>

    <!-- panel -->
    <div class="relative z-10 w-[420px] max-w-[92vw] rounded-[12px] bg-white p-5 border border-[#E5E5E5]" style="box-shadow: 0 8px 24px rgba(16,24,40,0.18)">
      <div class="mb-4">
        <h2 class="m-0 text-[18px] font-bold tracking-[-0.01em] text-foreground">编辑设备</h2>
      </div>

      <div class="flex flex-col gap-3">
        <label class="flex flex-col gap-1">
          <span class="text-[14px] text-[rgba(0,0,0,0.65)]">设备名称</span>
          <input v-model="form.deviceName" type="text" class="h-[40px] rounded-[8px] border border-[#DADADA] px-3 text-[14px] outline-none" placeholder="请输入设备名称" />
        </label>

        <label class="flex flex-col gap-1">
          <span class="text-[14px] text-[rgba(0,0,0,0.65)]">设备号</span>
          <input v-model="form.identifier" type="text" class="h-[40px] rounded-[8px] border border-[#DADADA] px-3 text-[14px] outline-none" placeholder="请输入设备号" />
        </label>

        <label class="flex flex-col gap-1">
          <span class="text-[14px] text-[rgba(0,0,0,0.65)]">绑定人员</span>
          <input v-model="form.name" type="text" class="h-[40px] rounded-[8px] border border-[#DADADA] px-3 text-[14px] outline-none" placeholder="请输入绑定人员" />
        </label>
      </div>

      <div class="mt-5 flex items-center justify-end gap-3">
        <button class="h-[40px] rounded-[8px] border px-4 text-[14px] bg-white border-[#DADADA]" @click="$emit('close')">取消</button>
        <button class="h-[40px] rounded-[8px] px-4 text-[14px] text-white" style="background:#007AFF" @click="onSave">完成</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['save', 'close'])

const form = reactive({
  deviceName: props.modelValue.deviceName || '',
  identifier: props.modelValue.identifier || '',
  name: props.modelValue.name || '',
})

watch(() => props.modelValue, (v) => {
  form.deviceName = (v && v.deviceName) || ''
  form.identifier = (v && v.identifier) || ''
  form.name = (v && v.name) || ''
}, { deep: true })

function onSave() {
  emit('save', { ...props.modelValue, ...form })
}
</script>

<style scoped>
</style>

