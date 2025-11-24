<template>
   <section class="p-[25px] flex gap-6">

    <div class="w-[1100px]  h-[1000px] bg-background rounded-[50px] relative flex flex-col">
    
      <div class=" absolute left-[50px] top-[50px] text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">智能对话</div>
      
      <!-- Chat background -->
      <div class="mx-[40px] mt-[100px] mb-[50px] h-[820px] bg-gray-50 shadow-[-3px_0px_4px_0px_rgba(204,204,204,0.25)] rounded-[20px] flex flex-col">
        
        <!-- Messages area -->
        <div class="h-[560px] overflow-y-auto p-6 space-y-4">
         
          <template v-for="(message, index) in messages" :key="index">
            <!-- User message (right side) -->
            <div
              v-if="message.type === 'user'"
              class="ml-auto max-w-[40rem] flex items-start justify-end gap-3 pr-2"
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
              <div
                class="bg-slate-50 rounded-[30.5px] shadow-[0px_2px_2px_0px_rgba(147,147,147,0.25)] px-10 py-6 min-h-[128px] text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] leading-relaxed whitespace-pre-wrap break-words"
              >
                {{ message.content }}
              </div>
              <div class="w-12 h-12 left-[21px] top-[17px] absolute bg-white rounded-[250px] shadow-[0px_2px_2px_0px_rgba(197,197,197,0.25)]"></div>
              <img
                class="w-9 h-9 left-[65px] top-[61px] absolute origin-top-left rotate-180 object-contain"
                :src="aiAvatar"
                alt="ai avatar"
              />
            </div>
          </template>
          
        </div>
        


        <div class="flex justify-center pb-10">
        
          <!-- user input window -->
          <div class="w-[926px] h-48 relative">
            <div class="w-[926px] h-48 left-0 top-0 absolute bg-white rounded-[29px] border border-gray-200"></div>
            
            <div 
              class="w-11 h-11 left-[869px] top-[144px] absolute bg-neutral-700 rounded-[250px] cursor-pointer hover:bg-neutral-600 transition-colors"
              @click="handleSend"
            ></div>
            <div class="w-6 h-6 left-[879px] top-[155px] absolute flex items-center justify-center pointer-events-none">
                <img :src="sendIcon" alt="send" class="w-6 h-6" />
            </div>

            
            <textarea
              v-model="inputText"
              class="left-[32px] top-[16px] absolute w-[820px] h-[100px] resize-none bg-transparent text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi'] placeholder:text-zinc-500 focus:outline-none"
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
      </div>
        
      
    </div>

    <!-- History Chat Component -->
    <div class="flex items-start ">
      <HistoryChat />
    </div>
    
    
  </section>
</template>




<script setup>
import { ref } from 'vue'
import sendIcon from '../../Resource/SmartDiague/send-2.svg'
import importVoiceIcon from '../../Resource/SmartDiague/importVoice.svg'
import aiAvatar from '../../Resource/SmartDiague/AIAvatar.svg'
import userAvatar from '../../Resource/Staff/AvatarMan.svg'
import { streamChat } from '../httpClient/client'
import HistoryChat from '../components/SmartChat/HistoryChat.vue'

const inputText = ref('')
const messages = ref([])





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


async function handleSend() {
  if (!inputText.value.trim()) {
    return
  }

  const content = inputText.value.trim()
  
  // Add user message to display
  messages.value.push({ type: 'user', content })
  
  // Clear input field
  inputText.value = ''

  // Create AI message entry for streaming
  const aiMessageIndex = messages.value.length
  messages.value.push({ type: 'ai', content: '' })

  try {
    await streamChat(
      content,
      // onChunk callback - accumulate chunks into AI message
      (chunk) => {
        console.log('Stream chunk received:', chunk)
        processStreamChunk(chunk, aiMessageIndex)
      },
      // onComplete callback
      () => {
        console.log('Stream completed')
      },
      // onError callback
      (error) => {
        console.error('Stream error:', error)
        // Update AI message with error if needed
        if (messages.value[aiMessageIndex]) {
          messages.value[aiMessageIndex].content = '抱歉，发生了错误。'
        }
      }
    )
  } catch (error) {
    console.error('Failed to send message:', error)
    if (messages.value[aiMessageIndex]) {
      messages.value[aiMessageIndex].content = '抱歉，发送消息失败。'
    }
  }
}


</script>

<style scoped>
</style>
