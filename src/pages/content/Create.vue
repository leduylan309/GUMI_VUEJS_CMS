<template>
  <div id="CreateNews">
    <Form/>
  </div>
</template>

<script>
import Form from './Form'
import Company from '@/models/Company'

export default {
  name: 'Create',

  components: { Form },

  async beforeRouteEnter (to, from, next) {
    // Get Companies
    const respCompanies = await Company.all()

    to.meta['companies'] = respCompanies.data

    return next()
  }
}
</script>

<style scoped>

</style>
