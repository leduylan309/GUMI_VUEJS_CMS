<template>
	<AdminForm :title="$t('admin.edit_admin')"
						 :item="item"
						 :list-name="'AdminList'"/>
</template>

<script lang="js">
	// Components
	import AdminForm from '../../components/admin/AdminForm'
	import { AdminService, RoleService } from '../../../api'
	import AdminModel from '../../../models/admin.model'
	import RoleModel from '../../../models/role.model'

	export default {
		name: 'AdminEdit',

		components: {
			AdminForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const adminID = to.params.id

			const roles = await RoleModel.query().all()
			if (!roles.length) {
				await RoleService.list()
			}

			const admin = await AdminModel.query().with('roles').find(adminID)
			if (!admin) {
				await AdminService.item(adminID, { include: 'roles' })
			}

			await next()
		},

		computed: {
			item () {
				const adminID = this.$route.params.id

				return AdminModel.query().with('roles').find(adminID)
			},
		},

	}
</script>

<style scoped>

</style>