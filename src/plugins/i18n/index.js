import Vue from 'vue'
import VueI18n from 'vue-i18n'

// import languages
import english from '../../languages/en'

Vue.use(VueI18n)

const messages = {
  en: english
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages,
  fallbackLocale: 'en'
})

export default i18n