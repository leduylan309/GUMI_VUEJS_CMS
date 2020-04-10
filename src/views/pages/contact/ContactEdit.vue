<template>
	<ContactForm :title="$t('contact.edit_contact')"
							 :item="item"
							 :listName="'ContactList'"/>
</template>

<script lang="js">
	import ContactForm from '../../components/contact/ContactForm'
	import ContactModel from '../../../models/contact.model'
	import { ContactService } from '../../../api'

	export default {
		name: 'ContactEdit',

		components: {
			ContactForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const contactID = to.params.id
			const contact = ContactModel.query().find(contactID)

			if (!contact) {
				await ContactService.item(contactID)
			}

			next()
		},

		computed: {
			item () {
				const contactID = this.$route.params.id

				return ContactModel.query().find(contactID)
			},
		},
	}
</script>