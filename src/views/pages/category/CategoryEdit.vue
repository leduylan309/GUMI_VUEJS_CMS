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

		beforeRouteEnter (to, from, next) {
			const categoryID = to.params.id

			CategoryService.item(categoryID).then(() => {
				next()
			})
		},

		computed: {
			category () {
				const categoryID = this.$route.params.id

				return CategoryModel.query().find(categoryID)
			},
		},
	}
</script>