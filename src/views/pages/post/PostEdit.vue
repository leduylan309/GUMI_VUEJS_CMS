<template>
	<PostForm :title="$t('post.edit_post')"
						:post.sync="post"
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

		beforeRouteEnter (to, from, next) {
			const postID = to.params.id

			return Promise.all([
				PostService.item(postID),
				CategoryService.list(),
			]).then(() => {
				next()
			})
		},

		computed: {
			post () {
				const postID = this.$route.params.id

				return PostModel.query().find(postID)
			},

			categories () {
				return CategoryModel.all()
			},
		},
	}
</script>