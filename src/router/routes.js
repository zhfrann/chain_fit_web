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
        component: () => import('pages/dashboard/DashboardPage.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'staff',
        component: () => import('pages/staff/StaffPage.vue'),
        meta: { title: 'Staff' },
      },
      {
        path: 'members',
        component: () => import('pages/anggota/MemberPage.vue'),
        meta: { title: 'Anggota Gym' },
      }, // Add this
      {
        path: 'info',
        component: () => import('pages/informasiFasilitas/InfoFacilityPage.vue'),
        meta: { title: 'Informasi & Fasilitas' },
      },
    ],
  },

  {
    path: '/login',
    component: () => import('pages/login/LoginPage.vue'),
  },

  {
    path: '/register',
    component: () => import('pages/register/RegisterPage.vue'),
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
    component: () => import('pages/error/ErrorNotFound.vue'),
  },
]

export default routes
