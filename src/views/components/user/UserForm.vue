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
							<!-- First Name -->
							<ValidationProvider
								:name="$t('common.text.first_name')"
								rules="required"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.first_name">
								<label class="col-sm-2 control-label text-right">
									{{ $t('common.text.name') }}
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
									<Calendar v-model="item.birthday"
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
								rules="required|min:6"
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
								rules="required|min:6|confirmed:password"
								class="form-group row"
								v-slot="{ errors }"
								v-if="fields.confirm_password">
								<label class="col-sm-2 control-label text-right">
									{{ $t('common.text.confirm_password') }}
								</label>

								<div class="col-sm-10">
									<Password class="form-control"
														v-model="item.confirm_password"
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

	// Prime
	import InputText from 'primevue/inputtext'
	import InputSwitch from 'primevue/inputswitch'
	import Password from 'primevue/password'
	import Dropdown from 'primevue/dropdown'
	import Calendar from 'primevue/calendar'

	export default {
		name: 'UserForm',

		mixins: [FormMixin],

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
			InputSwitch,
			Password,
			Dropdown,
			Calendar
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: UserService,
				genders: ['male', 'female'],
				fields: UserModel.fields(),
			}
		},
	}
</script>

<style scoped>

</style>