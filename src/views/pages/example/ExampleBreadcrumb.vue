<template>
  <div class="content-wrapper">
    <div class="content-section introduction">
      <div class="feature-intro">
        <h1>Breadcrumb</h1>
        <p>Breadcrumb provides contextual information about page hierarchy.</p>
      </div>
    </div>
    <div class="content-section implementation">
      <Breadcrumb :home="home" :model="items" />
    </div>
  </div>
</template>

<script>
  import Breadcrumb from 'primevue/breadcrumb';

  export default {
    name: "ExampleBreadcrumb",
    components: {Breadcrumb},
    data() {
      return {
        home: {icon: 'pi pi-home', to: '/'},
        items: [
          {label: 'Categories'},
          {label: 'Sports'},
          {label: 'Football'},
          {label: 'Countries'},
          {label: 'Spain'},
          {label: 'F.C. Barcelona'},
          {label: 'Squad'},
          {label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
