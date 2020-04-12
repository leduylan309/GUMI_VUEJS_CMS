<template>
	<PostForm :title="$t('post.create_a_post')"
						:item.sync="item"
						:listName="'PostList'"
						:categories="categories"
						:prefectures="prefectures"
						:companies="companies"
	/>
</template>

<script lang="js">
	import PostForm from '../../components/post/PostForm'
	import { CategoryService, CompanyService, PrefectureService } from '../../../api'
	import PostModel from '../../../models/post.model'
	import CategoryModel from '../../../models/category.model'
	import PrefectureModel from '../../../models/prefecture.model'
	import CompanyModel from '../../../models/company.model'
	import DeliveryTargetModel from '../../../models/delivery_target.model'

	export default {
		name: 'PostAdd',

		components: {
			PostForm,
		},

		data () {
			return {
				item: {
					...new PostModel(),
					delivery_target: new DeliveryTargetModel()
				},
			}
		},

		async beforeRouteEnter (to, from, next) {
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

			// return Promise.all([
			// 	CategoryService.list(),
			// ]).then(() => {
			// 	next()
			// })
		},

		computed: {
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

<style scoped>

</style>