<template>
  <div v-if="open" class="relative inline-block">
    <div class="relative rounded-[16px] bg-card border border-border p-5 w-[220px]" style="box-shadow: 0 8px 20px rgba(16,24,40,0.12)">
      <!-- Close button -->
      <button
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
        <div class="text-[14px] font-medium text-foreground">{{ person.identifier }}</div>
      </div>

      <!-- Inline bottom edit action (inside card) -->
      <div class="mt-3 flex items-center justify-center">
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
    <PersonEditPanel
      v-if="isEditing"
      :modelValue="person"
      @save="onSave"
      @close="isEditing = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref, watch, computed, onMounted, onUnmounted } from 'vue'
import PersonEditPanel from './PersonEditPanel.vue'

const props = defineProps({
  open: { type: Boolean, default: true },
  name: { type: String, default: 'Alice Doe' },
  role: { type: String, default: '在线' },
  identifier: { type: String, default: 'ID-01873' },
  email: { type: String, default: 'alice@example.com' },
  phone: { type: String, default: '138-0000-0000' },
  location: { type: String, default: '上海市 浦东新区' },
  avatarUrl: { type: String, default: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&q=80&auto=format&fit=crop' },
})

const emit = defineEmits(['edit', 'save', 'close'])

const isEditing = ref(false)
const person = reactive({
  name: props.name,
  role: props.role,
  identifier: props.identifier,
  periods: Array.isArray((props).periods) ? props.periods : [],
  avatarUrl: props.avatarUrl,
})

watch(
  () => ({
    name: props.name,
    role: props.role,
    identifier: props.identifier,
    avatarUrl: props.avatarUrl,
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
  isEditing.value = true
  emit('edit')
}

function onSave(updated) {
  Object.assign(person, updated)
  isEditing.value = false
  emit('save', updated)
}

function onCloseClick() {
  emit('close', person.identifier)
}
</script>

<style scoped>
</style>


