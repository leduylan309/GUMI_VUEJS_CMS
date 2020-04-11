<template>
	<AdminForm :title="$t('admin.create_an_admin')"
						 :item="item"
						 :list-name="'AdminList'"/>
</template>

<script lang="js">
	// Components
	import AdminForm from '../../components/admin/AdminForm'
	import AdminModel from '../../../models/admin.model'

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

	}
</script>

<style scoped>

</style>