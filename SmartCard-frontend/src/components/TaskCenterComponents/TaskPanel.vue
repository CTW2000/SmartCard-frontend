<template>
  
  <div class="w-[743px] h-[471px] relative ">
    <div class="w-[710px] h-[471px] left-0 top-0 absolute rounded-[38px] border border-border bg-card shadow-md"></div>
    
    <div class="w-[626px] h-24 left-[37px] top-[99px] absolute bg-neutral-50 rounded-[10px] shadow-[0px_2px_2px_0px_rgba(148,148,148,0.25)] border border-border"></div>
    
    <div class="left-[73px] top-[133px] absolute justify-start text-stone-900 text-2xl font-medium font-['Alibaba_PuHuiTi']">
      {{ tasks[0]?.dish_name || '—' }}
        <!--<span>{{ topTask.description }}</span> -->
    </div>


    <div class="left-[482px] top-[133px] absolute justify-start text-zinc-800 text-2xl font-medium font-['Alibaba_PuHuiTi']">
      完成度：{{ tasks[0]?.progress ?? 0 }}%
    </div>


    <div class="w-[626px] h-44 left-[37px] top-[244px] absolute bg-neutral-700 rounded-[10px] shadow-[0px_2px_2px_0px_rgba(97,97,97,0.25)] border border-border"></div>
    <div class="left-[74px] top-[265px] absolute justify-start text-white text-2xl font-medium font-['Alibaba_PuHuiTi']">
      {{ tasks[1]?.dish_name || '—' }}
       <!--<span>{{ topTask.description }}</span> -->
    </div>


    <div class="left-[93px] top-[309px] absolute justify-start text-white text-sm font-normal font-['Alibaba_PuHuiTi']">未达标员工</div>
   
    <div class="left-[483px] top-[353px] absolute justify-start text-white text-2xl font-medium font-['Alibaba_PuHuiTi']">完成度：{{ tasks[1]?.progress ?? 0 }}%</div>

    <img  class="w-14 h-14 left-[73px] top-[341px] absolute rounded-[250px] border border-neutral-200" :src="AvatarMan" />
    <div class="w-14 h-14 left-[153px] top-[341px] absolute bg-white rounded-full"></div>
    <img  class="w-14 h-14 left-[153px] top-[341px] absolute rounded-[36px] border border-neutral-200" :src="AvatarMan1" />
    <div class="w-14 h-14 left-[233px] top-[341px] absolute bg-white rounded-full"></div>
    <img class="w-14 h-14 left-[233px] top-[341px] absolute rounded-[36px] border border-neutral-200" :src="AvatarWoman" />
    <img class="w-[14px] h-[14px] left-[72.94px] top-[311.94px] absolute" :src="warningIcon" alt="warning" />
    
    <div class="left-[45px] top-[33px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">任务中心</div>
    
    <img class="w-7 h-7 left-[170px] top-[35px] absolute object-contain rotate-180 cursor-pointer" :src="ArrowLeft" alt="arrow" @click="goToTasksCenter" />
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'

import warningIcon from '../../../Resource/Home/warningIcon.svg'
import AvatarMan from '../../../Resource/Staff/AvatarMan.svg'
import AvatarMan1 from '../../../Resource/Staff/AvatarMan1.svg'
import AvatarWoman from '../../../Resource/Staff/AvatarWoman.svg'
import ArrowLeft from '../../../Resource/Menu/ArrowLeft.svg'

const props = defineProps({
  tasks: { type: Array, default: () => [] }
})

const router = useRouter()

function goToTasksCenter() {
  if (router) {
    router.push({ name: 'TaskCenter' })
  }
}
</script>

<style scoped>
</style>


