<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <!--Form-->
    <ValidationObserver tag="form"
                        ref="observer"
                        @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-md-6">
          <!--Shop code-->
          <InputText v-model="form.company_code"
                     class="mb-3"
                     rules="required|max:50"
                     vid="company_code"
                     label="company_code"
                     :disabledInput="$route.name === 'companies.edit'"
                     :required="true"/>
          <span class="note-company-code">{{$t('note_company_code')}}</span>

          <!--Name-->
          <InputText v-model="form.company_name"
                     class="mb-3"
                     rules="required|max:100"
                     vid="company_name"
                     label="company_name"
                     :required="true"/>

          <!-- Post code -->
          <InputText v-model="form.post_code"
                     class="mb-3"
                     vid="post_code"
                     label="post_code"
                     :maxLength="9"
                     :placeholder="$t('placeholder_postcode')"/>

          <!--Prefecture-->
          <InputCategory v-model="form.prefecture_id"
                         class="mb-3"
                         vid="prefecture_id"
                         label="prefecture"
                         :options="optionsPrefectureCategory"/>

          <!-- City -->
          <InputText v-model="form.city_name"
                     class="mb-3"
                     rules="max:50"
                     vid="city_name"
                     label="city"/>

          <!-- Address -->
          <InputText v-model="form.address"
                     class="mb-3"
                     rules="max:50"
                     vid="address"
                     label="address"/>

          <!-- Freedial -->
          <InputText v-model="form.freedial"
                     class="mb-3"
                     rules="format_tel|max:50"
                     vid="freedial"
                     label="freedial"
                     :placeholder="$t('placeholder_tel')"
                     icon="phone"/>

          <!-- Phone -->
          <InputText v-model="form.tel"
                     class="mb-3"
                     rules="format_tel|max:50"
                     vid="tel"
                     label="tel"
                     :placeholder="$t('placeholder_tel')"
                     icon="phone"/>

          <!--Is active-->
          <InputSwitch v-model="form.is_active"
                       class="mb-3"
                       label="text_active"/>
        </div>

        <div class="col-md-6 col-xs-12">
          <!--Thumbnail-->
          <ValidationProvider tag="div"
                              :name="$t('thumbnail')"
                              rules=""
                              vid="thumbnail"
                              class="mb-3"
                              v-slot="{ errors }">
            <label class="form-label">{{ $t('thumbnail') }}</label>

            <div class="form-control-plaintext">
              <img class="img-fluid rounded object-cover mb-3 img-thumbnail-150 border border-light"
                   :src="imageShow | imageThumbnailObject"
                   alt=""
              />
              <input :value="form.thumbnail" :class="{'is-invalid': errors.length }" hidden>
              <SelectFile
                  v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_COMPANY) : hasPermissionAction(PERMISSIONS.CREATE_COMPANY)"
                  @onFileSelect="onFileSelect($event, 'thumbnail')"/>
              <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <!-- Fax -->
          <InputText v-model="form.fax"
                     class="mb-3"
                     rules="format_tel|max:50"
                     vid="fax"
                     label="fax"
                     :placeholder="$t('placeholder_tel')"
                     icon="table"/>

          <!-- Email -->
          <InputText v-model="form.mail"
                     class="mb-3"
                     rules="email|max:50"
                     vid="mail"
                     label="mail"
                     icon="mail"/>

          <!--URL-->
          <InputText v-model="form.url"
                     class="mb-3"
                     rules="format_url|max:100"
                     vid="url"
                     label="url"/>
        </div>
      </div>

      <!-- Action Section Submit & Cancel -->
      <div class="card-footer fixed-bottom bg-light shadow">
        <button type="button"
                class="btn btn-default float-right"
                @click="onCancel">
          <a-icon type="stop" class="mr-1"/>
          <span>{{ $t('cancel') }}</span>
        </button>

        <button type="submit"
                v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_COMPANY) : hasPermissionAction(PERMISSIONS.CREATE_COMPANY)"
                class="btn btn-success float-right mr-1"
                :class="{'btn-loading disabled': isSubmit}">
          <a-icon type="save" class="mr-1"/>
          {{this.$route.name === 'companies.edit' ? $t('btn_update') : $t('btn_save')}}
        </button>
      </div>
    </ValidationObserver>
  </a-card>
</template>

<script>
import Company from '@/models/Company'
import {forEach, pickBy} from 'lodash-es'
import Form from '@/mixins/form.mixin'
import SelectFile from '@/components/file/SelectFile'
import InputText from '@/components/Form/InputText'
import InputCategory from '@/components/Form/InputCategory'
import InputSwitch from '@/components/Form/InputSwitch'

export default {
  props: {
    detail: {
      type: Object,
      default: () => {
      }
    }
  },

  name: 'Form',

  components: {
    InputSwitch,
    InputCategory,
    InputText,
    SelectFile
  },

  data () {
    return {
      list_prefectures: [],
      form: {
        company_code: '',
        company_name: '',
        post_code: '',
        prefecture_id: '',
        city_name: '',
        address: '',
        freedial: '',
        tel: '',
        fax: '',
        mail: '',
        url: '',
        is_active: true,
        thumbnail: ''
      },
      imageShow: '',
      isSubmit: false
    }
  },

  mixins: [Form],

  watch: {
    // handle hyphen when post_code = 3
    'form.post_code' (val) {
      const tmpInt = val.replace('-', '')
      if (tmpInt.length > 3) {
        this.form.post_code = tmpInt.substring(0, 3) + '-' + tmpInt.substring(3)
      }
    }
  },

  created () {
    this.list_prefectures = this.$route.meta['prefectures']

    if ('id' in this.$route.params && this.$route.name === 'companies.edit') {
      this.form = Object.assign(this.form, {
        ...this.detail
      })

      this.imageShow = this.form.thumbnail_url
    }
  },

  computed: {
    optionsPrefectureCategory () {
      return {
        data: this.list_prefectures,
        id: 'id',
        key: 'prefecture_name'
      }
    }
  },

  methods: {
    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true
      let data = this.form
      if (this.$route.name === 'companies.edit') {
        this.updateCompany(data)
      } else {
        this.createCompany(data)
      }
    },

    onFileSelect (file, keyName) {
      this.imageShow = file.url
      this.form.thumbnail = file.id
    },

    async createCompany (data) {
      try {
        await Company.create(data)

        await this.onSuccess(this.$t('message_success'), this.$t('create_message_successfully'))

        await this.$router.push({name: 'companies.index'})
      } catch (err) {
        this.checkErrorsAPI(err)
        throw err
      }
    },

    async updateCompany (data) {
      try {
        const resp = new Company(data)
        await resp.save()

        await this.onSuccess(this.$t('message_success'), this.$t('update_message_successfully'))

        await this.$router.push({name: 'companies.index'})
      } catch (err) {
        this.checkErrorsAPI(err)
      }
    },

    checkErrorsAPI (err) {
      forEach(err.response.data.errors, (item) => {
        pickBy(this.$refs.observer.errors, (value, key) => {
          if (item.field === key) {
            value.push(item.message)
            this.isSubmit = false
          }
        })
      })
    },

    onCancel () {
      return this.$router.push({ name: 'companies.index' })
    }
  }
}
</script>

<style scoped>

</style>
