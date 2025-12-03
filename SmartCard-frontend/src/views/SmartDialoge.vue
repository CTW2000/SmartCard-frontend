<template>
  <section class="p-[25px] ">

    <div class="flex items-start gap-[20px] w-full min-w-[1500px]">
    
      
      <!-- Centered input window for first open -->
      <div v-if="isFirstOpen" class="flex-1 min-h-[1000px]  rounded-[50px] relative flex ">
        
        <div class="relative w-full max-w-[1100px] h-80 ml-[100px] mr-[100px] mt-[250px] ">
         
          <!-- Greeting text above input - centered relative to input container -->
          <div class="absolute left-1/2 -translate-x-1/2 top-[-170px] flex flex-col items-center gap-2">
            <div class="text-center text-black text-4xl font-normal font-['Alibaba_PuHuiTi'] mb-[10px]">早上好！店长</div>
            <div class="text-center text-zinc-600 text-base font-normal font-['Alibaba_PuHuiTi'] mb-[10px]">在下方创建一个新的聊天</div>
          </div>
         
          <div class="absolute inset-0 bg-white rounded-[29px] border border-gray-200"></div>
          
      
          
          <div 
            class="w-11 h-11 absolute right-[32px] top-[265px] bg-neutral-700 rounded-[250px] cursor-pointer hover:bg-neutral-600 transition-colors"
            @click="handleSend"
          >
        </div>
          <div class="w-6 h-6 absolute right-[42px] top-[275px] flex items-center justify-center pointer-events-none">
            <img :src="sendIcon" alt="send" class="w-6 h-6" />
          </div>

          <textarea
            v-model="inputText"
            class="absolute left-[32px] right-[32px] top-[20px] h-[220px] resize-none bg-transparent text-zinc-800 text-xl font-normal font-['Alibaba_PuHuiTi'] placeholder:text-zinc-500 focus:outline-none"
            placeholder="输入你想说的话"
            @keydown.enter.exact.prevent="handleSend"
          ></textarea>
          
          <div class="w-32 h-10 left-[21px] top-[260px] absolute bg-white rounded-3xl border border-neutral-200"></div>
          <div class="left-[65px] top-[268px] absolute justify-start text-neutral-700 text-base font-normal font-['Inter']">导入语音</div>
          <div class="w-10 h-10 left-[21px] top-[260px] absolute bg-white rounded-full border border-zinc-100"></div>
          <div class="w-3.5 h-3.5 left-[35px] top-[272px] absolute flex items-center justify-center">
            <img :src="importVoiceIcon" alt="import voice" class="w-3.5 h-3.5" />
          </div>
          
          <!-- Text below input - centered relative to input container -->
          <div class="absolute left-1/2 -translate-x-1/2 top-[350px] text-center">
            <div class="justify-start text-zinc-800 text-xl font-medium font-['Alibaba_PuHuiTi'] mb-4">试试这些常用的例子！</div>
            
            <!-- Example cards -->
            <div class="flex flex-col items-center gap-3">
              <!-- First row -->
              <div class="flex gap-3 items-center">
                <div 
                  @click="handleCardClick('帮我生成昨日1组员工总评报表')"
                  class="relative w-80 h-12 bg-white rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] flex items-center justify-center cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
                >
                  <div class="justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">帮我生成昨日1组员工总评报表</div>
                </div>
                
                <div 
                  @click="handleCardClick('最近员工整体表现怎么样？')"
                  class="relative w-80 h-12 bg-white rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] flex items-center justify-center cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
                >
                  <div class="justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">最近员工整体表现怎么样？</div>
                </div>
                <div 
                  @click="handleCardClick('上周投流综合日报')"
                  class="relative w-48 h-12 bg-white rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] flex items-center justify-center cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
                >
                  <div class="justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">上周投流综合日报</div>
                </div>
              </div>
              
              <!-- Second row -->
              <div class="flex gap-3 items-center">
                <div 
                  @click="handleCardClick('帮我追踪新品反馈痛点')"
                  class="relative w-80 h-12 bg-white rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] flex items-center justify-center cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
                >
                  <div class="justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">帮我追踪新品反馈痛点</div>
                </div>
                
                <div 
                  @click="handleCardClick('帮我生成本周菜品差评榜单前五的ai智能分析报告')"
                  class="relative w-[524px] h-12 bg-white rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] flex items-center justify-center cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
                >
                  <div class="justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">帮我生成本周菜品差评榜单前五的ai智能分析报告</div>
                </div>
              </div>
              
          
            </div>



          </div>
        </div>
      </div>

  
      <div v-if="!isFirstOpen" class="flex-1 min-h-[1000px] bg-background rounded-[50px] relative flex">
      
        <div class=" absolute left-[50px] top-[50px] text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">智能对话</div>
       
        <!-- Plus and Share buttons on the right -->
        <div class="absolute right-[50px] top-[35px] flex flex-row gap-4">
          <!-- Plus button with white circular background -->
          <div 
            class="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
            @click="handlePlus"
          >
            <img
              :src="plusIcon"
              alt="plus"
              class="w-[14px] h-[14px] object-contain"
            />
          </div>
          <!-- Share button with white circular background -->
          <div 
            class="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
            @click="handleShare"
          >
            <img
              :src="shareIcon"
              alt="share"
              class="w-[20px] h-[20px] object-contain"
            />
          </div>
          
        </div>


        <!-- Chat background -->
        <div class=" flex-1 mt-[100px] ml-[40px] mr-[20px] h-[870px] bg-gray-50 shadow-[-3px_0px_4px_0px_rgba(204,204,204,0.25)] rounded-[20px] flex flex-col relative">
        
        
        
        <!-- Messages area -->
           <div class=" h-[560px] overflow-y-auto p-6 space-y-4">
         
          <template v-for="(message, index) in messages" :key="index">
            <!-- User message (right side) -->
            <div
              v-if="message.type === 'user'"
              class="ml-[300px] max-w-[40rem] flex items-start justify-end gap-3 pr-2"
            >
              <div
                class="bg-slate-50 rounded-[30.5px] shadow-[0px_2px_2px_0px_rgba(147,147,147,0.25)] px-6 py-1 text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] leading-relaxed whitespace-pre-wrap break-words"
              >
                {{ message.content }}
              </div>
              
              <img
                class="w-12 h-12 rounded-[250px] object-cover border-2 border-white shadow-[0px_2px_2px_0px_rgba(197,197,197,0.25)]"
                :src="userAvatar"
                alt="user avatar"
              />
            </div>
            
            <!-- AI message (left side) -->
            <div
              v-if="message.type === 'ai'"
              class="relative w-full max-w-[869px] pl-24"
            >
              <!-- Select circle (shown when isSelectMode is true) -->
              <div
                v-if="isSelectMode"
                class="absolute left-[-20px] top-[23px] w-[40px] h-[40px] cursor-pointer z-10"
                @click="toggleSelectContent(index)"
              >
                <img :src="WhiteCircle" alt="select" class="w-full h-full object-contain" />
                <img
                  v-if="selectedIndexes.has(index)"
                  :src="CheckMark"
                  alt="checked"
                  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style="width: 20px; height: 20px;"
                />
              </div>
              <div
                class="bg-slate-50 rounded-[30.5px] shadow-[0px_2px_2px_0px_rgba(147,147,147,0.25)] px-10 py-6 min-h-[128px] text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] leading-relaxed whitespace-pre-wrap break-words"
              >
                {{ message.content }}
              </div>
              <div class="w-12 h-12 left-[21px] top-[17px] absolute bg-white rounded-[250px] shadow-[0px_2px_2px_0px_rgba(197,197,197,0.25)]"></div>
              <img
                class="w-9 h-9 left-[30px] top-[24px] absolute origin-top-left  object-contain"
                :src="aiAvatar"
                alt="ai avatar"
              />
            </div>
          </template>
          
          </div>
        
          <!-- user input window -->
          <div v-if="!isSelectMode" class="flex flex-col items-center gap-2 px-10 mt-[20px] mb-[20px]">
            
            <button
              type="button"
              class="flex items-center gap-2 w-55 h-12 bg-white rounded-3xl 
              border border-zinc-300 justify-center text-zinc-700 
              text-lg font-normal font-['Alibaba_PuHuiTi'] transition-opacity
              cursor-pointer"
              :class="{ 'opacity-50 cursor-not-allowed': !lastSentText }"
              :disabled="!lastSentText"
              @click="handleRegenerate"
            >
              <div class= "w-8 h-8 relative bg-black rounded-full overflow-hidden flex items-center justify-center">
                <img :src="regenerateIcon" alt="regenerate" class="w-5 h-5 object-contain" />
              </div>
              <span>regenerate response</span>
            </button>

            <div class="relative  w-full max-w-[1100px] h-48">
            
            <div class="absolute inset-0 bg-white rounded-[29px] border border-gray-200"></div>
            
            <div 
              class="w-11 h-11 absolute right-[32px] top-[144px] bg-neutral-700 rounded-[250px] cursor-pointer hover:bg-neutral-600 transition-colors"
              @click="handleSend"
            ></div>
            <div class="w-6 h-6 absolute right-[42px] top-[155px] flex items-center justify-center pointer-events-none">
                <img :src="sendIcon" alt="send" class="w-6 h-6" />
            </div>

            
            <textarea
              v-model="inputText"
              class="absolute left-[32px] right-[20px] top-[16px] h-[100px]
             
               resize-none bg-transparent text-zinc-800 text-xl font-normal 
               font-['Alibaba_PuHuiTi'] 
              placeholder:text-zinc-500 focus:outline-none"
              placeholder="输入你想说的话"
              @keydown.enter.exact.prevent="handleSend"
            ></textarea>
            

            
            <div class="w-32 h-10 left-[21px] top-[140px] absolute bg-white rounded-3xl border border-neutral-200"></div>
            <div class="left-[71px] top-[152px] absolute justify-start text-neutral-700 text-base font-normal font-['Inter']">导入语音</div>
            <div class="w-10 h-10 left-[21px] top-[140px] absolute bg-white rounded-full border border-zinc-100"></div>
            <div class="w-3.5 h-3.5 left-[35px] top-[153px] absolute flex items-center justify-center">
                <img :src="importVoiceIcon" alt="import voice" class="w-3.5 h-3.5" />
            </div>
          </div>
          
          </div>

          

          <!-- Action buttons in select mode (bottom right corner) -->
          <div v-if="isSelectMode" class="absolute bottom-[40px] right-[40px] flex flex-row gap-4">
            
             <!-- divide line -->
            <div class="w-[974px] h-0.5 left-[-400px] top-[-40px] absolute bg-gray-200 rounded-[73px]"></div>
            



            <!-- Select All option -->
            <div class="left-[-380px] top-[0px] absolute flex items-center gap-2 cursor-pointer" @click="toggleSelectAll">
              <div class="relative w-[40px] h-[40px]">
                <img :src="WhiteCircle" alt="select all" class="w-full h-full object-contain" />
                <img
                  v-if="isSelectAll"
                  :src="CheckMark"
                  alt="checked"
                  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style="width: 20px; height: 20px;"
                />
              </div>
              <div class="justify-start text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi']">全选</div>
            </div>
            





            <!-- Cancel button -->
            <div class="relative cursor-pointer" @click="handleCancel">
              <div class="w-32 h-10 bg-white rounded-3xl border border-zinc-300"></div>
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] whitespace-nowrap">取消</div>
            </div>
            
            <!-- Export button -->
            <div class="relative cursor-pointer" @click="handleExport">
              <div class="w-32 h-10 bg-white rounded-3xl border border-zinc-300"></div>
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-xl font-normal font-['Alibaba_PuHuiTi'] whitespace-nowrap">导出</div>
            </div>
            
            <!-- Share chart button -->
            <div class="relative cursor-pointer" @click="handleShareChart">
              <div class="w-32 h-10 bg-white rounded-3xl border border-zinc-300"></div>
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-xl font-normal font-['Alibaba_PuHuiTi'] whitespace-nowrap">分享图表</div>
            </div>
            
            <!-- Copy link button -->
            <div class="relative cursor-pointer" @click="handleCopyLink">
              <div class="w-32 h-10 bg-white rounded-3xl border border-zinc-300"></div>
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-xl font-normal font-['Alibaba_PuHuiTi'] whitespace-nowrap">复制链接</div>
            </div>



          </div>       
        </div>
      </div>


      <!-- History Chat Component -->
      <div class="w-[360px] flex-shrink-0 mr-[40px] flex flex-col gap-12">
        <HistoryChat @loadHistory="handleLoadHistory" />

        <div class="w-96 h-72 relative">
          <div class="w-96 h-72 left-0 top-0 absolute bg-white rounded-[29px] shadow-[0px_4px_4px_0px_rgba(141,141,141,0.25)]"></div>
          <div class="w-20 left-[38px] top-[24px] absolute justify-start text-neutral-600 text-xl font-medium font-['Alibaba_PuHuiTi']">高频问答</div>
          <div class="w-80 h-0.5 left-[21px] top-[66px] absolute bg-gray-200 rounded-[73px]"></div>
          <div
            class="w-80 h-12 left-[21px] top-[84px] absolute bg-slate-50 rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
            @click="handleCardClick('帮我生成当日员工总评报表')"
          ></div>
          <div
            class="w-80 h-12 left-[21px] top-[146px] absolute bg-slate-50 rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
            @click="handleCardClick('帮我生成当日菜品总评报表')"
          ></div>
          <div
            class="w-80 h-12 left-[21px] top-[212px] absolute bg-slate-50 rounded-[42px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] cursor-pointer hover:shadow-[0px_4px_4px_0px_rgba(148,148,148,0.35)] transition-shadow"
            @click="handleCardClick('帮我追踪新品反馈痛点')"
          ></div>
          <div class="left-[88px] top-[97px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi'] pointer-events-none">帮我生成当日员工总评报表</div>
          <div class="left-[88px] top-[159px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi'] pointer-events-none">帮我生成当日菜品总评报表</div>
          <div class="left-[104px] top-[225px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi'] pointer-events-none">帮我追踪新品反馈痛点</div>
        </div>
      </div>

    </div>
    <ExtractChat
      v-if="showExportPanel"
      :selectedContent="selectedContent"
      @close="handleCloseExportPanel"
    />
  
  </section>
</template>




<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import sendIcon from '../../Resource/SmartDiague/send-2.svg'
import importVoiceIcon from '../../Resource/SmartDiague/importVoice.svg'
import aiAvatar from '../../Resource/SmartDiague/AIAvatar.svg'
import userAvatar from '../../Resource/Staff/AvatarMan.svg'
import plusIcon from '../../Resource/SmartDiague/Plus.svg'
import shareIcon from '../../Resource/Staff/Share.svg'
import WhiteCircle from '../../Resource/Menu/whiteCircle.svg'
import CheckMark from '../../Resource/Menu/CheckMark.svg'
import regenerateIcon from '../../Resource/SmartDiague/Regenerate.svg'
import { streamChat, postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
import HistoryChat from '../components/SmartChat/HistoryChat.vue'
import ExtractChat from '../components/SmartChat/ExtractChat.vue'

const route = useRoute()
const inputText = ref('')
const messages = ref([])
const isFirstOpen = ref(true)

const isSelectMode = ref(false)
const selectedContent = ref([]) // Array to store marked content
const selectedIndexes = ref(new Set()) // Set to track which messages are selected
const isSelectAll = ref(false) // Track if select all is checked
const showExportPanel = ref(false)
const lastSentText = ref('')
const currentSessionID = ref('')

async function updateCurrentSessionId() {
  try {
    const res = await postForm(PATHS.SESSION, {})
    const sessionList = res?.data?.data?.session_list || []
    currentSessionID.value = sessionList[0]?._id || ''
  } catch (error) {
    console.error('[SmartDialoge] Failed to fetch session list:', error?.response?.data || error)
  }
}

onMounted(() => {
  // Check if this is the first time opening the page based on messages length
  isFirstOpen.value = messages.value.length === 0

  // If opened with an initial query from the global searchbar, auto send it
  const initialQuery = (route.query.q || '').toString().trim()
  if (initialQuery) {
    inputText.value = initialQuery
    sendMessage(initialQuery, currentSessionID.value)
  }
})


function appendToAiMessage(index, content) {
  if (!content) return
  const target = messages.value[index]
  if (target) {
    target.content += content
  }
}

function processStreamChunk(rawChunk, aiMessageIndex) {
  if (!rawChunk) return
  const segments = rawChunk
    .split(/data:/)
    .map((segment) => segment.trim())
    .filter(Boolean)

  if (!segments.length) {
    appendToAiMessage(aiMessageIndex, rawChunk)
    return
  }

  for (const segment of segments) {
    if (segment === '[DONE]') {
      continue
    }

    try {
      const payload = JSON.parse(segment)
      if (payload?.type === 'error' && payload?.message) {
        messages.value[aiMessageIndex].content = payload.message
        return
      }

      if (payload?.content) {
        appendToAiMessage(aiMessageIndex, payload.content)
      }
    } catch (error) {
      // Fallback: append raw text if JSON parsing fails
      appendToAiMessage(aiMessageIndex, segment)
    }
  }
}

function handleCardClick(cardText) {
  // Set the input text to the card text and send it
  inputText.value = cardText
  handleSend()
}

function handlePlus() {
  // Handle plus button click - create new chat
  // Clear all messages and reset to initial state
  messages.value = []
  inputText.value = ''
  isFirstOpen.value = true
  isSelectMode.value = false
  selectedContent.value = []
  selectedIndexes.value = new Set()
  currentSessionID.value = ''
}

function handleShare() {
  // Toggle select mode when clicking share button
  isSelectMode.value = !isSelectMode.value
  if (!isSelectMode.value) {
    // Clear selection when exiting select mode
    selectedContent.value = []
    selectedIndexes.value = new Set()
    isSelectAll.value = false
  }
}

function toggleSelectContent(index) {
  if (!isSelectMode.value) return
  
  const message = messages.value[index]
  if (!message || message.type !== 'ai') return
  
  const nextIndexes = new Set(selectedIndexes.value)
  const nextContent = [...selectedContent.value]
  
  if (nextIndexes.has(index)) {
    // Remove from selection
    nextIndexes.delete(index)
    const contentIndex = nextContent.findIndex(c => c.index === index)
    if (contentIndex !== -1) {
      nextContent.splice(contentIndex, 1)
    }
  } else {
    // Add to selection  
    nextIndexes.add(index) 
    nextContent.push({
      index: index,
      content: message.content
    })
  }

  selectedIndexes.value = nextIndexes
  selectedContent.value = nextContent
  
 
}

function toggleSelectAll() {
  if (!isSelectMode.value) return
  
  if (isSelectAll.value) {
    // Deselect all
    selectedIndexes.value = new Set()
    selectedContent.value = []
  } else {
    // Select all AI messages
    const aiMessages = messages.value
      .map((msg, index) => ({ msg, index }))
      .filter(({ msg }) => msg.type === 'ai')
    
    const nextIndexes = new Set(aiMessages.map(({ index }) => index))
    const nextContent = aiMessages.map(({ msg, index }) => ({
      index: index,
      content: msg.content
    }))
    
    selectedIndexes.value = nextIndexes
    selectedContent.value = nextContent
  }
  
  isSelectAll.value = !isSelectAll.value
}

function handleCancel() {
  // Exit select mode and clear selection
  isSelectMode.value = false
  selectedContent.value = []
  selectedIndexes.value = new Set()
  isSelectAll.value = false
}

function handleExport() {
  showExportPanel.value = true
}

function handleShareChart() {
  // Handle share chart functionality
  console.log('Share chart with selected content:', selectedContent.value)
  // You can add share chart logic here
}

function handleCopyLink() {
  // Handle copy link functionality
  console.log('Copy link for selected content:', selectedContent.value)
  // You can add copy link logic here
}

function handleCloseExportPanel() {
  showExportPanel.value = false
}

async function sendMessage(content, sessionId = '') {
  if (!content) return

  const shouldFetchSessionId = !sessionId && !currentSessionID.value
  if (isFirstOpen.value) {
    isFirstOpen.value = false
  }

  messages.value.push({ type: 'user', content })
  inputText.value = ''

  const aiMessageIndex = messages.value.length
  messages.value.push({ type: 'ai', content: '' })

  try {
    await streamChat(
      content,
      sessionId || currentSessionID.value || '',
      (chunk) => {
        console.log('Stream chunk received:', chunk)
        processStreamChunk(chunk, aiMessageIndex)
      },
      () => {
        console.log('Stream completed')
      },
      (error) => {
        console.error('Stream error:', error)
        if (messages.value[aiMessageIndex]) {
          messages.value[aiMessageIndex].content = '抱歉，发生了错误。'
        }
      }
    )
    if (shouldFetchSessionId) {
      await updateCurrentSessionId()
    }
  } catch (error) {
    console.error('Failed to send message:', error)
    if (messages.value[aiMessageIndex]) {
      messages.value[aiMessageIndex].content = '抱歉，发送消息失败。'
    }
  }
}

async function handleSend() {
  const content = inputText.value.trim()
  if (!content) {
    return
  }
  lastSentText.value = content
  await sendMessage(content, currentSessionID.value)
}

async function handleRegenerate() {
  if (!lastSentText.value) {
    return
  }

  messages.value = []
  selectedContent.value = []
  selectedIndexes.value = new Set()
  isSelectMode.value = false
  isSelectAll.value = false
  showExportPanel.value = false

  inputText.value = lastSentText.value
  await sendMessage(lastSentText.value, currentSessionID.value)
}

function handleLoadHistory(historyData) {
  // Clear current messages
  messages.value = []
  
  // Convert history chat data to messages format
  if (historyData && historyData.chat && Array.isArray(historyData.chat)) {
    historyData.chat.forEach((chatItem) => {
      if (chatItem.role === 'user') {
        messages.value.push({ type: 'user', content: chatItem.content || '' })
      } else if (chatItem.role === 'system') {
        messages.value.push({ type: 'ai', content: chatItem.content || '' })
      }
    })
  }
  
  // Update UI state
  isFirstOpen.value = false
  isSelectMode.value = false
  selectedContent.value = []
  selectedIndexes.value = new Set()
  isSelectAll.value = false
  inputText.value = ''
  lastSentText.value = ''
  currentSessionID.value = historyData?.session_id || historyData?._id || ''
}


</script>

<style scoped>
</style>
