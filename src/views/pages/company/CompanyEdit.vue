<template>
	<CompanyForm :title="$t('company.edit_company')"
							 :item="item"
							 :listName="'CompanyList'"/>
</template>

<script lang="js">
	import CompanyForm from '../../components/company/CompanyForm'
	import CompanyModel from '../../../models/company.model'
	import { CompanyService } from '../../../api'

	export default {
		name: 'PostEdit',

		components: {
			CompanyForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const companyID = to.params.id
			const company = CompanyModel.query().find(companyID)

			if (!company) {
				await CompanyService.item(companyID)
			}

			next()
		},

		computed: {
			item () {
				const companyID = this.$route.params.id

				return CompanyModel.query().find(companyID)
			},
		},
	}
</script>