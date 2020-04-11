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
																v-model="filters.created_at"
																:dateFormat="`${dateTimeFormat}`"
																selectionMode="range"
																icon="pi pi-calendar"
																@date-select="onSelectCalendar"
																:manualInput="false"/>
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
		<Dialog header="Delete confirmation" :visible.sync="displayDialog" :style="{width: '50vw'}">
			Are you sure to delete this item ?
			<template #footer>
				<Button label="Yes" icon="pi pi-check" @click="handleDelete"/>
				<Button label="No" icon="pi pi-times" @click="displayDialog = false" class="p-button-secondary"/>
			</template>
		</Dialog>
		<Toast></Toast>
	</div>
</template>

<script>
	import { StatusCommon } from '../../../enum/common.enum'
	import ContentHeader from '../../components/shared/ContentHeader'
	import { convertQueryFilterToString } from '../../../utils/filter'

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

		data () {
			return {
				loading: false,
				filters: {},
				status: StatusCommon,
				dateTimeFormat: 'yy/mm/dd',
				fields: this.pageModel.fields(),
				columns: this.pageModel.columns,
				displayDialog: false,
				selectedId: null,
			}
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
			 * @param inputParams
			 */
			setQueries (inputParams) {
				const params = {
					..._.cloneDeep(this.$route.query),
					...inputParams,
				}
				// replace url every actions
				this.replaceUrl(params)

				return params
			},

			/**
			 * replace URL every actions in list table
			 * @param params
			 */
			replaceUrl (params) {
				const queries = {
					...convertQueryFilterToString(params),
					...this.filters,
				}

				this.$router.replace({ query: queries }).catch(() => {})
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

			},

			/**
			 * Call Api list of admin
			 * @param params
			 */
			async callGetList (params) {
				this.loading = true

				const queries = this.setQueries({
					...params,
					filters: this.filters,
				})

				return this.pageService.list(queries).then(() => {
					this.loading = false
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
					this.selectedId = null
					this.displayDialog = false
					this.$toast.add({ severity: 'success', summary: 'Delete successfully', life: 3000 })
					this.callGetList({ page: 1 })
				}).catch((err) => console.log(err))
			},

		},
	}
</script>

<style scoped>

</style>