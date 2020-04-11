export default {
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

  methods: {
    /**
     * Submit Action
     */
    async onSubmit () {
      const ID = this.$route.params.id

      if (ID) {
        await this.FormService.update(ID, this.item).then(() => {
          this.onSuccess()
        })
      } else {
        await this.FormService.create(this.item).then(() => {
          this.onSuccess()
        })
      }
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
     * Success create & update
     */
    onSuccess () {
      // save model
      this.item.$save().then(() => {
        this.onRedirect().then(r => {})
      })
    }
  }
}