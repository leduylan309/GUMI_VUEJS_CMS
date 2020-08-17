<template>
  <div id="CompanyIndex">
    <div class="btn-create" v-if="hasPermissionAction(PERMISSIONS.CREATE_COMPANY)">
      <router-link :to="{name: 'companies.create'}" class="btn btn-success" tag="button">
        <PlusIcon size="18" class="mr-1"/>
        {{$t('btn_create')}}
      </router-link>
    </div>

    <Search @filter-changed="onFilterChange($event)"/>

    <a-table :columns="columns"
             :data-source="list"
             :loading="isLoading"
             :rowKey="randomUniqueID"
             :pagination="{
               ...pagination,
               showSizeChanger: true,
               buildOptionText: buildOptionText,
               pageSizeOptions: ['100', '50', '20'],
               showTotal: showTotal
             }"
             :rowClassName="handleHighlight"
             @change="onPageChange">

      <template slot="thumbnail" slot-scope="thumbnail">
        <img class="avatar avatar-lg img-thumbnail-list" :src="thumbnail"/>
      </template>

      <!--Custom badge active-->
      <template slot="is_active" slot-scope="is_active">
        <span class="badge bg-green" v-if="is_active"> {{$t('active')}} </span>
        <span class="badge bg-gray" v-else> {{$t('inactive')}} </span>
      </template>

      <template slot="duration" slot-scope="duration">
        {{ duration.publish_start_datetime }} ~ {{ duration.publish_end_datetime}}
      </template>

      <template slot="prefectures" slot-scope="prefectures">
        <template v-if="prefectures.length">
          {{ prefectures.map((item) => item.prefecture_name).join(', ') }}
        </template>
      </template>

      <!-- Action Column -->
      <template slot="action" slot-scope="action">
        <div class="btn-list flex-nowrap">
          <a-tooltip placement="bottom" title="編集">
            <button @click="handleEdit(action.id)" class="btn btn-primary font-weight-light">
              <EditIcon size="16"/>
            </button>
          </a-tooltip>

          <a-tooltip placement="bottom" title="削除" v-if="hasPermissionAction(PERMISSIONS.DELETE_COMPANY)">
            <a-popconfirm
                :title="$t('delete_content')"
                :ok-text="$t('yes')"
                :cancel-text="$t('no')"
                @confirm="handleDelete(action.id)">
              <button class="btn btn-danger font-weight-light">
                <Trash2Icon size="16"/>
              </button>
            </a-popconfirm>
          </a-tooltip>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import Company from '@/models/Company'
import Prefecture from '@/models/Prefecture'
import Table from '@/mixins/table.mixin'
import Form from '@/mixins/form.mixin'
import { convertPagination } from '@/utils/filters'
import Search from './Search'
import store from '@/store'
import * as types from '@/store/mutation-types'
import { EditIcon, Trash2Icon, PlusIcon } from 'vue-feather-icons'
import uniqueId from 'lodash-es/uniqueId'

export default {
  name: 'Index',

  mixins: [Table, Form],

  components: {
    Search,
    EditIcon,
    Trash2Icon,
    PlusIcon
  },

  async beforeRouteEnter (to, from, next) {
    const resp = await Company.paginate({
      query: {
        page: 1,
        per_page: 100,
        'fields[companies]': 'company_code,company_name,created_at,is_active,updated_at,id',
        'sortBy[updated_at]': 'desc'
      }
    })

    // Get Prefecture
    let respPrefecture = store.getters.prefectures

    if (!respPrefecture) {
      respPrefecture = await Prefecture.all()

      store.commit(types.SET_PREFECTURES, respPrefecture)
    }

    to.meta['list'] = resp.data
    to.meta['pagination'] = convertPagination(resp.pagination)
    to.meta['prefectures'] = respPrefecture.data

    return next()
  },

  data () {
    return {
      isLoading: false,
      list: [],
      pagination: {},
      filter: {},
      sortBy: 'updated_at',
      sortDesc: true,
      prefectureNames: [],
      perPage: ''
    }
  },

  created () {
    this.list = this.$route.meta['list']
    this.pagination = this.$route.meta['pagination']
  },

  computed: {
    columns () {
      return [
        {
          title: this.$t('company_code'),
          dataIndex: 'company_code'
        },
        {
          title: this.$t('company_name'),
          dataIndex: 'company_name',
          ellipsis: true
        },
        {
          title: this.$t('status'),
          dataIndex: 'is_active',
          scopedSlots: {customRender: 'is_active'},
          width: 120
        },
        {
          title: this.$t('created_at'),
          dataIndex: 'created_at'
        },
        {
          title: this.$t('updated_at'),
          dataIndex: 'updated_at'
        },
        {
          title: '',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ]
    }
  },

  methods: {
    async onPageChange (pagination) {
      this.perPage = pagination.pageSize
      const params = {
        page: pagination.current,
        per_page: pagination.pageSize
      }

      await this.fetchList(params)
    },

    async onFilterChange ($event) {
      const params = {
        page: 1,
        per_page: this.perPage || 100
      }

      this.filter = { ...$event }

      await this.fetchList(params)
    },

    async fetchList (params = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Company.paginate({
          query: {
            ...params,
            ...filter,
            'fields[companies]': 'company_code,company_name,created_at,is_active,updated_at,id',
            'sortBy[updated_at]': 'desc'
          }
        })
        this.list = [...resp.data]
        this.pagination = convertPagination(resp.pagination)
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },

    async handleDelete (companyId) {
      try {
        await Company.delete(companyId)

        // set toast
        await this.onSuccess(this.$t('message_success'), this.$t('delete_message_successfully'))

        const params = {
          page: 1,
          per_page: this.perPage || 100
        }

        this.fetchList(params)
      } catch (err) {
        this.onError(this.$t('message_error'), this.$t('delete_message_error'))
      }
    },

    handleEdit (id) {
      this.$router.push({ name: 'companies.edit',
        params: {id}
      })
    },

    randomUniqueID () {
      // eslint-disable-next-line no-undef
      return uniqueId('row_')
    },

    handleHighlight (record, index) {
      return record.is_active ? '' : 'inactive'
    }
  }
}
</script>

<style scoped>

</style>
