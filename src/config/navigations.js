import {
  HomeIcon,
  UserIcon,
  GlobeIcon,
  UsersIcon,
  FileTextIcon,
  ShieldIcon
} from 'vue-feather-icons'

export const navigations = [
  { id: 'home', type: 'item', title: 'dashboard', routeName: 'home', icon: HomeIcon, exact: true },
  { id: 'content', type: 'item', title: 'content', routeName: 'content.index', icon: FileTextIcon },
  { id: 'user', type: 'item', title: 'user', routeName: 'user.index', icon: UserIcon },
  { id: 'company', type: 'item', title: 'company', routeName: 'companies.index', icon: GlobeIcon },
  { id: 'admin', type: 'item', title: 'admin', routeName: 'admin.index', icon: UsersIcon },
  { id: 'role', type: 'item', title: 'role', routeName: 'role.index', icon: ShieldIcon }
]
