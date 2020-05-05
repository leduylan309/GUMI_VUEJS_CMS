<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="$t('dashboard.title_page')"/>

		<div class="content">
			<!-- User Total -->
			<div class="row">
				<div class="col-lg-3 col-6">
					<!-- small box -->
					<div class="small-box bg-info">
						<div class="inner">
							<h3>{{ dashboard.total_user }}</h3>

							<p>{{ $t('common.text.total_users') }}</p>
						</div>
						<div class="icon">
							<i class="pi pi-users"></i>
						</div>
						<router-link :to="{ name: 'UserList' }" class="small-box-footer">{{ $t('common.text.more_info') }} <i class="pi pi-arrow-circle-right"></i></router-link>
					</div>
				</div>
				<!-- ./col -->
			</div>

			<!-- Search form -->
			<div class="row">
				<div class="col-12">
					<div class="card">
						<form class="form-horizontal" @submit.prevent="handleSearch">
							<div class="card-body">
								<div class="row">
									<div class="col-sm-6">
										<!-- Search datetime -->
										<label for="search_datetime">{{ $t('common.text.display_time') }}</label>
										<Calendar class="p-column-filter"
															icon="pi pi-calendar"
															v-model="created_at"
															id="search_datetime"
															hourFormat="24"
															:dateFormat="`${calendarDateTimeFormat}`"
															:showTime="true"
															:manualInput="false"
															selectionMode="range"
															:numberOfMonths="2"
															@date-select="onSelectDate"
										/>
									</div>

									<div class="col-sm-6">
										<!-- Display mode -->
										<label for="display_type">{{ $t('common.text.display_type') }}</label>
										<Dropdown id="display_type"
															class="form-control"
															:options="modes"
															v-model="display_type">
										</Dropdown>
									</div>
								</div>
							</div>
							<div class="card-footer">
								<button type="submit" class="btn btn-primary">{{ $t('common.text.search') }}</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<Chart type="line" :data="chartData" />
		</div>
	</div>
</template>

<script>
	import ContentHeader from '../components/shared/ContentHeader'
	import DashboardModel from '../../models/dashboard.model'
	import { DashboardService } from '../../api/dashboard.service'
	import moment from 'moment'
	import * as _ from 'lodash'

	// Prime
	import Chart from 'primevue/chart'
	import Calendar from 'primevue/calendar'
	import Dropdown from 'primevue/dropdown'

	export default {
		name: 'Dashboard',
		components: {
			ContentHeader,
			Chart,
			Calendar,
			Dropdown
		},

		async beforeRouteEnter (to, from, next) {
			const dashboard = await DashboardModel.query().all()
			console.log(dashboard)
			if (!dashboard.length) {
				await DashboardService.list(to.query)
			}

			await next()
		},

		computed: {
			dashboard () {
				return DashboardModel.query().first()
			},

			chartData () {
				return {
					labels: _.keys(this.dashboard.statistics),
					datasets: [
						{
							label: 'User Dataset',
							data: _.values(this.dashboard.statistics),
							fill: false,
							backgroundColor: '#17a2b8',
							borderColor: '#17a2b8',
						},
					]
				}
			}
		},

		data () {
			return {
				search_datetime: [],
				display_type: null,
				created_at: new Date(),
				modes: [`${this.$t('common.text.monthly')}`, `${this.$t('common.text.daily')}`],
				calendarDateTimeFormat: 'yy-mm-dd'
			}
		},

		methods: {
			handleSearch () {
				if (_.isArray(this.search_datetime) && this.search_datetime.length) {
					this.search_datetime = this.search_datetime.join(' - ')
				}
				return DashboardService.list({
					search_datetime: this.search_datetime,
					display_type: this.display_type
				})
			},

			onSelectDate (value) {
				const date = moment(value).format('YYYY-MM-DD hh:mm')

				if (!this.created_at[1]) {
					this.search_datetime[0] = date
				} else {
					this.search_datetime[1] = date
				}
			}
		}
	}
</script>

<style scoped>
	.small-box .icon > i {
		font-size: 70px;
	}

	.small-box:hover .icon > i {
		font-size: 70px;
	}

	.small-box > .inner {
		padding: 15px;
	}
</style>