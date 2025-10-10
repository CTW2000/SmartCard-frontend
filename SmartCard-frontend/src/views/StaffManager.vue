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
      <Form :title="'员工服务评分'" :headers="headersStaff" :fields="fieldsStaff" :rows="rowsStaff" />
    </div>
  </section>
</template>

<script>
import StatCard from '../components/StatCard.vue'
import Form from '../components/Form.vue'

export default {
  name: 'StaffManagement',
  components: { StatCard, Form },
  data() {
    return {
      headersStaff: ['姓名', '设备号', '岗位', '日均服务时间', '每周差评事件', '评分', '详情'],
      fieldsStaff: ['name', 'no', 'role', 'hours', 'issues', 'score', 'detail'],
      rowsStaff: [
        { id: 1, name: '张伟', no: 'A001', role: '收银', hours: '6h', issues: 1, score: '4.5' },
        { id: 2, name: '王芳', no: 'A002', role: '服务', hours: '7h', issues: 0, score: '4.8' },
        { id: 3, name: '李强', no: 'A003', role: '后厨', hours: '8h', issues: 2, score: '4.2' },
        { id: 4, name: '刘洋', no: 'A004', role: '打荷', hours: '5h', issues: 0, score: '4.9' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
  
  
  