<template>
  <div class="relative rounded-[38px] border border-border bg-card shadow-md px-8 py-6 w-full" :style="containerStyle">
    <div class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">员工服务评分</div>
   
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
      
      <div class="relative flex flex-col items-center">

        <add-staff-info @staff-added="onStaffAdded" />

        <button type="button" class="mt-3 ml-4 cursor-pointer" @click="showAddModal = false" aria-label="关闭">
          
          <img :src="closeIcon" alt="关闭" class="w-[42px] h-[42px]" />
        </button>
      </div>
    </div>


    <!-- Modal: Update Staff Info (edit mode detail) -->
    <div v-if="showUpdateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="relative flex flex-col items-center">

        <updata-staff-info :staff="selectedStaff" @close="showUpdateModal = false" @updated="onStaffUpdated" />

        <button type="button" class="mt-3 ml-4 cursor-pointer" @click="showUpdateModal = false" aria-label="关闭">
          <img :src="closeIcon" alt="关闭" class="w-[42px] h-[42px]" />
        </button>
      </div>
    </div>


    <!-- Headers -->
    <div class="mt-6 grid items-center" :style="gridStyle">
      <div
        v-for="(h, i) in renderHeaders":key="i" 
        class="text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center">
        {{ h }}
      </div>
    </div>


    <!-- Divider under headers -->
    <div class="mt-3 h-0 shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)]
     outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>



    <!-- Rows in a scrollable container -->
    <div class="mt-4 max-h-[420px] overflow-y-auto pr-2">

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
              @click="onRowDetailClick(row)"
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
    

    <!-- Pagination controls -->
    <div class="mt-4 flex items-center justify-center">

      <div class="flex items-center gap-3">
        
        <button
          type="button"
          class="px-3 py-1 rounded-md border border-neutral-200 text-lg disabled:opacity-50"
          :disabled="!canGoPrev"
          @click="prevPage"
          aria-label="上一页"
        >
          上一页
        </button>

        <span class="text-neutral-700 text-lg">
          第 {{ currentPage }} / {{ totalPagesDisplay }} 页
        </span>

        <button
          type="button"
          class="px-3 py-1 rounded-md border border-neutral-200 text-lg disabled:opacity-50"
          :disabled="!canGoNext"
          @click="nextPage"
          aria-label="下一页"
        >
          下一页
        </button>
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
import closeIcon from '../../Resource/Staff/Close.svg'


import AddStaffInfo from './addStaffInfo.vue'
import UpdataStaffInfo from './updataStaffInfo.vue'


import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'


export default {
  name: 'StaffForm',
  components: { AddStaffInfo, UpdataStaffInfo },
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
      return ['姓名', '设备号', '岗位', '日均服务时间', '昨日差评事件', '评分', '信息详情']
    },

    renderFields() {
      return ['name', 'device_number', 'postion', 'day_time', 'day_bad_count', 'score', 'detail']
    },

    totalPages() {
      if (typeof this.totalItems === 'number' && this.totalItems > 0 && this.pageSize > 0) {
        return Math.max(1, Math.ceil(this.totalItems / this.pageSize))
      }
      return null
    },

    totalPagesDisplay() {
      return this.totalPages != null ? this.totalPages : '—'
    },

    totalItemsDisplay() {
      return (typeof this.totalItems === 'number' && this.totalItems >= 0) ? this.totalItems : ''
    },

    canGoPrev() {
      return this.currentPage > 1
    },

    canGoNext() {
      if (this.totalPages != null) {
        return this.currentPage < this.totalPages
      }
      // Fallback when total unknown: allow next if current page seems full
      return Array.isArray(this.staffRows) && this.staffRows.length >= this.pageSize
    }
  },

  data() {
    return {
      circleIcon,
      pencilIcon,
      arrowIcon,
      blackBgIcon,
      whiteCrossIcon,
      closeIcon,

      isEditing: false,
      showAddModal: false,
      showUpdateModal: false,

      staffRows: [],
      selectedStaff: null,

      currentPage: 1,
      pageSize: 7,
      totalItems: null,
    }


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

    onRowDetailClick(row) {
      if (this.isEditing) {
        // Find full staff data from localStorage and pass to update panel
        let full = null

        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            const raw = window.localStorage.getItem('staff_score_list')
            const arr = raw ? JSON.parse(raw) : []
            if (Array.isArray(arr)) {
              full = arr.find(it => (
                (it && it._id === row.id) ||
                (it && it.device_id && it.device_id.device_number === row.device_number) ||
                (it && it.device_number === row.device_number) ||
                (it && it.staff_id && it.staff_id.name === row.name) ||
                (it && it.name === row.name)
              )) || null
            }
          }
        } catch (e) {
          console.error('[StaffForm] read staff_score_list failed:', e)
        }
        let sexLabel = ''
        if (full) {
          const s = (full.sex != null ? full.sex : (full.staff_id && full.staff_id.sex))
          if (s === 1 || s === '1' || s === '男' || s === 'male' || s === 'Male' || s === 'M') {
            sexLabel = '男'
          } else if (s === 2 || s === '2' || s === '女' || s === 'female' || s === 'Female' || s === 'F') {
            sexLabel = '女'
          }
        }
        const normalized = {
          id: (full && full._id) || row.id || '',
          name: (full && full.staff_id && full.staff_id.name) || (full && full.name) || row.name || '',
          device_number: (full && full.device_id && full.device_id.device_number) || (full && full.device_number) || row.device_number || '',
          postion: (full && full.staff_id && full.staff_id.postion) || (full && full.postion) || row.postion || '',
          phone: (full && (full.phone || (full.staff_id && full.staff_id.phone))) || '',
          sex: sexLabel,
          // Pass staff_id._id for update API usage
          staff_id: {
            _id: (full && full.staff_id && (full.staff_id._id || full.staff_id.id || full.staff_id)) || ''
          }
        }
        this.selectedStaff = normalized

        this.showUpdateModal = true



      } else {
        this.$emit('rowAction', row)
      }
    },

    fetchRows(page = this.currentPage, size = this.pageSize) {

      const params = { page, size }

      return postForm(PATHS.STAFF_SCORE_LIST, params)

        .then(res => {

          const data = res && res.data && res.data.data

          const rawStaffList = (data && Array.isArray(data.staff_score_list)) ? data.staff_score_list : []
          
          try {
            if (typeof window !== 'undefined' && window.localStorage) {
              window.localStorage.setItem('staff_score_list', JSON.stringify(rawStaffList))
            }
          } catch (e) {
            console.error('[StaffForm] localStorage set staff_score_list failed:', e)
          }

          let list = rawStaffList
          if ((!list || list.length === 0) && data && Array.isArray(data.result)) {
            list = data.result
          }
          const detectedTotal = data && (
            data.total ?? data.total_count ?? data.count ?? data.page_total ?? data.totalRows
          )
          this.totalItems = (typeof detectedTotal === 'number' && detectedTotal >= 0) ? detectedTotal : this.totalItems
          this.staffRows = Array.isArray(list) ? list.map(it => ({
            id: it._id,
            name: (it.staff_id && it.staff_id.name) || it.name || '',
            device_number: (it.device_id && it.device_id.device_number) || it.device_number || '',
            postion: (it.staff_id && it.staff_id.postion) || it.postion || '',
            day_time: (it.day_work_time != null ? it.day_work_time : it.day_time) || 0,
            day_bad_count: it.day_bad_count || 0,
            score: (it.staff_score != null ? it.staff_score : it.score) || 0,
            detail: '详情'
          })) : []
          this.currentPage = page
          this.pageSize = size
        })

        .catch(err => {
          console.error('[StaffForm] staff score list error:', err)
        })
    },

    prevPage() {
      if (!this.canGoPrev) return
      const prev = Math.max(1, this.currentPage - 1)
      this.fetchRows(prev, this.pageSize)
    },
    nextPage() {
      if (!this.canGoNext) return
      const next = this.currentPage + 1
      this.fetchRows(next, this.pageSize)
    },


    onStaffUpdated() {
      // Ensure modal closed and refresh the list from API
      this.showUpdateModal = false
      this.fetchRows(this.currentPage, this.pageSize)
    },

    onStaffAdded(payload) {
      // Close the add modal and refresh the list from API
      this.showAddModal = false
      this.fetchRows(this.currentPage, this.pageSize)
    }
  },


  mounted() {
    this.fetchRows(this.currentPage, this.pageSize)
  },


  
}
</script>


<style scoped>

</style>


