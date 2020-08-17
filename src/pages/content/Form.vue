<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <!--Form-->
    <ValidationObserver tag="form"
                        ref="observer"
                        @submit.prevent="validateBeforeSubmit()">
      <div class="row">
        <!--Company ID-->
        <InputCategory v-if="currentUser.roles.name === 'super-admin'"
                       v-model="form.company_id"
                       class="col-md-6 mb-3"
                       rules="required"
                       vid="company_id"
                       label="company_id"
                       :options="optionsCompanyCategory"
                       :required="true"/>

        <!--Content title-->
        <InputText v-model="form.content_title"
                   class="col-md-6 mb-3"
                   rules="required|max:100"
                   vid="content_title"
                   label="content_title"
                   :required="true"/>

        <!--Content public time-->
        <InputDateRange v-model="dateRange"
                        class="col-md-6 mb-3"
                        rules="required"
                        label="content_public_time"
                        format-date="YYYY-MM-DD HH:mm"
                        :required="true"/>

        <!--Display order-->
        <InputText v-model="form.display_order"
                   class="col-md-6 mb-3"
                   rules="required|numeric"
                   vid="display_order"
                   label="display_order"
                   :required="true"/>

        <!--Content text-->
        <div v-if="!form.company_id" class="col-md-12">
          <label class="form-label text-capitalize d-flex align-items-center">
            {{ $t('content_text') }}
          </label>
          <div class="check-company">
            {{$t('empty_company')}}
          </div>
        </div>
        <InputHtmlEditor v-model="form.content_text"
                         v-else
                         rules="required|max:10000"
                         label="content_text"
                         class="col-md-12 mb-3"
                         :required="true"/>

        <!--Thumbnail-->
        <div class="col-sm-12">
          <ValidationProvider tag="div"
                              :name="$t('thumbnail')"
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
                  v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_CONTENT) && form.company_id : hasPermissionAction(PERMISSIONS.CREATE_CONTENT) && form.company_id"
                  @onFileSelect="onFileSelect($event, 'thumbnail')"/>
              <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>

        <!--Is active-->
        <InputSwitch v-model="form.is_active"
                     class="col-md-6 mb-3"
                     label="text_active"/>
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
                v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_CONTENT) : hasPermissionAction(PERMISSIONS.CREATE_CONTENT)"
                class="btn btn-success float-right mr-1"
                :class="{'btn-loading disabled': isSubmit}">
          <a-icon type="save" class="mr-1"/>
          {{this.$route.name === 'content.edit' ? $t('btn_update') : $t('btn_save')}}
        </button>
      </div>
    </ValidationObserver>
  </a-card>
</template>

<script>

import Content from '@/models/Content'
import store from '@/store'
import Form from '@/mixins/form.mixin'
import InputCategory from '@/components/Form/InputCategory'
import InputText from '@/components/Form/InputText'
import InputSwitch from '@/components/Form/InputSwitch'
import InputTextarea from '@/components/Form/InputTextarea'
import InputDateRange from '@/components/Form/InputDateRange'
import InputHtmlEditor from '@/components/Form/InputHtmlEditor'
import {forEach, pickBy} from 'lodash-es'
import SelectFile from '@/components/file/SelectFile'

export default {
  name: 'Form',

  components: {
    SelectFile,
    InputDateRange,
    InputTextarea,
    InputSwitch,
    InputText,
    InputCategory,
    InputHtmlEditor
  },

  data () {
    return {
      dateRange: [],
      list_companies: [],
      form: {
        company_id: '',
        content_title: '',
        publish_start_datetime: '',
        publish_end_datetime: '',
        content_text: '',
        thumbnail: '',
        display_order: '',
        is_active: true
      },
      imageShow: '',
      isSubmit: false
    }
  },

  mixins: [Form],

  created () {
    this.list_companies = this.$route.meta['companies']

    // Check permission not super admin
    if (this.currentUser && this.currentUser.roles.name !== 'super-admin') {
      this.form.company_id = this.currentUser.company.id
    }

    if ('id' in this.$route.params && this.$route.name === 'content.edit') {
      this.form = {
        ...this.form,
        ...this.$route.meta['detail']
      }
      this.dateRange = [this.form.publish_start_datetime, this.form.publish_end_datetime]
      this.imageShow = this.form.thumbnail_url
    }
  },

  computed: {
    currentUser () {
      return store.getters.profile.data
    },

    optionsCompanyCategory () {
      return {
        data: this.list_companies,
        id: 'id',
        key: 'company_name',
        code: 'company_code'
      }
    }
  },

  methods: {
    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.form.publish_start_datetime = this.dateRange[0]
        this.form.publish_end_datetime = this.dateRange[1]

        await this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true
      let data = this.form

      if (this.$route.name === 'content.edit') {
        this.updateContent(data)
      } else {
        this.createContent(data)
      }
    },

    async updateContent (data) {
      try {
        const resp = new Content(data)
        await resp.save()

        await this.onSuccess(this.$t('message_success'), this.$t('update_message_successfully'))

        await this.$router.push({name: 'content.index'}).catch(_ => {
        })
      } catch (err) {
        this.checkErrorsAPI(err)
      }
    },

    async createContent (data) {
      try {
        const resp = await Content.create(data)

        if (resp && Object.keys(resp).length) {
          await this.onSuccess(this.$t('message_success'), this.$t('create_message_successfully'))

          this.$router.push({name: 'content.index'}).catch(_ => {})
        }
      } catch (err) {
        this.checkErrorsAPI(err)
        throw err
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

    onFileSelect (file, keyName) {
      this.imageShow = file.url
      this.form.thumbnail = file.id
    },

    onCancel () {
      return this.$router.push({ name: 'content.index' })
    }
  }
}
</script>

<style scoped>

</style>
