<template>
  <div class="rounded-[16px] border border-border bg-card shadow-md p-6 grid grid-cols-1 gap-3 max-w-[520px]">
    <h3 class="m-0 mb-2 text-[28px] font-extrabold tracking-[-0.02em] text-foreground">{{ title }}</h3>

    <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
      <div class="chart-wrap relative inline-block" :style="{ width: size + 'px', height: size + 'px' }" @mouseleave="active = null">
        <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
          <circle :cx="c" :cy="c" :r="r" fill="none" :stroke="borderColor" :stroke-width="thickness" />
          <g v-for="(s, i) in segments" :key="i">
            <circle
              :cx="c" :cy="c" :r="r"
              fill="none"
              :stroke="s.color"
              :stroke-width="thickness"
              stroke-linecap="butt"
              :stroke-dasharray="`${s.len} ${circ - s.len}`"
              :stroke-dashoffset="-s.offset"
              class="cursor-pointer"
              @mouseenter="onEnter(i, $event)"
              @mousemove="onMove($event)"
            />
          </g>
        </svg>

        <div v-if="active !== null" class="absolute -translate-y-full bg-[#111827] text-white text-[13px] md:text-sm px-2 py-1.5 rounded-md whitespace-nowrap pointer-events-none shadow-sm" :style="{ left: tipX + 'px', top: tipY + 'px' }">
          <div class="opacity-90">{{ items[active].name }}</div>
          <div class="font-bold">{{ pct(items[active].value) }}</div>
        </div>
      </div>

      <ul class="list-none p-0 m-0 md:mt-0 mt-1 min-w-[200px]">
        <li v-for="(it, i) in items" :key="it.name" class="flex items-center gap-2.5 py-2 text-muted-foreground text-base">
          <span class="inline-block w-2.5 h-2.5 rounded-full" :style="{ background: it.color }"></span>
          <span class="mr-2">{{ labelNo(i) }}：{{ it.name }}</span>
          <strong class="text-foreground font-extrabold text-base md:text-lg">{{ pct(it.value) }}</strong>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
<script setup lang="ts">
  import { computed, ref } from 'vue'
  
  type Item = { name: string; value: number; color?: string }
  
  const props = withDefaults(defineProps<{
    title?: string
    items?: Item[]
    size?: number
    thickness?: number
  }>(), {
    title: '菜品关注度',
    // defaults match the screenshot style (50/30/20 with reds)
    items: () => ([
      { name: '菜一', value: 50, color: '#ffb5b9' },
      { name: '菜二', value: 30, color: '#ff7a81' },
      { name: '菜三', value: 20, color: '#f23a36' },
    ]),
    size: 180,
    thickness: 45,
  })
  
  const items = computed<Item[]>(() =>
    props.items!.map((it, i) => ({
      ...it,
      color: it.color ?? ['#ffb5b9', '#ff7a81', '#f23a36', '#e64545'][i % 4],
    }))
  )
  
  const total = computed(() => items.value.reduce((s, i) => s + i.value, 0))
  const pct = (v: number) => `${Math.round((v / total.value) * 100)}%`
  
  // geometry
  const size = computed(() => props.size!)
  const c = computed(() => size.value / 2)
  const r = computed(() => c.value - props.thickness! / 2)
  const circ = computed(() => 2 * Math.PI * r.value)
  const borderColor = computed(() => getComputedStyle(document.documentElement).getPropertyValue('--color-border') || '#EEF1F5')
  
  // convert values to dash arrays
  const segments = computed(() => {
    let acc = 0
    return items.value.map((it) => {
      const len = (it.value / total.value) * circ.value
      const seg = { len, offset: acc, color: it.color as string }
      acc += len
      return seg
    })
  })
  
  // tooltip state
  const active = ref<number | null>(null)
  const tipX = ref(0)
  const tipY = ref(0)
  
  function onEnter(i: number, e: MouseEvent) {
    active.value = i
    onMove(e)
  }
  function onMove(e: MouseEvent) {
    const el = (e.currentTarget as Element).closest('.chart-wrap') as HTMLElement
    if (!el) return
    const rect = el.getBoundingClientRect()
    tipX.value = e.clientX - rect.left + 10
    tipY.value = e.clientY - rect.top + 10
  }
  
  const labelNo = (i: number) => String(i + 1).padStart(2, '0')
  </script>
  
  <style scoped>
  </style>
  