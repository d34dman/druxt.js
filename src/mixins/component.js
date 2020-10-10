import { DruxtClass } from '..'

/**
 * Vue.js Mixin to add Druxt component theming to a Druxt module.
 *
 * @name DruxtComponentMixin
 * @see {@link /guide/#component-theme-system|Wrapper theme system}
 *
 * @example @lang vue <caption>CustomDruxtModule.vue</caption>
 * <template>
 *   <component :is="component.is" v-bind="component.propsData">
 *     <!-- -->
 *   </component>
 * </template>
 *
 * <script>
 * import { DruxtComponentMixin } from 'druxt'
 * export default {
 *   mixins: [DruxtComponentMixin]
 * }
 * </script>
 */
const DruxtComponentMixin = {
  /**
   * @property {Component} component - The wrapper component and propsData to be rendered.
   */
  data: () => ({
    component: {
      is: 'DruxtWrapper',
      propsData: {},
    }
  }),

  /**
   * The Nuxt Fetch hook.
   *
   * Loads the Druxt module data and applies a wrapper component as required.
   *
   * **Important:** If your component has an existing `fetch` method, you must manually invoke
   * the `DruxtComponentMixin.fetch()` hook.
   *
   * @see {@link https://nuxtjs.org/api/pages-fetch/}
   *
   * @example @lang vue <caption>Manually invoking DruxtComponentMixin.fetch().</caption>
   * <script>
   * import { DruxtComponentMixin } from 'druxt'
   * export default {
   *   mixins: [DruxtComponentMixin],
   *
   *   async fetch {
   *     await DruxtComponentMixin.fetch.call(this)
   *   }
   * }
   * </script>
   */
  async fetch() {
    // @todo - check for this.$druxt plugin.
    const druxt = new DruxtClass()
    const moduleData = await druxt.getModuleData(this)

    if (!moduleData.componentOptions) {
      return
    }

    const options = druxt.getComponents(this, moduleData.componentOptions)
    if (!options.length) {
      return
    }

    this.component.is = options[0].pascal
    this.component.propsData = moduleData.propsData || {}
  },
}

export { DruxtComponentMixin }

/**
 * @typedef {object} Component
 * @property {string} [is=DruxtWrapper] - The component name.
 * @property {object} [propsData={}] - The component propsData object.
 *
 * @example @lang js
 * {
 *   is: 'DruxtTextModuleWrapper',
 *   propsData: {},
 * }
 */
