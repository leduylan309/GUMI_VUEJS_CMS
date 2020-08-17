<template>
  <div id="Resource">
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h1 class="page-title text-dark">
            {{$t($route.meta.title)}}
          </h1>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ml-auto d-print-none">
          <div class="d-sm-inline">
            <Breadcrumb/>
          </div>
        </div>
      </div>
    </div>
    <slot>
      <router-view v-if="true"/>
    </slot>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Resource',
  components: {
    Breadcrumb
  }
}
</script>

<style scoped>
  .page-title {
    font-size: calc(1.3rem + 0.6vw);
    font-weight: 500;
  }
</style>
