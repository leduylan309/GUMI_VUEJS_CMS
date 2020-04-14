<template>
  <div class="content-wrapper">
    <div class="content-section introduction">
      <div class="feature-intro">
        <h1>Paginator</h1>
        <p>Paginator is a generic component to display content in paged format.</p>
      </div>
    </div>
    <div class="content-section implementation">
      <h3>Basic</h3>
      <Paginator :rows="10" :totalRecords="totalRecords" :rowsPerPageOptions="[10,20,30]"></Paginator>
    </div>
  </div>
</template>

<script>
  import Paginator from 'primevue/paginator';

  export default {
    name: "Paginator",
    components: {Paginator},
    data() {
      return {
        first: 0,
        totalRecords: 120,
        totalRecords2: 12
      }
    },
    methods: {
      reset() {
        this.first = 0;
      }
    },
    computed: {
      image() {
        return 'nature' + (this.first + 1);
      }
    }
  }
</script>

<style scoped>

</style>
