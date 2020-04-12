<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	import TableList from '../../components/shared/TableList'
	import TableMixin from '../../../mixins/table.mixin'
	import { PrefectureService } from '../../../api'
	import PrefectureModel from '../../../models/prefecture.model'

	export default {
		name: 'PrefectureList',
		mixins: [TableMixin],
		components: { TableList },
		data () {
			return {
				pageName: 'prefecture',
				pageModel: PrefectureModel,
				pageService: PrefectureService,
			}
		},
	}
</script>