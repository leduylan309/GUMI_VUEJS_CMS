<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="$t(`${pageName}.title_list_page`)"/>

		<!-- Content Table -->
		<div class="content">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<DataTable
												class="table table-responsive"
												:value="list"
												:rows="paginator.perPage"
												:first.sync="page"
												:loading="loading"
												:resizableColumns="true"
												:rowHover="true"
												:autoLayout="true"
												@sort="onSort"
												:sortField="sortField"
												:sortOrder="sortOrder"
								>

									<!-- Render Dynamic Columns  -->
									<template v-for="(column, index) in this.columns">
										<!-- Column Type === String -->
										<Column v-if="column.type === 'String'"
														:key="index"
														:field="column.name"
														:header="$t(`common.table.${column.name}`)"
														:sortable="true"
										>
											<template #filter>
												<input type="text"
															 @keyup.enter="onSearch"
															 v-model="filters[column.name]"
															 class="form-control"/>
											</template>
										</Column>

										<!-- Column Type === Dropdown -->
										<Column v-if="column.type === 'Dropdown' && column.options"
														field="status"
														:header="$t(`common.table.${column.name}`)"
														:sortable="true"
														filterMatchMode="equals"
										>
											<template #body="slotProps">
												<span :class="'badge badge-' + slotProps.data[column.name]">{{slotProps.data[column.name]}}</span>
											</template>

											<template #filter>
												<Dropdown
																v-model="filters[column.name]"
																class="form-control"
																@change="onSearch"
																placeholder="All"
																:options="column.options"
																:showClear="true"
												>
													<template #option="slotProps">
														<span :class="'badge badge-' + slotProps.option">{{slotProps.option}}</span>
													</template>
												</Dropdown>
											</template>
										</Column>

										<!-- Column Type === Date -->
										<Column v-if="column.type === 'Date'"
														:field="column.name"
														:header="$t(`common.table.${column.name}`)"
														:sortable="true"
										>
											<template #filter>
												<Calendar class="p-column-filter"
																	v-model="date[column.name]"
																	:dateFormat="`${dateTimeFormat}`"
																	icon="pi pi-calendar"
																	@keydown.enter.prevent="onEnterCalender($event, column.name)"
																	@date-select="onSelectDateCalendar($event, column.name)"
																	:manualInput="true"/>
											</template>
										</Column>

										<!-- Column Type === DateRange -->
										<Column v-if="column.type === 'DateRange'"
														:field="column.name"
														:header="$t(`common.table.${column.name}`)"
														:sortable="true"
										>
											<template #filter>
												<Calendar class="p-column-filter"
																	v-model="dateRange[column.name]"
																	:dateFormat="`${dateTimeFormat}`"
																	selectionMode="range"
																	icon="pi pi-calendar"
																	@keydown.enter.prevent="onEnterCalender($event, column.name)"
																	@date-select="onSelectRangeCalendar($event, column.name)"
																	:manualInput="true"/>
											</template>
										</Column>
									</template>

									<!-- Action Column -->
									<Column>
										<template #body="slotProps">
											<div class="btn-group btn-group-toggle">
												<button class="btn btn-sm btn-primary"
																@click="onEdit(slotProps.data.id)"
																v-tooltip.top="$t('common.button.edit')"
												>
													<i class="pi pi-pencil"/>
												</button>

												<button class="btn btn-sm btn-danger"
																@click="onDisplayDialog(slotProps.data.id)"
																v-tooltip.top="$t('common.button.delete')"
												>
													<i class="pi pi-trash"/>
												</button>
											</div>
										</template>
									</Column>

									<!-- For Empty items -->
									<template #empty>
										{{ $t('common.table.no_records_found') }}
									</template>
								</DataTable>
							</div>

							<div class="card-footer">
								<Paginator :rows="paginator.perPage"
													 :totalRecords="paginator.total"
													 :paginator="true"
													 :first.sync="page"
													 :page="page"
													 :rowsPerPageOptions="[15,30,50]"
													 @page="onPage($event)"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Delete confirmation dialog -->
		<Dialog :header="$t('common.alert.delete_header')" :visible.sync="displayDialog" :style="{width: '50vw'}"
						:modal="true">
			{{ $t('common.alert.delete_content') }}

			<template #footer>
				<Button :label="$t('common.yes')" icon="pi pi-check" @click="handleDelete"/>
				<Button :label="$t('common.no')" icon="pi pi-times" @click="displayDialog = false" class="p-button-secondary"/>
			</template>
		</Dialog>

		<!-- Success / Error message -->
		<Toast></Toast>
	</div>
</template>

<script>
	import { StatusCommon } from '../../../enum/common.enum'
	import ContentHeader from '../../components/shared/ContentHeader'
	import {
		convertParamsAndFilterToString,
		convertQueryFilterToString,
		convertQueryObjectFilter,
		convertToDateRangeCalendar
	} from '../../../utils/filter'
	import moment from 'moment'
	import * as _ from 'lodash'
	import { IROOTQUERY } from '../../../shared/store/state'

	// Prime
	import Column from 'primevue/column'
	import DataTable from 'primevue/datatable'
	import Paginator from 'primevue/paginator'
	import Dropdown from 'primevue/dropdown'
	import Calendar from 'primevue/calendar'
	import Dialog from 'primevue/dialog'
	import Button from 'primevue/button'
	import Toast from 'primevue/toast'

	export default {
		name: 'TableList',

		data () {
			return {
				loading: true,
				filters: { ...this.$route.query },
				sortBy: {},
				status: StatusCommon,
				dateTimeFormat: 'yy/mm/dd',
				fields: this.pageModel.fields(),
				columns: this.pageModel.columns,
				displayDialog: false,
				selectedId: null,
				dateRange: [],
				date: null
			}
		},

		created () {
			this.initDate()
			this.initDateRange()
		},

		components: {
			Toast,
			Column,
			DataTable,
			Paginator,
			Dropdown,
			Calendar,
			ContentHeader,
			Dialog,
			Button
		},

		props: {
			pageName: String,
			pageModel: null,
			pageService: null
		},

		computed: {
			page: {
				get () {
					const { page, perPage } = this.$route.query
					return ((parseInt(page) === 0 ? 1 : parseInt(page)) - 1) * parseInt(perPage)
				},

				set (value) {
					return value
				}
			},

			list () {
				if (!this.pageModel) {
					return
				}

				return this.pageModel.query().all()
			},

			paginator () {
				if (!this.pageModel) {
					return
				}

				return this.$store.state.entities[this.pageName].paginator
			},

			sortField () {
				if ('orderBy' in this.$route.query) {
					return this.$route.query.orderBy
				}
				return null
			},

			sortOrder () {
				if ('direction' in this.$route.query) {
					return this.$route.query.direction === 'desc' ? -1 : 1
				}
				return null
			}
		},

		methods: {
			/**
			 * Setting for Date
			 */
			initDate () {
				const tmpQuery = this.$route.query
				const tmpDate = _.filter(this.pageModel.columns, (item) => item.type === 'Date')
				this.date = _.reduce(tmpDate, (result, value) => {
					result[value.name] = tmpQuery[value.name] ? new Date(tmpQuery[value.name]) : ''

					return result
				}, {})
			},

			/**
			 * Init Setting for Date Range
			 */
			initDateRange () {
				const tmpQuery = this.$route.query
				const tmpDateRange = _.filter(this.pageModel.columns, (item) => item.type === 'DateRange')

				this.dateRange = _.reduce(tmpDateRange, (result, value) => {
					result[value.name] = tmpQuery[value.name] ? convertToDateRangeCalendar(tmpQuery[value.name]) : []
					return result
				}, {})
			},

			/**
			 * replace URL every actions in list table
			 * @param params
			 */
			replaceUrl (params) {
				const queries = {
					...convertQueryFilterToString(params),
					...this.filters
				}

				const queriesMapped = _.transform(queries, (result, value, key) => {
					if (key === 'sortBy') {
						result['orderBy'] = _.toString(_.keys(value))
						result['direction'] = _.toString(_.values(value))
						return result
					}
					return result[key] = _.isObject(value) ? _.toString(_.flatMap(value)) : value
				})

				this.$router.replace(`?${ convertParamsAndFilterToString(queriesMapped) }`).catch(() => {})
			},

			/**
			 * Action when changing page
			 */
			onPage (event) {
				const params = {
					perPage: event.rows,
					page: (event.page + 1)
				}

				return this.callGetList(params)
			},

			/**
			 * Action for Search
			 */
			onSearch (event) {
				const params = {
					...this.$route.query,
					page: 1
				}

				return this.callGetList(params)
			},

			/**
			 * action for sorting column
			 * @param event
			 */
			onSort (event) {
				const params = {
					page: 1,
					sortBy: {}
				}

				params.sortBy[event.sortField] = event.sortOrder === -1 ? 'desc' : 'asc'
				this.sortBy = { ...params.sortBy }

				return this.callGetList(params)
			},

			/**
			 * Function filter Calendar
			 */
			onSelectDateCalendar (value, columnName) {
				this.filters[columnName] = moment(value).format('YYYY-MM-DD')

				// call api
				return this.callGetList({ page: 1 })
			},

			/**
			 * Function will filter by date
			 */
			onSelectRangeCalendar (value, columnName) {
				const date = moment(value).format('YYYY-MM-DD')

				if (!this.dateRange[columnName][1]) {
					this.filters[columnName] = { from: date }
				} else {
					this.filters[columnName] = { ...this.filters[columnName], to: date }
					// call api
					return this.callGetList({ page: 1 })
				}
			},

			/**
			 * action enter for Calendar
			 * @param event
			 * @param columnName
			 * @return {Promise<*>}
			 */
			onEnterCalender (event, columnName) {
				this.filters[columnName] = { ...this.dateRange[columnName] }

				// call api
				return this.callGetList({ page: 1 })
			},

			/**
			 * Call Api list of admin
			 * @param params
			 */
			async callGetList (params) {
				this.loading = true

				if (!_.isEmpty(this.sortBy)) {
					params.sortBy = { ...this.sortBy }
					params = _.omit(params, ['orderBy', 'direction'])
				}

				const queries = {
					...convertQueryObjectFilter(this.filters, IROOTQUERY),
					...params
				}

				return this.pageService.list(queries).then(() => {
					this.loading = false

					// replace url every actions
					this.replaceUrl(queries)
				})
			},

			/**
			 * href to edit page
			 * @param ID
			 * @return {Promise<Route>}
			 */
			onEdit (ID) {
				return this.$router.push(`/${ this.pageName }/${ ID }`)
			},

			/**
			 * display dialog delete
			 * @param ID
			 * @return {Promise<Route>}
			 */
			onDisplayDialog (ID) {
				this.displayDialog = true
				this.selectedId = ID
			},

			/**
			 * delete item
			 * @return {Promise<Route>}
			 */
			handleDelete () {
				return this.pageService.delete(this.selectedId).then(() => {
					// delete Item
					this.pageModel.query().find(this.selectedId).$delete()

					// reset State
					this.selectedId = null
					this.displayDialog = false

					// set toast
					this.$toast.add({
						severity: this.$t('common.alert.message_success'),
						summary: this.$t('common.alert.delete_message_successfully'),
						life: 3000
					})

					// call back api
					// this.callGetList({ page: 1 })

				}).catch((err) => {
					this.$toast.add({
						severity: this.$t('common.alert.message_error'),
						summary: this.$t('common.alert.delete_message_successfully')
					})
				})
			}
		}
	}
</script>
