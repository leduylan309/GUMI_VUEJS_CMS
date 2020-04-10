<template>
	<!-- Content Table -->
	<div class="content">
		<div class="card">
			<div class="card-body">
				<form class="form-horizontal">
					<!-- Postal code -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.postal_code') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.postcode"
												 :placeholder="$t('common.text.postal_code')"
							/>
						</div>
					</div>

					<!-- City -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.city') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.city"
												 :placeholder="$t('common.text.city')"
							/>
						</div>
					</div>

					<!-- Address -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.address') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.address"
												 :placeholder="$t('common.text.address')"
							/>
						</div>
					</div>

					<!-- Freedial -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.freedial') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.free_dial"
												 :placeholder="$t('common.text.freedial')"
							/>
						</div>
					</div>

					<!-- Phone -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.tel') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.tel"
												 :placeholder="$t('common.text.tel')"
							/>
						</div>
					</div>

					<!-- Fax -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.fax') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.fax"
												 :placeholder="$t('common.text.fax')"
							/>
						</div>
					</div>

					<!-- Email -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.email') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.email"
												 :placeholder="$t('common.text.email')"
							/>
						</div>
					</div>

					<!-- Url -->
					<div class="form-group row">
						<label class="col-sm-2 control-label text-right">
							{{ $t('common.text.website') }}
						</label>

						<div class="col-sm-10">
							<InputText class="form-control"
												 v-model="item.website"
												 :placeholder="$t('common.text.website')"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	// Prime
	import InputText from 'primevue/inputtext'
	import { ContactService } from '../../../api'

	export default {
		name: 'ContactForm',

		props: {
			item: {
				type: Object,
				default: () => {},
			},
		},

		components: {
			InputText,
		},
	}
</script>
