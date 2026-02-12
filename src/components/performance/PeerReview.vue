<template>
  <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">동료 평가</h2>
    <p class="text-gray-500 mb-8 text-sm">함께 일한 동료에 대한 솔직한 피드백을 남겨주세요. 평가는 익명으로 처리됩니다.</p>

    <div class="mb-8">
      <label class="block text-sm font-bold text-gray-700 mb-2">평가 대상 동료 선택</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="name in colleagues"
          :key="name"
          @click="selectedColleague = name"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedColleague === name
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ name }}
        </button>
      </div>
    </div>

    <div v-if="selectedColleague" class="space-y-8">
      <div class="p-6 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4">
        <div
          class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-blue-600 shadow-sm"
        >
          {{ selectedColleague[0] }}
        </div>
        <div>
          <h3 class="font-bold text-lg text-gray-900">{{ selectedColleague }}님에 대한 평가</h3>
          <p class="text-sm text-blue-600">평가 기간: 2023년 상반기</p>
        </div>
      </div>

      <div class="space-y-6">
        <div v-for="item in criteria" :key="item.id" class="pb-6 border-b border-gray-100 last:border-0">
          <label class="block font-medium text-gray-800 mb-3">{{ item.label }}</label>
          <div class="flex gap-4">
            <button
              v-for="score in 5"
              :key="score"
              class="group flex flex-col items-center gap-1 focus:outline-none"
            >
              <div
                class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue-400 group-hover:text-blue-500 transition-colors focus:ring-2 focus:ring-blue-500"
              >
                {{ score }}
              </div>
              <span class="text-[10px] text-gray-400 group-hover:text-gray-600">
                {{ score === 1 ? '미흡' : score === 5 ? '탁월' : '' }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <label class="block font-medium text-gray-800 mb-3">종합 코멘트 (선택사항)</label>
        <textarea
          class="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          :rows="4"
          placeholder="동료의 장점이나 바라는 점을 자유롭게 작성해주세요."
        ></textarea>
      </div>

      <div class="flex justify-end pt-4">
        <button
          class="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
        >
          평가 제출하기
        </button>
      </div>
    </div>

    <div v-else class="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
      평가할 동료를 위에서 선택해주세요
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedColleague = ref('')

const colleagues = ['김서연', '이승주', '박지성', '손흥민', '페이커']

const criteria = [
  { id: 1, label: '협업 및 커뮤니케이션 능력' },
  { id: 2, label: '문제 해결 능력' },
  { id: 3, label: '책임감 및 자기 주도성' },
  { id: 4, label: '팀 기여도' },
  { id: 5, label: '조직 문화 기여도' },
]
</script>
