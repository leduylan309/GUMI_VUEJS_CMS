<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="$t('user.edit_user')"/>

		<!-- Content Table -->
		<div class="content">
			<div class="card">
				<div class="card-body">
					<form class="form-horizontal">
						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.text.name') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="item.name" :placeholder="$t('common.text.name')"/>
							</div>
						</div>

						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.text.email') }}</label>

							<div class="col-sm-10">
								<InputText class="form-control" v-model="item.email" :placeholder="$t('common.text.email')"/>
							</div>
						</div>

						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.text.password') }}</label>

							<div class="col-sm-10">
								<Password class="form-control" v-model="item.password"/>
							</div>
						</div>

						<div class="form-group row">
							<label class="col-sm-2 control-label text-right">{{ $t('common.text.activate') }}</label>

							<div class="col-sm-10">
								<InputSwitch class="p-display--block" v-model="item.activate"/>
							</div>
						</div>
					</form>
				</div>

				<div class="card-footer fixed-bottom">
					<button type="button" class=" btn btn-default float-right">
						<i class="pi pi-times"/>

						<span>{{ $t('common.button.cancel') }}</span>
					</button>

					<button type="button" class="btn btn-success float-right mr-1">
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
	// Components
	import ContentHeader from '../../components/shared/ContentHeader'

	// Prime
	import InputText from 'primevue/inputtext'
	import InputSwitch from 'primevue/inputswitch'
	import Password from 'primevue/password'

	export default {
		name: 'UserEdit',

		components: {
			ContentHeader,
			InputText,
			InputSwitch,
			Password,
		},

		data () {
			return {
				item: {},
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},

	}
</script>