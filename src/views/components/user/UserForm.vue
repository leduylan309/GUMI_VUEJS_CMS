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
								<!-- First Name -->
								<ValidationProvider
												:name="$t('common.text.first_name')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.first_name">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.first_name') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.first_name"
															 :placeholder="$t('common.text.first_name')"
															 :class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Last Name -->
								<ValidationProvider
												:name="$t('common.text.last_name')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.last_name">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.last_name') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.last_name"
															 :placeholder="$t('common.text.last_name')"
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

								<!-- Birthday -->
								<ValidationProvider
												:name="$t('common.text.birthday')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.birthday">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.birthday') }}
									</label>

									<div class="col-sm-10">
										<Calendar v-model="birthday"
															:dateFormat="'yy-mm-dd'"
															:class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Role -->
								<ValidationProvider
												:name="$t('common.text.gender')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.gender">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.gender') }}
									</label>

									<div class="col-sm-10">
										<Dropdown class="form-control"
															:options="genders"
															v-model="item.gender"
															:class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Password -->
								<ValidationProvider
												:name="$t('common.text.password')"
												:rules="$route.params.id ? 'required_if:item.password|min:6' : 'required|min:6'"
												class="form-group row"
												v-slot="{ errors }"
												vid="password"
												v-if="fields.password">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.password') }}
									</label>

									<div class="col-sm-10">
										<Password class="form-control"
															v-model="item.password"
															:feedback="false"
															:class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Confirm password -->
								<ValidationProvider
												:name="$t('common.text.confirm_password')"
												:rules="$route.params.id ? 'required_if:item.password|min:6|confirmed:password' : 'required|min:6|confirmed:password'"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.password_confirmation">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.confirm_password') }}
									</label>

									<div class="col-sm-10">
										<Password class="form-control"
															v-model="item.password_confirmation"
															:feedback="false"
															:class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Status -->
								<div class="form-group row">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.activate') }}
									</label>

									<div class="col-sm-10">
										<InputSwitch class="p-display--block"
																 v-model="item.activate"
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

								<button type="submit"
												class="btn btn-success float-right mr-1">
									<i class="pi pi-save"/>

									<span>{{$t('common.button.save')}}</span>
								</button>
							</div>
						</div>
					</div>

					<ContactForm :title="$t('contact.create_a_contact')"
											 :item="item.contact"/>

				</form>
			</ValidationObserver>
		</div>
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'
	import UserModel from '../../../models/user.model'
	import FormMixin from '../../../mixins/form.mixin'
	import { UserService } from '../../../api'
	import ContactForm from '../shared/ContactForm'
	import moment from 'moment'

	// Prime
	import InputText from 'primevue/inputtext'
	import InputSwitch from 'primevue/inputswitch'
	import Password from 'primevue/password'
	import Dropdown from 'primevue/dropdown'
	import Calendar from 'primevue/calendar'

	export default {
		name: 'UserForm',

		mixins: [FormMixin],

		components: {
			ContentHeader,
			InputText,
			InputSwitch,
			Password,
			Dropdown,
			Calendar,
			ContactForm,
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: UserService,
				FormModel: UserModel,

				genders: ['male', 'female'],
				fields: UserModel.fields(),
			}
		},

		computed: {
			birthday: {
				get () {
					return this.item.birthday ? new Date(this.item.birthday) : new Date()
				},

				set (value) {
					this.item.birthday = moment(value).format('YYYY-MM-DD')

					return value
				},
			},
		},
	}
</script>

<style scoped>

</style>