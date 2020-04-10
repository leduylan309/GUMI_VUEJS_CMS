<template>
	<div class="login-page">
		<div class="login-box">

			<!-- /.login-logo -->
			<div class="card">
				<div class="card-body login-card-body">
					<p class="login-box-msg" v-html="$t('login.title')"/>

					<ValidationObserver v-slot="{ handleSubmit }">
						<form @submit.prevent="handleSubmit(onSubmit)">
							<ValidationProvider
											:name="$t('login.username_placeholder')"
											rules="required"
											v-slot="{ errors }"
							>
								<div class="input-group mb-3">
									<InputText class="form-control"
														 type="text"
														 v-model="loginEmail"
														 :class="{'is-invalid': errors.length }"
									/>

									<div class="input-group-append">
										<div class="input-group-text">
											<span class="pi pi-envelope"></span>
										</div>
									</div>

									<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
								</div>
							</ValidationProvider>

							<ValidationProvider
											:name="$t('login.password_placeholder')"
											rules="required"
											v-slot="{ errors }"
							>
								<div class="form-group">
									<div class="input-group mb-3">
										<InputText class="form-control"
															 type="password"
															 :class="{'is-invalid': errors.length }"
															 v-model="loginPassword"/>

										<div class="input-group-append">
											<div class="input-group-text">
												<span class="pi pi-lock"></span>
											</div>
										</div>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>

								</div>

								</ValidationProvider>

							<div class="row">
								<div class="col-12">
									<Button :label="$t('common.login')"
													class="btn btn-primary btn-block"
													icon="pi pi-check"
													type="submit"
													/>
								</div>
								<!-- /.col -->
							</div>
						</form>
					</ValidationObserver>
					<!-- /.login-card-body -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { LoginService } from '../../api'
	import router from '../../router'
	import LoginModel from '../../models/login.model'

	// Component
	import InputText from 'primevue/inputtext'
	import Button from 'primevue/button'

	export default {
		name: 'Login',

		components: {
			InputText,
			Button,
		},

		data () {
			return {
				loginEmail: null,
				loginPassword: null,
				loginFail: null,
			}
		},

		methods: {
			async onSubmit () {
				const inputData = {
					username: this.loginEmail,
					password: this.loginPassword,
				}

				return await LoginService.login(inputData).then(response => {
					const { token, exp } = LoginModel.query().first()

					// set token to cookie
					Vue.$cookies.set('token', token, exp)

					router.push({ name: 'Dashboard' })
				}).catch(error => {
					const { config, response } = error

					if (response && response.status === 401) {
						this.loginFail = true
					}
				})
			},
		},
	}
</script>

<style scoped>

</style>