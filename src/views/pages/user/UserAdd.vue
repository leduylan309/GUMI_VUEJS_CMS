<template>
	<UserForm :title="$t('user.create_an_user')"
						:item="item"/>
</template>

<script lang="js">
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'
	import UserForm from '../../components/user/UserForm'

	// Prime
	import InputText from 'primevue/inputtext'
	import InputSwitch from 'primevue/inputswitch'
	import Password from 'primevue/password'

  export default {
    name: 'UserAdd',

		components: {
			UserForm,
			ContentHeader,
			InputText,
			InputSwitch,
			Password,
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