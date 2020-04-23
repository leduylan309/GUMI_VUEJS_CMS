<template>
	<RoleForm :title="$t('role.create_a_role')"
						:item="item"
						:permissions="permissions"
						:list-name="'RoleList'"/>
</template>

<script lang="js">
	import RoleForm from '../../components/role/RoleForm'
	import RoleModel from '../../../models/role.model'
	import PermissionModel from '../../../models/permission.model'
	import { PermissionService } from '../../../api'

	export default {
		name: 'RoleAdd',

		components: {
			RoleForm,
		},

		data () {
			return {
				item: new RoleModel()
			}
		},

		async beforeRouteEnter (to, from, next) {
			const permissions = await PermissionModel.all()
			if (!permissions.length) {
				await PermissionService.all()
			}

			await next()
		},

		computed: {
			permissions () {
				return PermissionModel.all()
			},
		}
	}
</script>

<style scoped>

</style>