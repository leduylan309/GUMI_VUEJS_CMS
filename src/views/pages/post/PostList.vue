<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	import TableMixin from '../../../mixins/table.mixin'
	import PostModel from '../../../models/post.model'
	import { PostService } from '../../../api'
	import TableList from '../../components/shared/TableList'

	export default {
		name: 'PostList',

		mixins: [TableMixin],

		components: {
			TableList
		},

		data () {
			return {
				pageName: 'post',
				pageModel: PostModel,
				pageService: PostService,
			}
		},
	}
</script>