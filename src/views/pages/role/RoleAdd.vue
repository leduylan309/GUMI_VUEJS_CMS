<template>
	<RoleForm :title="$t('role.create_a_role')"
						:item="item"/>
</template>

<script lang="js">
	import RoleForm from '../../components/role/RoleForm'

	export default {
		name: 'RoleAdd',

		components: {
			RoleForm,
		},

		data () {
			return {
				item: {}
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},
	}
</script>

<style scoped>

</style>