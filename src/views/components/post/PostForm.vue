<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="title"/>

		<!-- Content Table -->
		<div class="content">
			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="form-horizontal" @submit.prevent="handleSubmit(onSubmit)">
					<div class="card">
						<div class="card-body">
							<!-- Title -->
							<ValidationProvider
											:name="$t('common.table.title')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.title"
							>
								<label class="col-sm-2 control-label text-right">{{ $t('common.table.title') }}</label>

								<div class="col-sm-10">
									<InputText class="form-control"
														 v-model="post.title"
														 :placeholder="$t('common.table.title')"
														 :class="{'is-invalid': errors.length }"/>

									<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
								</div>
							</ValidationProvider>


							<!-- SLug - Url -->
							<ValidationProvider
											:name="$t('common.table.slug')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.slug"
							>
								<label class="col-sm-2 control-label text-right">{{ $t('common.table.slug') }}</label>

								<div class="col-sm-10">
									<InputText class="form-control"
														 v-model="post.slug"
														 :placeholder="$t('common.table.slug')"
														 :class="{'is-invalid': errors.length }"
									/>

									<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
								</div>
							</ValidationProvider>

							<!-- Image -->
							<ValidationProvider
											:name="$t('common.table.image')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.image"
							>
								<label class="col-sm-2 control-label text-right">{{ $t('common.table.image') }}</label>

								<div class="col-sm-10">
									<FileUpload mode="basic"
															v-model="post.image"
															@upload="onUploadImage"
															accept="image/*"
															:name="post.image"
															:previewWidth="100"
															:maxFileSize="1000000"
															:chooseLabel="$t('common.text.select_image')"
															:class="{'is-invalid': errors.length }"
									/>

									<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
								</div>
							</ValidationProvider>

							<!-- Single Categories -->
							<ValidationProvider
											:name="$t('common.table.categories')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.categories && categories && fields.categories"
							>
								<label class="col-sm-2 control-label text-right">{{ $t('common.table.categories') }}</label>

								<div class="col-sm-10">
									<Dropdown v-model="post.category_id"
														class="form-control"
														multiple="true"
														optionLabel="title"
														optionValue="id"
														:options="categories"
														:placeholder="$t('common.text.select_category')"
														:filter="true"
														:showClear="true"
														:class="{'is-invalid': errors.length }"
									>
										<template #option="slotProps">
											<span>{{slotProps.option.title}}</span>
										</template>
									</Dropdown>

									<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
								</div>
							</ValidationProvider>

							<!-- Multiple Categories -->
							<ValidationProvider
											:name="$t('common.table.categories')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.categories && categories && fields.categories"
							>
								<label class="col-sm-2 control-label text-right">{{ $t('common.table.categories') }}</label>

								<div class="col-sm-10">
									<MultiSelect v-model="post.category_id"
															 class="form-control"
															 optionLabel="title"
															 optionValue="id"
															 :options="categories"
															 :placeholder="$t('common.text.select_category')"
															 :filter="true"
															 :showClear="true"
															 :class="{'is-invalid': errors.length }"
									>
										<template #option="slotProps">
											<span>{{slotProps.option.title}}</span>
										</template>
									</MultiSelect>

									<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
								</div>
							</ValidationProvider>

							<!-- Description -->
							<ValidationProvider
											:name="$t('common.table.content')"
											rules="required"
											class="form-group row"
											v-slot="{ errors }"
											v-if="fields.content"
							>
								<label class="col-sm-2 control-label text-right">{{ $t('common.table.content') }}</label>

								<div class="col-sm-10">
									<Editor v-model="post.content"
													editorStyle="height: 320px"
													:class="{'is-invalid': errors.length }"/>

									<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
								</div>
							</ValidationProvider>

							<!-- Publish -->
							<div class="form-group row" v-if="fields.publish_from && fields.publish_to">
								<label class="col-sm-2 control-label text-right">{{ $t('common.table.publish') }}</label>

								<div class="col-sm-3">
									<ValidationProvider
													:name="$t('common.table.publish_from')"
													rules="required"
													class="form-group row"
													v-slot="{ errors }"
													v-if="fields.publish_from"
									>
										<Calendar class="p-column-filter"
															icon="pi pi-calendar"
															v-model="publish_from"
															hourFormat="24"
															:dateFormat="`${calendarDateTimeFormat}`"
															:showTime="true"
															:showSeconds="true"
															:manualInput="false"
															:class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</ValidationProvider>
								</div>

								<label class="col-sm-1 control-label text-center">{{ $t('common.text.to') }}</label>

								<div class="col-sm-3">
									<ValidationProvider
													:name="$t('common.table.publish_from')"
													rules="required"
													class="form-group row"
													v-slot="{ errors }"
													v-if="fields.publish_to"
									>
										<Calendar class="p-column-filter"
															icon="pi pi-calendar"
															v-model="publish_to"
															hourFormat="24"
															:dateFormat="`${calendarDateTimeFormat}`"
															:showTime="true"
															:showSeconds="true"
															:manualInput="false"
															:class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</ValidationProvider>
								</div>
							</div>
						</div>

						<!-- Action Section Submit & Cancel -->
						<div class="card-footer fixed-bottom">
							<button type="button"
											class="btn btn-default float-right"
											@click="onCancel">
								<i class="pi pi-times"/>

								<span>{{ $t('common.button.cancel') }}</span>
							</button>

							<button type="submit"
											class="btn btn-success float-right mr-1">
								<i class="pi pi-save"/>

								<span>{{$t('common.button.save')}}</span>
							</button>
						</div>
					</div>
				</form>
			</ValidationObserver>
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
				const ID = this.$route.params.id

				// save model
				await this.post.$save()

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