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
						<div class="form-group row" v-if="this.fields.title">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.title') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="post.title" :placeholder="$t('common.table.title')"/>
							</div>
						</div>

						<!-- SLug - Url -->
						<div class="form-group row" v-if="this.fields.slug">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.slug') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="post.slug" :placeholder="$t('common.table.slug')"/>
							</div>
						</div>

						<!-- Image -->
						<div class="form-group row" v-if="this.fields.image">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.image') }}</label>

							<div class="col-sm-10">
								<FileUpload mode="basic"
														:name="post.image"
														v-model="post.image"
														:previewWidth="100"
														@upload="onUploadImage"
														accept="image/*"
														:maxFileSize="1000000"
														:chooseLabel="$t('common.text.select_image')"/>
							</div>
						</div>

						<!-- Single Categories -->
						<div class="form-group row" v-if="categories && this.fields.categories">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.categories') }}</label>

							<div class="col-sm-10">
								<Dropdown v-model="post.category_id"
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
						<div class="form-group row" v-if="categories && this.fields.categories">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.categories') }}</label>

							<div class="col-sm-10">
								<MultiSelect v-model="post.category_id"
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
						<div class="form-group row" v-if="this.fields.content">
							<label class="col-sm-2 control-label text-right">{{ $t('common.table.content') }}</label>

							<div class="col-sm-10">
								<Editor v-model="post.content" editorStyle="height: 320px"/>
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
		<pre>{{ post }}</pre>
		<pre>{{ title }}</pre>
	</div>
</template>

<script>
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'
	import PostModel from '../../../models/post.model'

	// Prime
	import InputText from 'primevue/inputtext'
	import Editor from 'primevue/editor'
	import FileUpload from 'primevue/fileupload'
	import Dropdown from 'primevue/dropdown'
	import MultiSelect from 'primevue/multiselect'
	import Calendar from 'primevue/calendar'
	import moment from 'moment'
	import { PostService } from '../../../api'
	import AdminModel from '../../../models/admin.model'

	export default {
		name: 'PostForm',

		props: {
			title: {
				type: String,
				require: true,
				default: () => 'Form',
			},
			post: {
				type: Object,
				default: () => {},
			},
			categories: {
				type: null,
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
				fields: PostModel.fields(),
				dateTimeFormat: 'YYYY-MM-DD H:mm:ss',
				calendarDateTimeFormat: 'yy-mm-dd',
			}
		},

		computed: {
			publish_from: {
				get () {
					return new Date(this.post.publish_from)
				},

				set (value) {
					this.post.publish_from = moment(value).format(this.dateTimeFormat)

					this.post.$save()
				},
			},

			publish_to: {
				get () {
					return new Date(this.post.publish_to)
				},

				set (value) {
					this.post.publish_to = moment(value).format(this.dateTimeFormat)

					this.post.$save()
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
				const ID = this.post.$id

				// save model
				await this.post.$save()

				console.log(ID)

				if (ID) {
					await PostService.update(ID).then(() => {
						this.onRedirect()
					})
				} else {
					await PostService.create(this.post.id).then(() => {
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