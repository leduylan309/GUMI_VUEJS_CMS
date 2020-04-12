<template>
	<PrefectureForm :title="$t('prefecture.edit_prefecture')"
									:list-name="'PrefectureList'"
									:item="item"/>
</template>

<script lang="js">
	// Components
	import { PrefectureService } from '../../../api'
	import PrefectureModel from '../../../models/prefecture.model'
	import PrefectureForm from '../../components/prefecture/PrefectureForm'

	export default {
		name: 'PrefectureEdit',

		components: {
			PrefectureForm,
		},

		data () {
			return {}
		},

		async beforeRouteEnter (to, from, next) {
			const prefectureID = to.params.id
			const prefecture = await PrefectureModel.query().find(prefectureID)

			// call api
			if (!prefecture) {
				await PrefectureService.item(prefectureID)
			}

			next()
		},

		computed: {
			item () {
				const prefectureID = this.$route.params.id

				return PrefectureModel.query().find(prefectureID)
			},
		},
	}
</script>