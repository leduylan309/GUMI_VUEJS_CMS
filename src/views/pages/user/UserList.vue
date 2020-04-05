<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	import TableList from '../../components/shared/TableList'
	import TableMixin from '../../../mixins/table.mixin'
	import { UserService } from '../../../api'
	import UserModel from '../../../models/user.model'

	export default {
		name: 'UserList',
		mixins: [TableMixin],
		components: { TableList },
		data () {
			return {
				pageName: 'user',
				pageModel: UserModel,
				pageService: UserService,
			}
		},
	}
</script>