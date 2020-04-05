<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="$t('post.edit_post')"/>

		<!-- Content Table -->
		<div class="content">
			<div class="card">
				<div class="card-body">
					<form class="form-horizontal">
						<!-- Title -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.title') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="item.title" :placeholder="$t('common.table.title')"/>
							</div>
						</div>

						<!-- SLug - Url -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.slug') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="item.slug" :placeholder="$t('common.table.slug')"/>
							</div>
						</div>

						<!-- Image -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.image') }}</label>

							<div class="col-sm-10">
								<FileUpload mode="basic"
														:name="item.image"
														v-model="item.image"
														:previewWidth="100"
														@upload="onUploadImage"
														accept="image/*"
														:maxFileSize="1000000"
														:chooseLabel="$t('common.text.select_image')"/>
							</div>
						</div>

						<!-- Single Categories -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.categories') }}</label>

							<div class="col-sm-10">
								<Dropdown v-model="item.category_id"
													class="form-control"
													:options="categories"
													:placeholder="$t('common.text.select_category')"
													:filter="true"
													:showClear="true"
													multiple="true"
													optionLabel="title"
													optionValue="id">
									<template #option="slotProps">
										<span>{{slotProps.option.title}}</span>
									</template>
								</Dropdown>
							</div>
						</div>

						<!-- Multiple Categories -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.categories') }}</label>

							<div class="col-sm-10">
								<MultiSelect v-model="item.category_id"
														 class="form-control"
														 :options="categories"
														 :placeholder="$t('common.text.select_category')"
														 :filter="true"
														 :showClear="true"
														 optionLabel="title"
														 optionValue="id"
								>
									<template #option="slotProps">
										<span>{{slotProps.option.title}}</span>
									</template>
								</MultiSelect>
							</div>
						</div>

						<!-- Description -->
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.description') }}</label>

							<div class="col-sm-10">
								<Editor v-model="item.description" editorStyle="height: 320px"/>
							</div>
						</div>
					</form>
				</div>

				<!-- Action Section Submit & Cancel -->
				<div class="card-footer fixed-bottom">
					<button type="button"
									class="btn btn-default float-right"
									@click="onCancel">
						<i class="pi pi-times"/>

						<span>{{ $t('common.button.cancel') }}</span>
					</button>

					<button type="button"
									class="btn btn-success float-right mr-1"
									@click="onSubmit">
						<i class="pi pi-save"/>

						<span>{{$t('common.button.save')}}</span>
					</button>
				</div>
			</div>
		</div>
		<pre>{{ item }}</pre>
	</div>
</template>

<script lang="js">
	// Dummy
	import categories from '../../../dummy/post_categories'

	// Components
	import ContentHeader from '../../components/shared/ContentHeader'

	// Prime
	import InputText from 'primevue/inputtext'
	import Editor from 'primevue/editor'
	import FileUpload from 'primevue/fileupload'
	import Dropdown from 'primevue/dropdown'
	import MultiSelect from 'primevue/multiselect'

	export default {
		name: 'PostEdit',

		components: {
			ContentHeader,
			InputText,
			Editor,
			FileUpload,
			Dropdown,
			MultiSelect,
		},

		data () {
			return {
				item: {},
				categories,
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},

		methods: {
			/**
			 * Action upload Photo
			 */
			onUploadImage () {

			},

			/**
			 * Submit Action
			 */
			onSubmit () {
				console.log(this.item)
			},

			/**
			 * back to previous page
			 */
			onCancel () {
				return this.$router.back()
			},
		},
	}
</script>