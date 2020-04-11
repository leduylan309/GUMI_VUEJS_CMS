<template>
	<AdminForm :title="$t('admin.edit_admin')"
						 :item="item"
						 :list-name="'AdminList'"/>
</template>

<script lang="js">
	// Components
	import AdminForm from '../../components/admin/AdminForm'
	import { AdminService } from '../../../api'
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
			const admin = await AdminModel.query().find(adminID)

			// call api
			if (!admin) {
				await AdminService.item(adminID)
			}

			next()
		},

		computed: {
			item () {
				const adminID = this.$route.params.id

				return AdminModel.query().find(adminID)
			},
		},

	}
</script>

<style scoped>

</style>