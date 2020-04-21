<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="title"/>

		<!-- Content Table -->
		<div class="content">
			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="form-horizontal" @submit.prevent="handleSubmit(onSubmit)">
					<div class="card">
						<div class="card-body">
							<form class="form-horizontal">
								<!-- Name -->
								<ValidationProvider
												:name="$t('common.text.name')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.name">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.name') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.name"
															 :placeholder="$t('common.text.name')"
															 :class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Display name -->
								<ValidationProvider
												:name="$t('common.text.display_name')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.display_name">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.display_name') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.display_name"
															 :placeholder="$t('common.text.display_name')"
															 :class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

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
										<!--need to update-->
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
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'
	import { RoleService } from '../../../api'
	import RoleModel from '../../../models/role.model'

	// Prime
	import InputText from 'primevue/inputtext'
	import Checkbox from 'primevue/checkbox'

	export default {
		name: 'RoleForm',

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
			permissions: {
				type: Array,
				default: () => [],
			},
		},

		components: {
			ContentHeader,
			InputText,
			Checkbox,
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: RoleService,
				FormModel: RoleModel,

				fields: RoleModel.fields()
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