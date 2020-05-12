<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	// Component
	import TableList from '../../components/shared/TableList'
	import { RoleService } from '../../../api'
	import RoleModel from '../../../models/role.model'
	import TableMixin from '../../../mixins/table.mixin'

	export default {
		name: 'RoleList',
		mixins: [TableMixin],
		components: { TableList },

		data () {
			return {
				pageName: 'role',
				pageModel: RoleModel,
				pageService: RoleService,
			}
		},
	}
</script>