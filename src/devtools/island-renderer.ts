import type { defineAsyncComponent } from 'vue'
import { createVNode, defineComponent, onErrorCaptured } from 'vue'

import { injectHead } from '@unhead/vue'
import { islandComponents } from '#build/components.islands.mjs'

export default defineComponent({
  name: 'IslandRenderer',
  props: {
    context: {
      type: Object as () => { name: string, props?: Record<string, any> },
      required: true
    }
  },
  setup(props) {
    // reset head - we don't want to have any head tags from plugin or anywhere else.
    const head = injectHead()
    head.headEntries().splice(0, head.headEntries().length)

    // @ts-expect-error - File comes from Nuxt.
    const component = islandComponents[props.context.name] as ReturnType<typeof defineAsyncComponent>

    if (!component) {
    // @ts-expect-error - File comes from Nuxt.
      throw createError({
        statusCode: 404,
        statusMessage: `Island component not found: ${props.context.name}`
      })
    }

    onErrorCaptured((e) => {
      console.log(e)
    })

    return () => createVNode(component || 'span', { ...props.context.props, 'data-island-uid': '' })
  }
})