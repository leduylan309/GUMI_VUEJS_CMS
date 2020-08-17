<template>
  <div class="switch-active">
    <label class="form-label">{{ $t(label) }}</label>

    <a-switch v-model="switchValue"/>
  </div>
</template>

<script>
export default {
  name: 'InputSwitch',

  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },

    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  computed: {
    switchValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
