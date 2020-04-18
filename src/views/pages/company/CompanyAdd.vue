<template>
	<CompanyForm :title="$t('company.create_a_company')"
							 :item="item"
							 :listName="'CompanyList'"/>
</template>

<script lang="js">
	import CompanyForm from '../../components/company/CompanyForm'

	export default {
		name: 'CompanyAdd',

		components: {
			CompanyForm,
		},

		data () {
			return {
				item: {
					contact: {},
				},
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},
	}
</script>

<style scoped>

</style>