<template>

  <section class="p-[25px]">

    <div class="relative   min-w-[1550px]  min-h-[1000px]  left-0 top-0 absolute bg-white rounded-[38px] shadow-[2px_2px_4px_0px_rgba(204,204,204,0.25)]" >
     
    
     <img
        :src="ArrowLeft"
        alt="back"
        class="w-7 h-7 left-[68px] top-[54px] absolute object-contain cursor-pointer"
        role="button"
        @click="goDishManager"
      />
     

      <div class="left-[111px] top-[54px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">菜单详情</div>
      
      
      <div class="w-40 h-14 left-[1279px] top-[40px] absolute bg-white rounded-[42.50px] shadow-[0px_4px_4px_0px_rgba(202,202,202,0.25)] border border-stone-300 cursor-pointer" @click="isUploadExcelOpen = true">
        <div class="left-[53px] top-[13px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi']">上传菜单</div>
        <img :src="Upload" alt="upload" class="w-6 h-6 left-[20px] top-[15px] absolute object-contain " />
      </div>
      

      <!-- Left menu buttons (full-area clickable, active = black background) -->
      <div class="absolute  top-[178px] w-[310px] h-[90px] cursor-pointer" @click="setFilter('all')">
        <div class="absolute  w-full h-full rounded-xl flex items-center justify-center" :class="currentFilter==='all' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="absolute left-[130px] text-2xl font-normal font-['Alibaba_PuHuiTi']">全部</span>
        </div>
      </div>

      <div class="absolute  top-[278px] w-[310px] h-[90px] cursor-pointer" @click="setFilter('new')">
        <div class="absolute w-full h-full rounded-xl flex items-center justify-center" :class="currentFilter==='new' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="absolute left-[130px] text-2xl font-normal font-['Alibaba_PuHuiTi']">新菜</span>
        </div>
      </div>

      <div class="absolute  top-[386px] w-[310px] h-[90px] cursor-pointer" @click="setFilter('top')">
        <div class="absolute w-full h-full rounded-xl flex items-center justify-center" :class="currentFilter==='top' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="text-2xl font-normal font-['Alibaba_PuHuiTi']">热销</span>
        </div>
      </div>

      <div class="absolute  top-[495px] w-[310px] h-[90px] cursor-pointer" @click="setFilter('off')">
        <div class="absolute w-full h-full rounded-xl flex items-center justify-center" :class="currentFilter==='off' ? 'bg-black text-white' : 'text-zinc-800'">
          <span class="text-2xl font-normal font-['Alibaba_PuHuiTi']">已下架</span>
        </div>
      </div>


      <div class="w-[777px] h-[1175px] left-[312px] top-[933px] absolute origin-top-left -rotate-90 bg-gray-50 shadow-[-3px_0px_4px_0px_rgba(204,204,204,0.25)]"></div>
      
     
  
      <!-- Pagination controls -->
      <div class="left-[800px] top-[869px] absolute flex items-center justify-center gap-4">
        <button
          type="button"
          class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed font-['Alibaba_PuHuiTi']"
          :disabled="currentPage <= 1"
          @click="goPrev"
        >
          上一页
        </button>

        <span class="text-neutral-600 text-[14px] font-medium font-['Alibaba_PuHuiTi']">
          第{{ currentPage }} / {{ totalPages }} 页
        </span>

        <button
          type="button"
          class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed font-['Alibaba_PuHuiTi']"
          :disabled="currentPage >= totalPages"
          @click="goNext"
        >
          下一页
        </button>
      </div>
     
     
      
      <div
        class="w-40 h-14 left-[1446px] top-[242px] absolute origin-top-left rotate-90 bg-white rounded-[42.50px] shadow-[0px_4px_4px_0px_rgba(202,202,202,0.25)] border border-stone-300 cursor-pointer"
        @click="isUploadByHandOpen = true"
      >
        <div class="left-[65px] bottom-[-28px] absolute rotate-270 flex flex-col items-center justify-center text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer">
          <span>手</span>
          <span>动</span>
          <span>录</span>
          <span>菜</span>
        </div>
      </div>

     


      <!-- Delete button under 手动录菜 -->
      <div
        v-if="isBatchSelect"
        class="w-30 h-14 left-[1446px] top-[420px] absolute origin-top-left rotate-90 bg-white rounded-[42.50px] shadow-[0px_4px_4px_0px_rgba(202,202,202,0.25)] border border-stone-300 cursor-pointer"
        @click="onDeleteSelected"
      >
        <div class="left-[48px]  absolute rotate-270 flex flex-col items-center justify-center text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer">
          <span>删</span>
          <span>除</span>
        </div>
      </div>
     
      <!-- Click overlay to make the whole button area clickable -->

      <!-- Select Group button under 删除 -->
      <div
        v-if="isBatchSelect"
        class="w-40 h-14 left-[1446px] top-[565px] absolute origin-top-left rotate-90 bg-white rounded-[42.50px] shadow-[0px_4px_4px_0px_rgba(202,202,202,0.25)] border border-stone-300 cursor-pointer"
        @click="openSelectGroup"
      >
        <div class="left-[68px] bottom-[-28px]  absolute rotate-270 flex flex-col items-center justify-center text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer">
          <span>选</span>
          <span>择</span>
          <span>分</span>
          <span>组</span>
        </div>
      </div>
     
      
      <!-- Search input -->
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
              @click="onClickWhiteIcon(card.id)"
            >
            
              <img :src="WhiteCircle" alt="select" class="w-full h-full object-contain" />
              
              <img
                v-if="selectedIndexes.has(card.id)"
                :src="CheckMark"
                alt="checked"
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style="width: 20px; height: 20px;"
              /> 
            </div>
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 
            -translate-y-1/2 text-neutral-500 text-2xl 
            font-medium font-['Alibaba_PuHuiTi'] text-center 
            truncate max-w-[180px]">
            {{ card.name }}
          </div>


          </div>
        </div>
      </div>
      



      <!-- Batch select button -->
      <div class="left-[1011px] top-[184px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="toggleBatchSelect">批量选择</div>
     
      <div class="w-5 h-5 left-[983px] top-[186px] absolute bg-white rounded-sm border border-zinc-400 cursor-pointer relative" @click="toggleBatchSelect">
        <img
          v-if="isBatchSelect"
          :src="CheckMark"
          alt="checked"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style="width: 15px; height: 7.5px;"
        />
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


    <!-- Select Group Panel -->
    <div v-if="isSelectGroupOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      
      <div class="absolute inset-0 bg-black/30" @click="closeSelectGroup"></div>
      
      
      <div class="relative z-10 w-96 h-60">
      
          <div class="w-96 h-60 left-0 top-0 absolute bg-white rounded-[31px]"></div>
         
          <div class="left-[137px] top-[35px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">选择分组</div>
          
          <div class="w-28 h-10 left-[135px] top-[177px] absolute bg-white rounded-[20px] border border-zinc-300 cursor-pointer" @click="onConfirmSelectGroup">
            <div class="left-[35px] top-[5px] absolute justify-start text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer">确认</div>
          </div>
          
     

          <div class="left-[120px] top-[110px] absolute justify-start text-neutral-500 text-3xl font-medium font-['Alibaba_PuHuiTi'] cursor-pointer" @click="selectedGroup = 'top'">热销</div>
          <div class="w-8 h-8 left-[72px] top-[111px] absolute bg-white rounded-full border border-stone-300 cursor-pointer" @click="selectedGroup = 'top'">
          
            <div v-if="selectedGroup === 'top'" class="w-4 h-4 left-[8px] top-[8px] absolute">
            <img :src="CheckMark" alt="checked" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style="width: 40px; height: 40px;" />
          </div>

          </div>
         
          


          <div class="left-[271px] top-[110px] absolute justify-start text-neutral-500 text-3xl font-medium font-['Alibaba_PuHuiTi'] cursor-pointer" @click="selectedGroup = 'new'">新菜</div>
          <div class="w-8 h-8 left-[223px] top-[110px] absolute bg-white rounded-full border border-stone-300 cursor-pointer" @click="selectedGroup = 'new'"></div>
          <div v-if="selectedGroup === 'new'" class="w-4 h-4 left-[231px] top-[118px] absolute">
            <img :src="CheckMark" alt="checked" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style="width: 40px; height: 40px;" />
          </div>

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



<script setup>

import ArrowLeft from '../../Resource/Menu/ArrowLeft.svg'
import Upload from '../../Resource/Menu/Upload.svg'
import ExcelIcon from '../../Resource/Menu/ExcelIcon.svg'
import WhiteCircle from '../../Resource/Menu/whiteCircle.svg'
import CheckMark from '../../Resource/Menu/CheckMark.svg'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import UploadDishByHand from '../components/Dish/uploadDishByHand.vue'

import { postForm, postMultipart } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'


const isUploadByHandOpen = ref(false)

const isUploadExcelOpen = ref(false)
const isDragging = ref(false)
const isUploading = ref(false)
const selectedFileName = ref('')
const fileInputRef = ref(null)


const isSelectGroupOpen = ref(false)
const selectedGroup = ref(null) // 'top' | 'new' | null


const isBatchSelect = ref(false)
const selectedIndexes = ref(new Set())

const dishCards = ref([])

const searchText = ref('')


const currentPage = ref(1)
const pageSize = ref(15)
const totalPages = ref(1)

const currentFilter = ref('all') // all | new | top | off



async function fetchPage() {
    
  const payload = {
    query: buildQuery(),
    page: String(currentPage.value),
    size: String(pageSize.value),
  }

  try {
    const res = await postForm(PATHS.DISH_LIST, payload)
    const responseData = res && res.data && res.data.data
    
    if (responseData) {
      const dishList = responseData.dish_list || []
      const totalCount = responseData.total || 0
      
     
      // Update pagination info
      totalPages.value = Math.max(1, Math.ceil(totalCount / pageSize.value))
      
      // Map dish_list to dishCards format
      dishCards.value = dishList
        .map((item) => ({ id: item._id || '', name: item.dish_name || '' }))
    }
  } catch (e) {
    console.error('Failed to fetch dishes list', e)
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

function onUploadConfirm() {
  isUploadByHandOpen.value = false
    fetchPage()
}


function goToPage(page) {
  currentPage.value = Math.min(totalPages.value, Math.max(1, page))
  fetchPage()
}

function goPrev() {
  goToPage(currentPage.value - 1)
}

function goNext() {
  goToPage(currentPage.value + 1)
}

onMounted(() => {
  fetchPage()
})

function setFilter(f) {
  if (f !== currentFilter.value) {
    currentFilter.value = f
    currentPage.value = 1
    fetchPage()
  }
}


function toggleBatchSelect() {
  isBatchSelect.value = !isBatchSelect.value
  if (!isBatchSelect.value) {
    selectedIndexes.value = new Set()
  }
}

function openSelectGroup() {
  selectedGroup.value = null
  isSelectGroupOpen.value = true
}

function closeSelectGroup() {
  selectedGroup.value = null
  isSelectGroupOpen.value = false
}

function onSearchEnter() {
  currentFilter.value = 'all'
  currentPage.value = 1
  fetchPage()
}

function onClickWhiteIcon(dishId) {
  if (!isBatchSelect.value) return

  const next = new Set(selectedIndexes.value)

  if (next.has(dishId)) next.delete(dishId)

  else next.add(dishId)

  selectedIndexes.value = next
}

async function onDeleteSelected() {
  
  try {
    if (!isBatchSelect.value || !selectedIndexes.value || selectedIndexes.value.size === 0) {
      return
    }

    const selectedIds = Array.from(selectedIndexes.value)
      .filter(Boolean)

    if (!selectedIds.length) {
      return
    }
    

    const payload = {
      type: 'delete',
      data: '{}',
      ids: JSON.stringify(selectedIds),
    }

    await postForm(PATHS.DISH_EDIT, payload)
    

    await fetchPage()
    selectedIndexes.value = new Set()
    isBatchSelect.value = false
  }
   catch (e) {
    console.error('Failed to delete dishes', e)
  }
}

async function onConfirmSelectGroup() {
  
  try {
    if (!selectedGroup.value) {
      return
    }
    const selectedIds = Array.from(selectedIndexes.value)
    .filter(Boolean)

    const payload = {
      type: 'update',
      data: JSON.stringify({ is_top: selectedGroup.value === 'top', is_new: selectedGroup.value === 'new' }),
      ids: JSON.stringify(selectedIds),
    }

    await postForm(PATHS.DISH_EDIT, payload)
    await fetchPage()

    isSelectGroupOpen.value = false
    selectedIndexes.value = new Set()
    isBatchSelect.value = false
  } catch (e) {
    console.error('Failed to select group', e)
  }
}



const router = useRouter()

function goDishManager() {
  router.push({ name: 'DishManager' })
}


//excel upload

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
    console.log('Uploading Excel file...')
    const response = await postMultipart(PATHS.DISH_UPLOAD_EXCEL, formData)
    console.log('Upload successful, response:', response)
    selectedFileName.value = ''
    // Update upload time on successful upload
    
    await fetchPage()
  } catch (e) {
    console.error('Failed to upload excel', e)
    // Don't update time if upload failed
  } finally {
    isUploading.value = false
  }
}



</script>

<style scoped>
</style>
