import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import { TooltipProvider } from 'radix-vue'
import Tooltip, { type TooltipProps, type TooltipSlots } from '../../src/runtime/components/Tooltip.vue'
import ComponentRender from '../component-render'

const TooltipWrapper = defineComponent({
  components: {
    TooltipProvider,
    UTooltip: Tooltip
  },
  inheritAttrs: false,
  template: '<TooltipProvider><UTooltip v-bind="$attrs"><slot /></UTooltip></TooltipProvider>'
})

describe('Tooltip', () => {
  const props = { text: 'Tooltip', open: true, portal: false }

  it.each([
    // Props
    ['with text', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with kbds', { props: { ...props, kbds: ['meta', 'K'] } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TooltipProps, slots?: Partial<TooltipSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, TooltipWrapper)
    expect(html).toMatchSnapshot()
  })
})