<template>
	<div class="login-body">
		<div class="login-panel"></div>
		<div class="login-content">
			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(onSubmit)">
					<h1 v-html="$t('login.title')"></h1>

					<p>{{ $t('login.welcome') }}</p>

					<div class="login-input-wrapper">
						<ValidationProvider :name="$t('login.username_placeholder')" rules="required" v-slot="{ errors }">
              <span class="p-float-label">
                <InputText id="username"
													 type="text"
													 v-model="loginEmail"/>

	            <label for="username">{{$t('login.username_placeholder')}}</label>
              </span>

							<ValidationMessage class="error text-danger" v-if="errors.length">{{ errors[0] }}</ValidationMessage>
						</ValidationProvider>
					</div>
					<div class="login-input-wrapper">
						<ValidationProvider :name="$t('login.password_placeholder')" rules="required" v-slot="{ errors }">
              <span class="p-float-label">
                <InputText id="password"
													 type="password"
													 v-model="loginPassword"/>

                <label for="password">{{$t('login.password_placeholder')}}</label>
              </span>

							<ValidationMessage class="error text-danger" v-if="errors.length">{{ errors[0] }}</ValidationMessage>
						</ValidationProvider>
					</div>

					<div class="login-input-wrapper" v-if="loginFail">
						<ValidationMessage class="error text-danger">
							{{ $t('login.wrong_username_password') }}
						</ValidationMessage>
					</div>

					<Button :label="$t('common.login')"
									icon="fas fa-sign-in-alt"
									type="submit"
									iconPos="left"/>
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { AuthService } from '../api'
	import router from '../router'
	import AuthModel from '../models/auth.model'

	// Component
	import InputText from 'primevue/inputtext'
	import Button from 'primevue/button'
	import ValidationMessage from 'primevue/validationmessage'

	export default {
		name: 'Login',

		components: {
			InputText,
			Button,
			ValidationMessage,
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
					email: this.loginEmail,
					password: this.loginPassword,
				}

				return await AuthService.login(inputData).then(response => {
					const { token, exp } = AuthModel.query().first()

					// set token to cookie
					Vue.$cookies.set('token', token, exp)

					router.push({ name: 'Dashboard' })
				}).catch(error => {
					const { config, response} = error

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