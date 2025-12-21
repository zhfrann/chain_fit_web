<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-header flat class="bg-white text-black q-py-sm q-px-md">
      <q-toolbar>
        <q-toolbar-title class="text-h4 text-weight-bold"> Dashboard </q-toolbar-title>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <q-btn flat round dense icon="notifications" class="bg-grey-2" @click="showNotif" />
          <q-avatar size="40px">
            <img src="/dashboard_arzu/assets/kamera-depan.jpg" />
          </q-avatar>
          <span class="text-weight-medium">Ferry</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="260" class="q-pa-md">
      <div class="logo-box q-mb-xl text-center text-white text-weight-bold">Logo</div>

      <div class="text-subtitle2 text-weight-bold q-mb-xs">Gym</div>
      <div class="row no-wrap q-gutter-xs q-mb-lg">
        <q-btn
          unelevated
          class="full-width bg-grey-3 text-grey-7 text-capitalize"
          label="Tidak ada Gym"
          align="left"
        />
        <q-btn outline color="grey-4" text-color="black" icon="add" @click="addGym" />
      </div>

      <q-list>
        <q-item
          v-for="link in menuLinks"
          :key="link.title"
          clickable
          v-ripple
          :to="link.to"
          active-class="menu-active"
          class="rounded-borders q-mb-sm text-grey-7"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" size="20px" />
          </q-item-section>
          <q-item-section>
            {{ link.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-xl flex flex-center">
        <div class="content-card full-width bg-white q-pa-xl text-center shadow-1">
          <h2 class="text-h5 text-weight-bold q-mb-xl">Anda belum memiliki Gym</h2>
          <q-btn
            outline
            padding="12px 30px"
            color="grey-4"
            text-color="black"
            label="Tambahkan Gym Anda +"
            class="btn-tambah text-capitalize"
            @click="addGym"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const leftDrawerOpen = ref(false)

const menuLinks = [
  { title: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { title: 'Informasi & Fasilitas', icon: 'info', to: '/info' },
  { title: 'Manajemen Keuangan', icon: 'payments', to: '/finance' },
  { title: 'Staff', icon: 'people', to: '/staff' },
  { title: 'Anggota Gym', icon: 'sentiment_satisfied_alt', to: '/members' },
]

const addGym = () => {
  $q.notify({
    message: 'Fitur tambah gym',
    color: 'primary',
    position: 'top',
  })
}

const showNotif = () => {
  alert('Tidak ada notifikasi')
}
</script>

<style lang="scss">
.logo-box {
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 8px;
}

.menu-active {
  background-color: #1e293b !important;
  color: white !important;
}

.content-card {
  border-radius: 12px;
  max-width: 900px;
}

.btn-tambah {
  border: 2px solid #ddd !important;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    background-color: #2c3e50 !important;
    color: white !important;
    border-color: #2c3e50 !important;
  }
}
</style>
