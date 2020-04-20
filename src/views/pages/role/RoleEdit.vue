<template>
	<RoleForm :title="$t('role.edit_role')"
						:item="item" />
</template>

<script lang="js">
    import RoleForm from '../../components/role/RoleForm'
		import RoleModel from '../../../models/role.model'
		import { AdminService, RoleService } from '../../../api'
		import AdminModel from '../../../models/admin.model'

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

			const role = await RoleModel.query().find(roleId)
			if (!role) {
				await RoleService.item(roleId)
			}

			await next()
		},

		computed: {
			item () {
				const roleId = this.$route.params.id

				return RoleModel.query().find(roleId)
			},
		},
	}
</script>