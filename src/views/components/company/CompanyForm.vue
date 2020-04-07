<template>
  <div class="content-wrapper">
    <!-- Header Table -->
    <ContentHeader :title="title"/>

    <!-- Content Table -->
    <div class="content">
      <div class="card">
        <div class="card-body">
          <form class="form-horizontal">
            <!-- Code -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.company_code') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.company_code" :placeholder="$t('common.text.company_code')"/>
              </div>
            </div>
            <!-- Name -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.name') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.name" :placeholder="$t('common.text.name')"/>
              </div>
            </div>

            <!-- Postal code -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.postal_code') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.postal_code" :placeholder="$t('common.text.postal_code')"/>
              </div>
            </div>

            <!-- City -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.city') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.city" :placeholder="$t('common.text.city')"/>
              </div>
            </div>

            <!-- Address -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.address') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.address" :placeholder="$t('common.text.address')"/>
              </div>
            </div>

            <!-- Freedial -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.freedial') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.freedial" :placeholder="$t('common.text.freedial')"/>
              </div>
            </div>

            <!-- Phone -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.phone') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.phone" :placeholder="$t('common.text.phone')"/>
              </div>
            </div>

            <!-- Fax -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.fax') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.fax" :placeholder="$t('common.text.fax')"/>
              </div>
            </div>

            <!-- Email -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.email') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.email" :placeholder="$t('common.text.email')"/>
              </div>
            </div>

            <!-- Url -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.url') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.url" :placeholder="$t('common.text.url')"/>
              </div>
            </div>

            <!-- Image -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.table.image') }}</label>

              <div class="col-sm-10">
                <FileUpload mode="basic"
                            :name="item.image"
                            v-model="item.image"
                            :previewWidth="100"
                            @upload="onUploadImage"
                            accept="image/*"
                            :maxFileSize="1000000"
                            :chooseLabel="$t('common.text.select_image')"/>
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

  // Prime
  import InputText from 'primevue/inputtext'
  import FileUpload from 'primevue/fileupload'

  export default {
    name: 'CompanyForm',

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
      FileUpload,
    },

    data () {
      return {}
    },

    methods: {
      /**
       * Action upload Photo
       */
      onUploadImage () {

      },

      /**
       * Submit Action
       */
      onSubmit () {
        console.log(this.item)
      },

      /**
       * back to previous page
       */
      onCancel () {
        return this.$router.back()
      },
    },
  }
</script>

<style scoped>

</style>