import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/GuestLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/guest/Index.vue'),
        meta: {
          pageTitle: 'Home'
        }
      },
      {
        path: '/about',
        name: 'guest.about',
        component: () => import('@/views/guest/about/Index.vue'),
        meta: {
          pageTitle: 'About'
        }
      },
      {
        path: '/contact',
        name: 'guest.contact',
        component: () => import('@/views/guest/contact/Index.vue'),
        meta: {
          pageTitle: 'Contact'
        }
      },
      {
        path: '/jobs',
        name: 'guest.jobs',
        component: () => import('@/views/guest/jobs/Index.vue'),
        meta: {
          pageTitle: 'Jobs'
        }
      },
      {
        path: '/katalog',
        name: 'guest.katalog',
        component: () => import('@/views/guest/katalog/Index.vue'),
        meta: {
          pageTitle: 'Katalog'
        }
      },
      {
        path: '/promo',
        name: 'guest.promo',
        component: () => import('@/views/guest/promo/Index.vue'),
        meta: {
          pageTitle: 'Promo'
        }
      }
      // {
      //   path: '/articles',
      //   name: 'article',
      //   component: () => import('@/views/guest/articles/Index.vue'),
      //   meta: {
      //     pageTitle: 'Article'
      //   }
      // },
      // {
      //   path: '/articles/:slug',
      //   name: 'detail article',
      //   component: () => import('@/views/guest/articles/Show.vue')
      // },
      // {
      //   path: '/events',
      //   name: 'event',
      //   component: () => import('@/views/guest/Event.vue'),
      //   meta: {
      //     pageTitle: 'Event'
      //   }
      // },
      // {
      //   path: '/artworks',
      //   name: 'pojok karya',
      //   component: () => import('@/views/guest/artworks/Index.vue'),
      //   meta: {
      //     pageTitle: 'Pojok Karya'
      //   }
      // },
      // {
      //   path: '/artworks/:slug',
      //   name: 'detail pojok karya',
      //   component: () => import('@/views/guest/artworks/Show.vue'),
      //   meta: {
      //     pageTitle: 'Pojok Karya'
      //   }
      // },
      // {
      //   path: '/magazine',
      //   name: 'magazine',
      //   component: () => import('@/views/guest/magazines/Index.vue'),
      //   meta: {
      //     pageTitle: 'Magazine'
      //   }
      // },
      // {
      //   path: '/submit-artwork',
      //   name: 'form pengiriman karya',
      //   component: () => import('@/views/guest/Submit.vue'),
      //   meta: {
      //     pageTitle: 'Form Pengiriman Karya'
      //   }
      // }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/dashboard-layout/DashboardLayout.vue'),
    meta: {
      middleware: 'auth'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: {
          pageTitle: 'Dashboard',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/carousel',
        name: 'admin.landing.carousel.index',
        component: () => import('@/views/dashboard/carousel/Index.vue'),
        meta: {
          pageTitle: 'Carousel',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/carousel/create',
        name: 'admin.landing.carousel.create',
        component: () => import('@/views/dashboard/carousel/Create.vue'),
        meta: {
          pageTitle: 'Carousel',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/carousel/:id/edit',
        name: 'admin.landing.carousel.edit',
        component: () => import('@/views/dashboard/carousel/Edit.vue'),
        meta: {
          pageTitle: 'Carousel',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/about',
        name: 'admin.about.index',
        component: () => import('@/views/dashboard/info-about/Edit.vue'),
        meta: {
          pageTitle: 'About Info',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/contact',
        name: 'admin.contact',
        component: () => import('@/views/dashboard/info-contact/Edit.vue'),
        meta: {
          pageTitle: 'Contact',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/jobs',
        name: 'admin.jobs',
        component: () => import('@/views/dashboard/info-jobs/Edit.vue'),
        meta: {
          pageTitle: 'Jobs',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/katalog',
        name: 'admin.katalog',
        component: () => import('@/views/dashboard/katalog/Index.vue'),
        meta: {
          pageTitle: 'Katalog',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/katalog/create',
        name: 'admin.katalog.create',
        component: () => import('@/views/dashboard/katalog/Create.vue'),
        meta: {
          pageTitle: 'Katalog',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/katalog/:id/edit',
        name: 'admin.katalog.edit',
        component: () => import('@/views/dashboard/katalog/Edit.vue'),
        meta: {
          pageTitle: 'Katalog',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/katalog/info',
        name: 'admin.katalog.info',
        component: () => import('@/views/dashboard/info-katalog/Edit.vue'),
        meta: {
          pageTitle: 'Katalog Info',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/promo',
        name: 'admin.promo.index',
        component: () => import('@/views/dashboard/promo/Index.vue'),
        meta: {
          pageTitle: 'Promo',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/promo/info',
        name: 'admin.promo.info.edit',
        component: () => import('@/views/dashboard/info-promo/Edit.vue'),
        meta: {
          pageTitle: 'Promo Info',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/promo/create',
        name: 'admin.promo.create',
        component: () => import('@/views/dashboard/promo/Create.vue'),
        meta: {
          pageTitle: 'Create Promo',
          permission: 'dashboard'
        }
      },
      {
        path: '/dashboard/promo/:id/edit',
        name: 'admin.promo.edit',
        component: () => import('@/views/dashboard/promo/Edit.vue'),
        meta: {
          pageTitle: 'Edit Promo',
          permission: 'dashboard'
        }
      }
      // {
      //   path: '/dashboard/categories',
      //   name: 'categories',
      //   component: () => import('@/views/dashboard/categories/Index.vue'),
      //   meta: {
      //     pageTitle: 'Categories',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/articles',
      //   name: 'articles.index',
      //   component: () => import('@/views/dashboard/articles/Index.vue'),
      //   meta: {
      //     pageTitle: 'Articles',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/articles/create',
      //   name: 'articles.create',
      //   component: () => import('@/views/dashboard/articles/Create.vue'),
      //   meta: {
      //     pageTitle: 'Create Articles',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/articles/:slug',
      //   name: 'articles.show',
      //   component: () => import('@/views/dashboard/articles/Show.vue'),
      //   meta: {
      //     pageTitle: 'Articles',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/articles/:slug/edit',
      //   name: 'articles.edit',
      //   component: () => import('@/views/dashboard/articles/Edit.vue'),
      //   meta: {
      //     pageTitle: 'Edit Articles',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/events',
      //   name: 'events',
      //   component: () => import('@/views/dashboard/events/Index.vue'),
      //   meta: {
      //     pageTitle: 'Events',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/events/create',
      //   name: 'create events',
      //   component: () => import('@/views/dashboard/events/Create.vue'),
      //   meta: {
      //     pageTitle: 'Events',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/artworks',
      //   name: 'artworks',
      //   component: () => import('@/views/dashboard/artworks/Index.vue'),
      //   meta: {
      //     pageTitle: 'Artworks',
      //     permission: 'dashboard'
      //   }
      // },
      // {
      //   path: '/dashboard/artworks/create',
      //   name: 'create artwork',
      //   component: () => import('@/views/dashboard/artworks/Create.vue'),
      //   meta: {
      //     pageTitle: 'Create Artwork',
      //     permission: 'dashboard'
      //   }
      // }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: {
      middleware: 'guest'
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: {
          pageTitle: 'Login'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: {
          pageTitle: 'Register'
        }
      },
      {
        path: '/verify-email/:id',
        name: 'verification.notice',
        component: () => import('@/views/auth/VerifyNotification.vue'),
        meta: {
          pageTitle: 'Verify Email'
        }
      },
      {
        path: '/verify-email/:id/:hash',
        name: 'verification.verify',
        component: () => import('@/views/auth/VerifyEmail.vue'),
        meta: {
          pageTitle: 'Verify Email'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/SystemLayout.vue'),
    meta: {
      middleware: 'redirectOnly'
    },
    children: [
      {
        // the 404 route, when none of the above matches
        path: '/404',
        name: '404',
        component: () => import('@/views/Error404.vue'),
        meta: {
          pageTitle: 'Error 404'
        }
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/Error500.vue'),
        meta: {
          pageTitle: 'Error 500'
        }
      },
      {
        path: '/maintenance',
        name: 'maintenance',
        component: () => import('@/views/Maintenance.vue'),
        meta: {
          pageTitle: 'Under Maintenance'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll toc the top of the page.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: 'smooth'
      }
    } else {
      return {
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  if (to.name) {
    // Start the route progress bar.
    nProgress.start()
  }

  const authStore = useAuthStore()

  // current page view title
  if (to.meta.pageTitle) {
    document.title = `${to.meta.pageTitle} | ${import.meta.env.VITE_APP_NAME}`
  } else {
    document.title = import.meta.env.VITE_APP_NAME
  }

  // verify auth token before each page change
  await authStore.verifyAuth()

  // before page access check if page requires authentication
  if (to.meta.middleware == 'auth') {
    if (authStore.isAuthenticated) {
      // check permissions
      if (to.meta.permission && !authStore.user.permissions.includes(to.meta.permission)) {
        next({ name: '404' })
      } else {
        next()
      }
    } else {
      next({ name: 'login' })
    }
  } else if (to.meta.middleware == 'guest' && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
  } else if (to.meta.middleware == 'redirectOnly') {
    if (!to.redirectedFrom) {
      next({ name: '404' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  nProgress.done()
})

export default router
