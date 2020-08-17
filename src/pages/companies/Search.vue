<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>

    <!--Form-->
    <form role="search" @submit.prevent="search">
      <div class="row">

        <!-- Company code -->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{ $t('company_code') }}</label>

          <a-input v-model.trim="filter.code" />
        </div>

        <!-- Company name -->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{ $t('company_name') }}</label>

          <a-input v-model.trim="filter.name" />
        </div>

        <!-- Active -->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{ $t('status') }}</label>

          <a-select
            show-search
            :placeholder="$t('please_select_option')"
            style="width: 100%"
            v-model="filter.is_active">
            <a-select-option value="">
              {{ $t('please_select_option') }}
            </a-select-option>
            <a-select-option value="1">
              {{ $t('active') }}
            </a-select-option>
            <a-select-option value="0">
              {{ $t('inactive') }}
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
      filter: {
        code: '',
        name: '',
        is_active: ''
      }
    }
  },

  components: {
    SearchIcon,
    RefreshCwIcon
  },

  created () {
    this.prefectures = this.$route.meta['prefectures']
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

<style scoped>

</style>
