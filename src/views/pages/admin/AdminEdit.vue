<template>
  <AdminForm :title="$t('admin.edit_admin')"
             :item="item" />
</template>

<script lang="js">
  // Components
  import AdminForm from '../../components/admin/AdminForm'

  export default {
    name: 'AdminEdit',

    components: {
      AdminForm,
    },

    data () {
      return {
        item: {},
      }
    },

  }
</script>

<style scoped>

</style>