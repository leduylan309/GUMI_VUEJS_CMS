import { convertQueryFilterToString, convertQueryObjectFilter } from '../utils/filter'
import { IROOTQUERY } from '../shared/store/state'

export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // map with route current url
      const queries = convertQueryObjectFilter(to.query, IROOTQUERY)

      Promise.all([
        vm.pageService.list(queries)
      ]).then(() => {
        const defaultQuery = {
          ...convertQueryFilterToString(queries),
          ...queries.filters
        }

        vm.$router.replace({ query: defaultQuery }).catch(() => {})
        vm.filters = queries.filters
      })
    })
  }
}
