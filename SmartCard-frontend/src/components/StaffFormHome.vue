<template>
  <div
    class="relative rounded-[38px] border border-border bg-card shadow-md px-8 py-6"
    :style="{ width: containerWidth + 'px' }"
  >
    <div class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">{{ title }}</div>
    <!-- Headers -->
    <div class="mt-6 grid items-center" :style="gridStyle">
      <div
        v-for="(h, i) in renderHeaders"
        :key="i"
        class="text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center"
      >
        {{ displayHeader(h) }}
      </div>
    </div>

    <!-- Divider under headers -->
    <div class="mt-6 h-0 shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>

    <!-- Rows in a scrollable container -->
    <div class="mt-4 max-h-[420px] overflow-y-auto pr-2" @scroll="onScroll">
      <div v-for="(row, rIdx) in (staffRows.length ? staffRows : rows)" :key="row.id || rIdx" class="mb-4 grid items-center" :style="gridStyle">
        <div
          v-for="(field, cIdx) in renderFields"
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
  </div>
  
</template>

<script>
import arrowIcon from '../../Resource/Staff/arrow.svg'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
export default {
  name: 'StaffFormHome',
  components: { },
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
      const n = Array.isArray(this.renderHeaders) ? this.renderHeaders.length : 0
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
    },
    renderHeaders() {
      if (this.staffRows && this.staffRows.length) {
        return ['姓名', '设备编号', '岗位', '日均服务时间', '每周差评事件', '评分', '详情']
      }
      return Array.isArray(this.headers) ? this.headers : []
    },
    renderFields() {
      if (this.staffRows && this.staffRows.length) {
        return ['name', 'device_number', 'postion', 'day_time', 'day_bad_count', 'score', 'detail']
      }
      return Array.isArray(this.fields) ? this.fields : []
    }
  },
  data() {
    return {
      arrowIcon,
      staffPage: 1,
      staffLimit: 7,
      staffTotal: 0,
      staffRows: []
    }
  },
  methods: {
    displayHeader(h) {
      if (h === '详情') {
        return '服务报告'
      }
      return h
    },
    isCenteredIndex(i) {
      const header = this.headers && this.headers[i]
      return header === '日均服务时间' || header === '每周差评事件'
    },
    async fetchStaff(reset = false) {
      try {
        const form = { page: this.staffPage, limit: this.staffLimit }
        const res = await postForm(PATHS.MANAGE_INDEX_STAFF, form)
        if (res && res.status >= 200 && res.status < 300) {
          const data = res.data && res.data.data
          const list = (data && Array.isArray(data.result)) ? data.result : []
          this.staffTotal = (data && Number(data.total)) || 0
          const mapped = list.map(it => ({
            id: it._id,
            name: it.name,
            device_number: it.device_number,
            postion: it.postion,
            day_time: it.day_time,
            day_bad_count: it.day_bad_count,
            score: it.score,
            detail: '详情'
          }))
          if (reset) this.staffRows = mapped
          else this.staffRows = [...this.staffRows, ...mapped]
          // Read-only component: do not persist to localStorage
        }
      } catch (e) {
        // noop
      }
    },
    onScroll(e) {
      const el = e.target
      if (!el) return
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8
      const hasMore = this.staffRows.length < this.staffTotal
      if (nearBottom && hasMore) {
        this.staffPage += 1
        this.fetchStaff(false)
      }
    }
  },
  mounted() {
    // If fields/headers are not provided from parent, set sensible defaults matching API
    if (!Array.isArray(this.headers) || this.headers.length === 0) {
      this.headers = ['姓名', '设备编号', '岗位', '日均服务时间', '每周差评事件', '评分', '详情']
    }
    if (!Array.isArray(this.fields) || this.fields.length === 0) {
      this.fields = ['name', 'device_number', 'postion', 'day_time', 'day_bad_count', 'score', 'detail']
    }
    this.fetchStaff(true)
  }
}
</script>

<style scoped>
</style>


