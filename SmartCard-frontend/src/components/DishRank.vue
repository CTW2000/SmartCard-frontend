<template>
  <div ref="wrapper" class="relative overflow-hidden responsive-rank" :style="{ height: wrapperHeight + 'px' }">
    <div class="relative design-root" :style="designStyle">
    <!-- Background card -->
    <div class="w-[736px] h-[684px] left-0 top-0 absolute bg-white rounded-[38px] shadow-[2px_2px_4px_0px_rgba(204,204,204,0.25)]"></div>

    <!-- Title -->
    <div class="left-[63px] top-[45px] absolute justify-start">
      <template v-if="type === 'new'">
        <span class="text-teal-600 text-4xl font-bold font-['Alibaba_PuHuiTi']">新品</span>
        <span class="text-neutral-700 text-4xl font-bold font-['Alibaba_PuHuiTi']">榜</span>
      </template>
      <template v-else>
        <span class="text-teal-600 text-4xl font-bold font-['Alibaba_PuHuiTi']">招牌</span>
        <span class="text-neutral-700 text-4xl font-bold font-['Alibaba_PuHuiTi']">菜品榜</span>
      </template>
      <img :src="ArrowUpDown" alt="sort" class="inline-block ml-2 w-[30px] h-[30px] align-middle" />
    </div>

    <!-- Headers -->
    <div class="w-[636px] h-0 left-[64px] top-[184px] absolute shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>
    <div class="left-[64px] top-[139px] absolute justify-start text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi']">排名</div>
    <div class="left-[268px] top-[139px] absolute justify-start text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi']">菜名</div>
    <div class="left-[463px] top-[139px] absolute justify-start text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi']">差评数</div>
    <div class="left-[608px] top-[139px] absolute justify-start text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi']">详情</div>

    <!-- Scrollable rows area -->
    <div class="absolute left-0 right-0 top-[184px] bottom-[24px] overflow-y-auto pr-2" @scroll="onScroll">
      <template v-for="(item, index) in displayItems" :key="itemKey(item, index)">
        <!-- Rank -->
        <div :style="rowTopStyle(index)" class="left-[81px] absolute justify-start" :class="rankTextClass(index)">{{ index + 1 }}</div>

        <!-- Name -->
        <div :style="rowTopStyle(index)" class="left-[221px] absolute justify-start text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']" :title="item.name">
          {{ item.name }}
        </div>

        <!-- Value (bad review count) -->
        <div :style="rowTopStyle(index)" class="left-[478px] absolute justify-start text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">
          {{ formatValue(item.value) }}
        </div>

        <!-- Details icon -->
        <img :style="rowTopStyle(index)" :src="ArrowIcon" alt="details" class="w-6 h-6 left-[619px] absolute object-contain cursor-pointer" @click="openReport(item)" />
      </template>
      <div v-if="displayItems.length === 0" class="mt-6 text-neutral-400 text-center">暂无数据</div>
    </div>
  </div>
  </div>
  </template>

<script>
import ArrowUpDown from '../../Resource/Menu/ArrowUpDown.svg';
import ArrowIcon from '../../Resource/Staff/arrow.svg';
import { postForm } from '../httpClient/client';
import { PATHS } from '../httpClient/paths';
export default {
  name: 'DishRank',
  props: {
    title: { type: String, default: '菜品排行' },
    items: {
      type: Array,
      default: () => [], // [{ name: string, value: number|string, id?: string|number }]
    },
    valueFormatter: { type: Function, default: null },
    type: { type: String, default: 'top' },
  },
  
  data() {
    return {
      ArrowUpDown,
      ArrowIcon,
      page: 1,
      size: 7,
      total: 0,
      remoteItems: [],
      // responsive
      designWidth: 736,
      designHeight: 684,
      scale: 1,
      wrapperHeight: 684,
      ro: null,
    };
  },
  methods: {
    openReport(item) {
      let name = '-'
      try {
        name = String(item && (item.name ?? item.dish_name) || '-')
      } catch (e) {
        name = '-'
      }
      this.$emit('open-report', name)
    },
    itemKey(item, index) {
      return item?.id ?? `${item?.name ?? 'item'}-${index}`;
    },
    formatValue(v) {
      if (this.valueFormatter) return this.valueFormatter(v);
      return v;
    },
    rowTopStyle(index) {
      // within scroll viewport (top starts at 184px). First row original top=217px => relative 33px
      const topPx = 33 + index * 67;
      return { top: `${topPx}px` };
    },
    rankTextClass(index) {
      return index < 3
        ? 'text-red-700 text-2xl font-normal font-[\'Alibaba_PuHuiTi\']'
        : 'text-neutral-500 text-2xl font-normal font-[\'Alibaba_PuHuiTi\']';
    },
    async fetchRank(append = false) {
      try {
        const computedType = (this.type === 'new') ? 'new' : 'top'
        const params = { page: this.page, size: this.size, type: computedType };
        const res = await postForm(PATHS.DISH_RANK, params);
        if (res && res.status >= 200 && res.status < 300) {
          const data = (res.data && (res.data.data || res.data.result)) || res.data || {};
          const list =
            (Array.isArray(data && data.bad_dish_list) && data.bad_dish_list) ||
            (Array.isArray(data && data.dish_rank_list) && data.dish_rank_list) ||
            (Array.isArray(data && data.list) && data.list) ||
            (Array.isArray(data && data.rank) && data.rank) ||
            (Array.isArray(data && data.result) && data.result) ||
            (Array.isArray(res.data && res.data.bad_dish_list) && res.data.bad_dish_list) ||
            (Array.isArray(res.data && res.data.dish_rank_list) && res.data.dish_rank_list) ||
            (Array.isArray(res.data && res.data.list) && res.data.list) ||
            (Array.isArray(res.data && res.data.rank) && res.data.rank) ||
            (Array.isArray(res.data && res.data.result) && res.data.result) ||
            [];
          const mapped = list.map(d => ({
            name: (d && d.dish_id && d.dish_id.dish_name != null)
              ? String(d.dish_id.dish_name)
              : ((d && d.dish_name != null)
                  ? String(d.dish_name)
                  : (d && d.name != null ? String(d.name) : '-')),
            value: Number(
              (d && (d.bad_count != null ? d.bad_count : (d.count ?? d.value ?? d.num ?? d.score))) || 0
            ) || 0,
          }));
          const detectedTotal = Number(
            (data && (data.total ?? data.total_count ?? data.count ?? data.page_total)) ||
            (res.data && (res.data.total ?? res.data.total_count ?? res.data.count ?? res.data.page_total)) ||
            0
          ) || 0;
          this.total = detectedTotal;
          this.remoteItems = append ? [...this.remoteItems, ...mapped] : mapped;
        }
      } catch (e) {
        // silent
      }
    },
    onScroll(e) {
      const el = e && e.target;
      if (!el) return;
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
      const hasMore = this.remoteItems.length < this.total;
      if (nearBottom && hasMore) {
        this.page += 1;
        this.fetchRank(true);
      }
    },
    updateScale() {
      const el = this.$refs.wrapper;
      if (!el) return;
      const availableWidth = el.clientWidth || 0;
      if (availableWidth <= 0) return;
      const s = availableWidth / this.designWidth;
      this.scale = s;
      this.wrapperHeight = Math.round(this.designHeight * s);
    },
  },
  computed: {
    designStyle() {
      return {
        width: this.designWidth + 'px',
        height: this.designHeight + 'px',
        transform: `scale(${this.scale})`,
        transformOrigin: 'top left',
      };
    },
    displayItems() {
      if (Array.isArray(this.remoteItems) && this.remoteItems.length) return this.remoteItems
      if (!Array.isArray(this.items)) return []
      return this.items
    },
  },
  watch: {
    type() {
      this.page = 1
      this.remoteItems = []
      this.fetchRank(false)
    }
  },
  mounted() {
    this.fetchRank(false);
    // responsive scaling
    this.updateScale();
    try {
      this.ro = new ResizeObserver(() => {
        this.updateScale();
      });
      const el = this.$refs.wrapper;
      if (el) this.ro.observe(el);
    } catch (e) {
      // ResizeObserver may be unavailable in some environments
      window.addEventListener('resize', this.updateScale);
    }
  },
  beforeDestroy() {
    if (this.ro && this.ro.disconnect) this.ro.disconnect();
    window.removeEventListener('resize', this.updateScale);
  },
  beforeUnmount() {
    if (this.ro && this.ro.disconnect) this.ro.disconnect();
    window.removeEventListener('resize', this.updateScale);
  }
};
export {};
</script>

<style scoped>
.responsive-rank {
  width: 100%;
}
</style>
