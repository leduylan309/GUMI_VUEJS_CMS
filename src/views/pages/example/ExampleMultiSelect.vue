<template>
  <div class="content-wrapper">
    <div class="content-section introduction">
      <div class="feature-intro">
        <h1>MultiSelect</h1>
        <p>MultiSelect is used to multiple values from a list of options.</p>
      </div>
    </div>
    <div class="content-section implementation">
      <h3>Basic</h3>
      <MultiSelect v-model="selectedCars1" :options="cars" optionLabel="brand" placeholder="Select Brands"/>
    </div>
  </div>
</template>

<script>
  import MultiSelect from 'primevue/multiselect';

  export default {
    name: "ExampleMultiSelect",
    components: {MultiSelect},
    data() {
      return {
        selectedCars1: null,
        selectedCars2: null,
        cars: [
          {brand: 'Audi', value: 'Audi'},
          {brand: 'BMW', value: 'BMW'},
          {brand: 'Fiat', value: 'Fiat'},
          {brand: 'Honda', value: 'Honda'},
          {brand: 'Jaguar', value: 'Jaguar'},
          {brand: 'Mercedes', value: 'Mercedes'},
          {brand: 'Renault', value: 'Renault'},
          {brand: 'Volkswagen', value: 'Volkswagen'},
          {brand: 'Volvo', value: 'Volvo'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
