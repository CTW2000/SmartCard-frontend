<template>
  <section class="relative min-h-[calc(100vh-64px)] bg-background">
    <div class="max-w-[1200px] mx-auto px-8 py-6">
      <div class="m-0 mb-4">
        <template v-if="!isAddingOrganize && organizeName">
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
          <button
            v-for="(g, idx) in groups"
            :key="g.id"
            class="rounded-[8px] border px-3 py-2 text-[14px]"
            :class="idx === activeGroupIndex ? 'bg-white border-[#007AFF] text-[#007AFF]' : 'bg-white border-[#DADADA] text-[rgba(0,0,0,0.80)]'"
            @click="selectGroup(idx)"
          >
            {{ g.name }}
          </button>
          <template v-if="isAddingGroup">
            <input
              v-model="groupInput"
              type="text"
              class="h-[44px] rounded-[8px] border border-[#DADADA] px-3 text-[14px] outline-none"
              placeholder="请输入分组名称并按回车"
              @keyup.enter="submitGroup"
            />
          </template>
          <template v-else>
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
        <div class="flex items-center gap-2">
          <button
          class="rounded-[8px] border px-3 py-2 text-[14px]"
          :class="groups.length > 1 ? 'bg-white border-[#DADADA] text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4]' : 'bg-white border-[#E5E5E5] text-[rgba(0,0,0,0.35)]'"
          :disabled="groups.length <= 1"
          @click="deleteActiveGroup"
        >
          删除当前分组
          </button>
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
            :editMode="isEditMode"
            @close="removePerson"
            @save="(updated) => onPersonSave(i, updated)"
            @edit="onCardEdit"
          />
        </div>
      </div>
    </div>
    <div class="absolute right-6 top-6 flex items-center gap-3">
      <button
        class="group relative h-[44px] w-[44px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
        @click="addPerson"
        aria-label="Add person"
      >
        <img :src="blackBGIcon" class="h-[44px] w-[44px] transition group-hover:brightness-110" alt="" />
        <img :src="whiteCrossIcon" class="absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="新增人员" />
      </button>
      <button
        class="group relative h-[42px] w-[42px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:drop-shadow-md focus:outline-none"
        @click="toggleEditMode"
        aria-label="Edit"
      >
        <img :src="circleIcon" class="h-[42px] w-[42px] transition group-hover:brightness-95" alt="" />
        <img :src="pencilIcon" class="absolute left-1/2 top-1/2 h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110" alt="编辑" />
      </button>
    </div>
  </section>
    <DeviceEditPanel
      v-if="showDevicePanel"
      :modelValue="selectedPerson"
      @save="onDeviceSave"
      @close="showDevicePanel = false"
    />
</template>

<script>
import PersonCard from '../components/PersonCard.vue'
import DeviceEditPanel from '../components/DeviceEditPanel.vue'
import CircleIcon from '../../Resource/Staff/Circle.svg'
import PencilIcon from '../../Resource/Staff/Pencil.svg'
import BlackBG from '../../Resource/Staff/blackBG.svg'
import WhiteCross from '../../Resource/Staff/whiteCross.svg'
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
      organizeName: '',
      isAddingOrganize: false,
      organizeInput: '',
      groups: [],
      isAddingGroup: false,
      groupInput: '',
      activeGroupIndex: 0,
      showDevicePanel: false,
      selectedPerson: {},
    }
  },
  methods: {
    selectGroup(idx) {
      this.activeGroupIndex = idx
    },
    startAddGroup() {
      this.isAddingGroup = true
    },
    async submitGroup() {
      const name = (this.groupInput || '').trim()
      if (!name) return
      const payload = {
        data: JSON.stringify({ group_name: name, type: 'add' }),
        type: 'add'
      }
      try {
        const res = await postForm(PATHS.DEVICE_GROUP_EDIT, payload)
        if (res && res.status >= 200 && res.status < 300) {
          const serverData = (res && res.data && res.data.data) || {}
          const newId = serverData.id || serverData._id || Date.now()
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
    deleteActiveGroup() {
      if (this.groups.length <= 1) return
      this.groups.splice(this.activeGroupIndex, 1)
      if (this.activeGroupIndex >= this.groups.length) {
        this.activeGroupIndex = this.groups.length - 1
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
    addPerson() {
      const g = this.groups[this.activeGroupIndex]
      if (!g) return
      const newId = String(Date.now()).slice(-5)
      g.people.push({
        name: `新人员${g.people.length + 1}`,
        role: '在线',
        identifier: newId,
        avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&q=80&auto=format&fit=crop',
      })
    },
    removePerson(identifier) {
      const g = this.groups[this.activeGroupIndex]
      if (!g) return
      const idx = g.people.findIndex(x => x.identifier === identifier)
      if (idx !== -1) g.people.splice(idx, 1)
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode
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
        } else {
          alert('提交失败')
        }
      } catch (e) {
        console.error('[EquipmentManager] organize edit error:', e)
        alert('提交失败')
      }
    }
  },
}
</script>

<style scoped>
</style>


