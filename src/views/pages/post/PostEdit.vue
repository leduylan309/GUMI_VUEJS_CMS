<template>
	<PostForm :title="$t('post.edit_post')"
						:item.sync="item"
						:listName="'PostList'"
						:categories="categories"
						:prefectures="prefectures"
						:companies="companies"
	/>
</template>

<script lang="js">
	import PostForm from '../../components/post/PostForm'
	import { CategoryService, CompanyService, PostService, PrefectureService } from '../../../api'
	import PostModel from '../../../models/post.model'
	import CategoryModel from '../../../models/category.model'
	import PrefectureModel from '../../../models/prefecture.model'
	import CompanyModel from '../../../models/company.model'

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
			const post = await PostModel.query().with('delivery_target,assets').find(postID)

			// call get post item
			if (!post) {
				await PostService.item(postID, { include: 'delivery_target,assets' })
			}

			// call to get prefectures
			const prefectures = PrefectureModel.all()
			if (!prefectures.length) {
				await PrefectureService.all()
			}

			// call to get categories
			const categories = CategoryModel.all()
			if (!categories.length) {
				await CategoryService.all()
			}

			// call to get companies
			const companies = CompanyModel.all()
			if (!companies.length) {
				await CompanyService.all()
			}

			await next()
		},

		computed: {
			item () {
				const postID = this.$route.params.id

				return PostModel.query().with('delivery_target,assets').find(postID)
			},

			categories () {
				return CategoryModel.all()
			},

			prefectures () {
				return PrefectureModel.all()
			},

			companies () {
				return CompanyModel.all()
			},
		},
	}
</script>