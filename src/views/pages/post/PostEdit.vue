<template>
	<PostForm :title="$t('post.edit_post')"
						:item.sync="item"
						:listName="'PostList'"
						:categories="categories"/>
</template>

<script lang="js">
	import PostForm from '../../components/post/PostForm'
	import { CategoryService, PostService } from '../../../api'
	import PostModel from '../../../models/post.model'
	import CategoryModel from '../../../models/category.model'

	export default {
		name: 'PostEdit',

		components: {
			PostForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const postID = to.params.id
			const post = await PostModel.query().find(postID)

			// call to get categories
			await CategoryService.list()

			// call api
			if (!post) {
				await PostService.item(postID)
			}

			next()
		},

		computed: {
			item () {
				const postID = this.$route.params.id

				return PostModel.query().find(postID)
			},

			categories () {
				return CategoryModel.all()
			},
		},
	}
</script>