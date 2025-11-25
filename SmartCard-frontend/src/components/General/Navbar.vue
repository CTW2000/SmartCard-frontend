<template>
  <aside class="w-72 shadow-[inset_-2px_0px_4px_0px_rgba(142,142,142,0.25)] flex flex-col h-screen sticky top-0">
    <nav class="flex-1 px-4 py-8 flex flex-col gap-4">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button
          type="button"
          @click="navigate"
          class="w-full h-16 rounded-lg flex items-center gap-4 px-5 transition-colors cursor-pointer"
          :class="isActive ? 'bg-neutral-700 text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]' : 'bg-transparent text-neutral-800 hover:bg-neutral-100'"
        >
          <span
            class="w-12 h-12 rounded-full flex items-center justify-center"
            :class="isActive ? 'bg-white/10' : 'bg-gray-100'"
          >
            <img :src="isActive ? item.iconWhite : item.icon" :alt="item.label" class="w-6 h-6 object-contain" />
          </span>
          <span
            class="text-xl font-['Alibaba_PuHuiTi']"
            :class="isActive ? 'font-medium' : 'font-normal'"
          >
            {{ item.label }}
          </span>
        </button>
      </router-link>
    </nav>
  </aside>
</template> 

<script setup>
import homeIcon from '../../../Resource/Nav/Home.svg'
import homeIconWhite from '../../../Resource/Nav/HomeWhite.svg'
import smartChatIcon from '../../../Resource/Nav/SmartChat.svg'
import smartChatIconWhite from '../../../Resource/Nav/SmartChatWhite.svg'
import equipmentIcon from '../../../Resource/Nav/Equipment.svg'
import equipmentIconWhite from '../../../Resource/Nav/EquipmentWhite.svg'
import staffIcon from '../../../Resource/Nav/Staff.svg'
import staffIconWhite from '../../../Resource/Nav/StaffWhite.svg'
import dishIcon from '../../../Resource/Nav/Dish.svg'
import dishIconWhite from '../../../Resource/Nav/DishWhite.svg'

const navItems = [
  { label: '总览', to: '/home', icon: homeIcon, iconWhite: homeIconWhite },
  { label: '智能对话', to: '/dialog', icon: smartChatIcon, iconWhite: smartChatIconWhite },
  { label: '设备管理', to: '/equipment', icon: equipmentIcon, iconWhite: equipmentIconWhite },
  { label: '员工管理', to: '/staff', icon: staffIcon, iconWhite: staffIconWhite },
  { label: '投流-菜品', to: '/dishes', icon: dishIcon, iconWhite: dishIconWhite },
]
</script>

