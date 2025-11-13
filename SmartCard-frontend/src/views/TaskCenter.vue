<template>
    <section class="p-[25px]">
         <div class="min-w-[1200px]  min-h-[1100px] bg-background rounded-[50px] relative ">
          
            <div class="left-[30px] top-[30px] absolute flex items-center gap-3">
              
              <img 
                  :src="arrowLeft" 
                  alt="Arrow Left" 
                  class="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" 
                  @click="goToHome"
              />
              <span class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">任务中心</span>
            </div>

           <div class="w-35 h-13 right-[40px] top-[40px] absolute cursor-pointer" @click="showCreateTaskPanel = true">
                <div class="w-full h-full left-0 top-0 absolute bg-slate-900 rounded-xl shadow-[0px_4px_4px_0px_rgba(168,168,168,0.25)] transition-opacity hover:opacity-90"></div>
                <div class="left-[25px] top-[12px] absolute justify-start text-white text-xl font-normal font-['Alibaba_PuHuiTi']">+新建任务</div>
            </div>


            <div class="left-[45px] top-[78px] absolute justify-start text-neutral-500 text-xl font-normal font-['Alibaba_PuHuiTi']">全部</div>
            <div class="left-[125px] top-[78px] absolute justify-start text-neutral-500 text-xl font-normal font-['Alibaba_PuHuiTi']">品牌方</div>
            <div class="left-[225px] top-[78px] absolute justify-start text-neutral-500 text-xl font-normal font-['Alibaba_PuHuiTi']">门店</div>
            <div class="h-0 left-[40px] right-[40px] top-[120px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>


            <div class="w-32 h-11 left-[40px] top-[150px] absolute">
                <div class="w-full h-full bg-neutral-700 rounded-3xl shadow-[0px_4px_4px_0px_rgba(199,199,199,0.25)] border border-white"></div>
                <div class="left-[35px] top-[8px] absolute justify-start text-white text-xl font-normal font-['Alibaba_PuHuiTi']">进行中</div>
            </div>

            <div class="w-32 h-11 left-[200px] top-[150px] absolute">
                <div class="w-full h-full bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(199,199,199,0.25)] border border-stone-300"></div>
                <div class="left-[25px] top-[8px] absolute justify-start text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi']">历史任务</div>
            </div>


           <div class="left-[40px] right-[40px] top-[220px] absolute flex flex-wrap gap-8">
                <TaskCard />
            </div>

            <CreateNewTask
              v-if="showCreateTaskPanel"
              @close="showCreateTaskPanel = false"
            />
            


        </div>
     </section>
 </template>
 
<script setup>

import { ref } from 'vue'
import arrowLeft from '../../Resource/Menu/ArrowLeft.svg'
import { useRouter } from 'vue-router'
import TaskCard from '../components/TaskCenterComponents/TaskCard.vue'
import CreateNewTask from '../components/TaskCenterComponents/CreateNewTask.vue'

 
 const showCreateTaskPanel = ref(false)



 
 
const router = useRouter()
const goToHome = () => {
  router.push({ name: 'Home' })
}
 
 
 </script>
 
 <style scoped>
 </style>
 
 
 