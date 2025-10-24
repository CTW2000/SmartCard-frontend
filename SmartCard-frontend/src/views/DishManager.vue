<template>
  <section class="page">
    <h1>DishManager</h1>
    <div class="charts-row">
      <div class="chart">
        <div class="transform origin-top-left scale-75">
          <LineChart />
        </div>
      </div>
      <div class="chart">
        <div class="transform origin-top-left scale-75">
          <BadDishMenu />
        </div>
      </div>
    </div>
    <div class="forms-row">
      <div class="form-card">
        <StaffForm :title="'菜品销量热榜'" :headers="headersDish" :fields="fieldsDish" :rows="rowsHot" />
      </div>
      <div class="form-card">
        <StaffForm :title="'菜品销量冷榜'" :headers="headersDish" :fields="fieldsDish" :rows="rowsCold" />
      </div>
    </div>
  </section>
</template>

<script>
import LineChart from '../components/lineChart.vue'
import BadDishMenu from '../components/badDishMenu.vue'
import StaffFormHome from '../components/StaffFormHome.vue'

export default {
  name: 'DishManager',
  components: { LineChart, BadDishMenu, StaffForm: StaffFormHome },
  data() {
    return {
      headersDish: ['排名', '菜名', '销量', '详情'],
      fieldsDish: ['rank', 'name', 'sales', 'detail'],
      rowsHot: [
        { id: 1, rank: 1, name: '友和秘制鸡爪', sales: '999+' },
        { id: 2, rank: 2, name: '招牌擀面皮炒鸡', sales: 876 },
        { id: 3, rank: 3, name: '红油凉粉', sales: 543 },
        { id: 4, rank: 4, name: '铁盆酸菜鱼', sales: 541 },
        { id: 5, rank: 5, name: '香辣大扒皮鱼', sales: 324 },
        { id: 6, rank: 6, name: '友和王牌麻辣龙虾', sales: 123 }
      ],
      rowsCold: [
        { id: 1, rank: 1, name: '友和秘制鸡爪', sales: 0 },
        { id: 2, rank: 2, name: '招牌擀面皮炒鸡', sales: 0 },
        { id: 3, rank: 3, name: '红油凉粉', sales: 3 },
        { id: 4, rank: 4, name: '铁盆酸菜鱼', sales: 15 },
        { id: 5, rank: 5, name: '香辣大扒皮鱼', sales: 16 },
        { id: 6, rank: 6, name: '友和王牌麻辣龙虾', sales: 19 }
      ]
    }
  }
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
.charts-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.chart {
  flex: 1;
}
.forms-row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.form-card { flex: 1; }
</style>