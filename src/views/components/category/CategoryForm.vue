<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="title"/>

		<!-- Content Table -->
		<div class="content">
			<div class="card">
				<div class="card-body">
					<form class="form-horizontal">
						<!-- Display Name -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.table.display_name') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.display_name"
													 :placeholder="$t('common.table.display_name')"
								/>
							</div>
						</div>

						<!-- Display Order -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.table.order') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 type="number"
													 v-model="item.display_order"
													 :placeholder="$t('common.table.display_order')"
								/>
							</div>
						</div>
					</form>
				</div>

				<!-- Action Section Submit & Cancel -->
				<div class="card-footer fixed-bottom">
					<button type="button"
									class="btn btn-default float-right"
									@click="onCancel">
						<i class="pi pi-times"/>

						<span>{{ $t('common.button.cancel') }}</span>
					</button>

					<button type="button"
									class="btn btn-success float-right mr-1"
									@click="onSubmit">
						<i class="pi pi-save"/>

						<span>{{$t('common.button.save')}}</span>
					</button>
				</div>
			</div>
		</div>
		<pre>{{ item }}</pre>
		<pre>{{ title }}</pre>
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'

	// Prime
	import InputText from 'primevue/inputtext'
	import { CategoryService } from '../../../api'
	import FormMixin from '../../../mixins/form.mixin'

	export default {
		name: 'CategoryForm',

		mixins: [FormMixin],

		components: {
			ContentHeader,
			InputText,
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: CategoryService,
			}
		},

		methods: {
			/**
			 * Action upload Photo
			 */
			onUploadImage () {

			},
		},
	}
</script>

<style scoped>

</style>