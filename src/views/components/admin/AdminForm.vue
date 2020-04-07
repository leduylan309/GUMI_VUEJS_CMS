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
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.name') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.name" :placeholder="$t('common.text.name')"/>
              </div>
            </div>

            <!-- Email -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.email') }}</label>

              <div class="col-sm-10">
                <InputText class="form-control" v-model="item.name" :placeholder="$t('common.text.email')"/>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.password') }}</label>

              <div class="col-sm-10">
                <Password class="form-control" :feedback="false" v-model="item.password"/>
              </div>
            </div>

            <!-- Confirm password -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.confirm_password') }}</label>

              <div class="col-sm-10">
                <Password class="form-control" :feedback="false" v-model="item.confirm_password"/>
              </div>
            </div>

            <!-- Permission -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.permission') }}</label>

              <div class="col-sm-10">
                <Dropdown class="form-control" :options="permissions" v-model="item.permission"/>
              </div>
            </div>

            <!-- Status -->
            <div class="form-group row">
              <label class="col-sm-2 control-label text-right">{{ $t('common.text.activate') }}</label>

              <div class="col-sm-10">
                <InputSwitch class="p-display--block" v-model="item.activate"/>
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
  import InputSwitch from 'primevue/inputswitch'
  import Password from 'primevue/password'
  import Dropdown from 'primevue/dropdown'

  export default {
    name: 'AdminForm',

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
      Dropdown
    },

    data () {
      return {
        permissions: ['View', 'Create & Edit', 'All']
      }
    },

    methods: {
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