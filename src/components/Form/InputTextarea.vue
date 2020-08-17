<template>
  <ValidationProvider tag="div"
                      :name="label"
                      :vid="vid"
                      :rules="rules"
                      v-slot="{ errors }">
    <label class="form-label">
      {{ $t(label) }}
      <span v-if="required" class="required">{{$t('required')}}</span>
    </label>

    <div :class="{'has__error': errors[0]}">
      <a-textarea :rows="rows"
                  :placeholder="placeholder"
                  :value="value"
                  @input="$emit('change', $event.target.value)"/>
      <!--Message Error-->
      <span v-if="errors[0]" class="errors">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputTextarea',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },

    rules: {
      type: String,
      default: ''
    },

    vid: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    rows: {
      type: [String, Number]
    },

    value: {
      type: [String, Number],
      required: true,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
