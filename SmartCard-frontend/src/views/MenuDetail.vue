<template>
  <section class="page">
    <div class="origin-top-left" style="zoom: 0.85;">
      <div class="w-[1487px] h-[933px] relative">
      <div class="w-[1487px] h-[933px] left-0 top-0 absolute bg-white rounded-[38px] shadow-[2px_2px_4px_0px_rgba(204,204,204,0.25)]"></div>
      <div class="w-[1487px] h-[777px] left-0 top-[156px] absolute bg-white shadow-[0px_-2px_4px_0px_rgba(204,204,204,0.25)]"></div>
      
      <div class="w-[676px] h-[1487px] left-0 top-[933px] absolute origin-top-left -rotate-90 bg-white shadow-[0px_-2px_4px_0px_rgba(204,204,204,0.25)]"></div>
      <div class="w-[568px] h-[1487px] left-0 top-[933px] absolute origin-top-left -rotate-90 bg-white shadow-[0px_-2px_4px_0px_rgba(204,204,204,0.25)]"></div>
      <div class="w-[463px] h-[1487px] left-0 top-[933px] absolute origin-top-left -rotate-90 bg-white shadow-[0px_-2px_4px_0px_rgba(204,204,204,0.25)]"></div>
      <img
        :src="ArrowLeft"
        alt="back"
        class="w-7 h-7 left-[68px] top-[54px] absolute object-contain cursor-pointer"
        role="button"
        @click="goDishManager"
      />
      <div class="left-[111px] top-[54px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">菜单详情</div>
      <div class="w-40 h-14 left-[1279px] top-[40px] absolute bg-white rounded-[42.50px] shadow-[0px_4px_4px_0px_rgba(202,202,202,0.25)] border border-stone-300 cursor-pointer" @click="isUploadExcelOpen = true"></div>
      <div class="w-20 left-[1344.67px] top-[52.89px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="isUploadExcelOpen = true">上传菜单</div>
      <div class="w-14 h-12 left-[1293px] top-[42px] absolute bg-white rounded-full"></div>
      <img :src="Upload" alt="upload" class="w-6 h-6 left-[1306.59px] top-[54.77px] absolute object-contain cursor-pointer" @click="isUploadExcelOpen = true" />
      <!-- Left menu buttons (full-area clickable, active = black background) -->
      <div class="absolute left-[80px] top-[178px] w-[210px] h-[60px] cursor-pointer" @click="setFilter('all')">
        <div class="absolute inset-0 rounded-2xl flex items-center justify-center" :class="currentFilter==='all' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="text-2xl font-normal font-['Alibaba_PuHuiTi']">全部</span>
        </div>
      </div>
      <div class="absolute left-[80px] top-[278px] w-[210px] h-[60px] cursor-pointer" @click="setFilter('new')">
        <div class="absolute inset-0 rounded-2xl flex items-center justify-center" :class="currentFilter==='new' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="text-2xl font-normal font-['Alibaba_PuHuiTi']">新菜</span>
        </div>
      </div>
      <div class="absolute left-[80px] top-[386px] w-[210px] h-[60px] cursor-pointer" @click="setFilter('top')">
        <div class="absolute inset-0 rounded-2xl flex items-center justify-center" :class="currentFilter==='top' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="text-2xl font-normal font-['Alibaba_PuHuiTi']">热销</span>
        </div>
      </div>
      <div class="absolute left-[80px] top-[495px] w-[210px] h-[60px] cursor-pointer" @click="setFilter('off')">
        <div class="absolute inset-0 rounded-2xl flex items-center justify-center" :class="currentFilter==='off' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="text-2xl font-normal font-['Alibaba_PuHuiTi']">已下架</span>
        </div>
      </div>
      <div class="w-[777px] h-[1175px] left-[312px] top-[933px] absolute origin-top-left -rotate-90 bg-gray-50 shadow-[-3px_0px_4px_0px_rgba(204,204,204,0.25)]"></div>
      <div class="left-[1246px] top-[114px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">上次上传时间：2025/10/15</div>
      <!-- Pagination controls -->
      <div
        class="left-[800px] top-[869px] absolute justify-start text-neutral-800 text-xl font-light font-['Alibaba_PuHuiTi'] cursor-pointer"
        @click="goPrev"
      >上一页</div>
      <div
        class="left-[890px] top-[869px] absolute justify-start text-neutral-800 text-xl font-light font-['Alibaba_PuHuiTi'] cursor-pointer"
        @click="goToPage(currentPage)"
      >{{ currentPage }}</div>
      <div
        class="left-[930px] top-[869px] absolute justify-start text-zinc-400 text-xl font-light font-['Alibaba_PuHuiTi'] cursor-pointer"
        @click="goToPage(currentPage + 1)"
      >{{ Math.min(currentPage + 1, totalPages) }}</div>
      <div
        class="left-[970px] top-[869px] absolute justify-start text-neutral-800 text-xl font-light font-['Alibaba_PuHuiTi'] cursor-pointer"
        @click="goNext"
      >下一页</div>
      <div
        class="w-40 h-14 left-[1446px] top-[242px] absolute origin-top-left rotate-90 bg-white rounded-[42.50px] shadow-[0px_4px_4px_0px_rgba(202,202,202,0.25)] border border-stone-300 cursor-pointer"
        @click="isUploadByHandOpen = true"
      ></div>
      <div
        class="w-5 left-[1410px] top-[265px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer"
        @click="isUploadByHandOpen = true"
      >手动录菜</div>
      <!-- Click overlay to make the whole button area clickable -->
      
      
      <input
        v-model="searchText"
        @keyup.enter="onSearchEnter"
        class="absolute left-[1118px] top-[176px] w-80 h-10 bg-stone-50 rounded-md border border-neutral-200 px-3 text-neutral-800 placeholder-zinc-500"
        placeholder="请问想搜索什么菜？"
      />
      <!-- Dish name cards grid -->
      <div v-if="dishCards.length" class="absolute left-[387px] top-[242px]">
        <div class="grid grid-cols-3 gap-x-[90px] gap-y-[37.5px]">
          <div v-for="(card, idx) in dishCards" :key="idx" class="w-60 h-20 relative">
            <div class="w-60 h-20 left-0 top-0 absolute bg-white rounded-3xl border border-zinc-300"></div>
            <div
              v-if="isBatchSelect"
              class="left-[-55px] top-1/2 -translate-y-1/2 absolute w-[40px] h-[40px] cursor-pointer"
              @click="onClickWhiteIcon(idx)"
            >
              <img :src="WhiteCircle" alt="select" class="w-full h-full object-contain" />
              <div
                v-if="selectedIndexes.has(idx)"
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-neutral-700"
                style="width: 16px; height: 8px;"
              ></div>
            </div>
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-500 text-2xl font-medium font-['Alibaba_PuHuiTi'] text-center">{{ card.name }}</div>
          </div>
        </div>
      </div>
      
      <div class="left-[1011px] top-[184px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="toggleBatchSelect">批量选择</div>
      <div class="w-5 h-5 left-[983px] top-[186px] absolute bg-white rounded-sm border border-zinc-400 cursor-pointer relative" @click="toggleBatchSelect">
        <div v-if="isBatchSelect" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-neutral-700" style="width: 12px; height: 6px;"></div>
      </div>
      </div>
    </div>
    <!-- Overlay Modal -->
    <div
      v-if="isUploadByHandOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/30"
        @click="isUploadByHandOpen = false"
      ></div>
      <div class="relative z-10">
        <UploadDishByHand @confirm="onUploadConfirm" />
      </div>
    </div>
  </section>
  <!-- Upload Excel Modal -->
  <div v-if="isUploadExcelOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30" @click="isUploadExcelOpen = false"></div>
    <div class="relative z-10">
      <div
        class="w-[663px] h-72 relative"
      >
        <div class="w-[663px] h-72 left-0 top-0 absolute bg-white rounded-[31px]"></div>
        <div
          class="w-[610px] h-60 left-[27px] top-[23px] absolute rounded-[31px] outline outline-2 outline-offset-[-1px] flex items-center justify-center text-center px-6"
          :class="isDragging ? 'outline-neutral-800 bg-neutral-50' : 'outline-zinc-500'"
          @dragover.prevent="onDragOverExcel"
          @dragleave="onDragLeaveExcel"
          @drop.prevent="onDropExcel"
          @click="triggerFileBrowse"
        >
          <div class="pointer-events-none flex flex-col items-center justify-center">
            <img :src="ExcelIcon" alt="excel" class="w-[70px] h-[70px] mb-4 object-contain" />
            <div class="text-zinc-800 text-xl font-medium font-['Alibaba_PuHuiTi']">
              {{ selectedFileName || (isUploading ? '正在上传…' : '拖拽或点击选择 Excel 文件') }}
            </div>
            <div class="mt-2 text-neutral-400 text-sm font-normal font-['Alibaba_PuHuiTi']">支持：.xls, .xlsx</div>
          </div>
        </div>
        
        <input
          ref="fileInputRef"
          type="file"
          accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          class="hidden"
          @change="onFileInputChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuDetail',
}
</script>

<script setup>
import ArrowLeft from '../../Resource/Menu/ArrowLeft.svg'
import Upload from '../../Resource/Menu/Upload.svg'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UploadDishByHand from '../components/uploadDishByHand.vue'
import { postForm, postMultipart } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
import ExcelIcon from '../../Resource/Menu/ExcelIcon.svg'
import WhiteCircle from '../../Resource/Menu/whiteCircle.svg'

const isUploadByHandOpen = ref(false)
const isUploadExcelOpen = ref(false)
const isDragging = ref(false)
const isUploading = ref(false)
const selectedFileName = ref('')
const fileInputRef = ref(null)
const isBatchSelect = ref(false)
const selectedIndexes = ref(new Set())
const searchText = ref('')
const dishCards = ref([])
const currentPage = ref(1)
const pageSize = ref(15)
const total = ref(0)
const totalPages = ref(1)
const currentFilter = ref('all') // all | new | top | off

function onUploadConfirm(payload) {
  isUploadByHandOpen.value = false
  if (payload && payload.ok) {
    fetchPage(currentPage.value)
  }
}

function buildQuery() {
  const name = (searchText.value || '').trim()
  if (name) return JSON.stringify({ dish_name: name })
  if (currentFilter.value === 'new') return JSON.stringify({ is_new: 'true' })
  if (currentFilter.value === 'top') return JSON.stringify({ is_top: 'true' })
  if (currentFilter.value === 'off') return JSON.stringify({ status: 'true' })
  return '{}'
}

async function fetchPage(page) {
  try {
    const res = await postForm(PATHS.DISH_LIST, {
      query: buildQuery(),
      page: String(page),
      size: String(pageSize.value),
    })
    const data = res && res.data && res.data.data
    const list = (data && data.dish_list) || []
    total.value = (data && data.total) || 0
    totalPages.value = Math.max(1, Math.ceil(total.value / pageSize.value))
    dishCards.value = list
      .map((item) => ({ name: item.dish_name || '' }))
      .filter((c) => c.name)
  } catch (e) {
    console.error('Failed to fetch dishes list', e)
  }
}

function goToPage(page) {
  const target = Math.min(totalPages.value, Math.max(1, page))
  if (target !== currentPage.value) {
    currentPage.value = target
    fetchPage(currentPage.value)
  }
}
function goPrev() { goToPage(currentPage.value - 1) }
function goNext() { goToPage(currentPage.value + 1) }

onMounted(() => {
  fetchPage(currentPage.value)
})

function setFilter(f) {
  if (f !== currentFilter.value) {
    currentFilter.value = f
    currentPage.value = 1
    fetchPage(currentPage.value)
  }
}

function toggleBatchSelect() {
  isBatchSelect.value = !isBatchSelect.value
  if (!isBatchSelect.value) {
    selectedIndexes.value = new Set()
  }
}

function onSearchEnter() {
  currentFilter.value = 'all'
  currentPage.value = 1
  fetchPage(currentPage.value)
}

function onClickWhiteIcon(idx) {
  if (!isBatchSelect.value) return
  const next = new Set(selectedIndexes.value)
  if (next.has(idx)) next.delete(idx)
  else next.add(idx)
  selectedIndexes.value = next
}

const router = useRouter()
function goDishManager() {
  router.push({ name: 'DishManager' })
}

function triggerFileBrowse() {
  if (isUploading.value) return
  const el = fileInputRef.value
  if (el && typeof el.click === 'function') el.click()
}

function onDragOverExcel() {
  if (!isUploading.value) isDragging.value = true
}

function onDragLeaveExcel() {
  isDragging.value = false
}

function onDropExcel(e) {
  isDragging.value = false
  if (isUploading.value) return
  const files = e && e.dataTransfer && e.dataTransfer.files
  if (files && files.length) {
    handleSelectedFile(files[0])
  }
}

function onFileInputChange(e) {
  const files = e && e.target && e.target.files
  if (files && files.length) {
    handleSelectedFile(files[0])
  }
  if (e && e.target) e.target.value = ''
}

function isExcelFile(file) {
  if (!file) return false
  const name = (file.name || '').toLowerCase()
  return name.endsWith('.xls') || name.endsWith('.xlsx')
}

function handleSelectedFile(file) {
  if (!isExcelFile(file)) {
    console.warn('Not an Excel file')
    return
  }
  selectedFileName.value = file.name
  uploadExcel(file)
}

async function uploadExcel(file) {
  try {
    isUploading.value = true
    const formData = new FormData()
    formData.append('excelFile', file)
    // Hide the panel immediately after file selection/drop
    isUploadExcelOpen.value = false
    await postMultipart(PATHS.DISH_UPLOAD_EXCEL, formData)
    selectedFileName.value = ''
    fetchPage(currentPage.value)
  } catch (e) {
    console.error('Failed to upload excel', e)
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
</style>
