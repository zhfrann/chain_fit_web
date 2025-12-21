const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // The base layout
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'staff',
        component: () => import('pages/StaffPage.vue'),
        meta: { title: 'Staff' },
      },
      {
        path: 'members',
        component: () => import('pages/MemberPage.vue'),
        meta: { title: 'Anggota Gym' },
      }, // Add this
      {
        path: 'info',
        component: () => import('pages/InfoFacilityPage.vue'),
        meta: { title: 'Informasi & Fasilitas' },
      },
    ],
  },

  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },

  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it

  // {
  //   path: '/dashboard',
  //   component: () => import('pages/DashboardPage.vue'),
  // },

  // {
  //   path: '/staff',
  //   component: () => import('pages/StaffPage.vue'),
  // },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
