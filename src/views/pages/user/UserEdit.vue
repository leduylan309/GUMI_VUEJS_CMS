<template>
	<UserForm :title="$t('user.edit_user')"
						:item="item"/>
</template>

<script lang="js">
	// Components
	import UserForm from '../../components/user/UserForm'
	import { UserService } from '../../../api'
	import UserModel from '../../../models/user.model'

	export default {
		name: 'UserEdit',

		components: {
			UserForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const userID = to.params.id
			const user = await UserModel.query().with('contact').find(userID)

			// call api
			if (!user) {
				await UserService.item(userID, { include: 'contact' })
			}

			next()
		},

		computed: {
			item () {
				const userID = this.$route.params.id

				return UserModel.query().with('contact').find(userID)
			}
		}
	}
</script>