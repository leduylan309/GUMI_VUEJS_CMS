<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <!--Form-->
    <form role="search" @submit.prevent="search">
      <div class="row">
        <!--Role-->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{$t('role_admin_name')}}</label>

          <a-select
            show-search
            style="width: 100%"
            v-model="filter.role_name">
            <a-select-option value="">
              {{$t('select_option_empty')}}
            </a-select-option>
            <a-select-option v-for="item in list_admin_role"
                             :key="item.id"
                             :value="item.roles.display_name">
              {{ item.roles.display_name }}
            </a-select-option>
          </a-select>
        </div>

        <!--Login ID-->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{$t('login_id')}}</label>

          <a-input v-model="filter.login_id"/>
        </div>

        <!--Admin name-->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{$t('admin_name')}}</label>

          <a-input v-model="filter.admin_name"/>
        </div>

        <!--Active-->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{$t('status')}}</label>

          <a-select
            show-search
            :placeholder="$t('select_option_empty')"
            style="width: 100%"
            v-model="filter.is_active">
            <a-select-option value="">
              {{$t('select_option_empty')}}
            </a-select-option>
            <a-select-option value="1">
              {{$t('select_option_active')}}
            </a-select-option>
            <a-select-option value="0">
              {{$t('select_option_inactive')}}
            </a-select-option>
          </a-select>
        </div>

        <!--Search & Reset-->
        <div class="col-12 col-md-6 ml-auto">
          <label class="form-label" v-html="'&nbsp;'"/>

          <div class="row">
            <div class="col-6">
              <button type="button" @click="reset" class="btn btn-light btn-block border-0">
                <RefreshCwIcon size="14" class="mr-1"/>
                {{$t('btn_reset')}}
              </button>
            </div>

            <div class="col-6">
              <button type="submit" class="btn btn-warning btn-block border-0">
                <SearchIcon size="14" class="mr-1"/>
                {{$t('btn_search')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </a-card>
</template>

<script>
import { RefreshCwIcon, SearchIcon } from 'vue-feather-icons'

export default {
  name: 'Search',
  data () {
    return {
      list_admin_role: [],
      filter: {
        role_name: '',
        login_id: '',
        admin_name: '',
        is_active: ''
      }
    }
  },

  components: {
    // Icon
    SearchIcon,
    RefreshCwIcon
  },

  created () {
    this.list_admin_role = this.$route.meta['list']
  },

  methods: {
    search () {
      this.$emit('filter-changed', this.filter)
    },

    reset () {
      for (let property in this.filter) {
        if (this.filter.hasOwnProperty(property)) {
          this.filter[property] = ''
        }
      }

      this.$emit('filter-changed', this.filter)
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
