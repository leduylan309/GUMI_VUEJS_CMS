<template>
	<CompanyForm :title="$t('company.create_a_company')"
						:item="item"/>
</template>

<script lang="js">
	import CompanyForm from '../../components/company/CompanyForm'

	export default {
		name: 'PostAdd',

		components: {
          CompanyForm,
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