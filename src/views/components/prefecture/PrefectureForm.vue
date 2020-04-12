<template>
	<div class="content-section">
		<div class="content-wrapper">
			<!-- Header Table -->
			<ContentHeader :title="title"/>

			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="form-horizontal" @submit.prevent="handleSubmit(onSubmit)">

					<!-- Content Table -->
					<div class="content">
						<div class="card">
							<div class="card-body">
								<!-- Prefecture Code -->
								<ValidationProvider
												:name="$t('common.table.prefecture_code')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.prefecture_code">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.table.prefecture_code') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.prefecture_code"
															 :placeholder="$t('common.table.prefecture_code')"
															 :class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Display name -->
								<ValidationProvider
												:name="$t('common.table.display_name')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.display_name">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.table.display_name') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.display_name"
															 :placeholder="$t('common.table.display_name')"
															 :class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>

								<!-- Display Order -->
								<ValidationProvider
												:name="$t('common.table.display_order')"
												rules="required"
												class="form-group row"
												v-slot="{ errors }"
												v-if="fields.display_order">
									<label class="col-sm-2 control-label text-right">
										{{ $t('common.table.display_order') }}
									</label>

									<div class="col-sm-10">
										<InputText class="form-control"
															 v-model="item.display_order"
															 :placeholder="$t('common.table.display_order')"
															 :class="{'is-invalid': errors.length }"
										/>

										<span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
									</div>
								</ValidationProvider>
							</div>

							<!-- Action Section Submit & Cancel -->
							<div class="card-footer fixed-bottom">
								<button type="button"
												class="btn btn-default float-right"
												@click="onCancel">
									<i class="pi pi-times"/>

									<span>{{ $t('common.button.cancel') }}</span>
								</button>

								<template v-if="$route.params.id">
									<button type="button"
													class="btn btn-danger float-right"
													@click="displayDialog = true">
										<i class="pi pi-trash"/>

										<span>{{ $t('common.button.delete') }}</span>
									</button>
								</template>

								<button type="submit"
												class="btn btn-success float-right mr-1">
									<i class="pi pi-save"/>

									<span>{{$t('common.button.save')}}</span>
								</button>
							</div>
						</div>
					</div>
				</form>
			</ValidationObserver>
		</div>

		<!-- Delete confirmation dialog -->
		<Dialog v-if="$route.params.id"
						:header="$t('common.alert.delete_header')"
						:visible.sync="displayDialog"
						:style="{width: '50vw'}"
						:modal="true">
			{{ $t('common.alert.delete_content') }}

			<template #footer>
				<Button :label="$t('common.yes')" icon="pi pi-check" @click="onDelete($route.params.id)"/>
				<Button :label="$t('common.no')" icon="pi pi-times" @click="displayDialog = false" class="p-button-secondary"/>
			</template>
		</Dialog>

		<!-- Success / Error message -->
		<Toast></Toast>
	</div>
</template>

<script>
	// Components
	import PrefectureModel from '../../../models/prefecture.model'
	import FormMixin from '../../../mixins/form.mixin'
	import { PrefectureService } from '../../../api'

	export default {
		name: 'PrefectureForm',

		mixins: [FormMixin],

		data () {
			return {
				// MUST DEFINE //
				FormService: PrefectureService,
				FormModel: PrefectureModel,

				fields: PrefectureModel.fields(),
			}
		},
	}
</script>

<style scoped>

</style>