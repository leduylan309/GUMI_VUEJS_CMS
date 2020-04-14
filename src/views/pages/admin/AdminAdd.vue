<template>
	<AdminForm :title="$t('admin.create_an_admin')"
						 :item="item"
						 :list-name="'AdminList'"/>
</template>

<script lang="js">
	// Components
	import AdminForm from '../../components/admin/AdminForm'
	import AdminModel from '../../../models/admin.model'
	import { RoleService } from '../../../api/role.service'
	import RoleModel from '../../../models/role.model'

	export default {
		name: 'AdminAdd',

		components: {
			AdminForm,
		},

		data () {
			return {
				item: new AdminModel(),
			}
		},

		async beforeRouteEnter (to, from, next) {
			const roles = await RoleModel.query().all()
			if (!roles.length) {
				await RoleService.list()
			}

			await next()
		},
	}
</script>

<style scoped>

</style>