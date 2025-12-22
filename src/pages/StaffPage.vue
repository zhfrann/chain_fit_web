<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="q-mb-md text-h5 text-weight-bold">Staff</div>

    <q-card flat class="rounded-borders shadow-1">
      <q-card-section class="q-pa-lg">
        <div class="text-h6 text-center text-weight-bold q-mb-md">Staff</div>

        <div class="row q-col-gutter-md q-mb-lg items-center">
          <div class="col-12 col-sm-9">
            <q-input outlined dense v-model="filter" placeholder="Search..." class="bg-white">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-3 text-right">
            <q-btn
              unelevated
              class="full-width btn-dark-custom"
              label="Tambah"
              @click="addMember"
            />
          </div>
        </div>

        <q-table
          flat
          :rows="rows"
          :columns="columns"
          row-key="id"
          :filter="filter"
          class="member-table"
          :pagination="{ rowsPerPage: 10 }"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="text-right">
              <q-btn
                unelevated
                dense
                label="Edit"
                class="btn-edit q-px-md q-mr-sm"
                @click="editMember(props.row)"
              />
              <q-btn
                unelevated
                dense
                label="Hapus"
                class="btn-delete q-px-md"
                @click="deleteMember(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const filter = ref('')

const columns = [
  { name: 'nama', align: 'left', label: 'Nama', field: 'nama', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
  { name: 'actions', align: 'right', label: 'Aksi', field: 'actions' },
]

const rows = ref([
  { id: 1, nama: 'Budi', email: 'budi@gmail.com' },
  { id: 2, nama: 'Dodit', email: 'dodit@gmail.com' },
  { id: 3, nama: 'Siti', email: 'sity@gmail.com' },
  { id: 4, nama: 'Akmal', email: 'akmal@gmail.com' },
  { id: 5, nama: 'Joko', email: 'joko@gmail.com' },
  { id: 1, nama: 'Budi', email: 'budi@gmail.com' },
  { id: 2, nama: 'Dodit', email: 'dodit@gmail.com' },
  { id: 3, nama: 'Siti', email: 'sity@gmail.com' },
  { id: 4, nama: 'Akmal', email: 'akmal@gmail.com' },
  { id: 5, nama: 'Joko', email: 'joko@gmail.com' },
])

// Functions
const addMember = () => {
  $q.dialog({
    title: 'Tambah Anggota',
    message: 'Masukkan nama anggota baru:',
    prompt: { model: '', type: 'text' },
    cancel: true,
    persistent: true,
  }).onOk((name) => {
    if (name) {
      rows.value.push({
        id: Date.now(),
        nama: name,
        email: name.toLowerCase().replace(' ', '') + '@gmail.com',
      })
    }
  })
}

const editMember = (member) => {
  $q.dialog({
    title: 'Edit Anggota',
    message: `Ubah nama untuk ${member.email}:`,
    prompt: { model: member.nama, type: 'text' },
    cancel: true,
  }).onOk((newName) => {
    const target = rows.value.find((r) => r.id === member.id)
    if (target) target.nama = newName
  })
}

const deleteMember = (member) => {
  $q.dialog({
    title: 'Hapus Anggota',
    message: `Apakah Anda yakin ingin menghapus ${member.nama}?`,
    cancel: true,
    ok: { color: 'negative', label: 'Hapus' },
  }).onOk(() => {
    rows.value = rows.value.filter((r) => r.id !== member.id)
  })
}
</script>

<style lang="scss" scoped>
.btn-dark-custom {
  background-color: #0f172a;
  color: white;
  border-radius: 6px;
  text-transform: none;
  font-weight: 600;
  height: 40px;
}

.btn-edit {
  background-color: #2563eb;
  color: white;
  text-transform: none;
  border-radius: 6px;
}

.btn-delete {
  background-color: #dc2626;
  color: white;
  text-transform: none;
  border-radius: 6px;
}

.member-table {
  background: transparent;

  :deep(thead tr th) {
    font-weight: bold;
    color: #1e293b;
    border-bottom: 1px solid #e2e8f0;
  }

  :deep(tbody tr td) {
    color: #334155;
  }
}
</style>
