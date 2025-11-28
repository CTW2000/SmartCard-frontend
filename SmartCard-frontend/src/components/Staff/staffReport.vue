<template>

  <!--staff report-->
<div class="w-[1448px] h-[793px] relative overflow-hidden">

<div class="w-[1448px] h-[793px] left-0 top-0 absolute bg-gray-50 rounded-[31px]"></div>

<div class="left-[116px] top-[45px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">员工详情</div>

<img
  :src="arrowLeft"
  alt="back"
  class="w-7 h-7 left-[70px] top-[48px] absolute object-contain cursor-pointer"
  @click="$emit('close')"
/>


<div class="w-[1317px] h-40 left-[65px] top-[114px] absolute">
  
  <div class="w-[1317px] h-40 left-0 top-0 absolute bg-white rounded-3xl border border-neutral-200"></div>
  
 
  <img class="w-20 h-20 left-[35px] top-[29px] absolute rounded-[276px] shadow-[0px_4px_4px_0px_rgba(194,194,194,0.25)] border-[3px] border-white" src="https://placehold.co/86x86" />
  
  <div class="left-[146px] top-[31px] absolute justify-start
   text-zinc-800 text-2xl font-medium font-['Alibaba_PuHuiTi']
    truncate  max-w-[250px]">
    {{ staff?.name || '—' }}</div>
  
  <div class="w-40 h-9 left-[400px] top-[29px] absolute bg-gray-100 rounded-[57px]">
    <span class="left-[20px] top-[7px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">今日总反馈{{ staffReport.total || 0 }}次</span>
  </div>

  
  <div class="w-32 h-9 left-[580px] top-[29px] absolute bg-red-700 rounded-[57px]">
    <span class="left-[18px] top-[7px] absolute justify-start text-white text-base font-normal font-['Alibaba_PuHuiTi']">负面占比32%</span>
  </div>

  <img
    :src="yellowStar"
    alt="star"
    class="w-7 h-7 left-[144px] top-[86px] absolute object-contain"
  />
  <div class="left-[182px] top-[86px] absolute justify-start text-amber-500 text-2xl font-medium font-['Alibaba_PuHuiTi']">4.3分</div>
  
  <!--edit and share buttons-->
  <div class="right-[43px] top-[60px] absolute flex gap-4">
    <img
      :src="pencilIcon"
      alt="edit"
      class="absolute left-[-40px] top-[4px] w-[20px] h-[20px] object-contain cursor-pointer hover:opacity-70"
      @click="handleEdit"
    />
    <img
      :src="shareIcon"
      alt="share"
      class="w-[30px] h-[30px] object-contain cursor-pointer hover:opacity-70"
      @click="handleShare"
    />
  </div>


  
  <div class="w-20 h-7 left-[264px] top-[88px] absolute bg-emerald-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
  <div class="left-[284px] top-[93px] absolute justify-start text-teal-800 text-sm font-medium font-['Alibaba_PuHuiTi']">蘑菇嫩</div>
  <div class="w-20 h-7 left-[355px] top-[88px] absolute bg-emerald-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
  <div class="left-[375px] top-[93px] absolute justify-start text-teal-800 text-sm font-medium font-['Alibaba_PuHuiTi']">鸡蛋滑</div>
  <div class="w-20 h-7 left-[518px] top-[88px] absolute bg-emerald-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
  <div class="left-[538px] top-[93px] absolute justify-start text-teal-800 text-sm font-medium font-['Alibaba_PuHuiTi']">份量足</div>
  <div class="w-16 h-7 left-[442px] top-[88px] absolute bg-rose-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
  <div class="left-[461px] top-[93px] absolute justify-start text-rose-800 text-sm font-medium font-['Alibaba_PuHuiTi']">略咸</div>
  <div class="w-20 h-7 left-[609px] top-[88px] absolute bg-rose-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
  <div class="left-[628px] top-[93px] absolute justify-start text-rose-800 text-sm font-medium font-['Alibaba_PuHuiTi']">价格高</div>

</div>



<!--AI 智能报告-->
<div class="w-[844px] h-[474px] left-[538px] top-[288px] absolute">
  <div class="w-[844px] h-[474px] left-0 top-0 absolute bg-white rounded-3xl border border-neutral-200"></div>
  <div class="left-[43px] top-[28px] absolute justify-start text-zinc-800 text-2xl font-medium font-['Alibaba_PuHuiTi']">AI智能报告——{{ staff?.name || '—' }}</div>
  <div class="w-[765px] h-0 left-[43px] top-[78px] absolute shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>
  
  


  <div class="left-[43px] top-[70px] absolute w-[540px] justify-start">
    <span class="text-black text-xl font-light font-['Alibaba_PuHuiTi']"><br/></span>
    <span class="text-black text-xl font-medium font-['Alibaba_PuHuiTi']">需改进：<br/></span>
    <span class="text-black text-xl font-light font-['Alibaba_PuHuiTi']">1. 菜品质量问题突出，存在太油、太辣、太咸、小炒肉太肥等情况，需加强厨房品控<br/>2. 会员券使用规则解释不够清晰，导致顾客疑问<br/>3. 顾客了解门店渠道等信息记录不系统。<br/><br/></span>
    <span class="text-black text-xl font-normal font-['Alibaba_PuHuiTi']">明日重点：<br/></span>
    <span class="text-black text-xl font-light font-['Alibaba_PuHuiTi']">1. 与厨房沟通，调整菜品咸度、辣度，改进小炒肉炒制（减少油脂、延长炒制时间）<br/>2. 加强员工对会员券规则的培训，确保清晰解释<br/>3. 完善顾客反馈记录和处理流程，确保问题及时解决<br/>4. 持续推广评价活动，提高参与率。</span>
  </div>
</div>


<!--当日顾客反馈-->
<div class="w-96 h-[554px] left-[65px] top-[288px] absolute">
  
  <div class="w-112 h-[474px] left-0 top-0 absolute bg-white rounded-3xl border border-neutral-200"></div>
  <img
    :src="messageIcon"
    alt="message"
    class="w-6 h-6 left-[36px] top-[30px] absolute object-contain"
  />
  <div class="left-[78px] top-[27px] absolute justify-start text-zinc-800 text-xl font-medium font-['Alibaba_PuHuiTi']">
    当日顾客反馈（{{ staffReport.total || 0 }}次）
  </div>
  


  <div class="left-[36px] top-[78px] absolute w-96 space-y-4 max-h-[370px] overflow-y-auto pr-2">
    <template v-if="staffReport.staff_feedback_list.length">
      <div
        v-for="(feedback, index) in staffReport.staff_feedback_list"
        :key="feedback._id || index"
        class="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(205,205,205,0.25)] border border-neutral-200 px-6 py-4 space-y-3"
      >
        <div class="text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">
          {{ (feedback.start_time || '--:--') + ' -- ' + (feedback.end_time || '--:--') }}
        </div>
        <div v-if="feedback.tag" class="text-zinc-600 text-sm font-normal font-['Alibaba_PuHuiTi']">
          {{ feedback.tag }}
        </div>
        <div class="flex items-start gap-2 text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi'] leading-relaxed">
          <img
            :src="feedback.type ? smileIcon : sadIcon"
            :alt="feedback.type ? 'smile' : 'sad'"
            class="w-6 h-6 flex-shrink-0 mt-0.5 object-contain"
          />
          <span>{{ feedback.content || '暂无反馈' }}</span>
        </div>
      </div>
    </template>
    <div
      v-else
      class="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(205,205,205,0.25)] border border-neutral-200 px-6 py-4 space-y-3"
    >
      <div class="text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">
        --:-- -- --:--
      </div>
      <div class="text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi'] leading-relaxed">
        暂无反馈
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import arrowLeft from '../../../Resource/Menu/ArrowLeft.svg'
import yellowStar from '../../../Resource/Dish/yellowStar.svg'
import messageIcon from '../../../Resource/Dish/message.svg'
import sadIcon from '../../../Resource/Staff/Sad.svg'
import smileIcon from '../../../Resource/Staff/smile.svg'
import pencilIcon from '../../../Resource/Staff/Pencil.svg'
import shareIcon from '../../../Resource/Staff/Share.svg'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'

const props = defineProps({
  staff: { type: Object, default: () => ({}) },
})

const staffReport = ref({
  staff_feedback_list: [],
  total: 0,
})

defineEmits(['close'])


async function fetchStaffReport() {
  if (!props.staff?.staff_id) return

  const payload = { staff_id: props.staff.staff_id }

  try {
    const res = await postForm(PATHS.STAFF_REPORT, payload)
    const data = res?.data?.data
    staffReport.value = {
      staff_feedback_list: data?.feedback_list || [],
      total: data?.total ?? 0,
    }
  } catch (error) {
    console.error('Failed to fetch staff report:', error)
    staffReport.value = { staff_feedback_list: [], total: 0 }
  }
}



onMounted(() => {
  fetchStaffReport()
})

</script>

<style scoped>
</style>



