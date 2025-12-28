<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="row q-gutter-md">
      <!-- Sidebar -->
      <div class="col-12 col-md-3">
        <q-card flat class="sidebar-card">
          <q-card-section class="q-pa-sm">
            <div class="text-subtitle1 text-weight-bold q-mb-md">Menu</div>
            <q-list dense separator>
              <q-item clickable v-ripple @click="goToAnggota" :class="isActive('/anggota') ? 'nav-item-active' : 'nav-item'">
                <q-item-section>Anggota</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="goToStaff" :class="isActive('/staff') ? 'nav-item-active' : 'nav-item'">
                <q-item-section>Staff</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="goToInfo" :class="isActive('/info') ? 'nav-item-active' : 'nav-item'">
                <q-item-section>Informasi</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Main content -->
      <div class="col-12 col-md-9">
        <q-card flat class="rounded-borders shadow-1 q-mb-xl custom-card">
          <q-card-section class="q-pa-xl">
            <div class="text-h5 text-center text-weight-bolder q-mb-xl">Anggota Gym</div>

            <div class="row q-col-gutter-md q-mb-lg items-center">
              <div class="col">
                <q-input outlined dense v-model="filterAnggota" placeholder="Search..." class="search-input">
                  <template v-slot:prepend><q-icon name="search" size="xs" /></template>
                </q-input>
              </div>
              <div class="col-auto">
                <q-btn unelevated class="btn-dark-custom q-px-lg" label="Tambah" @click="goToTambahAnggota" />
              </div>
            </div>

            <q-table
              flat
              :rows="rowsAnggota"
              :columns="columnsAnggota"
              row-key="id"
              :filter="filterAnggota"
              class="custom-table"
              hide-bottom
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip dense text-color="white" :class="props.value === 'Aktif' ? 'bg-positive' : 'bg-negative'" class="status-chip" :label="props.value" />
                </q-td>
              </template>

              <template v-slot:body-cell-masaAktif="props">
                <q-td :props="props">
                  <q-chip dense :class="getMasaAktifClass(props.value)" class="masa-aktif-chip" icon="fiber_manual_record">
                    {{ props.value }} hari
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="text-right no-wrap">
                  <q-btn unelevated dense label="Edit" class="btn-edit q-px-md q-mr-sm" @click="editAnggota(props.row)" />
                  <q-btn unelevated dense label="Hapus" class="btn-delete q-px-md" @click="deleteAnggota(props.row)" />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>

        <q-card flat class="rounded-borders shadow-1 custom-card">
          <q-card-section class="q-pa-xl">
            <div class="text-h5 text-center text-weight-bolder q-mb-xl">Riwayat Absensi</div>
            <q-table flat :rows="rowsAbsensi" :columns="columnsAbsensi" row-key="id" class="custom-table" hide-bottom />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const filterAnggota = ref('')
const rowsAnggota = ref([])

const columnsAnggota = [
  { name: 'nama', align: 'left', label: 'Nama', field: 'nama', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
  { name: 'status', align: 'center', label: 'Status Member', field: 'status' },
  { name: 'masaAktif', align: 'center', label: 'Masa Aktif', field: 'masaAktif' },
  { name: 'actions', align: 'right', label: '', field: 'actions' },
]

onMounted(() => {
  loadMembers()
})

const loadMembers = () => {
  const raw = localStorage.getItem('members')
  if (raw) {
    rowsAnggota.value = JSON.parse(raw)
  }
}

const goToTambahAnggota = () => {
  router.push('/anggota/tambah')
}

const deleteAnggota = (row) => {
  if (confirm(`Hapus ${row.nama}?`)) {
    rowsAnggota.value = rowsAnggota.value.filter(r => r.id !== row.id)
    localStorage.setItem('members', JSON.stringify(rowsAnggota.value))
  }
}

const getMasaAktifClass = (days) => {
  if (days >= 10) return 'bg-green-2 text-green-9'
  if (days > 0) return 'bg-orange-2 text-orange-9'
  return 'bg-red-2 text-red-9'
}

const goToAnggota = () => { router.push('/anggota') }
const goToStaff = () => { router.push('/staff') }
const goToInfo = () => { router.push('/info') }
const isActive = (path) => route.path.startsWith(path)

const rowsAbsensi = ref([
  { id: 1, nama: 'Budi', email: 'budi@gmail.com', tanggal: '2025-12-14', waktu: '18 : 00' }
])

const columnsAbsensi = [
  { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
  { name: 'email', align: 'left', label: 'Email', field: 'email' },
  { name: 'tanggal', align: 'center', label: 'yyyy-MM-dd', field: 'tanggal' },
  { name: 'waktu', align: 'center', label: 'Waktu', field: 'waktu' },
]
</script>

<style lang="scss" scoped>
.custom-card { border-radius: 15px; }
.btn-dark-custom { background-color: #0c0c0c; color: white; border-radius: 8px; font-weight: bold; text-transform: none; }
.custom-table {
  :deep(thead tr th) { font-weight: 800; color: black; border-bottom: none; }
  :deep(tbody tr td) { border-bottom: none; vertical-align: middle; }
}
.status-chip { height: 34px; min-width: 96px; font-weight: 700; border-radius: 10px; }
.masa-aktif-chip { height: 34px; min-width: 110px; font-weight: 700; border-radius: 10px; }
.btn-edit { background-color: #2563eb; color: white; border-radius: 6px; text-transform: none; }
.btn-delete { background-color: #ef4444; color: white; border-radius: 6px; text-transform: none; }

/* Sidebar styles */
.sidebar-card { border-radius: 12px; padding: 8px; background: white; }
.nav-item { border-radius: 8px; padding: 8px 10px; }
.nav-item-active { background: #0c0c0c; color: #fff; border-radius: 8px; padding: 8px 10px; }
</style>
