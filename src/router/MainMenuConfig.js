import {
  faCalendarDays,
  faContactBook,
  faPanorama,
  faPencil,
  // faUser,
  faGear,
  // faUserGear,
  // faUsers,
  faHome,
  faSliders
  // faImage
} from '@fortawesome/free-solid-svg-icons'

const MainMenuConfig = [
  {
    name: 'admin.landing',
    label: 'Landing',
    icon: faHome,
    permissions: ['management read', 'promo read'],
    submenu: [
      // {
      //   name: 'admin.landing.slider.index',
      //   label: 'Slider',
      //   icon: faImage,
      //   route: '/dashboard/slider',
      //   permission: 'management read'
      // },
      {
        name: 'admin.landing.carousel.index',
        label: 'Carousel',
        icon: faSliders,
        route: '/dashboard/carousel',
        permission: 'management read'
      }
    ]
  },
  {
    name: 'admin.about',
    label: 'About Us',
    icon: faGear,
    route: '/dashboard/about',
    permission: 'management read'
  },
  {
    name: 'admin.contact',
    label: 'Contact',
    icon: faContactBook,
    route: '/dashboard/contact',
    permission: 'management read'
  },
  {
    name: 'admin.jobs',
    label: 'Jobs',
    icon: faPencil,
    route: '/dashboard/jobs',
    permission: 'jobs read'
  },
  {
    name: 'admin.katalog',
    label: 'Katalog',
    icon: faPanorama,
    permissions: ['management read', 'katalog read'],
    submenu: [
      {
        name: 'admin.katalog.info.edit',
        label: 'Info',
        icon: faGear,
        route: '/dashboard/katalog/info',
        permission: 'management read'
      },
      {
        name: 'admin.katalog.index',
        label: 'Katalog',
        icon: faPanorama,
        route: '/dashboard/katalog',
        permission: 'katalog read'
      }
    ]
  },
  {
    name: 'admin.promo',
    label: 'Promo',
    icon: faCalendarDays,
    permissions: ['management read', 'promo read'],
    submenu: [
      {
        name: 'admin.promo.info.edit',
        label: 'Info',
        icon: faGear,
        route: '/dashboard/promo/info',
        permission: 'management read'
      },
      {
        name: 'admin.promo.index',
        label: 'Promo',
        icon: faCalendarDays,
        route: '/dashboard/promo',
        permission: 'promo read'
      }
    ]
  }

  // {
  //   name: 'articles',
  //   label: 'Articles',
  //   icon: faNewspaper,
  //   route: '/dashboard/articles',
  //   permission: 'view all articles'
  // },
  // {
  //   name: 'artworks',
  //   label: 'Artworks',
  //   icon: faPanorama,
  //   route: '/dashboard/artworks',
  //   permission: 'view all artworks'
  // },
  // {
  //   name: 'events',
  //   label: 'Events',
  //   icon: faCalendarDays,
  //   route: '/dashboard/events',
  //   permission: 'view all events'
  // },
  // {
  //   name: 'categories',
  //   label: 'Categories',
  //   icon: faLayerGroup,
  //   route: '/dashboard/categories',
  //   permission: 'view all events'
  // },
  // {
  //   name: 'users',
  //   label: 'User',
  //   icon: faUsers,
  //   permissions: ['view roles', 'view users'],
  //   submenu: [
  //     {
  //       name: 'roles',
  //       label: 'Roles',
  //       icon: faUserGear,
  //       route: '/dashboard/roles',
  //       permission: 'view roles'
  //     },
  //     {
  //       name: 'users',
  //       label: 'Users',
  //       icon: faUser,
  //       route: '/dashboard/users',
  //       permission: 'view users'
  //     }
  //   ]
  // }
]

export default MainMenuConfig
