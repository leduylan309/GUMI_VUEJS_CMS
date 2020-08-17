<template>
  <div id="AdminIndex">
    <div class="btn-create">
      <router-link :to="{name: 'admin.create'}" class="btn btn-success" tag="button">
        <PlusIcon size="18" class="mr-1"/>
        {{$t('btn_create')}}
      </router-link>
    </div>

    <Search @filter-changed="onFilterChange($event)"/>

    <a-table :columns="columns"
             :data-source="list"
             :loading="isLoading"
             :rowKey="randomUniqueID"
             table-layout="fixed"
             :pagination="{
               ...pagination,
               showSizeChanger: true,
               buildOptionText: buildOptionText,
               pageSizeOptions: ['100', '50', '20'],
               showTotal: showTotal
             }"
             :rowClassName="handleHighlight"
             @change="onPageChange">

      <!--Custom type table-->
      <template slot="role_admin" slot-scope="role_admin">
        {{role_admin.display_name}}
      </template>

      <!--Custom badge active-->
      <template slot="is_active" slot-scope="is_active">
        <span class="badge bg-green" v-if="is_active"> {{$t('active')}} </span>
        <span class="badge bg-gray" v-else> {{$t('inactive')}} </span>
      </template>

      <!--Custom type table-->
      <template slot="action" slot-scope="action">
        <div class="btn-list justify-content-end">
          <a-tooltip placement="bottom" :title="$t('tooltip_edit')">
            <button @click="handleEdit(action.id)" class="btn btn-primary font-weight-light">
              <EditIcon size="16"/>
            </button>
          </a-tooltip>

          <a-tooltip placement="bottom" :title="$t('tooltip_delete')" v-if="hasPermissionAction(PERMISSIONS.DELETE_ADMIN)">
            <a-popconfirm
              :title="$t('delete_content')"
              :ok-text="$t('yes')"
              :cancel-text="$t('no')"
              :disabled="action.id === currentUser.id"
              @confirm="handleDelete(action.id)">
              <button class="btn btn-danger font-weight-light"
                      v-if="action.id !== currentUser.id">
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
import Admin from '@/models/Admin'
import Table from '@/mixins/table.mixin'
import Form from '@/mixins/form.mixin'
import {convertPagination} from '@/utils/filters'
import Search from './Search'
import {EditIcon, Trash2Icon, PlusIcon} from 'vue-feather-icons'
import replace from 'lodash-es/replace'
import store from '@/store'

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
    // Get All Admin
    const resp = await Admin.paginate({
      query: {
        page: 1,
        per_page: 100,
        'include': 'roles',
        'sortBy[updated_at]': 'desc'
      }
    })
    // Save data in meta of router
    to.meta['list'] = resp.data
    to.meta['pagination'] = convertPagination(resp.pagination)

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

  computed: {
    columns () {
      return [
        {
          title: this.$t('role_admin_name'),
          dataIndex: 'roles',
          scopedSlots: {customRender: 'role_admin'}
        },
        {
          title: this.$t('login_id'),
          dataIndex: 'login_id'
        },
        {
          title: this.$t('admin_name'),
          dataIndex: 'admin_name'
        },
        {
          title: this.$t('status'),
          dataIndex: 'is_active',
          scopedSlots: {customRender: 'is_active'}
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
          scopedSlots: {customRender: 'action'},
          align: 'center'
        }
      ]
    },

    currentUser () {
      return store.getters.profile.data
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
        name: 'admin.edit',
        params: {
          id: id
        }
      }).catch(_ => {
      })
    },

    async handleDelete (id) {
      await Admin.delete_admin(id)

      await this.onSuccess(this.$t('message_success'), this.$t('delete_message_successfully'))

      this.fetchList()
    },

    async fetchList (params = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Admin.paginate({
          query: {
            'include': 'roles',
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
