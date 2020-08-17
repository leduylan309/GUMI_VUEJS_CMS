import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import i18n from './i18n'

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

extend('post_code', {
  validate (value) {
    return /(^\d{3}-\d{4}$)/.test(value)
  }
})

extend('format_url', {
  validate (value) {
    // eslint-disable-next-line
    return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)
  }
})

extend('format_tel', {
  validate (value) {
    return /(^0\d{1,4}-\d{2,4}-\d{3,4}$)/.test(value)
  }
})

extend('half_alphabet', {
  validate (value) {
    return /(^[a-zA-Z0-9!-/:-@¥[-`{-~]*$)/.test(value)
  }
})

extend('decimal', {
  validate (value) {
    return /^[-+]?[0-9]+\.[0-9]+$/.test(value)
  }
})

extend('youtube_valid', {
  validate (value) {
    return /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm.test(value)
  }
})

extend('smaller_than', {
  params: ['otherValue'],
  validate (value, { otherValue }) {
    if (!otherValue) {
      return true
    }
    return parseInt(value) < parseInt(otherValue)
  }
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  defaultMessage: (field, values) => {
    const text = field.toLowerCase()
    // override the field name.
    values._field_ = i18n.t(`${text}`)

    return i18n.t(`validation.${values._rule_}`, values)
  }
})
