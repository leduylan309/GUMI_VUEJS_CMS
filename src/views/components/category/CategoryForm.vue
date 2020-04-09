<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="title"/>

		<!-- Content Table -->
		<div class="content">
			<div class="card">
				<div class="card-body">
					<form class="form-horizontal">
						<!-- Title -->
						<div class="form-group row" v-if="this.fields.name">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.name') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="category.name" :placeholder="$t('common.table.name')"/>
							</div>
						</div>

						<!-- SLug - Url -->
						<div class="form-group row" v-if="this.fields.display_name">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.display_name') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="category.display_name" :placeholder="$t('common.table.display_name')"/>
							</div>
						</div>

						<!-- Image -->
						<div class="form-group row" v-if="this.fields.image">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.image') }}</label>

							<div class="col-sm-10">
								<FileUpload mode="basic"
														:name="category.image"
														v-model="category.image"
														:previewWidth="100"
														@upload="onUploadImage"
														accept="image/*"
														:maxFileSize="1000000"
														:chooseLabel="$t('common.text.select_image')"/>
							</div>
						</div>

						<!-- Description -->
						<div class="form-group row" v-if="this.fields.content">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.content') }}</label>

							<div class="col-sm-10">
								<Editor v-model="category.content" editorStyle="height: 320px"/>
							</div>
						</div>

						<!-- Publish -->
						<div class="form-group row" v-if="this.fields.publish_from && this.fields.publish_to">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.publish') }}</label>

							<div class="col-sm-3">
								<Calendar class="p-column-filter"
													icon="pi pi-calendar"
													v-model="publish_from"
													:dateFormat="`${calendarDateTimeFormat}`"
													hourFormat="24"
													:showTime="true"
													:showSeconds="true"
													:manualInput="false"/>
							</div>
							<label class="col-sm-1 control-label text-center">{{ $t('common.text.to') }}</label>
							<div class="col-sm-3">
								<Calendar class="p-column-filter"
													icon="pi pi-calendar"
													v-model="publish_to"
													:dateFormat="`${calendarDateTimeFormat}`"
													hourFormat="24"
													:showTime="true"
													:showSeconds="true"
													:manualInput="false"/>
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
		<pre>{{ category }}</pre>
		<pre>{{ title }}</pre>
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'
	import CategoryModel from '../../../models/category.model'

	// Prime
	import InputText from 'primevue/inputtext'
	import Editor from 'primevue/editor'
	import FileUpload from 'primevue/fileupload'
	import Dropdown from 'primevue/dropdown'
	import MultiSelect from 'primevue/multiselect'
	import Calendar from 'primevue/calendar'
	import moment from 'moment'
	import { CategoryService } from '../../../api'

	export default {
		name: 'CategoryForm',

		props: {
			title: {
				type: String,
				require: true,
				default: () => 'Form',
			},
			category: {
				type: Object,
				default: () => {},
			},
			listName: {
				type: String,
				default: () => 'Dashboard',
			},
		},

		components: {
			ContentHeader,
			InputText,
			Editor,
			FileUpload,
			Dropdown,
			MultiSelect,
			Calendar,
		},

		data () {
			return {
				fields: CategoryModel.fields(),
				dateTimeFormat: 'YYYY-MM-DD H:mm:ss',
				calendarDateTimeFormat: 'yy-mm-dd',
			}
		},

		computed: {
			publish_from: {
				get () {
					return new Date(this.category.publish_from)
				},

				set (value) {
					this.category.publish_from = moment(value).format(this.dateTimeFormat)

					this.category.$save()
				},
			},

			publish_to: {
				get () {
					return new Date(this.category.publish_to)
				},

				set (value) {
					this.category.publish_to = moment(value).format(this.dateTimeFormat)

					this.category.$save()
				},
			},
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
			async onSubmit () {
				const ID = this.$route.params.id

				// save model
				await this.category.$save()

				if (ID) {
					await CategoryService.update(ID).then(() => {
						this.onRedirect()
					})
				} else {
					await CategoryService.create(this.category.id).then(() => {
						this.onRedirect()
					})
				}
			},

			/**
			 * back to previous page
			 */
			onCancel () {
				return this.$router.back()
			},

			/**
			 * Redirect to list name
			 * @return {Promise<Route>}
			 */
			onRedirect () {
				return this.$router.push({ name: this.listName })
			},
		},
	}
</script>

<style scoped>

</style>