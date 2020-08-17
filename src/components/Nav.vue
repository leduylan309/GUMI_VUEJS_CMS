<template>
  <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <button class="navbar-toggler" data-target="#navbar-menu" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand navbar-brand-autodark" href=".">
        <img alt="Newphoria" class="navbar-brand-image" src="../assets/images/newphoria_logo.svg">
      </a>
      <div class="collapse navbar-collapse" id="navbar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li :key="item.id" class="nav-item" v-for="item of navigations">
            <router-link
                v-if="hasPermission(item)"
                :active-class="'active'"
                :exact="item.exact"
                :to="{name: item.routeName}"
                class="nav-link">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
                <component :is="item.icon" class="icon" v-if="item.icon"/>
              </span>
              <span class="nav-link-title">{{ $t(`${ item.title }`) }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { navigations } from '@/config'
import { PERMISSIONS } from '@/enum/permissions.enum'
import store from '@/store'
import {isEmpty} from 'lodash-es'

export default {
  name: 'Nav',
  computed: {
    permissions () {
      return store.getters.currentPermissions || []
    }
  },
  data () {
    return {
      navigations
    }
  },
  methods: {
    hasPermission (item) {
      const currentRoute = this.$router.resolve({ name: item.routeName }).route

      if (currentRoute.meta.permissions.includes(PERMISSIONS.ALL)) {
        return true
      }

      if (!isEmpty(currentRoute.meta.permissions)) {
        return !!this.permissions.find(permission => currentRoute.meta.permissions.includes(permission.name))
      }

      return false
    }
  }
}
</script>

<style scoped>

</style>
