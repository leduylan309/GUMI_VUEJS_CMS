<template>
  <div class="dashboard">
    <!--Header-->
    <div class="row align-items-center mb-3">
      <div class="col-auto">
        <h1 class="page-title text-dark">
          {{$t($route.meta.title)}}
        </h1>
      </div>
      <!-- Page title actions -->
      <div class="col-auto ml-auto d-print-none">
        <div class="d-sm-inline">
          <Breadcrumb/>
        </div>
      </div>
    </div>

    <!--Total member-->
    <a-card class="card-common">
      <div class="card-status-top bg-primary"></div>

      <div class="row">
        <div class="col-sm-12">
          <div class="total-member d-flex justify-content-center align-items-center flex-column p-3">
            <h1 class="mb-1">{{userTotal}}</h1>
            <p class="mb-0">{{ $t('total_member') }}</p>
          </div>
        </div>
      </div>
    </a-card>

    <!--Search chart-->
    <a-card class="card-common">
      <div class="card-status-top bg-warning"></div>

      <!--Form-->
      <form role="search" @submit.prevent="search">
        <div class="row">
          <div class="col-6 mb-2">
            <label class="form-label">{{ $t('time_show') }}</label>

            <a-range-picker
              style="width: 100%;"
              :show-time="{ format: 'HH:mm' }"
              :locale="locale"
              v-model.trim="dateRange"
              @change="getRangePicker"
              :disabled-date="disabledDate"
              :placeholder="[$t('start_time'), $t('end_time')]"
              format="YYYY-MM-DD HH:mm">
              <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
          </div>
          <div class="col-6 mb-2">
            <label class="form-label">{{ $t('chart_display_type') }}</label>

            <a-select
              style="width: 100%"
              v-model="filter.display_type">
              <a-select-option value="monthly">
                {{$t('monthly')}}
              </a-select-option>
              <a-select-option value="daily">
                {{$t('daily')}}
              </a-select-option>
            </a-select>
          </div>
          <!--Search & Reset-->
          <div class="col-6 ml-auto">
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

    <!--Chart-->
    <a-card class="card-common">
      <div class="card-status-top bg-info"></div>

      <!--Line chart-->
      <ChartLine :chart-data="filterLineChartData" :options="lineChartOptions" style="height: 400px"/>
    </a-card>

  </div>
</template>

<script>

import Dashboard from '@/models/Dashboard'
import store from '@/store'
import * as types from '@/store/mutation-types'
import Breadcrumb from '@/components/Breadcrumb'
import { RefreshCwIcon, SearchIcon } from 'vue-feather-icons'
import ChartLine from '@/components/ChartLine'
import {keys, values} from 'lodash-es'
import locale from 'ant-design-vue/es/date-picker/locale/ja_JP'
import moment from 'moment'

export default {
  name: 'Home',

  components: {
    ChartLine,
    Breadcrumb,
    RefreshCwIcon,
    SearchIcon
  },

  data () {
    return {
      locale,
      dataDashboard: {},
      dateRange: [],
      filter: {
        from: '',
        to: '',
        display_type: 'monthly'
      },
      lineChartData: {
        labels: [],
        datasets: [
          {
            label: this.$t('chart_title'),
            // Bezier curve tension of the line
            lineTension: 0.2,
            backgroundColor: 'transparent',
            borderColor: '#45aaf2',
            pointBackgroundColor: '#007cd4',
            pointBorderColor: '#f1f1f1',
            pointBorderWidth: 2,
            // set big & small dot circle
            pointRadius: 5,
            data: []
          }
        ]
      },
      lineChartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      keyChart: [],
      valueChart: []
    }
  },

  computed: {
    filterLineChartData () {
      let dataChart = store.getters.dataChart
      let lineChartData = {...this.lineChartData}
      let keyChart = keys(dataChart.statistics)
      let valueChart = values(dataChart.statistics)

      lineChartData.labels = [...keyChart]
      lineChartData.datasets[0].data = [...valueChart]

      return lineChartData
    },

    userTotal () {
      if ('total_user' in store.getters.dataChart) {
        return store.getters.dataChart.total_user
      }
    }
  },

  async beforeRouteEnter (to, from, next) {
    // Get Dashboards
    const resp = await Dashboard.all()

    store.commit(types.SET_CHART, resp.data)

    return next()
  },

  methods: {
    getRangePicker (dates, dateStrings) {
      this.filter.from = dateStrings[0]
      this.filter.to = dateStrings[1]
    },

    async search () {
      const resp = await Dashboard.all({
        query: {
          ...this.filter
        }
      })

      store.commit(types.SET_CHART, resp.data)
    },

    reset () {
      for (let property in this.filter) {
        if (this.filter.hasOwnProperty(property)) {
          if (property === 'display_type') {
            this.filter[property] = 'monthly'
          } else {
            this.filter[property] = ''
          }
        }
      }
      this.dateRange = []
      this.search()
    },

    disabledDate (current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day')
    }
  }
}
</script>
