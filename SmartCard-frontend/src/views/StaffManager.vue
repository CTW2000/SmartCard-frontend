<template>
  <section class="min-h-[calc(100vh-60px)] bg-background">
    <div class="max-w-[1200px] mx-auto px-8 py-6">
      <h1 class="m-0 mb-4 text-[20px] font-bold tracking-[0.02em] text-foreground">员工管理</h1>

      <!-- Top summary cards (3-column responsive, gap ≈ 12px) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <StatCard title="本周店长评分" value="9.8分" metaLabel="同比上周增长" metaValue="5%" trend="up" />
        <StatCard title="员工服务评分" value="9.2 分" metaLabel="同比上周增长" metaValue="17%" trend="up" />
        <StatCard
          title="员工差评原因TOP榜单"
          :items="[
            { value: 'TOP1', metaValue: '服务态度差' },
            { value: 'TOP2', metaValue: '餐前餐具清洁问题' },
            { value: 'TOP3', metaValue: '服务不及时' }
          ]"
        />
      </div>

      <!-- Form section -->
      <Form />
    </div>
  </section>
</template>

<script>
import StatCard from '../components/StatCard.vue'
import Form from '../components/Form.vue'

export default {
  name: 'StaffManagement',
  components: { StatCard, Form },
}
</script>

<style scoped>
</style>
  
  
  