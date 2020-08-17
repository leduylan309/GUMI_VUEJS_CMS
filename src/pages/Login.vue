<template>
  <div class="flex-fill d-flex flex-column justify-content-center" v-if="layout === 'auth'">
    <div class="container-tight py-6">
      <div class="text-center mb-4">
        <img alt="" height="36" src="../assets/images/newphoria_logo_blue.svg">
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(login)" class="card card-md" novalidate>
          <div class="card-body">
            <ValidationProvider name="login_username_placeholder"
                                rules="required"
                                v-slot="{ errors }"
            >
              <div class="mb-3">
                <label class="form-label">{{ $t('login_id') }}</label>
                <input :class="{'is-invalid': errors.length }" autocomplete="off" class="form-control"
                       type="text"
                       v-model.trim="form.login_id"
                />

                <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="login_password_placeholder"
                                rules="required"
                                v-slot="{ errors }">
              <div class="mb-2">
                <label class="form-label">{{ $t('login_password') }}</label>
                <input :class="{'is-invalid': errors.length }"
                       class="form-control"
                       v-model.trim="form.login_password"
                       type="password"
                />

                <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <div class="form-footer">
              <button class="btn btn-primary btn-block" :disabled="isSubmit" :class="{'btn-loading disabled': isSubmit}"
                      type="submit">
                {{ $t('login') }}
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>

      <!-- ERROR -->
      <div v-if="error" class="card card-sm rounded shadow">
        <div class="card-body bg-red-lt">
          <div class="row align-items-center justify-content-center">
            <div class="col-12 text-center" style="font-size: 1rem">
              <i class="fe fe-alert-triangle ml-0"/>

              <span v-text="error"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/mutation-types'
import store from '@/store'
import Admin from '@/models/Admin'

export default {
  name: 'Login',
  data () {
    return {
      hidePassword: true,
      isSubmit: false,
      form: {
        login_id: '',
        login_password: ''
      },
      error: null
    }
  },

  computed: {
    layout () {
      return this.$store.state.layout
    }
  },

  methods: {

    async login () {
      this.isSubmit = true

      try {
        const { token } = await Admin.login(this.form)
        store.commit(types.SET_TOKEN, { token })
        const profile = await Admin.profile({
          query: {
            'include': 'roles,company,permissions'
          }
        })
        store.commit(types.SET_PROFILE, { profile })
        store.commit(types.SET_PERMISSION, profile.data.permissions)
        await this.$router.push({ name: 'home' })
      } catch (error) {
        this.isSubmit = false

        if (error.response) {
          const {response: {data}} = error
          this.error = data.error.message
        } else {
          return Promise.reject(error)
        }
      }
    }
  }
}
</script>

<style scoped>
  .login-error {
    width: 100%;
    margin-top: .25rem;
    font-size: 87.5%;
    color: #cd201f;
  }
</style>
