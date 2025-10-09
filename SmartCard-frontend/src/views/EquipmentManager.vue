<template>
  <section class="min-h-[calc(100vh-64px)] bg-background">
    <div class="max-w-[1200px] mx-auto px-8 py-6">
      <h1 class="m-0 mb-4 text-[28px] font-extrabold tracking-[-0.02em] text-foreground">设备管理</h1>

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
          <button
            class="rounded-[8px] border border-[#DADADA] bg-white px-3 py-2 text-[14px] hover:bg-[#F4F4F4]"
            @click="addGroup"
          >
            + 新建分组
          </button>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="rounded-[8px] border border-[#DADADA] bg-white px-3 py-2 text-[14px] hover:bg-[#F4F4F4]"
            @click="addPerson"
          >
            + 新增人员
          </button>
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
            @close="removePerson"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PersonCard from '../components/PersonCard.vue'
export default {
  name: 'EquipmentManager',
  components: { PersonCard },
  data() {
    return {
      groups: [
        {
          id: 1,
          name: 'group1',
          people: [
            { name: '张三', role: '在线', identifier: '02245', avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&q=80&auto=format&fit=crop' },
            { name: '李四', role: '离线', identifier: '02246', avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=256&q=80&auto=format&fit=crop' },
          ],
        },
      ],
      activeGroupIndex: 0,
    }
  },
  methods: {
    selectGroup(idx) {
      this.activeGroupIndex = idx
    },
    addGroup() {
      const nextIndex = this.groups.length + 1
      this.groups.push({ id: Date.now(), name: `group${nextIndex}`, people: [] })
      this.activeGroupIndex = this.groups.length - 1
    },
    deleteActiveGroup() {
      if (this.groups.length <= 1) return
      this.groups.splice(this.activeGroupIndex, 1)
      if (this.activeGroupIndex >= this.groups.length) {
        this.activeGroupIndex = this.groups.length - 1
      }
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
  },
}
</script>

<style scoped>
</style>


