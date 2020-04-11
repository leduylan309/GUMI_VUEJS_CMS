export const IROOTQUERY = {
  sort: 'created_at',
  direction: 'desc',
  page: 1,
  perPage: parseInt(process.env.VUE_APP_ITEM_PERPAGE),
  filters: []
}

export const IROOTPAGINATOR = {
  paginator: {}
}