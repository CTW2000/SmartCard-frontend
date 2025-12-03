<template>
  <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50" @click.self="emitClose">
    <div class="w-72 h-64 relative">
      <div class="w-72 h-64 left-0 top-0 absolute bg-white rounded-[31px]"></div>
      <div class="left-[33px] top-[23px] absolute justify-start text-zinc-800 text-xl font-normal font-['Alibaba_PuHuiTi']">
        导出为
      </div>

      <!-- divide line -->
      <div class="w-64 h-0 left-[20px] top-[65px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>

      <img
        :src="arrowDownIcon"
        alt="arrow"
        class="w-3.5 h-3.5 left-[100px] top-[32px] absolute origin-top-left object-contain"
      />

      <template v-for="option in formatOptions" :key="option.value">
        <div
          :class="option.circleClass"
          class="absolute cursor-pointer"
          @click="selectFormat(option.value)"
        >
          <div class="relative w-7 h-7">
            <img :src="WhiteCircle" alt="circle" class="w-full h-full object-contain" />
            <img
              v-if="selectedFormat === option.value"
              :src="CheckMark"
              alt="checked"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style="width: 18px; height: 18px;"
            />
          </div>
        </div>

        <div
          :class="option.labelClass"
          class="absolute justify-start text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer"
          @click="selectFormat(option.value)"
        >
          {{ option.label }}
        </div>
      </template>

      <button
        type="button"
        class="w-32 h-11 left-[79px] top-[183px] absolute bg-white rounded-3xl border border-zinc-300 flex items-center justify-center text-neutral-800 text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer hover:bg-zinc-50 transition-colors"
        @click="handleExtract"
      >
        导出
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import arrowDownIcon from '../../../Resource/SmartDiague/ArrowDown.svg'
import WhiteCircle from '../../../Resource/Menu/whiteCircle.svg'
import CheckMark from '../../../Resource/Menu/CheckMark.svg'
import { Document, Packer, Paragraph } from 'docx'
import * as XLSX from 'xlsx'

const props = defineProps({
  selectedContent: { type: Array, default: () => [] },
})

const emit = defineEmits(['close'])

const formatOptions = [
  {
    label: 'WORD',
    value: 'word',
    circleClass: 'left-[110px] top-[110px]',
    labelClass: 'left-[38px] top-[110px]',
  },
  {
    label: 'EXCEL',
    value: 'excel',
    circleClass: 'left-[219px] top-[110px]',
    labelClass: 'left-[146px] top-[110px]',
  },
]

const selectedFormat = ref(formatOptions[0].value)
function emitClose() {
  emit('close')
}

function selectFormat(value) {
  selectedFormat.value = value
}

function formatPlainText(contentItems) {
  return (contentItems || [])
    .map((item, index) => `Content ${index + 1}\n${item.content}`)
    .join('\n\n----------------\n\n')
}

async function downloadWord(contentItems) {
  const doc = new Document({
    sections: [
      {
        children: (contentItems || []).flatMap((item, index) => {
          const title = new Paragraph({
            text: `Content ${index + 1}`,
          })
          const body = new Paragraph({
            text: item.content || '',
          })
          const separator = new Paragraph({
            text: '----------------',
          })
          return [title, body, separator]
        }),
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'smart-chat-export.docx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function downloadExcel(contentItems) {
  const rows = [['Index', 'Content']]
  ;(contentItems || []).forEach((item, index) => {
    rows.push([index + 1, item.content || ''])
  })

  const worksheet = XLSX.utils.aoa_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Chat')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'smart-chat-export.xlsx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

async function handleExtract() {
  const content = props.selectedContent || []
  if (!content.length) {
    console.warn('No content selected for export')
    emitClose()
    return
  }

  const formatted = formatPlainText(content)

  if (selectedFormat.value === 'word') {
    await downloadWord(content)
  } else if (selectedFormat.value === 'excel') {
    downloadExcel(content)
  }

  emitClose()
}
</script>


