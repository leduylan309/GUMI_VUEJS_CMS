// convert filters
import * as _ from 'lodash'
import qs from 'querystring'
import moment from 'moment'

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
      if (_.isObject(value)) {
        filterString += `${ convertOnlyFilterToString(`${ keyName }[${ key }]`, value) }`
      } else {
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
 * @param columnsDateRange
 */
export const convertQueryObjectFilter = (currentQuery = {}, defaultQuery = {}, columnsDateRange = []) => {
  const filters = _.omit(currentQuery, _.keys(defaultQuery))
  const params = _.pick(currentQuery, _.keys(defaultQuery))

  return {
    ...defaultQuery,
    ...params,
    filters: mapFilterDateArray(filters, columnsDateRange)
  }
}

/**
 *
 * @param filters
 * @param columns
 * @return {*}
 */
export const mapFilterDateArray = (filters, columns) => {
  if (columns.length) {
    const array = _.pick(filters, columns)

    if (_.size(array)) {
      _.forEach(array, (value, key) => {
        filters[key] = setFromToFromString(value)
      })

    }
  }

  return filters
}

/**
 *
 * @param String
 * @return {{from: *, to: *}}
 */
export const setFromToFromString = (String) => {
  const dateArray = _.split(String, ',')

  return {
    from: dateArray[0] || '',
    to: dateArray[1] || ''
  }
}

/**
 * convert time
 * @param date
 * @param format
 * @param timezone
 * @return {Array}
 */
export const convertDateTimeForFilter = (date, format = 'YYYY/MM/DD', timezone = 'Asia/Tokyo') => {
  return _.map([...date], (val) => {
    return val ? moment(val).format(format) : null
  })
}

/**
 * convert string from router to date range
 * @param dateString
 * @param separator
 * @return {*[]|Array}
 */
export const convertToDateRangeCalendar = (dateString, separator = ',') => {
  const array = dateString ? _.split(dateString, separator) : []

  if (!array.length) {
    return []
  }

  return _.map(array, (value) => {
    return new Date(value)
  })
}