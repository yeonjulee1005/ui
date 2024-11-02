<template>
  <div class="text-center">
    <h1 class="font-semibold mb-1">
      Playground
    </h1>

    <div class="flex items-center justify-center gap-1">
      <UDropdownMenu
        v-model:open="dropdownMenuTrigger"
        :items="items"
        size="lg"
        :content="{ align: 'start' }"
      >
        <UButton label="Open" />
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  [
    {
      label: 'Settings',
      icon: 'i-lucide-settings-2',
      kbds: ['ctrl', 's'],
      to: '/settings'
    },
    {
      label: 'Theme',
      icon: 'i-lucide-palette',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          kbds: ['alt', 'meta', 'l']
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          kbds: ['alt', 'meta', 'd']
        },
        {
          label: 'System',
          icon: 'i-lucide-monitor',
          kbds: ['alt', 'meta', 's']
        }
      ]
    }
  ],
  [
    {
      label: 'Inquiry',
      icon: 'i-lucide-message-circle-more',
      kbds: ['ctrl', 'i'],
      to: '/settings/inquiry'
    },
    {
      label: 'Plan',
      icon: 'i-lucide-crown',
      kbds: ['ctrl', 'p'],
      to: '/settings/plan'
    }
  ],
  [
    {
      label: 'Signin',
      icon: 'i-lucide-log-in',
      kbds: ['ctrl', 'l'],
      to: '/login'
    }
  ]
])

const dropdownMenuTrigger = ref(false)

defineShortcuts(
  extractShortcuts(items.value)
)

defineShortcuts({
  ctrl_d: () => {
    dropdownMenuTrigger.value = !dropdownMenuTrigger.value
  },
  ctrl_s: () => {
    navigateTo('/settings')
  },
  ctrl_t: () => {
    navigateTo('/settings/theme')
  },
  ctrl_l: () => {
    navigateTo('/login')
  },
  ctrl_i: () => {
    navigateTo('/settings/inquiry')
  },
  ctrl_p: () => {
    navigateTo('/settings/plan')
  }
})
</script>
