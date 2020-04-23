<template>
	<RoleForm :title="$t('role.edit_role')"
						:item="item"
						:permissions="permissions"
						:list-name="'RoleList'"/>
</template>

<script lang="js">
    import RoleForm from '../../components/role/RoleForm'
		import RoleModel from '../../../models/role.model'
		import { RoleService, PermissionService } from '../../../api'
		import PermissionModel from '../../../models/permission.model'

	export default {
		name: 'RoleEdit',

		components: {
          RoleForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const roleId = to.params.id

			const role = await RoleModel.query().with('permissions').find(roleId)
			if (!role) {
				await RoleService.item(roleId, { include: 'permissions' })
			}

			// call to get companies
			const permissions = PermissionModel.all()
			if (!permissions.length) {
				await PermissionService.all()
			}

			await next()
		},

		computed: {
			item () {
				const roleId = this.$route.params.id

				return RoleModel.query().with('permissions').find(roleId)
			},

			permissions () {
				return PermissionModel.all()
			},
		}
	}
</script>