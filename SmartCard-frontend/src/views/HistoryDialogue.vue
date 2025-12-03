<template>
    <section class="p-[25px] ">
      
      <div class="min-w-[1500px]  min-h-[1000px] bg-background rounded-[50px] relative ">
       
        <div class="left-[30px] top-[30px] absolute flex items-center gap-3">
              
              <img 
                  :src="arrowLeft" 
                  alt="Arrow Left" 
                  class="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" 
                  @click="handleBackClick"
              />
              <span class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">对话历史</span>
        
            </div>
        <div class="h-0 left-[40px] right-[40px] top-[100px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-200"></div>
        

        
        <!-- Chat cards container -->
        <div class="left-[40px] right-[40px] top-[120px] bottom-[40px] absolute overflow-y-auto" @scroll="handleScroll">
            <div class="relative px-[20px] py-4 space-y-8">
                <!-- Today Section -->
                <div v-if="todaySessions.length > 0" class="space-y-4">
                    <div class="left-[20px] text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">今天</div>
                    <template v-for="(session, index) in todaySessions" :key="session._id">
                       
                      <div
                        class="w-[800px] min-h-20 flex items-start gap-4 p-5 shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] bg-slate-50 rounded-[42px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        @click="handleSessionClick(session._id)"
                      >
                            <img class="w-11 h-11 rounded-[250px] flex-shrink-0 object-contain" :src="userAvatar" alt="user avatar" />
                            <div class="flex-1 min-w-0 text-zinc-800 mt-2 text-xl font-normal font-['Alibaba_PuHuiTi'] break-words" style="word-wrap: break-word; overflow-wrap: break-word;">
                                "{{ session.content }}"
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Within 7 days Section -->
                <div v-if="weekSessions.length > 0" class="space-y-4">
                    <div class="left-[20px] text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">七天内</div>
                    <template v-for="(session, index) in weekSessions" :key="session._id">
                        <div
                          class="w-[800px] min-h-20 flex items-start gap-4 p-5 shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] bg-slate-50 rounded-[42px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          @click="handleSessionClick(session._id)"
                        >
                            <img class="w-11 h-11 rounded-[250px] flex-shrink-0 object-contain" :src="userAvatar" alt="user avatar" />
                            <div class="flex-1 min-w-0 text-zinc-800 text-xl font-normal font-['Alibaba_PuHuiTi'] break-words" style="word-wrap: break-word; overflow-wrap: break-word;">
                                "{{ session.content }}"
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Within 30 days Section -->
                <div v-if="monthSessions.length > 0" class="space-y-4">
                    <div class="left-[20px] text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">30天内</div>
                    <template v-for="(session, index) in monthSessions" :key="session._id">
                        <div
                          class="w-[800px] min-h-20 flex items-start gap-4 p-5 shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] bg-slate-50 rounded-[42px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          @click="handleSessionClick(session._id)"
                        >
                            <img class="w-11 h-11 rounded-[250px] flex-shrink-0 object-contain" :src="userAvatar" alt="user avatar" />
                            <div class="flex-1 min-w-0 text-zinc-800 text-xl font-normal font-['Alibaba_PuHuiTi'] break-words" style="word-wrap: break-word; overflow-wrap: break-word;">
                                "{{ session.content }}"
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>


     </div>
   </section>
 </template>

<script setup>
import { useRouter } from 'vue-router'
import arrowLeft from '../../Resource/Menu/ArrowLeft.svg'
import userAvatar from '../../Resource/Staff/AvatarMan.svg'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
import { ref, onMounted, computed } from 'vue'


const router = useRouter()
const sessions = ref([])

const historyPage = ref(1)
const historyPageSize = ref(12)
const historyTotal = ref(0)
const hasMorePages = ref(true)
const isLoadingMore = ref(false)



// Helper function to parse date and get time difference
function getDateDifference(dateString) {
  if (!dateString) return Infinity
  
  const sessionDate = new Date(dateString)
  const now = new Date()
  
  // Reset time to start of day for accurate day comparison
  const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate())
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  const diffTime = today - sessionDay
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

// Group sessions by time periods
const todaySessions = computed(() => {
  return sessions.value.filter(session => {
    const diffDays = getDateDifference(session.createdAt)
    return diffDays === 0
  })
})

const weekSessions = computed(() => {
  return sessions.value.filter(session => {
    const diffDays = getDateDifference(session.createdAt)
    return diffDays > 0 && diffDays <= 7
  })
})

const monthSessions = computed(() => {
  return sessions.value.filter(session => {
    const diffDays = getDateDifference(session.createdAt)
    return diffDays > 7 && diffDays <= 30
  })
})

function handleBackClick() {
  router.push({ name: 'SmartDialoge' })
}

function handleSessionClick(sessionId) {
  if (!sessionId) return
  router.push({
    name: 'SmartDialoge',
    query: { session_id: sessionId },
  })
}

function handleScroll(event) {
  const container = event.target
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight

  // Load more when scrolled near bottom (within 50px)
  if (
    scrollTop + clientHeight >= scrollHeight - 50 &&
    hasMorePages.value &&
    !isLoadingMore.value
  ) {
    historyPage.value++
    fetchSessions()
  }
}

async function fetchSessions() {
  // Prevent duplicate requests or loading when there are no more pages
  if (isLoadingMore.value || !hasMorePages.value) return

  isLoadingMore.value = true

  const payload = {
    page: String(historyPage.value),
    size: String(historyPageSize.value),
  }

  try {
    const res = await postForm(PATHS.SESSION, payload)
    const body = res?.data
    if (body?.success === true || body?.code === 200) {
      const sessionList = body?.data?.session_list || []
      // Extract _id, user content from last_chat, and createdAt
      const mappedSessions = sessionList.map(session => {
        const userMessage = session.last_chat?.find(msg => msg.role === 'user')
        return {
          _id: session._id,
          content: userMessage?.content || '',
          createdAt: session.createdAt || session.created || ''
        }
      })

      if (historyPage.value === 1) {
        // First page: replace data
        sessions.value = mappedSessions
      } else {
        // Next pages: append data
        sessions.value = [...sessions.value, ...mappedSessions]
      }

      const total = body?.data?.total ?? 0
      historyTotal.value = total

      if (total > 0) {
        // Use total from backend if provided
        hasMorePages.value = sessions.value.length < total
      } else {
        // Fallback: if we got a full page, assume there might be more
        hasMorePages.value = mappedSessions.length === historyPageSize.value
      }
    } else {
      console.error('Failed to fetch sessions:', body?.message)
    }
  } catch (err) {
    console.error('Error fetching sessions:', err?.response?.data || err)
  } finally {
    isLoadingMore.value = false
  }
}

onMounted(() => {
  historyPage.value = 1
  hasMorePages.value = true
  fetchSessions()
})

</script>
 