<template>
	<div class="p-card">
		<div class="p-card-body" style="padding:0">
			<DataTable
							class="p-datatable-responsive p-table-standard"
							:value="list"
							:rows="paginator.perPage"
							:first.sync="page"
							:loading="loading"
							:resizableColumns="true"
							:rowHover="true"
							:autoLayout="true"
							@sort="onSort"
			>
				<template #header>
					{{ $t(`${pageName}.title_list_page`) }}

					<router-link class="p-button p-button-success" :to="`${pageName}/register`">
						<i class="pi pi-user-plus"/>

						{{ $t('common.add_new') }}
					</router-link>

					<div class="p-datatable-globalfilter-container">
						<InputText v-model="filters.global" :placeholder="$t('common.global_search')"/>
					</div>
				</template>
				<Column field="name" header="name" :sortable="true">
					<template #filter>
						<InputText
										type="text"
										v-model="filters.name"
										class="p-column-filter"
										@keyup.enter="onSearch"
						/>
					</template>
				</Column>
				<Column field="email" header="email" :sortable="true">
					<template #filter>
						<InputText
										type="text"
										@keyup.enter="onSearch"
										v-model="filters.email"
										class="p-column-filter"
						/>
					</template>
				</Column>
				<Column field="status" header="status" :sortable="true" filterMatchMode="equals">
					<template #body="slotProps">
						<span :class="'status-badge status-' + slotProps.data.status">{{slotProps.data.status}}</span>
					</template>

					<template #filter>
						<Dropdown
										v-model="filters.status"
										class="p-column-filter"
										@change="onSearch"
										placeholder="All"
										:options="status"
										:showClear="true"
						>
							<template #option="slotProps">
								<span :class="'status-badge status-' + slotProps.option">{{slotProps.option}}</span>
							</template>
						</Dropdown>
					</template>
				</Column>
				<Column field="created_at" header="Created At" :sortable="true"></Column>
				<Column>
					<template #body="slotProps">
						<Button type="button"
										icon="pi pi-pencil"
										class="p-button-info"
										@click="onEdit(slotProps.data.id)"
						/>
					</template>
				</Column>
			</DataTable>

			<Paginator
							:rows="paginator.perPage"
							:totalRecords="paginator.total"
							:paginator="true"
							:first.sync="page"
							:page="page"
							:rowsPerPageOptions="[15,30,50]"
							@page="onPage($event)"
			/>
		</div>
	</div>
</template>

<script>
	import { convertQueryFilterToString } from '../../../utils/filter'
	import { StatusCommon } from '../../../enum/common.enum'

	// Component
	import InputText from 'primevue/inputtext'
	import Column from 'primevue/column'
	import DataTable from 'primevue/datatable'
	import Paginator from 'primevue/paginator'
	import Button from 'primevue/button'
	import Dropdown from 'primevue/dropdown'

	export default {
		name: 'TableList',

		components: {
			InputText,
			Column,
			DataTable,
			Paginator,
			Button,
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

			onEdit (ID) {
				return this.$router.push(`${ this.pageName }/${ ID }`)
			},

		},
	}
</script>

<style scoped>

</style>