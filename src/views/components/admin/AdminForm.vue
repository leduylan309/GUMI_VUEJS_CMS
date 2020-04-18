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

							<!-- Username -->
							<ValidationProvider
											:name="$t('common.text.username')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.username">
								<label class="col-sm-2 control-label text-right">
									{{ $t('common.text.username') }}
								</label>

								<div class="col-sm-10">
									<InputText class="form-control"
														 v-model="item.username"
														 :placeholder="$t('common.text.username')"
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

							<template v-if="$route.params.id">
								<div class="form-group row">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.text.change_password') }}
									</label>
									<div class="col-sm-10">
										<InputSwitch class="p-display--block"
																 v-model="changePassword"
										/>
									</div>
								</div>
							</template>

							<template v-if="changePassword || !$route.params.id">
								<!-- Password -->
								<ValidationProvider
												:name="$t('common.text.password')"
												rules="required|min:6"
												class="form-group row"
												v-slot="{ errors }"
												vid="password">
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
												v-slot="{ errors }">
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
							</template>

							<!-- Role -->
							<ValidationProvider
											:name="$t('common.text.role')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.name">
								<label class="col-sm-2 control-label text-right">
									{{ $t('common.text.role') }}
								</label>

								<div class="col-sm-10">
									<MultiSelect class="form-control"
															 :options="rolesOption"
															 optionValue="id"
															 optionLabel="display_name"
															 dataKey="id"
															 v-model="roles"
															 @input="inputRoles"
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
	import AdminModel from '../../../models/admin.model'
	import FormMixin from '../../../mixins/form.mixin'
	import { AdminService } from '../../../api'
	import RoleModel from '../../../models/role.model'

	// Prime
	import InputSwitch from 'primevue/inputswitch'
	import Password from 'primevue/password'
	import Dropdown from 'primevue/dropdown'
	import MultiSelect from 'primevue/multiselect'

	export default {
		name: 'AdminForm',

		mixins: [FormMixin],

		components: {
			InputSwitch,
			Password,
			Dropdown,
			MultiSelect,
		},

		data () {
			return {
				// MUST DEFINE //
				FormService: AdminService,
				FormModel: AdminModel,

				rolesOption: RoleModel.query().all(),
				fields: AdminModel.fields(),
				changePassword: false,

				roles: this.item.roles ? this.item.roles.map(value => value.id) : [],
			}
		},

		methods: {
			/**
			 * Assign role
			 */
			async assignRole () {
				const newRecord = await this.FormModel.query().first()
				await this.FormService.assignRole(newRecord.id, {
					roles: this.item.roles.map(value => value.id),
				})
			},

			/**
			 * Submit Action
			 */
			async onSubmit () {
				const ID = this.$route.params.id

				if (ID) {
					await this.FormService.update(ID, this.item)
					await this.assignRole()
					await this.onSuccessUpdate()
				} else {
					await this.FormService.create(this.item)
					await this.assignRole()
					await this.onSuccessCreate()
				}
			},

			/**
			 *
			 * @param value
			 */
			inputRoles (value) {
				this.item.roles = RoleModel.query().findIn(value)
			},
		},
	}
</script>

<style scoped>

</style>