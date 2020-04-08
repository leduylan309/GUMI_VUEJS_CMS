<template>
	<PostForm :title="$t('post.create_a_post')"
						:post.sync="post"
						:listName="'PostList'"
						:categories="categories"/>
</template>

<script lang="js">
	// Dummy
	import categories from '../../../dummy/post_categories'

	import PostForm from '../../components/post/PostForm'
	import PostModel from '../../../models/post.model'

	export default {
		name: 'PostAdd',

		components: {
			PostForm,
		},

		data () {
			return {
				post: new PostModel(),
				categories,
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},
	}
</script>

<style scoped>

</style>