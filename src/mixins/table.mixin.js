import { convertParamsAndFilterToString, convertQueryFilterToString, convertQueryObjectFilter } from '../utils/filter'
import { IROOTQUERY } from '../shared/store/state'
import * as _ from 'lodash'

export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // map with route current url
      const queries = convertQueryObjectFilter(
        to.query,
        IROOTQUERY,
        vm.pageModel?.columnsDateRange
      )

      // call api
      Promise.all([
        vm.pageService.list(queries)
      ]).then(() => {
        const defaultQuery = {
          ...convertQueryFilterToString(queries),
          ...queries.filters
        }

        // map filters to string
        const queriesMapped = _.transform(defaultQuery, (result, value, key) => {
          return result[key] = _.isObject(value) ? _.toString(_.flatMap(value)) : value
        })

        vm.$router.replace(`?${ convertParamsAndFilterToString(queriesMapped) }`).catch(() => {})
        vm.filters = queries.filters
      })
    })
  }
}
