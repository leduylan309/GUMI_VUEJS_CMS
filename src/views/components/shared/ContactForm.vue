<template>
	<!-- Content Table -->
	<div class="content">
		<div class="card">
			<div class="card-body">
				<!-- Postal code -->
				<ValidationProvider
								:name="$t('common.text.postal_code')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.postcode">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.postal_code') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.postcode"
											 :placeholder="$t('common.text.postal_code')"
											 :class="{'is-invalid': errors.length }"
						/>

						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>

				<!-- City -->
				<ValidationProvider
								:name="$t('common.text.city')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.city">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.city') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.city"
											 :placeholder="$t('common.text.city')"
											 :class="{'is-invalid': errors.length }"
						/>

						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>

				<!-- Address -->
				<ValidationProvider
								:name="$t('common.text.address')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.address">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.address') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.address"
											 :placeholder="$t('common.text.address')"
											 :class="{'is-invalid': errors.length }"
						/>

						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>

				<!-- Freedial -->
				<ValidationProvider
								:name="$t('common.text.freedial')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.free_dial">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.freedial') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.free_dial"
											 :placeholder="$t('common.text.freedial')"
											 :class="{'is-invalid': errors.length }"
						/>

						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>

				<!-- Phone -->
				<ValidationProvider
								:name="$t('common.text.tel')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.tel">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.tel') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.tel"
											 :placeholder="$t('common.text.tel')"
											 :class="{'is-invalid': errors.length }"
						/>

						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>

				<!-- Fax -->
				<ValidationProvider
								:name="$t('common.text.fax')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.fax">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.fax') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.fax"
											 :placeholder="$t('common.text.fax')"
											 :class="{'is-invalid': errors.length }"
						/>

						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>

				<!-- Email -->
				<ValidationProvider
								:name="$t('common.text.email')"
								rules="required|email"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.email">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.email') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.email"
											 :placeholder="$t('common.text.email')"
											 :class="{'is-invalid': errors.length }"
						/>
						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>

				<!-- Url -->
				<ValidationProvider
								:name="$t('common.text.website')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.website">
					<label class="col-sm-2 control-label text-right">
						{{ $t('common.text.website') }}
					</label>

					<div class="col-sm-10">
						<InputText class="form-control"
											 v-model="item.website"
											 :placeholder="$t('common.text.website')"
											 :class="{'is-invalid': errors.length }"
						/>
						<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
					</div>
				</ValidationProvider>
			</div>
		</div>
	</div>
</template>

<script>
	// Prime
	import InputText from 'primevue/inputtext'
	import ContactModel from '../../../models/contact.model'

	export default {
		name: 'ContactForm',

		props: {
			item: {
				type: Object,
				default: () => {},
			},
		},

		components: {
			InputText,
		},

		data () {
			return {
				fields: ContactModel.fields(),
			}
		},
	}
</script>
