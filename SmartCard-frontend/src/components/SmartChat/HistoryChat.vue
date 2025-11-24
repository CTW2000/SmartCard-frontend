<template>
  <div class="w-96 h-[609px] relative">
    <div class="w-96 h-[609px] left-0 top-0 absolute bg-white rounded-[29px]"></div>
    
    <!-- Header -->
    <div class="w-96 h-24 left-0 top-0 absolute opacity-90 bg-white rounded-tl-[41px] rounded-tr-[41px] blur-[5px] z-10"></div>
    <div class="w-10 left-[38px] top-[24px] absolute justify-start text-neutral-600 text-xl font-normal font-['Alibaba_PuHuiTi'] z-10">历史<br/>对话</div>
    <button 
      class="w-11 h-11 left-[297px] top-[29px] absolute bg-white rounded-full z-10 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none flex items-center justify-center"
      @click="handleHistoryClick"
    >
      <img :src="historyChatTitleIcon" alt="history chat title" class="w-5 h-5 object-contain z-10" />
    </button>
    
    <!-- Scrollable container for chat items -->
    <div class="w-96 left-0 top-24 absolute overflow-y-auto" style="height: calc(609px - 96px);">
      <div class="relative px-[15px] pt-[29px] pb-4">
        <!-- Chat items - dynamically rendered from sessions -->
        <template v-for="(session, index) in displayedSessions" :key="session._id">
          <!-- Card wrapper with relative positioning -->
          <div 
            class="relative mb-3"
            :style="{ 
              height: `${getCardHeight(session.content)}px`,
              minHeight: '64px'
            }"
          >
            <!-- Card background -->
            <div 
              class="w-80 bg-slate-50 rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] absolute left-0 top-0"
              :style="{ 
                height: `${getCardHeight(session.content)}px`,
                minHeight: '64px'
              }"
            ></div>
            
            <!-- Icon circle -->
            <div 
              class="w-11 h-11 left-[23px] top-[12px] absolute bg-white rounded-full"
            ></div>
            
            <!-- Chat icon -->
            <img 
              :src="smartChatIcon" 
              alt="chat icon" 
              class="w-6 h-6 left-[33px] top-[23px] absolute object-contain"
            />
            
            <!-- Chat text content with overflow handling -->
            <div 
              class="w-52 left-[81px] top-[14px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi'] leading-relaxed break-words overflow-hidden"
              :style="{ 
                maxHeight: `${getCardHeight(session.content) - 28}px`,
                paddingRight: '8px'
              }"
            >
              "{{ session.content }}"
            </div>
          </div>
        </template>
      </div>
    </div>



    
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import smartChatIcon from '../../../Resource/Nav/SmartChat.svg'
import historyChatTitleIcon from '../../../Resource/SmartDiague/HistoryChatTitle.svg'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'

const router = useRouter()

const sessions = ref([])

// Display up to 5 sessions
const displayedSessions = computed(() => {
  return sessions.value.slice(0, 5)
})

// Calculate card height based on content length
// For Chinese characters, approximately 12-14 characters per line
// Maximum height is limited to prevent overflow
function getCardHeight(content) {
  if (!content) return 64 // min height
  const textWidth = 208 // w-52 = 208px
  const charWidth = 14 // approximate character width for Chinese characters
  const charsPerLine = Math.floor(textWidth / charWidth)
  const lines = Math.ceil(content.length / charsPerLine)
  const lineHeight = 22 // line height with spacing
  const padding = 28 // top and bottom padding (14px each)
  const maxHeight = 200 // maximum card height to prevent overflow
  return Math.min(maxHeight, Math.max(64, lines * lineHeight + padding))
}



async function fetchSessions() {
  try {
    const res = await postForm(PATHS.SESSION, {})
    const body = res?.data
    if (body?.success === true || body?.code === 200) {
      const sessionList = body?.data?.session_list || []
      // Extract only _id and user content from last_chat
      sessions.value = sessionList.map(session => {
        const userMessage = session.last_chat?.find(msg => msg.role === 'user')
        return {
          _id: session._id,
          content: userMessage?.content || ''
        }
      })
    } else {
      console.error('Failed to fetch sessions:', body?.message)
    }
  } catch (err) {
    console.error('Error fetching sessions:', err?.response?.data || err)
  }
}

function handleHistoryClick() {
  router.push({ name: 'HistoryDialogue' })
}

onMounted(() => {
  fetchSessions()
})






</script>

<style scoped>
</style>

