<template>
	<div class="content-section">
		<div class="content-wrapper">
			<!-- Header Table -->
			<ContentHeader :title="title"/>

			<!-- Content Table -->
			<div class="content">
				<ValidationObserver v-slot="{ handleSubmit }">
					<form class="form-horizontal"  @submit.prevent="handleSubmit(onSubmit)">
						<div class="card">
							<div class="card-body">
								<!-- Code -->
								<ValidationProvider
									:name="$t('common.text.company_code')"
									rules="required"
									class="form-group row"
									v-slot="{ errors }"
									v-if="fields.company_code">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.company_code') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.company_code"
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
								<div class="form-group row">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.table.image') }}
									</label>

									<div class="col-sm-10">
										<FileUpload mode="basic"
																:name="item.image"
																v-model="item.image"
																:previewWidth="100"
																@upload="onUploadImage"
																accept="image/*"
																:maxFileSize="1000000"
																:chooseLabel="$t('common.text.select_image')"
										/>
									</div>
								</div>
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
			<ContactForm :title="$t('contact.create_a_contact')" :item="item.contact" />
		</div>
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'
	import FormMixin from '../../../mixins/form.mixin'
	import CompanyModel from '../../../models/company.model'
	import ContactForm from '../shared/ContactForm'

	// Prime
	import InputText from 'primevue/inputtext'
	import FileUpload from 'primevue/fileupload'
	import { CompanyService } from '../../../api'

	export default {
		name: 'CompanyForm',

		mixins: [FormMixin],

		components: {
			ContactForm,
			ContentHeader,
			InputText,
			FileUpload,
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: CompanyService,
				fields: CompanyModel.fields()
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