<template>
  <div class="relative" :style="{ width: scaledWidth + 'px', height: scaledHeight + 'px' }">
    <div class="relative" :style="scaledInnerStyle">
    <div class="w-80 h-[471px] left-0 top-0 absolute rounded-[38px] border border-border bg-card shadow-md"></div>
    <div class="left-[56px] top-[30px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">菜品差评数</div>
    <!-- Scroll viewport retains original layout area -->
    <div class="absolute left-0 right-0 top-[100px] bottom-[24px] overflow-y-auto" @scroll="onScroll">
      <template v-for="(item, i) in displayItems" :key="item?.name ?? i">
        <!-- Index + name, same left as original (56px), base top=122px -->
        <div
          class="left-[56px] absolute justify-start text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']"
          :style="{ top: nameTop(i) }"
        >
          {{ indexText(i) }}{{ item?.name ?? '—' }}
        </div>

        <!-- Amount text, same left as original (86px), base top=161px -->
        <div
          class="left-[86px] absolute justify-start text-zinc-900 text-4xl font-medium font-['Alibaba_PuHuiTi']"
          :style="{ top: amountTop(i) }"
        >
          {{ amountText(item?.amount) }}
        </div>

        <!-- Dot, same left as original (56px), base top=179px with fading opacity by index -->
        <div
          class="w-3.5 h-3.5 left-[56px] absolute rounded-full"
          :class="dotOpacity(i)"
          :style="{ top: dotTop(i) }"
        ></div>
      </template>
      <div v-if="displayItems.length === 0" class="text-neutral-400 text-center mt-8">暂无数据</div>
    </div>
</div>
  </div>
</template>

<script>
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
export default {
  name: 'BadDish',
  props: {
    // items: [{ name: string, amount: number }]
    items: { type: Array, default: () => [] }
  },
  computed: {
    displayItems() {
      if (Array.isArray(this.remoteItems) && this.remoteItems.length) return this.remoteItems
      if (!Array.isArray(this.items)) return []
      return this.items
    },
    // scaling 25% smaller
    scaledWidth() {
      return Math.round(320 * 0.75)
    },
    scaledHeight() {
      return Math.round(471 * 0.75)
    },
    scaledInnerStyle() {
      return {
        width: 320 + 'px',
        height: 471 + 'px',
        transform: 'scale(0.75)',
        transformOrigin: 'top left'
      }
    }
  },
  data() {
    return {
      page: 1,
      size: 7,
      total: 0,
      remoteItems: []
    }
  },
  methods: {
    indexText(i) {
      const n = i + 1
      return (n < 10 ? `0${n}` : String(n)) + '：'
    },
    nameTop(i) {
      // matches 122px, 226px, 334px, then continues with same spacing (104px)
      const base = [122, 226, 334]
      const top = i < base.length ? base[i] : base[base.length - 1] + (i - (base.length - 1)) * 108
      return (top - 100) + 'px'
    },
    amountTop(i) {
      // matches 161px, 268px, 376px, then continues
      const base = [161, 268, 376]
      const top = i < base.length ? base[i] : base[base.length - 1] + (i - (base.length - 1)) * 108
      return (top - 100) + 'px'
    },
    dotTop(i) {
      // matches 179px, 286px, 394px, then continues
      const base = [179, 286, 394]
      const top = i < base.length ? base[i] : base[base.length - 1] + (i - (base.length - 1)) * 108
      return (top - 100) + 'px'
    },
    amountText(v) {
      if (v === null || v === undefined || Number.isNaN(Number(v))) return '—（条）'
      return `${v}（条）`
    },
    dotOpacity(i) {
      if (i === 0) return 'bg-teal-300'
      if (i === 1) return 'bg-teal-300/70'
      if (i === 2) return 'bg-teal-300/40'
      return 'bg-teal-300/20'
    },
    async fetchBadDish(append = false) {
      try {
        const params = { page: this.page, size: this.size }
        const res = await postForm(PATHS.DISH_NAV_LIST, params)
        if (res && res.status >= 200 && res.status < 300) {
          const data = res.data && (res.data.data || res.data.result)
          const list = Array.isArray(data && data.bad_dish_list) ? data.bad_dish_list : []
          const mapped = list.map(d => ({
            name: (d && d.dish_id && d.dish_id.dish_name != null)
              ? String(d.dish_id.dish_name)
              : ((d && d.dish_name != null) ? String(d.dish_name) : '-'),
            amount: Number(
              (d && (d.bad_count != null ? d.bad_count : (d.sum != null ? d.sum : d.count))) || 0
            ) || 0,
          }))
          this.total = Number((res.data && res.data.total) || (data && data.total) || 0) || 0
          this.remoteItems = append ? [...this.remoteItems, ...mapped] : mapped
        }
      } catch (e) {
        // silent
      }
    },
    onScroll(e) {
      const el = e && e.target
      if (!el) return
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8
      const hasMore = this.remoteItems.length < this.total
      if (nearBottom && hasMore) {
        this.page += 1
        this.fetchBadDish(true)
      }
    }
  }
  ,
  mounted() {
    this.fetchBadDish(false)
  }
}
</script>

<style scoped>
</style>


