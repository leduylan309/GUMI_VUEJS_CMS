<template>
	<CompanyForm :title="$t('company.edit_company')"
						:item="item" />
</template>

<script lang="js">
    import CompanyForm from '../../components/company/CompanyForm'

	export default {
		name: 'PostEdit',

		components: {
          CompanyForm,
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