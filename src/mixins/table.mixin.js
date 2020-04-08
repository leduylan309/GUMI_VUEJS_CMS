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
  },

  computed: {
    list () {
      if (!this.pageModel) {
        return
      }

      return this.pageModel.query().all()
    },

    page: {
      get () {
        const { page, perPage } = this.$route.query
        return ((parseInt(page) === 0 ? 1 : parseInt(page)) - 1) * parseInt(perPage)
      },

      set (value) {
        return value
      }
    },

    /**
     * setup paginator
     * @return {*}
     */
    paginator () {
      if (!this.pageModel) {
        return
      }

      return this.$store.state.entities[this.pageName].paginator
    }
  },

  methods: {
    /**
     * @param inputParams
     */
    setQueries (inputParams) {
      const params = {
        ..._.cloneDeep(this.$route.query),
        ...inputParams
      }
      // replace url every actions
      this.replaceUrl(params)

      return params
    },

    /**
     * replace URL every actions in list table
     * @param params
     */
    replaceUrl (params) {
      const queries = {
        ...convertQueryFilterToString(params),
        ...this.filters
      }

      this.$router.replace({ query: queries }).catch(() => {})
    },

    /**
     * Action when changing page
     */
    onPage (event) {
      const params = {
        perPage: event.rows,
        page: (event.page + 1)
      }

      return this.callGetList(params)
    },

    /**
     * Action for Search
     */
    onSearch (event) {
      const params = {
        page: 1
      }

      return this.callGetList(params)
    },

    /**
     * action for sorting column
     * @param event
     */
    onSort (event) {
      const params = {
        page: 1,
        sort: event.sortField,
        direction: event.sortOrder === -1 ? 'desc' : 'asc'
      }

      return this.callGetList(params)
    },

    /**
     * Function will filter by date
     */
    onSelectCalendar (value) {

    },

    /**
     * Call Api list of admin
     * @param params
     */
    async callGetList (params) {
      this.loading = true

      const queries = this.setQueries({
        ...params,
        filters: this.filters
      })

      return this.pageService.list(queries).then(() => {
        this.loading = false
      })
    },

    /**
     * action Edit in table list
     * @param ID
     * @return {Promise<Route>}
     */
    onEdit (ID) {
      return this.$router.push(`/${ this.pageName }/${ ID }`)
    }

  }
}
