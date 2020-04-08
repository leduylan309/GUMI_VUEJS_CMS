<template>
	<CategoryForm :title="$t('category.create_a_category')"
						:category.sync="category"
						:listName="'CategoryList'"/>
</template>

<script lang="js">
	import CategoryForm from '../../components/category/CategoryForm'
	import CategoryModel from '../../../models/category.model'

	export default {
		name: 'CategoryAdd',

		components: {
			CategoryForm,
		},

		data () {
			return {
				category: new CategoryModel(),
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},
	}
</script>

<style scoped>

</style>