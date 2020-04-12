<template>
	<PrefectureForm :title="$t('prefecture.create_a_prefecture')"
									:list-name="'PrefectureList'"
									:item="item"/>
</template>

<script lang="js">
	// Components
	import PrefectureModel from '../../../models/prefecture.model'
	import ContactModel from '../../../models/contact.model'
	import PrefectureForm from '../../components/prefecture/PrefectureForm'

	export default {
		name: 'PrefectureAdd',

		components: {
			PrefectureForm
		},

		data () {
			return {
				item: {
					...new PrefectureModel(),
					contact: new ContactModel(),
				},
			}
		},
	}
</script>

<style scoped>

</style>