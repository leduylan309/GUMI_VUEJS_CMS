<template>
	<div class="content-wrapper">
		<div class="content-header">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-6">
						<h1 class="m-0 text-dark">
							{{ $t(`${pageName}.title_list_page`) }}
						</h1>
					</div>
				</div>
			</div>
		</div>

		<div class="content">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<div class="card-title"></div>

								<div class="card-tools">
									<div class="p-datatable-globalfilter-container">
										<input :placeholder="$t('common.global_search')"
													 class="form-control"
													 v-model="filters.global"/>
									</div>
								</div>
							</div>

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
									<Column field="name" :header="$t('common.table.name')" :sortable="true">
										<template #filter>
											<input type="text"
														 v-model="filters.name"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>
									<Column field="email" :header="$t('common.table.email')" :sortable="true">
										<template #filter>
											<input type="text"
														 @keyup.enter="onSearch"
														 v-model="filters.email"
														 class="form-control"/>
										</template>
									</Column>
									<Column field="status" :header="$t('common.table.email')" :sortable="true" filterMatchMode="equals">
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
									<Column field="created_at" :header="$t('common.table.created_at')" :sortable="true"></Column>
									<Column>
										<template #body="slotProps">
											<div class="btn-group btn-group-toggle">
												<button class="btn btn-sm btn-primary"
																@click="onEdit(slotProps.data.id)">
													<i class="pi pi-pencil"/>

													<span class="d-none d-lg-inline-block">{{ $t('common.button.edit') }}</span>
												</button>

												<button class="btn btn-sm btn-danger"
																@click="onEdit(slotProps.data.id)">
													<i class="pi pi-trash"/>

													<span class="d-none d-lg-inline-block">{{ $t('common.button.delete') }}</span>
												</button>
											</div>
										</template>
									</Column>
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
	</div>
</template>

<script>
	import { convertQueryFilterToString } from '../../../utils/filter'
	import { StatusCommon } from '../../../enum/common.enum'

	// Component
	import Column from 'primevue/column'
	import DataTable from 'primevue/datatable'
	import Paginator from 'primevue/paginator'
	import Dropdown from 'primevue/dropdown'

	export default {
		name: 'TableList',

		components: {
			Column,
			DataTable,
			Paginator,
			Dropdown,
		},

		data () {
			return {
				loading: false,
				filters: {},
				status: StatusCommon,
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