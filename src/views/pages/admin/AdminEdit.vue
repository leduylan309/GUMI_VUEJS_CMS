<template>
	<AdminForm :title="$t('admin.edit_admin')"
						 :item="item"
						 :list-name="'AdminList'"/>
</template>

<script lang="js">
	// Components
	import AdminForm from '../../components/admin/AdminForm'
	import {AdminService, RoleService} from '../../../api'
	import AdminModel from '../../../models/admin.model'

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
			const admin = await AdminModel.query().with('roles').find(adminID)
			// call api
			if (!admin) {
				await Promise.all([
					AdminService.item(adminID, {include: 'roles'}),
					RoleService.list()
				])
			}

			next()
		},

		computed: {
			item () {
				const adminID = this.$route.params.id

				const data = AdminModel.query().with('roles').find(adminID)

				// transform role data
				data.roles = data.roles.map((value) => value.name)

				return data
			},
		},

	}
</script>

<style scoped>

</style>