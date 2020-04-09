<template>
	<PostForm :title="$t('post.create_a_post')"
						:item.sync="item"
						:listName="'PostList'"
						:categories="categories"/>
</template>

<script lang="js">
	import PostForm from '../../components/post/PostForm'
	import PostModel from '../../../models/post.model'
	import { CategoryService, PostService } from '../../../api'
	import CategoryModel from '../../../models/category.model'

	export default {
		name: 'PostAdd',

		components: {
			PostForm,
		},

		data () {
			return {
				item: new PostModel(),
			}
		},

		beforeRouteEnter (to, from, next) {
			return Promise.all([
				CategoryService.list(),
			]).then(() => {
				next()
			})
		},

		computed: {
			categories () {
				return CategoryModel.all()
			},
		},
	}
</script>

<style scoped>

</style>