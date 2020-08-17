<template>
  <div id="ShopIndex">
    <div class="btn-create">
      <router-link :to="{name: 'user.create'}" class="btn btn-success" tag="button">
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

      <template slot="prefecture" slot-scope="prefecture">
        {{prefecture ? prefecture.prefecture_name : ''}}
      </template>

      <!--Custom badge active-->
      <template slot="is_active" slot-scope="is_active">
        <span class="badge bg-green" v-if="is_active"> {{$t('active')}} </span>
        <span class="badge bg-gray" v-else> {{$t('inactive')}} </span>
      </template>

      <!--Custom type table-->
      <template slot="action" slot-scope="action">
        <div class="btn-list justify-content-end">
          <a-tooltip placement="right" :title="$t('tooltip_edit')">
            <button @click="handleEdit(action.id)" class="btn btn-primary font-weight-light">
              <EditIcon size="16"/>
            </button>
          </a-tooltip>

          <a-tooltip placement="right" :title="$t('tooltip_delete')" v-if="hasPermissionAction(PERMISSIONS.DELETE_USER)">
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
import User from '@/models/User'
import Prefecture from '@/models/Prefecture'
import Table from '@/mixins/table.mixin'
import Form from '@/mixins/form.mixin'
import { convertPagination } from '@/utils/filters'
import store from '@/store'
import * as types from '@/store/mutation-types'
import Search from './Search'
import { EditIcon, Trash2Icon, PlusIcon } from 'vue-feather-icons'
import replace from 'lodash-es/replace'

export default {
  name: 'Index',

  components: {
    Search,
    EditIcon,
    Trash2Icon,
    PlusIcon
  },

  async beforeRouteEnter (to, from, next) {
    // Get Prefecture
    let respPrefecture = store.getters.prefectures

    if (!respPrefecture) {
      respPrefecture = await Prefecture.all()

      store.commit(types.SET_PREFECTURES, respPrefecture)
    }

    // Get All Shop
    const resp = await User.paginate({
      query: {
        page: 1,
        per_page: 100,
        'include': 'prefecture',
        'sortBy[updated_at]': 'desc'
      }
    })

    // Save data in meta of router
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
      perPage: ''
    }
  },

  mixins: [Table, Form],

  computed: {
    columns () {
      return [
        {
          title: this.$t('user_number'),
          dataIndex: 'user_number'
        },
        {
          title: this.$t('user_name'),
          dataIndex: 'nickname'
        },
        {
          title: this.$t('login_id'),
          dataIndex: 'login_id'
        },
        {
          title: this.$t('prefecture'),
          dataIndex: 'prefecture',
          scopedSlots: { customRender: 'prefecture' }
        },
        {
          title: this.$t('status'),
          dataIndex: 'is_active',
          scopedSlots: {customRender: 'is_active'},
          width: 120,
          align: 'center'
        },
        {
          title: this.$t('created_at'),
          dataIndex: 'created_at',
          width: 120
        },
        {
          title: this.$t('updated_at'),
          dataIndex: 'updated_at',
          width: 120
        },
        {
          title: '',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ]
    }
  },

  created () {
    this.list = this.$route.meta['list']
    this.pagination = this.$route.meta['pagination']
  },

  methods: {
    async onPageChange (pagination, filters, sorter) {
      this.perPage = pagination.pageSize
      const sortBy = `sortBy[${sorter.field}]`
      const sortDesc = replace(sorter.order, 'end', '')

      const params = {
        page: pagination.current,
        per_page: pagination.pageSize,
        [sortBy]: sortDesc
      }

      await this.fetchList(params)
    },

    async onFilterChange ($event) {
      const params = {
        page: 1,
        per_page: this.perPage || 100
      }

      this.filter = {...$event}

      await this.fetchList(params)
    },

    async handleEdit (id) {
      this.$router.push({
        name: 'user.edit',
        params: {
          id: id
        }
      }).catch(_ => {})
    },

    async handleDelete (id) {
      await User.delete_user(id)

      await this.onSuccess(this.$t('message_success'), this.$t('delete_message_successfully'))

      await this.fetchList()
    },

    async fetchList (params = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await User.paginate({
          query: {
            'include': 'prefecture',
            'sortBy[updated_at]': 'desc',
            ...params,
            ...filter
          }
        })

        this.list = [...resp.data]
        this.pagination = convertPagination(resp.pagination)
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },

    handleHighlight (record, index) {
      return record.is_active ? '' : 'inactive'
    }
  }
}
</script>

<style scoped>

</style>
