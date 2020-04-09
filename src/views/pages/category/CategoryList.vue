<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	import TableMixin from '../../../mixins/table.mixin'
	import CategoryModel from '../../../models/category.model'
	import { CategoryService } from '../../../api'
	import TableList from '../../components/shared/TableList'

	export default {
		name: 'CategoryList',

		mixins: [TableMixin],

		components: {
			TableList,
		},

		data () {
			return {
				// Page Define
				pageName: 'category',
				pageModel: CategoryModel,
				pageService: CategoryService,
			}
		},
	}
</script>