<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	// Component
	import TableList from '../../components/shared/TableList'
	import { CompanyService } from '../../../api'
	import CompanyModel from '../../../models/company.model'
	import TableMixin from '../../../mixins/table.mixin'
	
	export default {
		name: 'CompanyList',

		mixins: [TableMixin],

		components: { TableList },

		data () {
			return {
				pageName: 'company',
				pageModel: CompanyModel,
				pageService: CompanyService,
			}
		},
	}
</script>