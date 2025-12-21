<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-header flat class="bg-white text-black border-bottom">
      <q-toolbar class="q-py-sm q-px-lg">
        <q-toolbar-title class="text-h5 text-weight-bold">
          {{ $route.meta.title || 'Dashboard' }}
        </q-toolbar-title>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <q-btn flat round icon="notifications" class="bg-grey-2" size="sm" />
          <q-avatar size="35px">
            <img src="https://i.scdn.co/image/ab67616d00001e02d45ec66aa3cf3864205fd068" />
          </q-avatar>
          <span class="text-weight-medium q-ml-xs">John Doe</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="240" class="q-pa-md">
      <div class="logo-box q-mb-lg text-center text-white text-weight-bold">Logo</div>

      <div class="gym-section q-mb-lg">
        <div class="text-caption text-weight-bold q-mb-xs">Gym</div>
        <div class="row no-wrap q-gutter-xs">
          <q-select
            outlined
            dense
            v-model="selectedGym"
            :options="gymOptions"
            class="col bg-grey-1"
          />
          <q-btn outline color="grey-4" text-color="black" icon="add" class="bg-white" />
        </div>
      </div>

      <q-list>
        <q-item
          v-for="link in menuLinks"
          :key="link.title"
          clickable
          v-ripple
          :to="link.to"
          active-class="nav-active"
          class="rounded-borders q-mb-xs text-grey-8"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" size="20px" />
          </q-item-section>
          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const selectedGym = ref('Urban Gym')
const gymOptions = ['Urban Gym', 'Elite Fitness']

const menuLinks = [
  { title: 'Dashboard', icon: 'grid_view', to: '/dashboard' },
  { title: 'Informasi & Fasilitas', icon: 'info', to: '/info' },
  { title: 'Manajemen Keuangan', icon: 'payments', to: '/finance' },
  { title: 'Staff', icon: 'people', to: '/staff' },
  { title: 'Anggota Gym', icon: 'sentiment_satisfied_alt', to: '/members' },
]
</script>

<style lang="scss">
.logo-box {
  background-color: #0f172a;
  padding: 12px;
  border-radius: 6px;
  font-size: 1.1rem;
}

.border-bottom {
  border-bottom: 1px solid #e2e8f0;
}

.nav-active {
  background-color: #0f172a !important;
  color: white !important;
}
</style>
