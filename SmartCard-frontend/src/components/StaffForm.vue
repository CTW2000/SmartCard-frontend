<template>
  <div
    class="relative rounded-[38px] border border-border bg-card shadow-md px-8 py-6"
    :style="{ width: containerWidth + 'px' }"
  >
    <div class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">{{ title }}</div>

    <!-- Edit button: top-right corner -->
    <template v-if="!isEditing">
      <button
        type="button"
        class="absolute right-6 top-6 cursor-pointer"
        @click="onEditClick"
        aria-label="编辑员工信息"
      >
        <span class="relative block w-[42px] h-[42px]">
          <img :src="circleIcon" alt="edit-bg" class="w-[42px] h-[42px]" />
          <img :src="pencilIcon" alt="edit" class="w-[20px] h-[20px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </span>
      </button>
    </template>
    <template v-else>
      <div class="absolute right-6 top-6 flex items-center gap-2">
        <!-- Add button -->
        <button
          type="button"
          class="relative block w-[42px] h-[42px] cursor-pointer"
          @click="onAddClick"
          aria-label="新增员工信息"
        >
          <img :src="blackBgIcon" alt="add-bg" class="w-[42px] h-[42px]" />
          <img :src="whiteCrossIcon" alt="add" class="w-[24px] h-[24px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
        <!-- Accomplish button -->
        <button
          type="button"
          class="relative block w-[78px] h-[42px] cursor-pointer"
          @click="onAccomplishClick"
          aria-label="完成编辑"
        >
          <img :src="blackBgIcon" alt="done-bg" class="w-[78px] h-[42px]" />
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base">完成</span>
        </button>
      </div>
    </template>

    <!-- Modal: Add Staff Info -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="relative">
        <add-staff-info />
        <button
          type="button"
          class="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-white shadow hover:bg-neutral-100"
          @click="showAddModal = false"
          aria-label="关闭"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Headers -->
    <div class="mt-6 grid items-center" :style="gridStyle">
      <div
        v-for="(h, i) in headers"
        :key="i"
        class="text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center"
      >
        {{ displayHeader(h) }}
      </div>
    </div>

    <!-- Divider under headers -->
    <div class="mt-6 h-0 shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>

    <!-- Rows -->
    <div v-for="(row, rIdx) in rows" :key="row.id || rIdx" class="mt-4 grid items-center" :style="gridStyle">
      <div
        v-for="(field, cIdx) in fields"
        :key="cIdx"
        class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center"
      >
        <template v-if="field === 'detail'">
          <button
            type="button"
            class="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-100"
            @click="$emit('rowAction', row)"
            aria-label="查看服务报告"
          >
            <img :src="arrowIcon" alt="查看" class="w-[22px] h-[22px]" />
          </button>
        </template>
        <template v-else>
          {{ row[field] }}
        </template>
      </div>
    </div>
  </div>
  
</template>

<script>
import circleIcon from '../../Resource/Staff/Circle.svg'
import pencilIcon from '../../Resource/Staff/Pencil.svg'
import arrowIcon from '../../Resource/Staff/arrow.svg'
import blackBgIcon from '../../Resource/Staff/blackBG.svg'
import whiteCrossIcon from '../../Resource/Staff/whiteCross.svg'
import AddStaffInfo from './addStaffInfo.vue'
export default {
  name: 'StaffForm',
  components: { AddStaffInfo },
  props: {
    title: { type: String, default: '' },
    headers: { type: Array, default: () => [] },
    fields: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    // optional customization
    columnWidthPx: { type: Number, default: 200 },
    columnGapPx: { type: Number, default: 24 },
    sidePaddingPxTotal: { type: Number, default: 64 }, // px-8 => 32px left + 32px right
    // Fit control to keep many columns within screen/container
    maxContentWidthPx: { type: Number, default: 1136 }, // Home max-w-[1200px] with px-8 container padding
    minColumnWidthPx: { type: Number, default: 130 },
    minGapPx: { type: Number, default: 8 },
  },
  computed: {
    columnCount() {
      const n = Array.isArray(this.headers) ? this.headers.length : 0
      return Math.max(1, n)
    },
    effectiveMeasures() {
      const cols = this.columnCount
      const baseCol = this.columnWidthPx
      const baseGap = this.columnGapPx
      const available = Math.max(0, this.maxContentWidthPx - this.sidePaddingPxTotal)
      let gap = baseGap
      let col = baseCol
      // If base layout fits, return it
      if (col * cols + gap * (cols - 1) <= available) {
        return { col, gap }
      }
      // First, shrink gaps down to minGapPx if needed
      const minGap = this.minGapPx
      const totalWithMinGap = col * cols + minGap * (cols - 1)
      if (totalWithMinGap <= available) {
        // compute exact gap to perfectly fit
        gap = (available - col * cols) / Math.max(1, (cols - 1))
        gap = Math.max(minGap, Math.min(baseGap, Math.floor(gap)))
        return { col, gap }
      }
      // Then shrink columns down to minColumnWidthPx, keep gap at minGap
      gap = minGap
      const minCol = this.minColumnWidthPx
      col = Math.max(minCol, Math.floor((available - gap * (cols - 1)) / Math.max(1, cols)))
      return { col, gap }
    },
    containerWidth() {
      const { col, gap } = this.effectiveMeasures
      return this.sidePaddingPxTotal + col * this.columnCount + gap * (this.columnCount - 1)
    },
    gridStyle() {
      const { col, gap } = this.effectiveMeasures
      return {
        gridTemplateColumns: `repeat(${this.columnCount}, ${col}px)`,
        columnGap: `${gap}px`,
      }
    }
  },
  data() {
    return { circleIcon, pencilIcon, arrowIcon, blackBgIcon, whiteCrossIcon, isEditing: false, showAddModal: false }
  },
  methods: {
    onEditClick() {
      this.isEditing = !this.isEditing
      this.$emit('edit')
    },
    onAddClick() {
      this.showAddModal = true
      this.$emit('add')
    },
    onAccomplishClick() {
      this.isEditing = false
      this.$emit('accomplish')
    },
    displayHeader(h) {
      if (h === '详情') {
        return this.isEditing ? '信息详情' : '服务报告'
      }
      return h
    },
    isCenteredIndex(i) {
      const header = this.headers && this.headers[i]
      return header === '日均服务时间' || header === '每周差评事件'
    }
  }
}
</script>

<style scoped>
</style>


