<template>
	<AdminForm :title="$t('admin.create_an_admin')"
						 :item="item"/>
</template>

<script lang="js">
	// Components
	import AdminForm from '../../components/admin/AdminForm'

	export default {
		name: 'AdminAdd',

		components: {
			AdminForm,
		},

		data () {
			return {
				item: {},
			}
		},

	}
</script>

<style scoped>

</style>