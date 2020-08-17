<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <!--Form-->
    <form role="search" @submit.prevent="search">
      <div class="row">

        <!--Display Name-->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{$t('display_name_role')}}</label>

          <a-input v-model="filter.display_name"/>
        </div>

        <!--Name-->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{$t('name_role')}}</label>

          <a-input v-model="filter.name"/>
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
        display_name: '',
        name: ''
      }
    }
  },

  components: {
    // Icon
    SearchIcon,
    RefreshCwIcon
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
