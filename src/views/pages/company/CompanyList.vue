<template>
  <div class="content-wrapper">
    <!-- Header Table -->
    <ContentHeader :title="$t(`${pageName}.title_list_page`)" :page-name="`${pageName}`"/>

    <!-- Content Table -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <DataTable
                    class="table table-responsive"
                    :value="list"
                    :rows="paginator.perPage"
                    :first.sync="page"
                    :loading="loading"
                    :resizableColumns="true"
                    :rowHover="true"
                    :autoLayout="true"
                    @sort="onSort"
                >
                  <Column field="name" :header="$t('common.table.name')" :sortable="true">
                    <template #filter>
                      <input type="text"
                             v-model="filters.name"
                             class="form-control"
                             @keyup.enter="onSearch"/>
                    </template>
                  </Column>
                  <Column field="image" :header="$t('common.table.image')" :sortable="true">
                    <template #body="slotProps">
                      <img :src="slotProps.data.image" class="img-thumbnail img-size-64">
                    </template>
                  </Column>
                  <Column field="status" :header="$t('common.table.status')" :sortable="true" filterMatchMode="equals">
                    <template #body="slotProps">
                      <span :class="'badge badge-' + slotProps.data.status">{{slotProps.data.status}}</span>
                    </template>

                    <template #filter>
                      <Dropdown
                          v-model="filters.status"
                          class="form-control"
                          @change="onSearch"
                          placeholder="All"
                          :options="status"
                          :showClear="true"
                      >
                        <template #option="slotProps">
                          <span :class="'badge badge-' + slotProps.option">{{slotProps.option}}</span>
                        </template>
                      </Dropdown>
                    </template>
                  </Column>
                  <Column field="created_at" :header="$t('common.table.created_at')" :sortable="true">
                    <template #filter>
                      <Calendar class="p-column-filter"
                                v-model="filters.created_at"
                                :dateFormat="`${dateTimeFormat}`"
                                selectionMode="range"
                                icon="pi pi-calendar"
                                @date-select="onSelectCalendar"
                                :manualInput="false"/>
                    </template>
                  </Column>
                  <Column>
                    <template #body="slotProps">
                      <div class="btn-group btn-group-toggle">
                        <button class="btn btn-sm btn-primary"
                                @click="onEdit(slotProps.data.id)"
                                v-tooltip.top="$t('common.button.edit')"
                        >
                          <i class="pi pi-pencil"/>
                        </button>

                        <button class="btn btn-sm btn-danger"
                                @click="onEdit(slotProps.data.id)"
                                v-tooltip.top="$t('common.button.delete')"
                        >
                          <i class="pi pi-trash"/>
                        </button>
                      </div>
                    </template>
                  </Column>

                  <!-- For Empty items -->
                  <template #empty>
                    {{ $t('common.table.no_records_found') }}
                  </template>
                </DataTable>
              </div>

              <div class="card-footer">
                <Paginator
                    :rows="paginator.perPage"
                    :totalRecords="paginator.total"
                    :paginator="true"
                    :first.sync="page"
                    :page="page"
                    :rowsPerPageOptions="[15,30,50]"
                    @page="onPage($event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  // Dummy
  import companies from '../../../dummy/companies'

  // Helper
  import { StatusCommon } from '../../../enum/common.enum'
  import { convertQueryFilterToString } from '../../../utils/filter'

  // Component
  import CompanyModel from '../../../models/company.model'
  import ContentHeader from '../../components/shared/ContentHeader'

  // Prime
  import Column from 'primevue/column'
  import DataTable from 'primevue/datatable'
  import Paginator from 'primevue/paginator'
  import Dropdown from 'primevue/dropdown'
  import Calendar from 'primevue/calendar'

  export default {
    name: 'CompanyList',

    components: {
      Column,
      DataTable,
      Paginator,
      Dropdown,
      ContentHeader,
      Calendar,
    },

    data () {
      return {
        list: companies,
        dateTimeFormat: 'yy/mm/dd',

        // dummy
        loading: false,
        filters: {},
        status: StatusCommon,
        pageName: 'company',
        pageModel: CompanyModel,
      }
    },

    computed: {
      page: {
        get () {
          const { page, perPage } = this.$route.query
          return ((parseInt(page) === 0 ? 1 : parseInt(page)) - 1) * parseInt(perPage)
        },

        set (value) {
          return value
        },
      },

      paginator () {
        if (!this.pageModel) {
          return
        }

        return this.$store.state.entities[this.pageName].paginator
      },
    },

    methods: {
      /**
       * @param inputParams
       */
      setQueries (inputParams) {
        const params = {
          ..._.cloneDeep(this.$route.query),
          ...inputParams,
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
          ...this.filters,
        }

        this.$router.replace({ query: queries }).catch(() => {})
      },

      /**
       * Action when changing page
       */
      onPage (event) {
        const params = {
          perPage: event.rows,
          page: (event.page + 1),
        }

        return this.callGetList(params)
      },

      /**
       * Action for Search
       */
      onSearch (event) {
        const params = {
          page: 1,
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
          direction: event.sortOrder === -1 ? 'desc' : 'asc',
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
          filters: this.filters,
        })

        return this.pageService.list(queries).then(() => {
          this.loading = false
        })
      },

      onEdit (ID) {
        return this.$router.push(`/${ this.pageName }/${ ID }`)
      },

    },
  }
</script>