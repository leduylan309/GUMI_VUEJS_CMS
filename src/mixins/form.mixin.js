import ContentHeader from '../views/components/shared/ContentHeader'

//prime
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import InputText from 'primevue/inputtext'

export default {
  components: {
    ContentHeader,

    // prime
    InputText,
    Dialog,
    Button,
    Toast
  },

  props: {
    listName: {
      type: String,
      default: () => 'Dashboard'
    },
    item: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      require: true,
      default: () => 'Form'
    }
  },

  data () {
    return {
      displayDialog: false
    }
  },

  methods: {
    /**
     * Submit Action
     */
    async onSubmit () {
      const ID = this.$route.params.id

      if (ID) {
        await this.FormService.update(ID, this.item).then(() => {
          this.onSuccessUpdate()
        })
      } else {
        await this.FormService.create(this.item).then(() => {
          this.onSuccessCreate()
        })
      }
    },

    /**
     *
     * @param ID
     * @return {Promise<Response>}
     */
    async onDelete (ID) {
      return await this.FormService.delete(ID).then(() => {
        // delete Item
        this.FormModel.query().find(ID).$delete()

        this.onRedirect().then(r => {})
      }).catch((err) => {
        this.$toast.add({
          severity: this.$t('common.alert.delete_title_error'),
          summary: this.$t('common.alert.delete_message_successfully')
        })
      })
    },

    /**
     * back to previous page
     */
    onCancel () {
      return this.$router.back()
    },

    /**
     * Redirect to list name
     * @return {Promise<Route>}
     */
    onRedirect () {
      return this.$router.push({ name: this.listName })
    },

    /**
     * Success create
     */
    onSuccessCreate () {
      this.FormModel.insert({
        data: this.item
      }).then(() => {
        return this.onRedirect()
      })
    },

    /**
     * Success Update
     */
    onSuccessUpdate () {
      this.item.$save().then(() => {
        return this.onRedirect()
      })
    }
  }
}