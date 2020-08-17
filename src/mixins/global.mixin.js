import Vue from 'vue'
import store from '@/store'
import { PERMISSIONS } from '@/enum/permissions.enum'

Vue.mixin({
  data () {
    return {PERMISSIONS}
  },
  methods: {
    hasPermissionAction (permissionName) {
      const permission = store.getters.currentPermissions.find(permission => permission.name.trim() === permissionName)
      return permission && 'id' in permission
    }
  }
})
