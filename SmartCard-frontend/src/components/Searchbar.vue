<template>
  <div class="relative w-[70%] max-w-[2000px]">
    <span class="absolute left-3 text-[#656665]">🔍</span>
    <input
      v-model="query"
      class="w-full h-9 bg-[#F4F6F9] text-[#0E1116] border border-black/5 rounded-full pl-8 pr-4 outline-none focus:[box-shadow:inset_0_0_0_2px_#D94447]"
      type="text"
      placeholder="Search anything..."
      @keyup.enter="emitSearch"
    />
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  data() {
    return { query: '' }
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.query)
    },
  },
}
</script>

<style scoped>
</style>

