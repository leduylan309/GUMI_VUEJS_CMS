<template>
  <ValidationProvider :name="label"
                      :rules="rules"
                      :vid="vid"
                      v-slot="{ errors, required }">
    <label class="form-label text-capitalize d-flex align-items-center">
      {{ $t(`${label}`) }}
      <span v-if="required" class="required">{{$t('required')}}</span>
    </label>
    <div class="form-control-plaintext">
      <vue-editor v-model="editorValue"
                  :class="errors.length ? 'is-invalid' : ''"
                  class="d-block editor"
                  ref="editor"
                  :editorToolbar="customToolbar">
      </vue-editor>

      <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
    </div>

    <SelectFile :type="fileType" @onFileSelect="onFileSelect($event, 'thumbnail')" hidden ref="selectImage"/>

    <template>
      <a-modal v-model="htmlVisible"
               id="files-popup"
               :title="$t('content')"
               :on-ok="handleOk"
               :width="'70vw'"
               :zIndex="1009"
               :keyboard="false">
        <div class="row m-2">
          <label class="form-label text-capitalize d-flex align-items-center mb-2">{{ $t('html_editor') }}</label>
          <textarea style="min-height: 50vh"
                    class="form-control"
                    v-model="htmlContent"></textarea>
        </div>
        <template slot="footer">
          <button type="button" class="btn btn-secondary" @click="htmlVisible = false">
            <i class="fe fe-slash"/>

            {{ $t('cancel') }}
          </button>

          <button type="button" class="btn btn-primary" @click="handleOk">
            <i class="fe fe-check-circle"/>
            {{ $t('ok') }}
          </button>
        </template>
      </a-modal>
    </template>
  </ValidationProvider>
</template>

<script>
import {VueEditor} from 'vue2-editor'
import SelectFile from '@/components/file/SelectFile'

export default {
  name: 'InputHtmlEditor',
  components: {
    SelectFile,
    VueEditor
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
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
    required: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true,
      default: ''
    },
    fileType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      htmlVisible: false,
      htmlContent: '',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'size': ['small', false, 'large', 'huge']}],
        [{'header': [false, 1, 2, 3, 4, 5, 6]}],
        [{'color': []}, {'background': []}],
        [{'align': []}],
        ['custom-image-' + this._uid],
        ['custom-html-' + this._uid],
        ['clean']
      ]
    }
  },

  mounted () {
    const customButton = document.querySelector('.ql-custom-image-' + this._uid)
    customButton.addEventListener('click', this.showSelectImage)

    const htmlButton = document.querySelector('.ql-custom-html-' + this._uid)
    htmlButton.addEventListener('click', this.showHtml)
  },

  computed: {
    quill () {
      return this.$refs.editor.quill
    },
    editorValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  },

  methods: {
    showHtml () {
      this.htmlContent = this.editorValue
      this.htmlVisible = true
    },
    showSelectImage () {
      this.$refs.selectImage.showModal()
    },
    handleOk () {
      this.editorValue = this.htmlContent
      this.htmlVisible = false
    },
    onFileSelect (file, keyName) {
      const range = this.quill.selection.savedRange
      this.quill.insertEmbed(range.index, 'image', file.url)
    }
  }

}
</script>

<style scoped>

</style>
