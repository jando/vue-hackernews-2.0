import ItemList from './ItemList.vue'
import { setTitle } from '../util/title'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView (type) {
  return {
    name: `${type}-stories-view`,

    asyncData ({ store, ssrContext }) {
      return store.dispatch('FETCH_LIST_DATA', { type }).then(() => {
        setTitle(camelize(type), ssrContext)
      })
    },

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
