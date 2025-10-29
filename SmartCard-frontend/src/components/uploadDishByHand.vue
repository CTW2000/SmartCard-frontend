<template>
  <div
    class="w-[430px] h-[430px] relative origin-top-left"
    :style="{ transform: `scale(${scale})`, transformOrigin: 'top left' }"
    @click="closeDropdowns"
  >
    <div class="w-[430px] h-[430px] left-0 top-0 absolute bg-white rounded-[31px]"></div>
    <div class="left-[52px] top-[42px] absolute justify-start text-neutral-800 text-2xl font-medium font-['Alibaba_PuHuiTi']">手动录菜</div>
    <div class="w-80 h-0.5 left-[52px] top-[102px] absolute bg-zinc-100 rounded-[73px]"></div>
    <div class="left-[52px] top-[256px] absolute justify-start text-neutral-950 text-2xl font-normal font-['Alibaba_PuHuiTi']">菜品类型</div>
    <!-- Type select box -->
    <div
      class="w-52 h-20 left-[183px] top-[234px] absolute bg-white rounded-2xl border border-stone-300 cursor-pointer flex items-center justify-center"
      @click.stop="toggleType"
    >
      <span class="text-2xl text-zinc-800 font-['Alibaba_PuHuiTi']">{{ selectedType }}</span>
    </div>
    <!-- Type dropdown window -->
    <div v-if="showTypeDropdown" class="w-40 h-36 left-[183px] top-[314px] absolute z-10">
      <div class="w-40 h-36 left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500"></div>
      <div class="left-[22px] top-[12px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700 cursor-pointer" @click.stop="selectType('热销')">热销</div>
      <div class="left-[22px] top-[54px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700 cursor-pointer" @click.stop="selectType('新菜')">新菜</div>
      <div class="left-[22px] top-[96px] absolute justify-start text-xl font-medium font-['Alibaba_PuHuiTi'] text-stone-700 cursor-pointer" @click.stop="selectType('已下架')">已下架</div>
      <div class="w-32 h-0 left-[12px] top-[44px] absolute outline outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
      <div class="w-32 h-0 left-[12px] top-[86px] absolute outline outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
    </div>
    <div class="left-[52px] top-[147px] absolute justify-start text-neutral-950 text-2xl font-normal font-['Alibaba_PuHuiTi']">菜品名字</div>
    <input
      v-model="dishName"
      type="text"
      class="w-52 h-20 left-[182px] top-[125px] absolute bg-white rounded-2xl border border-stone-300 px-4 text-2xl text-zinc-800 font-['Alibaba_PuHuiTi'] text-center outline-none"
      placeholder="请输入菜名"
    />
    <div
      class="w-32 h-11 left-[156px] top-[353px] absolute bg-white rounded-2xl border border-stone-300"
      @click="onConfirm"
    ></div>
    <div
      class="left-[198px] top-[362px] absolute justify-start text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer"
      @click="onConfirm"
    >确认</div>
  </div>
  
</template>

<script setup>
const emit = defineEmits(['confirm'])
const { scale } = defineProps({
  scale: { type: Number, default: 0.85 },
})
import { ref } from 'vue'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
const dishName = ref('')
const selectedType = ref('热销')
const showTypeDropdown = ref(false)

function toggleType() {
  showTypeDropdown.value = !showTypeDropdown.value
}
function selectType(val) {
  selectedType.value = val
  showTypeDropdown.value = false
}
function closeDropdowns() {
  showTypeDropdown.value = false
}

async function onConfirm() {
  const name = (dishName.value || '').trim()
  if (!name) {
    emit('confirm', { ok: false, error: 'empty_name' })
    return
  }
  const payload = {
    dish_name: name,
    is_new: selectedType.value === '新菜',
    is_top: selectedType.value === '热销',
    status: selectedType.value === '已下架',
  }
  try {
    const res = await postForm(PATHS.DISH_EDIT, {
      type: 'add',
      data: JSON.stringify([payload]),
      ids: '',
    })
    if (res && res.status >= 200 && res.status < 300) {
      emit('confirm', { ok: true })
    } else {
      emit('confirm', { ok: false, error: 'request_failed' })
    }
  } catch (e) {
    console.error(e)
    emit('confirm', { ok: false, error: 'network_error' })
  }
}
</script>


