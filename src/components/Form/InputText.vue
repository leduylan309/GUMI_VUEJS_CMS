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
      <a-input :placeholder="placeholder"
               :value="value"
               :max-length="maxLength"
               :disabled="disabledInput"
               :type="type"
               @input="$emit('change', $event.target.value)">
        <a-icon v-if="icon" slot="prefix" :type="icon"/>
      </a-input>

      <!--Message Error-->
      <span v-if="errors[0]" class="errors">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputText',

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

    maxLength: {
      type: [String, Number]
    },

    value: {
      type: [String, Number],
      default: ''
    },

    disabledInput: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'text'
    },

    icon: {
      type: String,
      default: ''
    },

    column: {
      type: String,
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
