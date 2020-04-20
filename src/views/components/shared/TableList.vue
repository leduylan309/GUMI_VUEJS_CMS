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
								>

									<!-- Render Dynamic Columns  -->
									<template v-for="(column, index) in this.columns">
										<Column :key="index"
														:field="column"
														:header="$t(`common.table.${column}`)"
														:sortable="true"
										>
											<template #filter>
												<input type="text"
															 @keyup.enter="onSearch"
															 v-model="filters[column]"
															 class="form-control"/>
											</template>
										</Column>
									</template>

									<!-- Status Column -->
									<Column field="status"
													:header="$t('common.table.status')"
													:sortable="true"
													filterMatchMode="equals"
													v-if="this.fields.status"
									>
										<template #body="slotProps">
											<span :class="'badge badge-' + slotProps.data.status">{{slotProps.data.status}}</span>
										</template>

										<template #filter>
											<Dropdown
															v-model="filters.status"
															class="form-control"
															@change="onSearch"
															placeholder="All"
															:options="status"
															:showClear="true"
											>
												<template #option="slotProps">
													<span :class="'badge badge-' + slotProps.option">{{slotProps.option}}</span>
												</template>
											</Dropdown>
										</template>
									</Column>

									<!-- Created At Column -->
									<Column field="created_at"
													:header="$t('common.table.created_at')"
													:sortable="true"
													v-if="this.fields.created_at"
									>
										<template #filter>
											<Calendar class="p-column-filter"
																v-model="created_at"
																:dateFormat="`${dateTimeFormat}`"
																selectionMode="range"
																icon="pi pi-calendar"
																@date-select="onSelectCalendar"
																:manualInput="true"/>
										</template>
									</Column>

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
		convertQueryFilterToString, convertQueryObjectFilter,
		convertToDateRangeCalendar,
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
				loading: false,
				filters: { ...this.$route.query },
				status: StatusCommon,
				dateTimeFormat: 'yy/mm/dd',
				fields: this.pageModel.fields(),
				columns: this.pageModel.columns,
				displayDialog: false,
				selectedId: null,
				// define data for calendar
				created_at: convertToDateRangeCalendar(this.$route.query.created_at),
			}
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
			Button,
		},

		props: {
			pageName: String,
			pageModel: null,
			pageService: null,
		},

		computed: {
			page: {
				get () {
					const { page, perPage } = this.$route.query
					return ((parseInt(page) === 0 ? 1 : parseInt(page)) - 1) * parseInt(perPage)
				},

				set (value) {
					return value
				},
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
		},

		methods: {
			/**
			 * replace URL every actions in list table
			 * @param params
			 */
			replaceUrl (params) {
				const queries = {
					...convertQueryFilterToString(params),
					...this.filters,
				}

				const queriesMapped = _.transform(queries, (result, value, key) => {
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
					page: (event.page + 1),
				}

				return this.callGetList(params)
			},

			/**
			 * Action for Search
			 */
			onSearch (event) {
				const params = {
					page: 1,
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
					sort: event.sortField,
					direction: event.sortOrder === -1 ? 'desc' : 'asc',
				}

				return this.callGetList(params)
			},

			/**
			 * Function will filter by date
			 */
			onSelectCalendar (value) {
				const date = moment(value).format('YYYY-MM-DD')

				if (!this.created_at[1]) {
					this.filters.created_at = { from: date }
				} else {
					this.filters.created_at = { ...this.filters.created_at, to: date }

					// call api
					return this.callGetList({ page: 1 })
				}
			},

			/**
			 * Call Api list of admin
			 * @param params
			 */
			async callGetList (params) {
				this.loading = true

				const queries = {
					...convertQueryObjectFilter(this.filters, IROOTQUERY),
					...params,
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
						life: 3000,
					})

					// call back api
					// this.callGetList({ page: 1 })

				}).catch((err) => {
					this.$toast.add({
						severity: this.$t('common.alert.message_error'),
						summary: this.$t('common.alert.delete_message_successfully'),
					})
				})
			},

		},
	}
</script>
