<template>
	<PostForm :title="$t('post.create_a_post')"
						:item="item"
						:categories="categories"/>
</template>

<script lang="js">
	// Dummy
	import categories from '../../../dummy/post_categories'

	import PostForm from '../../components/post/PostForm'

	export default {
		name: 'PostAdd',

		components: {
			PostForm,
		},

		data () {
			return {
				item: {},
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