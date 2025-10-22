<template>
  <div class="w-96 h-[506px] relative">
    <div class="w-96 h-[506px] left-0 top-0 absolute bg-white rounded-[31px]"></div>
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[139px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[251px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[50px] top-[358px] absolute" />
    <img :src="starBlue" class="w-4 h-4 left-[241px] top-[139px] absolute" />
    <div class="left-[48px] top-[41px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">新员工信息录入</div>
    <div class="left-[74px] top-[192px] absolute opacity-70 justify-start text-stone-500 text-base font-light font-['Alibaba_PuHuiTi']">输入您的姓名</div>
    <div class="left-[74px] top-[302px] absolute opacity-70 justify-start text-stone-500 text-base font-light font-['Alibaba_PuHuiTi']">输入您的手机号</div>
    <div class="left-[99px] top-[408px] absolute opacity-70 justify-start text-stone-500 text-base font-light font-['Alibaba_PuHuiTi']">选择您的岗位</div>
    <div class="left-[276px] top-[192px] absolute opacity-70 justify-start text-stone-500 text-base font-light font-['Alibaba_PuHuiTi']">男</div>
    <div class="left-[80px] top-[137px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">姓名</div>
    <div class="left-[80px] top-[249px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">手机号</div>
    <div class="left-[80px] top-[356px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">岗位</div>
    <div class="left-[271px] top-[137px] absolute justify-start text-stone-500 text-base font-medium font-['Alibaba_PuHuiTi']">性别</div>
    <div class="w-36 h-14 left-[48px] top-[175px] absolute opacity-50 rounded-[10px] border border-black"></div>
    <div class="w-80 h-14 left-[48px] top-[284px] absolute opacity-50 rounded-[10px] border border-black"></div>
    <div class="w-48 h-14 left-[48px] top-[391px] absolute opacity-50 rounded-[10px] border border-black"></div>
    <div class="w-24 h-14 left-[239px] top-[175px] absolute opacity-50 rounded-[10px] border border-black"></div>
    <div class="w-80 h-0 left-[38px] top-[113px] absolute shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>
  </div>
</template>

<script>
import starBlue from '../../Resource/Login/starBlue.svg'
export default {
  name: 'AddStaffInfo',
  data() {
    return { starBlue }
  }
}
</script>

<style scoped>
</style>


