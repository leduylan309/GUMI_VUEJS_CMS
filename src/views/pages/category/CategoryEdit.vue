<template>
	<CategoryForm :title="$t('category.edit_category')"
								:category.sync="category"
								:listName="'CategoryList'"
								:categories="categories"/>
</template>

<script lang="js">
	import CategoryForm from '../../components/category/CategoryForm'
	import { CategoryService } from '../../../api'
	import CategoryModel from '../../../models/category.model'

	export default {
		name: 'CategoryEdit',

		components: {
			CategoryForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const categoryID = to.params.id
			const category = await CategoryModel.query().find(categoryID)

			if (!category) {
				await CategoryService.item(categoryID)
			}

			next()
		},

		computed: {
			category () {
				const categoryID = this.$route.params.id

				return CategoryModel.query().find(categoryID)
			},
		},
	}
</script>