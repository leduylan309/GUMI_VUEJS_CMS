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
							<h3>150</h3>

							<p>Users</p>
						</div>
						<div class="icon">
							<i class="pi pi-users"></i>
						</div>
						<a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
					</div>
				</div>
				<!-- ./col -->
			</div>

			<!-- Search form -->
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-body">
							<form action="">
								<div class="row">
									<div class="col-sm-6">
										<!-- Search datetime -->
										<label for="search_datetime">Datetime</label>
										<Calendar class="p-column-filter"
															icon="pi pi-calendar"
															v-model="search_datetime"
															id="search_datetime"
															hourFormat="24"
															:dateFormat="`${calendarDateTimeFormat}`"
															:showTime="true"
															:showSeconds="true"
															:manualInput="false"
															selectionMode="range"
															:numberOfMonths="2"
										/>
									</div>

									<div class="col-sm-6">
										<!-- Display mode -->
										<label for="display_mode">Display mode</label>
										<Dropdown id="display_mode"
															class="form-control"
															:options="modes"
															v-model="display_mode">
										</Dropdown>
									</div>
								</div>
							</form>
						</div>
						<div class="card-footer">
							<button class="btn btn-primary">Search</button>
						</div>
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
			statistics () {
				return DashboardModel.query().first()
			},

			chartData () {
				return {
					labels: _.keys(this.statistics.data),
					datasets: [
						{
							label: 'User Dataset',
							data: _.values(this.statistics.data),
							fill: false,
							backgroundColor: '#2f4860',
							borderColor: '#2f4860',
						},
					]
				}
			}
		},

		data () {
			return {
				search_datetime: new Date(),
				display_mode: null,
				modes: ['monthly', 'daily'],
				calendarDateTimeFormat: 'yy-mm-dd'
			}
		}
	}
</script>

<style scoped>

</style>