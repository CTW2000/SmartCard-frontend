<template>
  <div class="rounded-[24px] bg-card p-6" style="box-shadow: 0 8px 24px rgba(16,24,40,0.12)">
    <h3 class="m-0 mb-3 text-[24px] font-extrabold tracking-[-0.01em] text-foreground">员工服务评分</h3>

    <!-- quick metrics -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div class="rounded-[16px] border border-border bg-card p-4">
        <div class="text-sm text-muted-foreground">员工总数</div>
        <div class="text-2xl font-extrabold text-foreground">{{ staff.length }}</div>
      </div>
      <div class="rounded-[16px] border border-border bg-card p-4">
        <div class="text-sm text-muted-foreground">平均评分</div>
        <div class="text-2xl font-extrabold text-foreground">{{ avgScore }}</div>
      </div>
      <div class="rounded-[16px] border border-border bg-card p-4">
        <div class="text-sm text-muted-foreground">人均服务时长</div>
        <div class="text-2xl font-extrabold text-foreground">{{ avgHours }}h</div>
      </div>
      <div class="rounded-[16px] border border-border bg-card p-4">
        <div class="text-sm text-muted-foreground">每周差评总数</div>
        <div class="text-2xl font-extrabold text-foreground">{{ totalIssues }}</div>
      </div>
    </div>

    <!-- data table -->
    <div class="rounded-[12px] border border-border overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-card border-b-2" style="border-bottom-color: rgba(0,0,0,0.16)">
            <th class="text-left text-[16px] font-bold text-[rgba(15,23,42,0.65)] px-4 py-3">姓名</th>
            <th class="text-left text-[16px] font-bold text-[rgba(15,23,42,0.65)] px-4 py-3">编号</th>
            <th class="text-left text-[16px] font-bold text-[rgba(15,23,42,0.65)] px-4 py-3">岗位</th>
            <th class="text-right text-[16px] font-bold text-[rgba(15,23,42,0.65)] px-4 py-3">日均服务时间</th>
            <th class="text-right text-[16px] font-bold text-[rgba(15,23,42,0.65)] px-4 py-3">每周差评事件</th>
            <th class="text-right text-[16px] font-bold text-[rgba(15,23,42,0.65)] px-4 py-3">评分</th>
            <th class="text-center w-[56px] px-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in staff" :key="s.id" class="hover:bg-[rgba(2,6,23,0.03)] border-b" style="border-bottom-color: rgba(0,0,0,0.08)">
            <td class="px-4 py-3 text-[16px] font-medium text-foreground">{{ s.name }}</td>
            <td class="px-4 py-3 text-[16px] font-mono text-foreground">{{ s.no }}</td>
            <td class="px-4 py-3 text-[16px] text-foreground">{{ s.role }}</td>
            <td class="px-4 py-3 text-[16px] text-foreground text-right">{{ s.hours }}h</td>
            <td class="px-4 py-3 text-[16px] text-foreground text-right">{{ s.issues }}</td>
            <td class="px-4 py-3 text-[16px] text-foreground text-right">{{ s.score.toFixed(1) }}</td>
            <td class="px-2 py-3 text-center">
              <button class="w-9 h-9 rounded-full inline-flex items-center justify-center" style="box-shadow: none" @click="$emit('rowAction', s)">
                <span class="text-[18px] text-[rgba(15,23,42,0.45)]">›</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormCard',
  data() {
    return {
      staff: [
        { id: 1, name: '张三', no: '02245', role: '后厨', hours: 6.3, issues: 1, score: 9.2 },
        { id: 2, name: '李四', no: '01873', role: '前台', hours: 7.1, issues: 0, score: 9.5 },
        { id: 3, name: '王五', no: '01921', role: '外卖', hours: 5.2, issues: 2, score: 8.9 },
        { id: 4, name: '赵六', no: '02002', role: '后厨', hours: 6.8, issues: 0, score: 9.0 },
      ],
    }
  },
  computed: {
    avgScore() {
      if (!this.staff.length) return '0.0'
      const v = this.staff.reduce((s, i) => s + i.score, 0) / this.staff.length
      return v.toFixed(1)
    },
    avgHours() {
      if (!this.staff.length) return '0.0'
      const v = this.staff.reduce((s, i) => s + i.hours, 0) / this.staff.length
      return v.toFixed(1)
    },
    totalIssues() {
      return this.staff.reduce((s, i) => s + i.issues, 0)
    }
  }
}
</script>

<style scoped>
</style>


