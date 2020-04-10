<template>
	<ContactForm :title="$t('contact.create_a_contact')"
							 :item="item"/>
</template>

<script lang="js">
	import ContactForm from '../../components/contact/ContactForm'

	export default {
		name: 'ContactAdd',

		components: {
			ContactForm,
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

<style scoped>

</style>