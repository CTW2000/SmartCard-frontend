<template>
  <section class="relative min-h-[calc(100vh-64px)] bg-background">
    <div class="max-w-[1600px] mx-auto px-8 py-6">
      <div class="m-0 mb-4">
        <template v-if="isEditMode">
          <input
            v-model="organizeEditInput"
            type="text"
            class="w-full max-w-[520px] h-[44px] rounded-[8px] border border-[#DADADA] px-3 text-[16px] outline-none"
            placeholder="请输入组织名称并按回车"
          />
        </template>
        <template v-else-if="!isAddingOrganize && organizeName">
          <h1 class="m-0 text-[28px] font-extrabold tracking-[-0.02em] text-foreground">{{ organizeName }}</h1>
        </template>
        <template v-else-if="isAddingOrganize">
          <input
            v-model="organizeInput"
            type="text"
            class="w-full max-w-[520px] h-[44px] rounded-[8px] border border-[#DADADA] px-3 text-[16px] outline-none"
            placeholder="请输入组织名称并按回车"
            @keyup.enter="submitOrganize"
          />
        </template>
        <template v-else>
          <button
            type="button"
            class="group relative h-[44px] w-[44px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
            @click="startAddOrganize"
            aria-label="添加组织名称"
          >
            <img :src="blackBGIcon" class="h-[44px] w-[44px] transition group-hover:brightness-110" alt="" />
            <img :src="whiteCrossIcon" class="absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="添加组织名称" />
          </button>
        </template>
      </div>

      <!-- Group controls -->
      <div class="mb-4 flex items-center justify-between">
        <div class="flex flex-wrap gap-2">
          <template v-if="isEditMode">
            <div
              v-for="(g, idx) in groups"
              :key="g.id"
              class="relative inline-block"
            >
              <input
                v-model="groupEditNames[g.id]"
                type="text"
                class="rounded-[8px] border px-[18px] py-[9.2px] text-[14px] outline-none"
                :class="idx === activeGroupIndex ? 'bg-white border-[#007AFF] text-[#007AFF]' : 'bg-white border-[#DADADA] text-[rgba(0,0,0,0.80)]'"
                @click="selectGroup(idx)"
              />
              <img
                :src="closeIcon"
                class="absolute -top-2 -right-2 w-[19px] h-[19px] cursor-pointer"
                alt="关闭"
                @click.stop="deleteGroup(g.id, idx)"
              />
            </div>
          </template>
          <template v-else>
            <button
              v-for="(g, idx) in groups"
              :key="g.id"
              class="relative rounded-[8px] border px-[18px] py-[9.2px] text-[14px]"
              :class="idx === activeGroupIndex ? 'bg-white border-[#007AFF] text-[#007AFF]' : 'bg-white border-[#DADADA] text-[rgba(0,0,0,0.80)]'"
              @click="selectGroup(idx)"
            >
              {{ g.name }}
            </button>
          </template>
          <template v-if="isAddingGroup">
            <input
              v-model="groupInput"
              type="text"
              class="h-[44px] rounded-[8px] border border-[#DADADA] px-3 text-[14px] outline-none"
              placeholder="请输入分组名称并按回车"
              @keyup.enter="submitGroup"
            />
          </template>
          <template v-else-if="isEditMode">
            <button
              class="group relative h-[44px] w-[44px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
              @click="startAddGroup"
              aria-label="新建分组"
            >
              <img :src="blackBGIcon" class="h-[44px] w-[44px] transition group-hover:brightness-110" alt="" />
              <img :src="whiteCrossIcon" class="absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="新建分组" />
            </button>
          </template>
        </div>
      </div>
    <!-- Select Staff Panel -->
    <div v-if="showSelectStaffPanel" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="showSelectStaffPanel = false"></div>
      <div class="relative">
        <div class="w-[507px] h-[806px] relative origin-center scale-75">
          <div class="w-[507px] h-[806px] left-0 top-0 absolute bg-white rounded-[54px] shadow-[0px_2px_2px_0px_rgba(76,76,76,0.25)] border border-gray-200"></div>
          <div class="w-96 h-[467px] left-[36px] top-[179px] absolute bg-white rounded-[19px] border border-gray-200"></div>
          <div class="left-[77px] top-[136px] absolute justify-start text-stone-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">员工</div>
          <div class="left-[215px] top-[136px] absolute justify-start text-stone-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">手机号</div>
          <!-- Dynamic staff list -->
          <div class="absolute left-[36px] top-[179px] w-96 h-[467px] overflow-y-auto">
            <div
              v-for="(s, idx) in staffList"
              :key="s.id || idx"
              class="relative flex items-center justify-between px-4 py-5 cursor-pointer hover:bg-neutral-50"
              :class="{ 'border-t border-neutral-200': idx !== 0 }"
              @click="selectStaff(s)"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
                <div class="text-zinc-800 text-xl">{{ s.name }}</div>
              </div>
              <div class="text-stone-500 text-xl">{{ s.phone || '-' }}</div>
            </div>
          </div>
          <div class="w-28 h-14 left-[80px] top-[695px] absolute bg-white rounded-2xl border border-stone-300"></div>
          <div class="w-28 h-14 left-[317px] top-[695px] absolute bg-white rounded-2xl border border-stone-300"></div>
          <div class="left-[104px] top-[706px] absolute justify-start text-zinc-800 text-2xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="prevStaffPage">上一页</div>
          <div class="left-[341px] top-[706px] absolute justify-start text-zinc-800 text-2xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="nextStaffPage">下一页</div>
          <div class="left-[222px] top-[709px] absolute justify-start text-neutral-600 text-xl font-medium font-['Alibaba_PuHuiTi']">第{{ staffPage }} / {{ staffTotal && staffPageSize ? Math.max(1, Math.ceil(staffTotal / staffPageSize)) : '—' }}页</div>
          <div class="left-[83px] top-[45px] absolute justify-start text-stone-900 text-3xl font-medium font-['Alibaba_PuHuiTi']">员工选择</div>
          <div class="w-4 h-7 left-[68.33px] top-[82px] absolute origin-top-left -rotate-180 bg-zinc-900"></div>
        </div>
      </div>
    </div>

      <!-- Active group's cards -->
      <div class="flex flex-wrap gap-5">
        <div v-for="(p, i) in (groups[activeGroupIndex]?.people || [])" :key="p.identifier || i" class="m-0">
          <PersonCard
            :open="true"
            :name="p.name"
            :role="p.role"
            :identifier="p.identifier"
            :avatarUrl="p.avatarUrl"
            :phone="p.phone"
            :email="p.email"
            :location="p.location"
            :organize-id="p.organize_id"
            :group-id="p.group_id"
            :device-number="p.device_number"
            :device-name="p.device_name"
            :device-id="p.device_id"
            :staff-id="p.staff_id"
            :editMode="isEditMode"
            @close="removePerson"
            @save="(updated) => onPersonSave(i, updated)"
            @updated="onCardUpdated"
            @edit="onCardEdit"
          />
        </div>
      </div>
      
      <!-- Device pagination controls -->
      <div class="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="devicePage <= 1"
          @click="prevDevicePage"
        >
          上一页
        </button>
        <span class="text-neutral-600 text-[14px] font-medium">
          第{{ devicePage }}页
        </span>
        <button
          type="button"
          class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="deviceTotal != null && devicePage >= Math.ceil(deviceTotal / devicePageSize)"
          @click="nextDevicePage"
        >
          下一页
        </button>
      </div>
    </div>
    <div class="absolute right-6 top-6 flex items-center gap-3">
      <!-- Add staff button - only show in edit mode -->
      <button
        v-if="isEditMode"
        class="group relative h-[44px] w-[44px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
        @click="showAddPersonPanel = true"
        aria-label="Add person"
      >
        <img :src="blackBGIcon" class="h-[44px] w-[44px] transition group-hover:brightness-110" alt="" />
        <img :src="whiteCrossIcon" class="absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="新增人员" />
      </button>
      <!-- Edit/Complete button -->
      <button
        class="group relative cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
        :class="isEditMode ? 'h-[42px] w-[78px]' : 'h-[42px] w-[42px]'"
        @click="toggleEditMode"
        :aria-label="isEditMode ? '完成' : '编辑'"
      >
        <template v-if="isEditMode">
          <!-- Complete button with blackBG and white text -->
          <img :src="blackBGIcon" class="h-[42px] w-[78px] transition group-hover:brightness-110" alt="" />
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-medium">完成</span>
        </template>
        <template v-else>
          <!-- Edit button with circle and pencil -->
          <img :src="circleIcon" class="h-[42px] w-[42px] transition group-hover:brightness-95" alt="" />
          <img :src="pencilIcon" class="absolute left-1/2 top-1/2 h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="编辑" />
        </template>
      </button>
    </div>
  </section>
    <DeviceEditPanel
      v-if="showDevicePanel"
      :modelValue="selectedPerson"
      @save="onDeviceSave"
      @close="showDevicePanel = false"
    />
    <!-- Add Person Panel -->
    <div v-if="showAddPersonPanel && !showSelectStaffPanel" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="showAddPersonPanel = false"></div>
      <div class="relative">
        <div class="w-96 h-80 relative">
          <div class="w-96 h-80 left-0 top-0 absolute bg-white rounded-[31px]"></div>
          <div class="w-64 h-0 left-[53px] top-[93px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          <div class="left-[54px] top-[117px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">绑定人员</div>
          <div class="left-[54px] top-[165px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备号</div>
          <div class="left-[53px] top-[214px] absolute justify-start text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi']">设备名称</div>
          <div class="left-[51px] top-[37px] absolute justify-start text-black text-2xl font-normal font-['Alibaba_PuHuiTi']">添加设备</div>
          <div class="w-28 h-10 left-[129px] top-[272px] absolute bg-white rounded-[20px] border border-zinc-300"></div>
          <div class="left-[164px] top-[279px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer" @click="submitAddDevice">完成</div>
          <!-- Inputs -->
          <div
            class="w-24 h-9 left-[219px] top-[112px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm flex items-center cursor-pointer"
            @click="openSelectStaffPanel"
          >
            <span class="truncate text-zinc-600">{{ addDeviceForm.staffName || '选择人员' }}</span>
          </div>
          <input
            v-model="addDeviceForm.deviceNumber"
            type="text"
            class="w-24 h-9 left-[219px] top:[160px] top-[160px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none"
            placeholder="设备号"
          />
          <input
            v-model="addDeviceForm.deviceName"
            type="text"
            class="w-24 h-9 left-[219px] top-[208px] absolute rounded-xl shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)] border border-zinc-300 px-3 text-sm outline-none"
            placeholder="设备名称"
          />
        </div>
      </div>
    </div>
</template>

<script>
import PersonCard from '../components/PersonCard.vue'
import DeviceEditPanel from '../components/DeviceEditPanel.vue'
import CircleIcon from '../../Resource/Staff/Circle.svg'
import PencilIcon from '../../Resource/Staff/Pencil.svg'
import BlackBG from '../../Resource/Staff/blackBG.svg'
import WhiteCross from '../../Resource/Staff/whiteCross.svg'
import CloseIcon from '../../Resource/Equipment/Close.svg'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
export default {
  name: 'EquipmentManager',
  components: { PersonCard, DeviceEditPanel },
  data() {
    return {
      isEditMode: false,
      circleIcon: CircleIcon,
      pencilIcon: PencilIcon,
      blackBGIcon: BlackBG,
      whiteCrossIcon: WhiteCross,
      closeIcon: CloseIcon,
      organizeName: '',
      organizeEditInput: '',
      isAddingOrganize: false,
      organizeInput: '',
      groups: [],
      groupEditNames: {},
      isAddingGroup: false,
      groupInput: '',
      activeGroupIndex: 0,
      showDevicePanel: false,
      selectedPerson: {},
      showAddPersonPanel: false,
      showSelectStaffPanel: false,
      staffList: [],
      staffPage: 1,
      staffPageSize: 7,
      staffTotal: null,
      selectedStaffId: '',
      devicePage: 1,
      devicePageSize: 20,
      deviceTotal: null,
      addDeviceForm: {
        staffName: '',
        deviceNumber: '',
        deviceName: '',
      },
    }
  },
  mounted() {
    // On enter: if now_organize exists, fetch page data
    try {
      const nowOrganizeStr = localStorage.getItem('now_organize')
      if (nowOrganizeStr) {
        try {
          const nowOrg = JSON.parse(nowOrganizeStr)
          this.organizeName = (nowOrg && nowOrg.organize_name) || this.organizeName
          this.organizeEditInput = this.organizeName
        } catch (_) {}
        this.fetchOrganizeList()
      }
    } catch (_) {}
  },
  methods: {
    selectGroup(idx) {
      this.activeGroupIndex = idx
      // Reload devices for the selected group (reset to page 1)
      const groupId = (this.groups[idx] && this.groups[idx].id) || null
      if (groupId) {
        this.devicePage = 1
        this.fetchOrganizeList(false, groupId, 1, this.devicePageSize)
      }
    },
    startAddGroup() {
      this.isAddingGroup = true
    },
    async submitGroup() {
      const name = (this.groupInput || '').trim()
      if (!name) return
      // Get organize_id from localStorage
      let organizeId = ''
      try {
        const nowOrganizeStr = localStorage.getItem('now_organize')
        if (nowOrganizeStr) {
          const nowOrganize = JSON.parse(nowOrganizeStr)
          organizeId = nowOrganize._id || ''
        }
      } catch (e) {
        console.error('[EquipmentManager] Error reading now_organize from localStorage:', e)
      }
      const payload = {
        type: 'add',
        data: JSON.stringify({ group_name: name, type: 'add', organize_id: organizeId })
      }
      try {
        const res = await postForm(PATHS.DEVICE_GROUP_EDIT, payload)
        if (res && res.status >= 200 && res.status < 300) {
          // Fetch latest groups, then use the last element's id as the new group id
          const listRes = await this.fetchOrganizeList(true)
          let newId = Date.now()
          if (listRes && listRes.data && listRes.data.data && Array.isArray(listRes.data.data.group_list)) {
            const gl = listRes.data.data.group_list
            if (gl.length > 0) newId = gl[gl.length - 1]._id || newId
          }
          this.groups.push({ id: newId, name, people: [] })
          this.activeGroupIndex = this.groups.length - 1
          this.isAddingGroup = false
          this.groupInput = ''
        } else {
          alert('提交失败')
        }
      } catch (e) {
        console.error('[EquipmentManager] group edit error:', e)
        alert('提交失败')
      }
    },
    async deleteGroup(groupId, idx) {
      if (this.groups.length <= 1) {
        alert('至少需要保留一个分组')
        return
      }
      // Get organize_id from localStorage
      let organizeId = ''
      try {
        const nowOrganizeStr = localStorage.getItem('now_organize')
        if (nowOrganizeStr) {
          const nowOrganize = JSON.parse(nowOrganizeStr)
          organizeId = nowOrganize._id || ''
        }
      } catch (e) {
        console.error('[EquipmentManager] Error reading now_organize from localStorage:', e)
      }
      const payload = {
        type: 'delete',
        data: JSON.stringify({ group_id: groupId, type: 'delete', organize_id: organizeId })
      }
      try {
        const res = await postForm(PATHS.DEVICE_GROUP_EDIT, payload)
        if (res && res.status >= 200 && res.status < 300) {
          // Remove from local state
          this.groups.splice(idx, 1)
          // Adjust activeGroupIndex if needed
          if (this.activeGroupIndex >= this.groups.length) {
            this.activeGroupIndex = Math.max(0, this.groups.length - 1)
          }
          // Refresh the page data
          const newGroupId = (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || null
          await this.fetchOrganizeList(false, newGroupId, this.devicePage, this.devicePageSize)
        } else {
          alert('删除失败')
        }
      } catch (e) {
        console.error('[EquipmentManager] group delete error:', e)
        alert('删除失败')
      }
    },
    onCardEdit(payload) {
      this.selectedPerson = { ...(payload || {}) }
      this.showDevicePanel = true
    },
    onDeviceSave(updated) {
      const g = this.groups[this.activeGroupIndex]
      if (!g) { this.showDevicePanel = false; return }
      const id = (updated && updated.identifier) || (this.selectedPerson && this.selectedPerson.identifier)
      const idx = g.people.findIndex(x => x.identifier === id)
      if (idx !== -1) {
        g.people[idx] = { ...g.people[idx], ...updated }
      }
      this.showDevicePanel = false
    },
    onCardUpdated() {
      const groupId = (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || null
      if (groupId) {
        this.fetchOrganizeList(false, groupId, this.devicePage, this.devicePageSize)
      } else {
        this.fetchOrganizeList(false)
      }
    },
    async submitAddDevice() {
      // Use the active group's bound id
      let groupId = (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || ''
      let staffId = ''
      try {
        staffId = localStorage.getItem('staff_id') || ''
      } catch (_) {}

      const deviceNumber = (this.addDeviceForm.deviceNumber || '').trim()
      const deviceName = (this.addDeviceForm.deviceName || '').trim()
      const payload = {
        type: 'add',
        data: JSON.stringify({
          device_number: deviceNumber,
          staff_id: staffId,
          device_name: deviceName,
          type: 'add',
          device_id: '',
          group_id: groupId,
        })
      }
      try {
        const res = await postForm(PATHS.DEVICE_EDIT, payload)
        if (res && res.status >= 200 && res.status < 300) {
          console.log('[EquipmentManager] device edit success:', res.data)
          this.showAddPersonPanel = false
          this.addDeviceForm = { staffName: '', deviceNumber: '', deviceName: '' }
          // Refresh the page with current active group
          const activeGroupId = (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || ''
          await this.fetchOrganizeList(false, activeGroupId)
        } else {
          alert('提交失败')
        }
      } catch (e) {
        console.error('[EquipmentManager] device edit error:', e)
        alert('提交失败')
      }
    },

    openSelectStaffPanel() {
      this.showSelectStaffPanel = true
      this.staffPage = 1
      this.fetchStaffPage(this.staffPage, this.staffPageSize)
    },
    async fetchStaffPage(page = this.staffPage, limit = this.staffPageSize) {
      try {
        const res = await postForm(PATHS.STAFF_LIST, { 
          page: String(page), 
          limit: String(limit), 
          name: '' 
        })
        const data = res && res.data && res.data.data
        const rawList = (data && Array.isArray(data.staff_list)) ? data.staff_list : []
        this.staffList = rawList.map(it => ({
          id: it._id || it.id || '',
          name: it.name || '',
          phone: it.phone || '',
        }))
        const detectedTotal = data && data.total
        if (typeof detectedTotal === 'number' && detectedTotal >= 0) this.staffTotal = detectedTotal
        this.staffPage = page
        this.staffPageSize = limit
      } catch (e) {
        console.error('[EquipmentManager] fetch staff page error:', e)
      }
    },
    prevStaffPage() {
      if (this.staffPage <= 1) return
      const prev = Math.max(1, this.staffPage - 1)
      this.fetchStaffPage(prev, this.staffPageSize)
    },
    nextStaffPage() {
      const totalPages = this.staffTotal != null && this.staffPageSize > 0 ? Math.max(1, Math.ceil(this.staffTotal / this.staffPageSize)) : null
      if (totalPages != null && this.staffPage >= totalPages) return
      const next = this.staffPage + 1
      this.fetchStaffPage(next, this.staffPageSize)
    },
    selectStaff(item) {
      this.addDeviceForm.staffName = item.name
      this.selectedStaffId = item.id
      try {
        localStorage.setItem('staff_id', this.selectedStaffId || '')
      } catch (_) {}
      this.showSelectStaffPanel = false
    },
    removePerson(identifier) {
      const g = this.groups[this.activeGroupIndex]
      if (!g) return
      const idx = g.people.findIndex(x => x.identifier === identifier)
      if (idx !== -1) g.people.splice(idx, 1)
    },
    async toggleEditMode() {
      if (this.isEditMode) {
        // Completing edit mode: submit organize name update if changed
        const next = (this.organizeEditInput || '').trim()
        if (next && next !== this.organizeName) {
          await this.submitOrganizeUpdate()
        }
        // Submit all changed group names
        await this.submitGroupUpdates()
        this.isEditMode = false
      } else {
        // Entering edit mode: preload inputs with current names
        this.isEditMode = true
        this.organizeEditInput = this.organizeName
        // Initialize group edit names
        this.groupEditNames = {}
        this.groups.forEach(g => {
          this.groupEditNames[g.id] = g.name
        })
      }
    },
    startAddOrganize() {
      this.isAddingOrganize = true
      this.$nextTick(() => {
        // optional: focus the input if needed using ref
      })
    },
    async submitOrganize() {
      const name = (this.organizeInput || '').trim()
      if (!name) return
      const payload = {
        data: JSON.stringify({ organize_name: name, type: 'add' }),
        type: 'add'
      }
      try {
        const res = await postForm(PATHS.DEVICE_ORGANIZE_EDIT, payload)
        if (res && res.status >= 200 && res.status < 300) {
          this.organizeName = name
          this.isAddingOrganize = false
          this.organizeInput = ''
          // Call API to access page data after successful submission
          await this.fetchOrganizeList()
        } else {
          alert('提交失败')
        }
      } catch (e) {
        console.error('[EquipmentManager] organize edit error:', e)
        alert('提交失败')
      }
    },
    async submitOrganizeUpdate() {
      const name = (this.organizeEditInput || '').trim()
      if (!name) return
      // read organize_id
      let organizeId = ''
      try {
        const nowOrganizeStr = localStorage.getItem('now_organize')
        if (nowOrganizeStr) {
          const nowOrganize = JSON.parse(nowOrganizeStr)
          organizeId = nowOrganize._id || ''
        }
      } catch (e) {
        console.error('[EquipmentManager] read now_organize failed:', e)
      }
      const payload = {
        type: 'update',
        data: JSON.stringify({ organize_name: name, type: 'update', organize_id: organizeId })
      }
      try {
        const res = await postForm(PATHS.DEVICE_ORGANIZE_EDIT, payload)
        if (res && res.status >= 200 && res.status < 300) {
          this.organizeName = name
          // persist to localStorage
          try {
            const nowOrganizeStr = localStorage.getItem('now_organize')
            const nowOrg = nowOrganizeStr ? JSON.parse(nowOrganizeStr) : {}
            nowOrg.organize_name = name
            localStorage.setItem('now_organize', JSON.stringify(nowOrg))
          } catch (_) {}
          // refresh page data
          await this.fetchOrganizeList(false, (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || null, this.devicePage, this.devicePageSize)
        } else {
          alert('提交失败')
        }
      } catch (e) {
        console.error('[EquipmentManager] organize update error:', e)
        alert('提交失败')
      }
    },
    async submitGroupUpdates() {
      // Get organize_id from localStorage
      let organizeId = ''
      try {
        const nowOrganizeStr = localStorage.getItem('now_organize')
        if (nowOrganizeStr) {
          const nowOrganize = JSON.parse(nowOrganizeStr)
          organizeId = nowOrganize._id || ''
        }
      } catch (e) {
        console.error('[EquipmentManager] Error reading now_organize from localStorage:', e)
      }
      
      // Submit updates for all changed groups
      const updatePromises = []
      for (const group of this.groups) {
        const editedName = (this.groupEditNames[group.id] || '').trim()
        if (editedName && editedName !== group.name) {
          const payload = {
            type: 'update',
            data: JSON.stringify({
              group_name: editedName,
              type: 'update',
              group_id: group.id,
              organize_id: organizeId
            })
          }
          updatePromises.push(postForm(PATHS.DEVICE_GROUP_EDIT, payload))
        }
      }
      
      if (updatePromises.length > 0) {
        try {
          await Promise.all(updatePromises)
          // Refresh the page data after all updates
          const groupId = (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || null
          await this.fetchOrganizeList(false, groupId, this.devicePage, this.devicePageSize)
        } catch (e) {
          console.error('[EquipmentManager] group update error:', e)
          alert('部分分组更新失败')
        }
      }
    },
    async fetchOrganizeList(returnRaw = false, groupId = null, page = null, size = null) {
      // Get organize_id from localStorage
      let organizeId = ''
      try {
        const nowOrganizeStr = localStorage.getItem('now_organize')
        if (nowOrganizeStr) {
          const nowOrganize = JSON.parse(nowOrganizeStr)
          organizeId = nowOrganize._id || ''
        }
      } catch (e) {
        console.error('[EquipmentManager] Error reading now_organize from localStorage:', e)
      }
      
      // Use provided page/size or default to state values
      const devicePage = page != null ? String(page) : String(this.devicePage)
      const deviceSize = size != null ? String(size) : String(this.devicePageSize)
      
      const payload = {
        page: devicePage,
        size: deviceSize,
        organize_id: organizeId,
        group_id: groupId || ''
      }
      
      try {
        const res = await postForm(PATHS.DEVICE_ORGANIZE_LIST, payload)
        if (res && res.status >= 200 && res.status < 300) {
          const responseData = res.data || {}
          const data = responseData.data || {}
          // Rebuild in-memory group buttons from API data
          const groupList = Array.isArray(data.group_list) ? data.group_list : []
          this.groups = groupList.map(g => ({ id: g._id, name: g.group_name, people: [] }))
          
          // Determine which group to use
          let targetGroupId = groupId
          if (!targetGroupId) {
            // Use now_group as default if no group_id provided
            const nowGroup = data.now_group
            if (nowGroup && nowGroup._id) {
              targetGroupId = nowGroup._id
            }
          }
          // Set default active group
          if (targetGroupId) {
            const idx = this.groups.findIndex(g => g.id === targetGroupId)
            if (idx !== -1) this.activeGroupIndex = idx
          } else {
            // Fallback to first group if now_group exists but group_id doesn't match
            const nowGroup = data.now_group
            if (nowGroup && nowGroup._id) {
              const idx = this.groups.findIndex(g => g.id === nowGroup._id)
              if (idx !== -1) this.activeGroupIndex = idx
            }
          }
          // Populate device list into corresponding group's people
          const deviceList = Array.isArray(data.device_list) ? data.device_list : []
          if (deviceList.length > 0) {
            const groupIdToIndex = new Map(this.groups.map((g, i) => [g.id, i]))
            deviceList.forEach(dev => {
              const gIdx = groupIdToIndex.get(dev.group_id)
              if (gIdx != null && this.groups[gIdx]) {
                // Pass full staff data to PersonCard
                const staffData = dev.staff_id || {}
                const person = {
                  name: staffData.name || '未绑定',
                  role: dev.status === true ? '在线' : '离线',
                  identifier: dev.device_number || dev._id || '',
                  device_number: dev.device_number || '',
                  device_name: dev.device_name || '',
                  device_id: dev._id || '',
                  avatarUrl: staffData.avatar || '',
                  phone: staffData.phone || '',
                  email: staffData.email || '',
                  location: staffData.location || '',
                  // Keep full staff data for reference
                  staff_id: (staffData && (staffData._id || staffData.id)) || '',
                  staffData: staffData,
                  // relation identifiers
                  organize_id: organizeId,
                  group_id: dev.group_id,
                  deviceStatus: dev.status
                }
                this.groups[gIdx].people.push(person)
              }
            })
          }
          // Store device total count for pagination
          const detectedDeviceTotal = data && (data.total ?? data.total_count ?? data.count ?? data.device_total)
          if (typeof detectedDeviceTotal === 'number' && detectedDeviceTotal >= 0) {
            this.deviceTotal = detectedDeviceTotal
          }
          
          // Update device page state
          this.devicePage = page != null ? page : this.devicePage
          
          // Also update now_organize if it exists in the response (for organize submission flow)
          const nowOrganize = data.now_organize
          if (nowOrganize) {
            localStorage.setItem('now_organize', JSON.stringify(nowOrganize))
          }
          if (returnRaw) return res
        }
      } catch (e) {
        console.error('[EquipmentManager] fetch organize list error:', e)
      }
      return null
    },
    prevDevicePage() {
      if (this.devicePage <= 1) return
      const prev = Math.max(1, this.devicePage - 1)
      const groupId = (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || null
      this.fetchOrganizeList(false, groupId, prev, this.devicePageSize)
    },
    nextDevicePage() {
      const totalPages = this.deviceTotal != null && this.devicePageSize > 0 ? Math.max(1, Math.ceil(this.deviceTotal / this.devicePageSize)) : null
      if (totalPages != null && this.devicePage >= totalPages) return
      const next = this.devicePage + 1
      const groupId = (this.groups[this.activeGroupIndex] && this.groups[this.activeGroupIndex].id) || null
      this.fetchOrganizeList(false, groupId, next, this.devicePageSize)
    },
  },
}
</script>

<style scoped>
</style>


