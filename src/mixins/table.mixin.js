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
          if (key === 'sortBy' && !_.isEmpty(value)) {
            result['orderBy'] = _.toString(_.keys(value))
            result['direction'] = _.toString(_.values(value))
            return result
          }
          return result[key] = _.isObject(value) ? _.toString(_.flatMap(value)) : value
        })

        vm.$router.replace(`?${ convertParamsAndFilterToString(queriesMapped) }`).catch(() => {})

        // set variable in table list component
        vm.$children[0].filters = queries.filters
        vm.$children[0].loading = false
      })
    })
  }
}
