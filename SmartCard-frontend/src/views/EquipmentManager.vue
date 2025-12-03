<template>


<section class="p-[25px]">
  <div class="min-w-[1500px]  min-h-[1000px] bg-background rounded-[50px] relative ">
   
    <div class="max-w-[1600px] mx-auto px-8 py-6">
      
      <div class="m-0 mb-4">
        <template v-if="isEditMode">
          <input
            v-model="editData.organize_name"
            type="text"
            class="w-full max-w-[520px] h-[44px] rounded-[8px] border border-[#DADADA] px-3 text-[16px] outline-none"
            placeholder="请输入组织名称"
          />
        </template>
        <template v-else>
          <h1 class="m-0 text-[28px] font-extrabold tracking-[-0.02em] text-foreground">{{ fetchData.organize_name }}</h1>
        </template>
      </div>

      <div class="w-full h-0.5 bg-gray-200 rounded-[73px] mb-4"></div>

      
      <!-- Group controls -->
      <div class="mb-4 flex items-center justify-between">
        <div class="flex flex-wrap gap-2">

          <template v-if="isEditMode">

            <div
              v-for="(g, idx) in fetchData.groups"
              :key="g.id"
              class="relative inline-block"
            >
              <input
                v-model="editData.group_names[g.id]"
                type="text"
                class="rounded-[8px] border px-[18px] py-[9.2px] text-[14px] outline-none"
                placeholder="请输入组别名称"
              />

              <img
                :src="closeIcon"
                class="absolute -top-2 -right-2 w-[19px] h-[19px] cursor-pointer"
                alt="关闭"
                @click.stop="deleteGroup(g.id, idx)"
              />
            </div>

            <button
              class="group relative h-[44px] w-[44px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
              @click="startAddGroup"
              aria-label="新建分组"
            >
              <img :src="blackBGIcon" class="h-[44px] w-[44px] transition group-hover:brightness-110" alt="" />
              <img :src="whiteCrossIcon" class="absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="新建分组" />
            </button>

          </template>

          <template v-else>
            <button
              v-for="(g, idx) in fetchData.groups"
              :key="g.id"
              class="relative w-44 h-12 rounded-xl border text-[14px] flex items-center justify-center cursor-pointer"
              :class="idx === activeGroupIndex ? 'bg-neutral-700 text-white border-neutral-700' : 'bg-white border-[#DADADA] text-[rgba(0,0,0,0.80)]'"
              @click="selectGroup(idx)"
            >
              {{ g.name }}
            </button>

          </template>

        </div>
      </div>

      <div class="w-full h-0.5 bg-gray-200 rounded-[73px] mb-4"></div>


      <!-- Active group's cards -->
      <div class="flex flex-wrap gap-5">
        
        <div v-for="(p, i) in (fetchData.groups[activeGroupIndex]?.people || [])" :key="p.device_id" class="m-0">
          <PersonCard
            :staff_name="p.staff_name"
            :group_id="p.group_id"
            :device_number="p.device_number"
            :device_name="p.device_name"
            :device_id="p.device_id"
            :staff_id="p.staff_id"
            :device_status="p.device_status"
            :sex="p.sex"
            :editMode="isEditMode"
            @close="onCardUpdated"
            @updated="onCardUpdated"
          />
        </div>
        
        <!-- Add staff button - only show in edit mode -->
        <div v-if="isEditMode" class="m-0">
          <button
            class="w-55 h-74 relative rounded-xl cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none flex items-center justify-center"
            @click="showAddPersonPanel = true"
            aria-label="Add person"
          >
            <div class="w-55 h-74 left-0 top-0 absolute bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300"></div>
            <div class="relative z-10 flex items-center justify-center">
              <div class="w-[44px] h-[44px] rounded-full bg-black flex items-center justify-center">
                <img :src="whiteCrossIcon" class="h-[24px] w-[24px] transition-transform duration-200 hover:scale-110" alt="新增人员" />
              </div>
            </div>
          </button>
        </div>
        
      </div>
    </div>



    <!-- Device pagination controls -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex items-center justify-center gap-4">
      <button
        type="button"
        class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="staffPage <= 1"
        @click="prevDevicePage"
      >
        上一页
      </button>
      <span class="text-neutral-600 text-[14px] font-medium">
        第{{ staffPage }}页
      </span>
      <button
        type="button"
        class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="staffTotal != null && staffPage >= Math.ceil(staffTotal / staffPageSize)"
        @click="nextDevicePage"
      >
        下一页
      </button>
    </div>



    <div class="absolute right-6 top-6 flex items-center gap-3">

      <!-- Complete button - only show in edit mode -->
      <button
        v-if="isEditMode"
        class="group relative h-[42px] w-[78px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
        @click="EditComplete"
        aria-label="完成"
      >
        <img :src="blackBGIcon" class="h-[42px] w-[78px] transition group-hover:brightness-110" alt="" />
        <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-medium">完成</span>
      </button>

      <!-- Edit button - only show when not in edit mode -->
      <button
        v-else
        class="group relative h-[42px] w-[42px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
        @click="toggleEditMode"
        aria-label="编辑"
      >
        <img :src="circleIcon" class="h-[42px] w-[42px] transition group-hover:brightness-95" alt="" />
        <img :src="pencilIcon" class="absolute left-1/2 top-1/2 h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="编辑" />
      </button>
    </div>


  </div>
</section>



    <!-- Add Person Panel -->
    <div v-if="showAddPersonPanel" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="showAddPersonPanel = false"></div>
      <div class="relative">
        <div class="w-96 h-80 relative">
          <div class="w-96 h-80 left-0 top-0 absolute bg-white rounded-[31px]"></div>
          <div class="w-64 h-0 left-[53px] top-[93px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          <div class="left-[54px] top-[117px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">绑定人员</div>
          <div class="left-[54px] top-[165px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备号</div>
          <div class="left-[53px] top-[214px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备名称</div>
          <div class="left-[51px] top-[37px] absolute justify-start text-black text-2xl font-normal font-['Alibaba_PuHuiTi']">添加设备</div>
          <div class="w-28 h-10 left-[129px] top-[260px] absolute bg-white rounded-[20px] border border-zinc-300"></div>
          <div class="left-[164px] top-[265px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="submitAddDevice">完成</div>
          
          
          <!-- Inputs -->
          <div
            class="w-24 h-9 left-[219px] top-[112px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm flex items-center cursor-pointer"
            @click="openSelectStaffPanel"
          >
            <span class="truncate text-zinc-600">{{ editData.staff_name || '选择人员' }}</span>
          </div>


          <input
            v-model="editData.device_number"
            type="text"
            class="w-24 h-9 left-[219px] top:[160px] top-[160px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none  "
            placeholder="设备号"
          />

          <input
            v-model="editData.device_name"
            type="text"
            class="w-24 h-9 left-[219px] top-[208px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none"
            placeholder="设备名称"
          />
        </div>
        
        </div>
      </div>
   


  <!-- Select Staff Panel Component -->
  <StaffSelect
    v-if="showSelectStaffPanel"
    @close="showSelectStaffPanel = false"
    @select="onStaffSelected"
  />

  <!-- Organize Name Panel -->
  <div v-if="showOrganizeNamePanel" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30"></div>
    <div class="relative w-[480px] rounded-[32px] bg-white px-10 py-12 shadow-lg">
      <div class="flex flex-col items-center gap-6">
        <img :src="inputOrganizeNameIcon" class="h-20 w-20" alt="组织图标" />
        <h2 class="text-2xl font-semibold text-neutral-900">创建组织</h2>
        <p class="text-center text-sm text-neutral-500">当前暂无组织，请先输入组织名称完成初始化。</p>
        <input
          v-model="editData.organize_name"
          type="text"
          class="w-full rounded-xl border border-[#DADADA] px-4 py-3 text-[16px] outline-none focus:border-neutral-800"
          placeholder="请输入组织名称"
        />
        <button
          class="w-full rounded-xl bg-neutral-900 py-3 text-base font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!editData.organize_name.trim()"
          @click="submitOrganizeName"
        >
          确认
        </button>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Dialog -->
  <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30" @click="cancelDelete"></div>
    <div class="relative">
      <div class="w-80 h-48 relative">
        <div class="w-80 h-48 left-0 top-0 absolute bg-white rounded-[30px]"></div>
        <div class="left-[108px] top-[30px] absolute justify-start text-neutral-800 text-2xl font-medium font-['Alibaba_PuHuiTi']">系统通知</div>
        <div class="left-[55px] top-[73px] absolute justify-start text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi']">确定要删除这项内容吗？</div>
        <button
          class="w-24 h-10 left-[183px] top-[116px] absolute bg-stone-50 rounded-[19.50px] border border-gray-200 cursor-pointer flex items-center justify-center"
          @click="cancelDelete"
        >
          <div class="text-neutral-700 text-xl font-normal font-['Alibaba_PuHuiTi']">取消</div>
        </button>
        <button
          class="w-24 h-10 left-[45px] top-[116px] absolute bg-teal-500 rounded-[19.50px] shadow-[0px_2px_2px_0px_rgba(196,196,196,0.25)] border border-white cursor-pointer flex items-center justify-center"
          @click="confirmDelete"
        >
          <div class="text-white text-xl font-normal font-['Alibaba_PuHuiTi']">确定</div>
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import PersonCard from '../components/Device/PersonCard.vue'
import StaffSelect from '../components/Staff/StaffSelect.vue'

import circleIcon from '../../Resource/Staff/Circle.svg'
import pencilIcon from '../../Resource/Staff/Pencil.svg'
import closeIcon from '../../Resource/Equipment/Close.svg'
import blackBGIcon from '../../Resource/Staff/blackBG.svg'
import whiteCrossIcon from '../../Resource/Staff/whiteCross.svg'
import inputOrganizeNameIcon from '../../Resource/Equipment/InputOrganizeName.svg'

import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'

const isEditMode = ref(false)

const staffPage = ref(1)
const staffPageSize = ref(12)
const staffTotal = ref(null)

const editData = reactive({
  organize_name: '',
  group_names: {},
  staff_name: '',
  staff_id: '',
  device_name: '',
  device_number: ''
})

const fetchData = reactive({
  organize_name: '',
  organize_id: '',
  groups:[],
})

const activeGroupIndex = ref(0)
const showAddPersonPanel = ref(false)
const showSelectStaffPanel = ref(false)
const showOrganizeNamePanel = ref(false)
const isFirstOpen = ref(true)

// delete confirm
const showDeleteConfirm = ref(false)
const pendingDeleteGroupId = ref(null)
const pendingDeleteIdx = ref(null)



onMounted(async () => {
  await fetchOrganizeList(staffPage.value, staffPageSize.value, null)
  if (!isFirstOpen.value && fetchData.groups.length === 0) {
    await startAddGroup()
  }

  
})



function selectGroup(idx) {

  activeGroupIndex.value = idx

  const groupId =fetchData.groups[idx].id|| null
 
  if (groupId) {
    staffPage.value = 1
    fetchOrganizeList(1,staffPageSize.value,groupId)
  }
}

async function startAddGroup() {
  const organizeId = fetchData.organize_id || ''
  if (organizeId === '') return;

  const payload = {
    type: 'add',
    data: JSON.stringify({
      group_name: "分组",
      type:"add",
      organize_id:organizeId
    })
  }
  try {
    const res = await postForm(PATHS.DEVICE_GROUP_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      console.log('[EquipmentManager] Group added successfully:', res.data)
    } else {
      alert('添加分组失败')
    }
  } catch (e) {
    console.error('[EquipmentManager] Error adding group:', e)
    alert('添加分组失败')
  }

  fetchOrganizeList()
}

function deleteGroup(groupId, idx) {
  if (fetchData.groups.length <= 1) {
    alert('至少需要保留一个分组')
    return
  }
  pendingDeleteGroupId.value = groupId
  pendingDeleteIdx.value = idx
  showDeleteConfirm.value = true
}

function cancelDelete() {
  showDeleteConfirm.value = false
  pendingDeleteGroupId.value = null
  pendingDeleteIdx.value = null
}

async function confirmDelete() {
  if (!pendingDeleteGroupId.value) return

  const organizeId = fetchData.organize_id || ''
  const payload = { 
    type: 'delete',
    data: JSON.stringify({ 
      group_id: pendingDeleteGroupId.value, 
      type: 'delete', 
      organize_id: organizeId 
    }) 
  }

  try {
    const res = await postForm(PATHS.DEVICE_GROUP_EDIT, payload)

    if (res && res.status >= 200 && res.status < 300) {
      staffPage.value = 1
      await fetchOrganizeList(staffPage.value, staffPageSize.value)
    } else {
      alert('删除失败')
    }
  } catch (e) {
    console.error('[EquipmentManager] group delete error:', e)
    alert('删除失败')
  }
  
  cancelDelete()
}

function onCardUpdated() {
  const currentGroup = fetchData.groups[activeGroupIndex.value]
  const groupId = currentGroup?.id || null
  fetchOrganizeList(staffPage.value, staffPageSize.value, groupId)
}

function openSelectStaffPanel() {
  showSelectStaffPanel.value = true
}
function onStaffSelected(item) {
  editData.staff_name = item.name || ''
  editData.staff_id = item.id || ''
  showSelectStaffPanel.value = false
}

async function submitAddDevice() {
  const groupId = fetchData.groups[activeGroupIndex.value]?.id
  
  const payload = {
    type: 'add',
     data: JSON.stringify({ 
      device_number: editData.device_number, 
      staff_id: editData.staff_id, 
      device_name: editData.device_name ,
      type: 'add',
      group_id: groupId,
    })
  }

  try {
    const res = await postForm(PATHS.DEVICE_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      showAddPersonPanel.value = false
      editData.staff_name = ''
      editData.staff_id = ''
      editData.device_name = ''
      editData.device_number = ''
      await fetchOrganizeList(staffPage.value, staffPageSize.value, groupId)
    } else {
      alert('添加设备失败')
    }
  } catch (e) {
    console.error('[EquipmentManager] add device error:', e)
    alert('添加设备失败')
  }
}

async function toggleEditMode() {
  editData.organize_name = fetchData.organize_name
  
  // Populate group_names with current group data
  editData.group_names = {}
  fetchData.groups.forEach(group => {
    editData.group_names[group.id] = group.name
  })
  
  isEditMode.value = true
}

async function EditComplete() {
  const organizeId = fetchData.organize_id || ''

  const payload = {
    type: 'update',
    data: JSON.stringify({
      organize_name: editData.organize_name,
      type:"update",
      organize_id:organizeId
    })
  }
  try {
    const res = await postForm(PATHS.DEVICE_ORGANIZE_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
    } else {
      alert('更新组织名称失败')
    }
  } catch (e) {
    console.error('[EquipmentManager] Error updating organize:', e)
    alert('更新组织名称失败')
  }

  // Update all group names
  const groupUpdates = Object.entries(editData.group_names).map(([groupId, groupName]) => {
    const groupPayload = {
      type: 'update',
      data: JSON.stringify({
        group_name: groupName,
        type: 'update',
        group_id: groupId,
        organize_id: organizeId
      })
    }
    return postForm(PATHS.DEVICE_GROUP_EDIT, groupPayload)
  })

  try {
    await Promise.all(groupUpdates)
  } catch (e) {
    console.error('[EquipmentManager] Error updating groups:', e)
  }

  await fetchOrganizeList()
  isEditMode.value = false
}

async function fetchOrganizeList(page = staffPage.value, limit = staffPageSize.value, groupId=null) {
  
  const payload = { 
    page: String(page),
    size: String(limit),
    organize_id: fetchData.organize_id || '', 
    group_id: groupId || '' }



  try {
    const res = await postForm(PATHS.DEVICE_ORGANIZE_LIST, payload)

    if (res && res.status >= 200 && res.status < 300) {
      const responseData = res.data || {}
      const data = responseData.data || {}
      const nowOrganize = data.now_organize
      const hasOrganize = nowOrganize && Object.keys(nowOrganize).length > 0

      if (hasOrganize) {
        fetchData.organize_id = nowOrganize._id || ''
        fetchData.organize_name = nowOrganize.organize_name || ''
      
        isFirstOpen.value = false
        showOrganizeNamePanel.value = false
      } else {
        fetchData.organize_id = ''
        fetchData.organize_name = ''
        isFirstOpen.value = true
        showOrganizeNamePanel.value = true
        fetchData.groups = []
        staffTotal.value = 0
        return
      }

      const groupList = Array.isArray(data.group_list) ? data.group_list : []

      fetchData.groups = groupList.map(g => ({ id: g._id, name: g.group_name, people: [] }))
      if (fetchData.groups.length === 0) {
        activeGroupIndex.value = 0
      }


      let targetGroupId = groupId

      if (!targetGroupId) {

        const nowGroup = data.now_group

        if (nowGroup && nowGroup._id) {

          targetGroupId = nowGroup._id
        }
      }


      // give    activeGroupID    a  value
      if (targetGroupId) {

        const idx = fetchData.groups.findIndex(g => g.id === targetGroupId)
        if (idx !== -1) activeGroupIndex.value = idx
      }
       else {
        const nowGroup = data.now_group
        if (nowGroup && nowGroup._id) {
          const idx = fetchData.groups.findIndex(g => g.id === nowGroup._id)
          if (idx !== -1) activeGroupIndex.value = idx
        }
      }


      const deviceList = Array.isArray(data.device_list) ? data.device_list : []



      // push the staff data to the fetchdata.group.peopel array
      if (deviceList.length > 0) {

        const groupIdToIndex = new Map(fetchData.groups.map((g, i) => [g.id, i]))

        deviceList.forEach(dev => {

          const gIdx = groupIdToIndex.get(dev.group_id)

          if (gIdx != null && fetchData.groups[gIdx]) {

            const staffData = dev.staff_id || {}

            const person = {
              device_id:dev._id|| '',
              staff_id: staffData._id|| '',
              staff_name: staffData.name || '未绑定',
              device_status: dev.status === true ? '在线' : '离线',
              device_number: dev.device_number || '',
              device_name: dev.device_name || '',
              staff_phone: staffData.phone || '',
              group_id: dev.group_id,
              staff_status: staffData.status,
              sex: staffData.sex || null
            }

            fetchData.groups[gIdx].people.push(person)
          }
        })
      }


      const detectedDeviceTotal = data.device_list_total
     
      if (typeof detectedDeviceTotal === 'number' && detectedDeviceTotal >= 0) {
        staffTotal.value = detectedDeviceTotal
      }
      
      staffPage.value = page != null ? page : staffPage.value

   
    }
  } catch (e) {
    console.error('[EquipmentManager] fetch organize list error:', e)
  }
  return null
}

async function submitOrganizeName() {
  const name = editData.organize_name.trim()
  if (!name) {
    alert('请输入组织名称')
    return
  }

  const payload = {
    type: 'add',
    data: JSON.stringify({
      organize_name: name,
      type: 'add'
    })
  }

  try {
    const res = await postForm(PATHS.DEVICE_ORGANIZE_EDIT, payload)
    if (res && res.status >= 200 && res.status < 300) {
      isFirstOpen.value = false
      showOrganizeNamePanel.value = false
      await fetchOrganizeList()
    } else {
      alert('创建组织失败')
    }
  } catch (e) {
    console.error('[EquipmentManager] Error creating organize:', e)
    alert('创建组织失败')
  }
}

function prevDevicePage() {
  if (staffPage.value <= 1) return
  const prev = Math.max(1, staffPage.value - 1)

  const groupId = fetchData.groups[activeGroupIndex.value]?.id || null
  fetchOrganizeList(prev, staffPageSize.value,groupId)
}

function nextDevicePage() {

  const totalPages = staffTotal.value != null && staffPageSize.value > 0 ? Math.max(1, Math.ceil(staffTotal.value / staffPageSize.value)) : null
  if (totalPages != null && staffPage.value >= totalPages) return
  const next = staffPage.value + 1

  const groupId = fetchData.groups[activeGroupIndex.value]?.id || null
  fetchOrganizeList(next, staffPageSize.value, groupId)
}
</script>

<style scoped>
</style>


