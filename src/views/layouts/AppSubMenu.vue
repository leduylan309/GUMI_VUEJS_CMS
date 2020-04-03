<template>
	<ul class="nav nav-pills nav-sidebar flex-column"
			v-if="items"
			:class="{'nav-pills nav-sidebar flex-column': root, 'nav-treeview': !root}"
	>
		<template v-for="(item,i) of items">
			<li v-if="!item.meta.hidden"
					class="nav-item has-treeview"
					:key="i"
					:class="[{'menu-open': activeIndex === i}]">
				<router-link v-if="!item.children && (item.path || item.path === '')"
										 :to="{name: item.name}"
										 :class="[{'active': activeIndex === i}]"
										 class="nav-link"
										 @click.native="onMenuItemClick($event,item,i)"
										 exact>
					<i :class="item.meta.icon"/>

					<p>{{item.meta.label}}</p>

					<i v-if="item.children" class="right pi pi-fw pi-angle-down menuitem-toggle-icon"/>
				</router-link>

				<a v-if="item.children && item.path"
					 href="#"
					 class="nav-link"
					 :class="[{'active': activeIndex === i}]"
					 @click="onMenuItemClick($event,item,i)">
					<i :class="item.meta.icon"/>

					<p>{{item.meta.label}}</p>

					<i v-if="item.children" class="right pi pi-fw pi-angle-left menuitem-toggle-icon"/>
				</a>

				<transition>
					<AppSubMenu v-show="activeIndex === i"
											:items="item.children"
											:root="false"
											@menuitem-click="$emit('menuitem-click', $event)"/>
				</transition>
			</li>
		</template>
	</ul>
</template>
<script lang="js">
	import AppSubMenu from './AppSubMenu.vue'

	export default {
		name: 'AppSubMenu',

		components: {
			AppSubMenu,
		},

		props: {
			items: Array,
			root: Boolean,
		},

		data () {
			return {
				activeIndex: null,
			}
		},

		methods: {
			/**
			 * action click on menu
			 * @param event
			 * @param item
			 * @param index
			 */
			onMenuItemClick (event, item, index) {
				if (item.disabled) {
					event.preventDefault()
					return
				}

				if (!item.to && !item.url) {
					event.preventDefault()
				}

				this.activeIndex = index === this.activeIndex ? null : index
			},
		},
	}
</script>