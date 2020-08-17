<template>
  <ValidationProvider tag="div"
                      :name="label"
                      :vid="vid"
                      v-slot="{ errors }">
    <label class="form-label">
      {{ $t(label) }}
      <span v-if="required" class="required">{{$t('required')}}</span>
    </label>

    <div :class="{'has__error': errors[0]}">
      <a-select
        style="width: 100%"
        :value="value"
        @change="handleChange">
        <a-select-option :value="0">
          {{$t('link_type')}}
        </a-select-option>
        <a-select-option :value="1">
          {{$t('url_type')}}
        </a-select-option>
      </a-select>

      <!--Message Error-->
      <span v-if="errors[0]" class="errors">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputCategoryLinkType',

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

    vid: {
      type: String,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Number],
      required: true,
      default: ''
    }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
