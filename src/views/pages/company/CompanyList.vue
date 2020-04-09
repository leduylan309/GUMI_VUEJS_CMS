<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	// Helper
	import { convertQueryFilterToString, convertQueryObjectFilter } from '../../../utils/filter'
	import { IROOTQUERY } from '../../../shared/store/state'

	// Component
	import TableList from '../../components/shared/TableList'
	import { CompanyService } from '../../../api'
	import CompanyModel from '../../../models/company.model'
	
	export default {
		name: 'CompanyList',

		components: { TableList },

		beforeRouteEnter (to, from, next) {
			next((vm) => {
				// map with route current url
				const queries = convertQueryObjectFilter(to.query, IROOTQUERY)

				Promise.all([
					vm.pageService.list(queries),
				]).then(() => {
					const defaultQuery = {
						...convertQueryFilterToString(queries),
						...queries.filters,
					}

					vm.$router.replace({ query: defaultQuery }).catch(() => {})
					vm.filters = queries.filters
				})
			})
		},

		data () {
			return {
				pageName: 'company',
				pageModel: CompanyModel,
				pageService: CompanyService,
			}
		},
	}
</script>