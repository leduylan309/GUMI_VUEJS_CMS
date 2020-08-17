<template>
  <div id="UpdateCompany">
    <Form :detail="model"/>
  </div>
</template>

<script>
import Prefecture from '@/models/Prefecture'
import Company from '@/models/Company'
import store from '@/store'
import * as types from '@/store/mutation-types'
import Form from './Form'

export default {
  name: 'Edit',
  beforeRouteEnter: async (to, from, next) => {
    const company = await Company.find(to.params['id'], {
      query: {
        include: 'prefecture'
      }
    })
    // Get Prefecture
    let respPrefecture = store.getters.prefectures

    if (!respPrefecture) {
      respPrefecture = await Prefecture.all()

      store.commit(types.SET_PREFECTURES, respPrefecture)
    }

    to.meta['detail'] = company.data
    to.meta['prefectures'] = respPrefecture.data

    return next()
  },
  components: {
    Form
  },
  data () {
    return {
      model: null
    }
  },
  created () {
    this.model = this.$route.meta['detail']
  }
}
</script>

<style scoped>

</style>
