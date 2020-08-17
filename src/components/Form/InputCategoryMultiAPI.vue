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
      <div class="custom-arrow">
        <a-select
          show-search
          mode="multiple"
          style="width: 100%"
          :value="value"
          :filter-option="false"
          :not-found-content="fetching ? undefined : null"
          label-in-value
          @search="fetchData"
          @change="handleChange">
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />

          <template>
            <a-select-option v-for="(item, index) in data"
                             :key="index"
                             :value="item[options.id]"
            >{{ item[options.key] }}</a-select-option>
          </template>
        </a-select>

        <a-icon type="down" :style="{ fontSize: '12px'}"/>
      </div>
      <!--Message Error-->
      <span v-if="errors[0]" class="errors">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>

<script>
import debounce from 'lodash-es/debounce'
import Model from '@/models/Model'

export default {
  name: 'InputCategoryMultiAPI',

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

    value: {
      type: Array
    },

    options: {
      type: Object,
      required: true
    },

    required: {
      type: Boolean,
      default: false
    },

    modelJavel: {
      type: [Model, Function],
      required: true
    }
  },

  data () {
    this.lastFetchId = 0
    this.fetchData = debounce(this.fetchData, 800)

    return {
      data: [],
      fetching: false
    }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    },

    async fetchData (value) {
      console.log('fetching data', value)
      this.lastFetchId += 1
      this.data = []
      this.fetching = true

      const fetchId = this.lastFetchId
      const query = {
        page: 1,
        per_page: 15,
        'sortBy[updated_at]': 'desc'
      }

      query[`fields[${this.options.model}]`] = `${this.options.id},${this.options.key}`
      query[`filters[${this.options.search_key}]`] = value

      const response = await this.modelJavel.paginate({ query })

      if (fetchId !== this.lastFetchId) {
        // for fetch callback order
        return
      }

      this.data = response.data.length ? response.data : []
      this.fetching = false
    }
  }
}
</script>

<style scoped>

</style>
