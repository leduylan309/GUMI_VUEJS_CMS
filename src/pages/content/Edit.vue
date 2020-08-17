<template>
  <div id="UpdateShop">
    <Form/>
  </div>
</template>

<script>
import Content from '@/models/Content'
import Form from './Form'
import Company from '@/models/Company'

export default {
  name: 'Edit',

  data () {
    return {
      detail: null
    }
  },

  components: {
    Form
  },

  beforeRouteEnter: async (to, from, next) => {
    // Get Companies
    const respCompanies = await Company.all()

    // Get Detail
    const resp = await Content.find(to.params['id'])

    to.meta['companies'] = respCompanies.data
    to.meta['detail'] = resp.data

    return next()
  }
}
</script>

<style scoped>

</style>
