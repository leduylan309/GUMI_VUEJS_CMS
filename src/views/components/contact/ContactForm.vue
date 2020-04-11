<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="title"/>

		<!-- Content Table -->
		<div class="content">
			<div class="card">
				<div class="card-body">
					<form class="form-horizontal">
						<!-- Postal code -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.postal_code') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.postcode"
													 :placeholder="$t('common.text.postal_code')"
								/>
							</div>
						</div>

						<!-- City -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.city') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.city"
													 :placeholder="$t('common.text.city')"
								/>
							</div>
						</div>

						<!-- Address -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.address') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.address"
													 :placeholder="$t('common.text.address')"
								/>
							</div>
						</div>

						<!-- Freedial -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.freedial') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.free_dial"
													 :placeholder="$t('common.text.freedial')"
								/>
							</div>
						</div>

						<!-- Phone -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.tel') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.tel"
													 :placeholder="$t('common.text.tel')"
								/>
							</div>
						</div>

						<!-- Fax -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.fax') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.fax"
													 :placeholder="$t('common.text.fax')"
								/>
							</div>
						</div>

						<!-- Email -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.email') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.email"
													 :placeholder="$t('common.text.email')"
								/>
							</div>
						</div>

						<!-- Url -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">
								{{ $t('common.text.website') }}
							</label>

							<div class="col-sm-10">
								<InputText class="form-control"
													 v-model="item.website"
													 :placeholder="$t('common.text.website')"
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
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'
	import FormMixin from '../../../mixins/form.mixin'
	import ContactModel from '../../../models/contact.model'

	// Prime
	import InputText from 'primevue/inputtext'
	import { ContactService } from '../../../api'

	export default {
		name: 'ContactForm',

		mixins: [FormMixin],

		components: {
			ContentHeader,
			InputText,
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: ContactService,
				FormModel: ContactModel,
			}
		},
	}
</script>

<style scoped>

</style>