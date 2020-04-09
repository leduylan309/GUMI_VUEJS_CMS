<template>
	<CategoryForm :title="$t('category.create_a_category')"
						:item.sync="item"
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
				item: new CategoryModel(),
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},
	}
</script>

<style scoped>

</style>