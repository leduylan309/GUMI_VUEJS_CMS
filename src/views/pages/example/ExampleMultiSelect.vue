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
  .p-multiselect {
    min-width: 15em;
  }

  .p-multiselect-car-option {
    display: inline-block;
    vertical-align: middle;

    img {
      vertical-align: middle;
      margin-right: .5em;
      width: 24px;
    }

    span {
      margin-top: .125em;
    }
  }

  .p-multiselect-car-token,
  .p-multiselect-empty-car-token {
    padding: 2px 4px;
    margin: 0 0.286em 0 0;
    display: inline-block;
    vertical-align: middle;
    height: 1.857em;
    border-radius: 3px;
  }

  .p-multiselect-car-token img {
    width: 20px;
    vertical-align: middle;
    margin-right: .5em
  }

  .p-multiselect-car-token {
    background: #007ad9;
    color: #ffffff;
  }

  .p-multiselect-empty-car-token {
    background: #d95f00;
    color: #ffffff;
  }

  /deep/ .p-multiselect-label {
    font-weight: 400 !important;
    margin-bottom: 0;
  }
</style>
