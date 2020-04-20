<template>
	<ValidationProvider
					:name="$t('common.table.image')"
					rules="required"
					class="form-group row"
					v-slot="{ errors }">
		<label class="col-sm-2 control-label text-right">
			{{ $t('common.table.image') }}
		</label>

		<div class="col-sm-10">
			<FileUpload mode="basic"
									@select="onUploadImage"
									v-model="assets"
									accept="image/*"
									:maxFileSize="1000000"
									:chooseLabel="$t('common.text.select_image')"
									:class="{'is-invalid': errors.length }"
									ref="fileUpload">
			</FileUpload>

			<!--Preview image -->
			<div v-if="previewImage || (assets.length && assets[0].path)">
				<img :src="previewImage || assets[0].path" alt="Preview Image" width="200"/>
			</div>

			<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
		</div>
	</ValidationProvider>
</template>

<script>
	import { AssetService } from '../../../api'
	import AssetModel from '../../../models/asset.model'
	import FileUpload from 'primevue/fileupload'

	export default {
		name: 'ImageUpload',
		components: {
			FileUpload
		},

		props: {
			value: {
				type: Array,
				require: true,
				default: () => [],
			}
		},

		data () {
			return {
				previewImage: null
			}
		},

		computed: {
			assets: {
				get () {
					return this.value
				},
				set (val) {
					return this.$emit('input', val)
				}
			}
		},

		methods: {
			/**
			 * Action upload Photo
			 */
			onUploadImage (data) {
				const formData = new FormData()
				formData.append('assets[]', data.files[0])

				AssetService.upload(formData).then(() => {
					// clear input file
					this.$refs.fileUpload.clear()

					// get latest image
					let newItem = AssetModel.query().last()
					this.previewImage = newItem.path

					// add new image to item asset
					this.assets = [].concat(newItem)

					// show message success
					this.$toast.add({
						severity: this.$t('common.alert.message_success'),
						summary: this.$t('common.alert.upload_message_successfully'),
						life: 3000,
					})
				}).catch((err) => {
					console.log(err)
					this.$toast.add({
						severity: this.$t('common.alert.message_error'),
						summary: this.$t('common.alert.upload_message_error'),
					})
				})
			},
		},
	}
</script>

<style scoped>

</style>