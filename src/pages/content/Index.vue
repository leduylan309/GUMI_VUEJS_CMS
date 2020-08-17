<template>
  <div id="ShopIndex">
    <div class="btn-create">
      <router-link :to="{name: 'content.create'}" class="btn btn-success" tag="button">
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
        <img class="avatar avatar-lg img-thumbnail-list" :src="thumbnail.thumbnail_url | imageThumbnailObject"/>
      </template>

      <template slot="public_time" slot-scope="public_time">
        {{ public_time.publish_start_datetime }} ~ {{ public_time.publish_end_datetime}}
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

          <a-tooltip placement="bottom" :title="$t('tooltip_delete')" v-if="hasPermissionAction(PERMISSIONS.DELETE_CONTENT)">
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
import Content from '@/models/Content'
import Table from '@/mixins/table.mixin'
import Form from '@/mixins/form.mixin'
import { convertPagination } from '@/utils/filters'
import Search from './Search'
import { EditIcon, Trash2Icon, PlusIcon } from 'vue-feather-icons'

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
    // Get All Content
    const resp = await Content.paginate({
      query: {
        page: 1,
        per_page: 100,
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
      sortBy: 'created_at',
      sortDesc: true,
      perPage: ''
    }
  },

  computed: {
    columns () {
      return [
        {
          title: this.$t('thumbnail'),
          scopedSlots: { customRender: 'thumbnail' },
          width: 85
        },
        {
          title: this.$t('content_public_time'),
          scopedSlots: { customRender: 'public_time' }
        },
        {
          title: this.$t('content_title'),
          dataIndex: 'content_title'
        },
        {
          title: this.$t('status'),
          dataIndex: 'is_active',
          scopedSlots: {customRender: 'is_active'},
          width: 120
        },
        {
          title: this.$t('display_order'),
          dataIndex: 'display_order',
          width: 120
        },
        {
          title: '',
          scopedSlots: { customRender: 'action' },
          align: 'right'
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

      this.filter = {...$event}

      await this.fetchList(params)
    },

    async handleEdit (id) {
      this.$router.push({
        name: 'content.edit',
        params: {
          id: id
        }
      }).catch(_ => {})
    },

    async handleDelete (id) {
      await Content.delete_content(id)

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
        const resp = await Content.paginate({
          query: {
            ...params,
            ...filter,
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

    handleHighlight (record, index) {
      return record.is_active ? '' : 'inactive'
    }
  }
}
</script>

<style scoped>

</style>
