<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	import TableList from '../../components/shared/TableList'
	import TableMixin from '../../../mixins/table.mixin'
	import { AdminService } from '../../../api'
	import AdminModel from '../../../models/admin.model'

	export default {
		name: 'AdminList',
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