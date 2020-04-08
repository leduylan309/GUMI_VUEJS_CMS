<template>
	<PostForm :title="$t('post.edit_post')"
						:post.sync="post"
						:listName="'PostList'"
						:categories="categories"/>
</template>

<script lang="js">
	// Dummy
	import categories from '../../../dummy/post_categories'

	import PostForm from '../../components/post/PostForm'
	import { PostService } from '../../../api'
	import PostModel from '../../../models/post.model'

	export default {
		name: 'PostEdit',

		components: {
			PostForm,
		},

		data () {
			return {
				categories,
			}
		},

		beforeRouteEnter (to, from, next) {
			const postID = to.params.id

			PostService.item(postID).then(() => {
				next()
			})
		},

		computed: {
			post () {
				const postID = this.$route.params.id

				return PostModel.query().find(postID)
			},
		},
	}
</script>