// convert filters
import * as _ from 'lodash'
import qs from 'querystring'

/**
 * map params and filter for query
 * @param Object
 */
export const convertParamsAndFilterToString = (Object) => {
  let filterString = ''

  if ('filters' in Object) {
    const filters = Object.filters

    // call filter map to string
    filterString = convertOnlyFilterToString('filters', filters)

    // delete Filters params in request
    delete Object.filters
  }

  return qs.stringify(Object) + filterString
}

/**
 * map filter to string for query
 * @param keyName
 * @param Object
 */
export const convertOnlyFilterToString = (keyName, Object) => {
  let filterString = ''

  if (_.size(Object)) {
    _.forEach(Object, function (value, key) {
      if (value) {
        filterString += `&${ keyName }[${ key }]=${ value }`
      }
    })
  }

  return filterString
}

/**
 * convert filters to key name for url
 * @param params
 */
export const convertQueryFilterToString = (params) => {
  let paramsTmp = _.cloneDeep(params)
  const filters = _.omit(paramsTmp, _.keys(paramsTmp.filters))
  paramsTmp = _.merge(paramsTmp, filters)

  return { ..._.omit(paramsTmp, ['filters']) }
}

/**
 * @param currentQuery
 * @param defaultQuery
 */
export const convertQueryObjectFilter = (currentQuery = {}, defaultQuery = {}) => {
  const filters = _.omit(currentQuery, _.keys(defaultQuery))
  const params = _.pick(currentQuery, _.keys(defaultQuery))

  return {
    ...defaultQuery,
    ...params,
    filters: filters
  }
}