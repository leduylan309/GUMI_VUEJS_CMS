<template>
  <div id="UpdateAdmin">
    <Form />
  </div>
</template>

<script>
import Admin from '@/models/Admin'
import Form from './Form'
import Role from '@/models/Role'
import Company from '@/models/Company'

export default {
  name: 'Edit',

  components: {
    Form
  },

  beforeRouteEnter: async (to, from, next) => {
    const respDetail = await Admin.find(to.params['id'], {
      query: {
        'include': 'roles,company'
      }
    })
    const respRole = await Role.all({
      query: {
        per_page: 0,
        'filters[company_id]': respDetail.company.id
      }
    })
    const respCompany = await Company.all({
      query: {
        per_page: 0
      }
    })

    to.meta['detail'] = respDetail
    to.meta['role'] = respRole.data
    to.meta['company'] = respCompany.data

    return next()
  }
}
</script>

<style scoped>

</style>
