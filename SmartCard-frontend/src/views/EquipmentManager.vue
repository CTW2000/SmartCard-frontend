<template>
  <section class="min-h-[calc(100vh-64px)] bg-background">
    <div class="max-w-[1200px] mx-auto px-8 py-6">
      <h1 class="m-0 mb-4 text-[28px] font-extrabold tracking-[-0.02em] text-foreground">设备管理</h1>

      <PersonCard
        :open="open"
        name="张三"
        role="后厨"
        identifier="02245"
        email="zhangsan@example.com"
        phone="138-0000-1234"
        location="上海市 浦东新区"
        @close="open = false"
        @edit="onEdit"
      />
    </div>
  </section>
</template>

<script>
import PersonCard from '../components/PersonCard.vue'
export default {
  name: 'EquipmentManager',
  components: { PersonCard },
  data() {
    return { open: true }
  },
  methods: {
    onEdit() {
      alert('Edit person info...')
    }
  }
}
</script>

<style scoped>
</style>


