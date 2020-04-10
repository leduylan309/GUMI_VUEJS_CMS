<template>
	<TableList :page-name="pageName"
						 :page-model="pageModel"
						 :page-service="pageService"
	/>
</template>

<script lang="js">
	// Component
	import TableList from '../../components/shared/TableList'
	import { ContactService } from '../../../api'
	import ContactModel from '../../../models/contact.model'
	import TableMixin from '../../../mixins/table.mixin'
	
	export default {
		name: 'ContactList',

		mixins: [TableMixin],

		components: { TableList },

		data () {
			return {
				pageName: 'contact',
				pageModel: ContactModel,
				pageService: ContactService,
			}
		},
	}
</script>