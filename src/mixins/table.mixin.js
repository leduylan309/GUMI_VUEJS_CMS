import { uniqueId } from 'lodash-es'
import { LOCALE } from '../enum/locale.enum'

export default {
  methods: {
    // pagination in table
    buildOptionText (pageSize) {
      if (this.$i18n.locale === LOCALE.ja) {
        return `${pageSize.value} / ページ`
      }
      return `${pageSize.value} / page`
    },

    showTotal (total, range) {
      if (this.$i18n.locale === LOCALE.ja) {
        return `${range[0]} - ${range[1]} 件 / 総件数 ${total}件`
      }
      return `${range[0]}-${range[1]} of ${total} items`
    },

    /**
     * @return {string}
     */
    randomUniqueID () {
      return uniqueId('row_')
    }
  }
}
