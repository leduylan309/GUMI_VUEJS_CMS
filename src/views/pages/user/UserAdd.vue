<template>
	<UserForm :title="$t('user.create_an_user')"
						:list-name="'UserList'"
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
	import UserModel from '../../../models/user.model'
	import ContactModel from '../../../models/contact.model'

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
				item: {
					...new UserModel(),
					contact: new ContactModel(),
				},
			}
		},
	}
</script>

<style scoped>

</style>