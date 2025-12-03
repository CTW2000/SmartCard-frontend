<template>
  <div class="searchbar relative w-full max-w-[968px] h-11">
    <div
      class="absolute inset-0 bg-stone-50 rounded-3xl shadow-[2px_2px_4px_0px_rgba(151,151,151,0.25)]"
    ></div>

    <button
      type="button"
      class="absolute left-[32px] top-[12px] w-6 h-6 flex items-center justify-center z-10"
      aria-label="Start voice input"
      @click="emitVoice"
    >
      <img :src="microphoneIcon" alt="" class="w-5 h-5" />
    </button>

    <div class="absolute inset-0 flex items-center pl-[70px] pr-[72px] z-10">
      <input
        v-model="query"
        class="w-full bg-transparent text-[#3A3A3A] placeholder:text-zinc-500 text-base font-normal font-['Alibaba_PuHuiTi'] outline-none"
        type="text"
        placeholder="你想问我什么问题呀？"
        @keyup.enter="emitSearch"
      />
    </div>

    <div class="absolute right-[64px] top-[14px] w-0.5 h-4 bg-neutral-300 rounded-lg z-10"></div>

    <button
      type="button"
      class="absolute right-[16px] top-[7px] w-7 h-7 flex items-center justify-center z-10 cursor-pointer"
      aria-label="Send question"
      @click="emitSearch"
    >
      <span
        class="flex items-center justify-center w-6 h-6 rounded-2xl bg-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]"
      >
        <img :src="sendIcon" alt="" class="w-4 h-4" />
      </span>
    </button>
  </div>
</template>




<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import microphoneIcon from '../../../Resource/Home/microphone.svg'
import sendIcon from '../../../Resource/Home/send-2.svg'

const query = ref('')
const router = useRouter()

async function emitSearch() {
  const value = (query.value || '').trim()
  if (!value) return

  try {
    await router.push({
      name: 'SmartDialoge',
      query: { q: value },
    })
  } catch (error) {
    // Ignore redundant navigation errors (e.g., pushing same route)
    if (error?.name !== 'NavigationDuplicated') {
      console.error('[Searchbar] Failed to navigate to SmartDialoge:', error)
    }
  } finally {
    query.value = ''
  }
}



</script>

<style scoped>
</style>

