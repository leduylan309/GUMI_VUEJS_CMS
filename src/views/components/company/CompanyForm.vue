<template>
	<div class="content-section">
		<div class="content-wrapper">
			<!-- Header Table -->
			<ContentHeader :title="title"/>

			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="form-horizontal" @submit.prevent="handleSubmit(onSubmit)">

					<!-- Content Table -->
					<div class="content">
						<div class="card">
							<div class="card-body">
								<!-- Code -->
								<ValidationProvider
												:name="$t('common.text.company_code')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.code">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.company_code') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.code"
															 :placeholder="$t('common.text.company_code')"
															 :class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!--Name -->
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

								<!-- Image -->
								<ImageUpload v-model="item.assets"></ImageUpload>
							</div>

							<!-- Action Section Submit & Cancel -->
							<div class="card-footer fixed-bottom">
								<button type="button"
												class="btn btn-default float-right"
												@click="onCancel">
									<i class="pi pi-times"/>

									<span>{{ $t('common.button.cancel') }}</span>
								</button>

								<template v-if="$route.params.id">
									<button type="button"
													class="btn btn-danger float-right"
													@click="displayDialog = true">
										<i class="pi pi-trash"/>

										<span>{{ $t('common.button.delete') }}</span>
									</button>
								</template>

								<button type="submit"
												class="btn btn-success float-right mr-1">
									<i class="pi pi-save"/>

									<span>{{$t('common.button.save')}}</span>
								</button>
							</div>
						</div>
					</div>

					<ContactForm :title="$t('contact.create_a_contact')" :item="item.contact"/>

				</form>
			</ValidationObserver>
		</div>

		<!-- Delete confirmation dialog -->
		<Dialog v-if="$route.params.id"
						:header="$t('common.alert.delete_header')"
						:visible.sync="displayDialog"
						:style="{width: '50vw'}"
						:modal="true">
			{{ $t('common.alert.delete_content') }}

			<template #footer>
				<Button :label="$t('common.yes')" icon="pi pi-check" @click="onDelete($route.params.id)"/>
				<Button :label="$t('common.no')" icon="pi pi-times" @click="displayDialog = false" class="p-button-secondary"/>
			</template>
		</Dialog>

		<!-- Success / Error message -->
		<Toast></Toast>
	</div>
</template>

<script>
	// Components
	import FormMixin from '../../../mixins/form.mixin'
	import CompanyModel from '../../../models/company.model'
	import ContactForm from '../shared/ContactForm'
	import ImageUpload from '../shared/ImageUpload'

	// Service
	import { CompanyService } from '../../../api'

	export default {
		name: 'CompanyForm',

		mixins: [FormMixin],

		components: {
			ContactForm,
			ImageUpload
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: CompanyService,
				FormModel: CompanyModel,
				fields: CompanyModel.fields(),
			}
		},

		methods: {
			/**
			 * Submit Action
			 */
			async onSubmit () {
				const ID = this.$route.params.id

				this.item.assets = this.item.assets.map((value) => {
					return {
						asset_id: value.id,
						group: 'test'
					}
				})
				if (ID) {
					await this.FormService.update(ID, this.item).then(() => {
						this.onSuccessUpdate()
					})
				} else {
					await this.FormService.create(this.item).then(() => {
						this.onSuccessCreate()
					})
				}
			},
		}
	}
</script>

<style scoped>

</style>