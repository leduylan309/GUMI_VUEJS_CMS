<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script>
	import TableList from '../components/shared/TableList'
	import TableMixin from '../../mixins/table.mixin'
	import { AdminService } from '../../api'
	import AdminModel from '../../models/admin.model'

	export default {
		name: 'Admin',
		mixins: [TableMixin],
		components: { TableList },
		data () {
			return {
				pageName: 'admin',
				pageModel: AdminModel,
				pageService: AdminService,
			}
		},
	}
</script>