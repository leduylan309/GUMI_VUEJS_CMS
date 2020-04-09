<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="title"/>

		<!-- Content Table -->
		<div class="content">
			<div class="card">
				<div class="card-body">
					<form class="form-horizontal">
						<!-- Name -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.name') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.name"
													 :placeholder="$t('common.text.name')"
								/>
							</div>
						</div>

						<!-- Display name -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.display_name') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.display_name"
													 :placeholder="$t('common.text.display_name')"
								/>
							</div>
						</div>

						<!-- Description -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.description') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.description"
													 :placeholder="$t('common.text.description')"
								/>
							</div>
						</div>

						<!-- Permission -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.permission') }}
							</label>

							<div class="col-sm-10">
								<template v-for="permission in permissions">
									<div class="col-sm-12">
										<Checkbox :id="permission"
															:inputId="permission"
															name="permission"
															:value="permission"
															v-model="item.permission"
										/>

										<label :for="permission" class="p-checkbox-label">{{ permission }}</label>
									</div>
								</template>
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
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'

	// Prime
	import InputText from 'primevue/inputtext'
	import Checkbox from 'primevue/checkbox'

	export default {
		name: 'CompanyForm',

		props: {
			title: {
				type: String,
				require: true,
				default: () => 'Form',
			},
			item: {
				type: Object,
				default: () => {},
			},
		},

		components: {
			ContentHeader,
			InputText,
			Checkbox,
		},

		data () {
			return {
				permissions: ['view', 'create', 'edit', 'delete'],
			}
		},

		methods: {
			/**
			 * Action upload Photo
			 */
			onUploadImage () {

			},

			/**
			 * Submit Action
			 */
			onSubmit () {
				console.log(this.item)
			},

			/**
			 * back to previous page
			 */
			onCancel () {
				return this.$router.back()
			},
		},
	}
</script>

<style scoped>

</style>