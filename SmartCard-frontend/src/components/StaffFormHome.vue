<template>
  
  <div
    class="relative rounded-[38px] border border-border bg-card shadow-md px-8 py-6"
    :style="containerStyle">
    <div class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">员工服务评分</div>
   
    <!-- Headers -->

    <div class="mt-6 grid items-center" :style="gridStyle">
      <div
        v-for="(h, i) in renderHeaders"
        :key="i"
        class="text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center">
        {{ h }}
      </div>
    </div>


    <!-- Divider under headers -->
    <div class="mt-6 h-0 shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>


    <!-- Rows in a scrollable container -->
    <div class="mt-4 max-h-[420px] overflow-y-auto pr-2" @scroll="onScroll">

      <div v-for="(row, rIdx) in staffRows" :key="row.id || rIdx" class="mb-4 grid items-center" :style="gridStyle">
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

  computed: {
    containerStyle() {
      return {
        width: '100%',
        minWidth: '800px'
      }
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.renderHeaders.length}, minmax(50px, 1fr))`,
        columnGap: `24px`,
      }
    },

    renderHeaders() {
      return ['姓名', '设备号', '岗位', '日均服务时间', '昨日差评事件', '评分', '详情']
    },
    renderFields() {
      return ['name', 'device_number', 'postion', 'day_time', 'day_bad_count', 'score', 'detail']
    }
  },
  data() {
    return {
      arrowIcon,

      staffPage: 1,
      staffLimit: 7,

      staffTotal: 0,
      staffRows: [],
    }
  },

  methods: {

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
    this.fetchStaff(true)
  },
 
}
</script>

<style scoped>
</style>


