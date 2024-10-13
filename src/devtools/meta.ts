import type { ViteDevServer } from 'vite'
import { kebabCase } from 'scule'
import defu from 'defu'

const devtoolsComponentMeta: Record<string, any> = {}

export function extendComponentMeta<T extends Record<string, any>>(_meta: T) { }

// A Plugin to parse additional metadata for the Nuxt UI Devtools.
export function devtoolsMetaPlugin() {
  return {
    name: 'ui-devtools-component-meta',
    enforce: 'pre' as const,

    transform(code: string, id: string) {
      if (!id.endsWith('.vue')) return
      const metaRegex = /extendComponentMeta<.*>\((\{[\s\S]*?\})\)/

      const fileName = id.split('/')[id.split('/').length - 1]

      if (code && fileName) {
        const slug = kebabCase(fileName.replace(/\..*/, ''))

        const match = code.match(metaRegex)
        if (match) {
          const metaObject = eval(`(${match[1]})`)
          devtoolsComponentMeta[slug] = metaObject
        }
      }

      return {
        code
      }
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use('/__ui_devtools__/api/component-meta', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const componentMeta = await import('./.component-meta/component-meta')

        const meta = defu(Object.entries(componentMeta).reduce((acc, [key, value]: [string, any]) => {
          if (!key.startsWith('U')) return acc

          value.meta.props = value.meta.props.map((prop: any) => ({
            ...prop,
            default: prop.default ?? prop?.tags?.find((tag: any) =>
              tag.name === 'defaultValue'
              && !tag.text?.includes('appConfig'))?.text?.replaceAll(/["']/g, '') }
          ))

          acc[kebabCase(key.replace(/^U/, ''))] = value
          return acc
        }, {} as Record<string, any>), devtoolsComponentMeta)

        res.end(JSON.stringify(meta))
      })
    }
  }
}
