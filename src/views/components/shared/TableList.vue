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

									<!-- Username Column -->
									<Column field="username"
													:header="$t('common.table.username')"
													:sortable="true"
													v-if="this.fields.username"
									>
										<template #filter>
											<input type="text"
														 @keyup.enter="onSearch"
														 v-model="filters.username"
														 class="form-control"/>
										</template>
									</Column>

									<!-- Name Column -->
									<Column field="name"
													:header="$t('common.table.name')"
													:sortable="true"
													v-if="this.fields.name"
									>
										<template #filter>
											<input type="text"
														 v-model="filters.name"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>

									<!-- Email Column -->
									<Column field="email"
													:header="$t('common.table.email')"
													:sortable="true"
													v-if="this.fields.email"
									>
										<template #filter>
											<input type="text"
														 v-model="filters.email"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>

									<!-- First Name Column -->
									<Column field="first_name"
													:header="$t('common.table.first_name')"
													:sortable="true"
													v-if="this.fields.first_name"
									>
										<template #filter>
											<input type="text"
														 v-model="filters.first_name"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>

									<!-- Last Name Column -->
									<Column field="last_name"
													:header="$t('common.table.last_name')"
													:sortable="true"
													v-if="this.fields.last_name"
									>
										<template #filter>
											<input type="text"
														 v-model="filters.last_name"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>

									<!-- Last Name Column -->
									<Column field="code"
													:header="$t('common.table.code')"
													:sortable="true"
													v-if="this.fields.code"
									>
										<template #filter>
											<input type="text"
														 v-model="filters.code"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>

									<!-- Last Name Column -->
									<Column field="prefecture_id"
													:header="$t('common.table.prefecture')"
													:sortable="true"
													v-if="this.fields.prefecture_id"
									>
										<template #filter>
											<input type="text"
														 v-model="filters.prefecture_id"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>

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
																@click="onEdit(slotProps.data.id)"
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
								<Paginator :rows="paginator.per_page"
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

	export default {
		name: 'TableList',

		components: {
			Column,
			DataTable,
			Paginator,
			Dropdown,
			Calendar,
			ContentHeader,
		},

		data () {
			return {
				loading: false,
				filters: {},
				status: StatusCommon,
				dateTimeFormat: 'yy/mm/dd',
				fields: this.pageModel.fields(),
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
		},
	}
</script>

<style scoped>

</style>