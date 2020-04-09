<template>
	<RoleForm :title="$t('role.edit_role')"
						:item="item" />
</template>

<script lang="js">
    import RoleForm from '../../components/role/RoleForm'

	export default {
		name: 'RoleEdit',

		components: {
          RoleForm,
		},

		data () {
			return {
				item: {},
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},
	}
</script>