<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="$t(`${pageName}.title_list_page`)" :page-name="`${pageName}`"/>

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
									<Column field="title"
													:header="$t('common.table.title')"
													:sortable="true"
													v-if="this.fields.title"
									>
										<template #filter>
											<input type="text"
														 v-model="filters.title"
														 class="form-control"
														 @keyup.enter="onSearch"/>
										</template>
									</Column>
									<Column field="image"
													:header="$t('common.table.image')"
													:sortable="true"
													v-if="this.fields.image"
									>
										<template #body="slotProps">
											<img :src="slotProps.data.image" class="img-thumbnail img-size-64">
										</template>
									</Column>
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
								<Paginator
												:rows="paginator.per_page"
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

<script lang="js">
	// Helper
	import { StatusCommon } from '../../../enum/common.enum'
	import TableMixin from '../../../mixins/table.mixin'

	// Post Component
	import PostModel from '../../../models/post.model'
	import { PostService } from '../../../api'
	import ContentHeader from '../../components/shared/ContentHeader'

	// Prime
	import Column from 'primevue/column'
	import DataTable from 'primevue/datatable'
	import Paginator from 'primevue/paginator'
	import Dropdown from 'primevue/dropdown'
	import Calendar from 'primevue/calendar'

	export default {
		name: 'PostList',

		mixins: [TableMixin],

		components: {
			Column,
			DataTable,
			Paginator,
			Dropdown,
			ContentHeader,
			Calendar,
		},

		data () {
			return {
				dateTimeFormat: 'yy/mm/dd',

				loading: false,
				filters: {},
				status: StatusCommon,
				fields: PostModel.fields(),

				// Page Define
				pageName: 'post',
				pageModel: PostModel,
				pageService: PostService,
			}
		},
	}
</script>