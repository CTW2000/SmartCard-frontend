<template>
  <div class="search">
    <span class="icon">🔍</span>
    <input
      v-model="query"
      class="input"
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
.search { position: relative; width: 70%; max-width: 2000px; }

.icon {
  position: absolute;
  left: 12px;
  color: #656665;
}

.input {
  width: 100%;
  height: 36px;
  background: #F4F6F9;
  color: #0E1116;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 9999px;
  padding: 0 16px 0 32px;
  outline: none;
}

.input:focus { box-shadow: 0 0 0 2px #D94447 inset; }
</style>

