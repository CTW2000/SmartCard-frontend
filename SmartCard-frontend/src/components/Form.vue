<template>
  <div class="rounded-[24px] bg-card p-6" style="box-shadow: 0 8px 24px rgba(16,24,40,0.12)">
    <h3 class="m-0 mb-3 text-[24px] font-extrabold tracking-[-0.01em] text-foreground">{{ title }}</h3>

    <!-- data table -->
    <div class="rounded-[12px] border border-border overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-card border-b-2" style="border-bottom-color: rgba(0,0,0,0.16)">
            <th v-for="(h, i) in headers" :key="'h-' + i" :class="thClass(i)" class="text-[16px] font-bold text-[rgba(15,23,42,0.65)] px-4 py-3">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in rows" :key="row.id || idx" class="hover:bg-[rgba(2,6,23,0.03)] border-b" style="border-bottom-color: rgba(0,0,0,0.08)">
            <td v-for="(field, i) in fields" :key="'c-' + i" :class="tdClass(i)" class="px-4 py-3 text-[16px] text-foreground">
              <template v-if="field === 'detail'">
                <div class="text-center">
                  <button class="w-9 h-9 rounded-full inline-flex items-center justify-center" style="box-shadow: none" @click="$emit('rowAction', row)">
                    <span class="text-[18px] text-[rgba(15,23,42,0.65)]">→</span>
                  </button>
                </div>
              </template>
              <template v-else>
                {{ row[field] }}
              </template>
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
  props: {
    title: { type: String, default: '数据表' },
    headers: { type: Array, default: () => [] },
    fields: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] }
  },
  emits: ['rowAction'],
  methods: {
    thClass(index) {
      const align = this.alignFor(index)
      return {
        'text-left': align === 'left',
        'text-right': align === 'right',
        'text-center': align === 'center'
      }
    },
    tdClass(index) {
      const align = this.alignFor(index)
      return {
        'text-left': align === 'left',
        'text-right': align === 'right',
        'text-center': align === 'center'
      }
    },
    alignFor(index) {
      // default alignment: left for first 3, right for numbers, center for detail
      const field = this.fields[index]
      if (field === 'detail') return 'center'
      if (['hours', 'issues', 'score', 'sales', 'rank'].includes(field)) return 'right'
      return 'left'
    }
  }
}
</script>

<style scoped>
</style>


