<template>
  <q-page class="q-pa-xl bg-grey-2">
    <q-card flat class="rounded-borders q-mb-xl q-pa-md">
      <q-card-section>
        <div  class="row items-center justify-between q-mb-lg">
          <div class="text-h5 text-weight-bold">Nama Gym</div>
          <q-btn unelevated label="Edit" no-caps class="btn-edit q-px-lg" @click="editInfo" />
        </div>

        <div class="q-gutter-y-md">
          <div class="info-block">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">Nama Gym</div>
            <div class="text-body1">Nama gym a</div>
          </div>

          <div class="info-block">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">Lokasi</div>
            <div class="text-body1 text-grey-9">
              Jl. Telekomunikasi Terusan Buahbatu No.1, Sukapura, Kec. Dayeuhkolot,
              Kabupaten Bandung, Jawa Barat 40257
            </div>
          </div>

          <div class="info-block">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">Jam Operasional</div>
            <div class="text-body1 text-grey-9">
              Senin - Jumat: 06:00 - 22:00, Sabtu - Minggu: 08:00 - 18:00
            </div>
          </div>

          <div class="info-block">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">Deskripsi</div>
            <div class="text-body1 text-grey-8 leading-relaxed">
              Uget Uget Gym menawarkan peralatan canggih, berbagai kelas kebugaran, dan pelatih ahli untuk membantu Anda mencapai tujuan kebugaran Anda. Dengan pilihan keanggotaan yang fleksibel dan suasana yang memotivasi, ini adalah tempat yang sempurna untuk memulai atau melanjutkan perjalanan kebugaran Anda. Rasakan pengalaman latihan yang inovatif dan komunitas yang mendukung.
            </div>
          </div>
        </div>

        <div class="row q-gutter-sm q-mt-md">
          <q-chip
            v-for="tag in tags"
            :key="tag"
            square
            color="grey-8"
            text-color="white"
            class="q-px-md"
          >
            {{ tag }}
          </q-chip>
        </div>

        <div class="text-h6 text-weight-bold q-mt-xl q-mb-md">
          Paket Berlangganan
        </div>

        <div class="row q-col-gutter-lg">
          <div
            v-for="plan in subscriptionPlans"
            :key="plan.id"
            class="col-12 col-sm-4 col-md-3"
          >
            <q-card flat class="package-card bg-grey-1">
              <q-card-section class="q-pa-md">
                <div class="row items-center justify-between q-mb-sm">
                  <div class="text-h6 text-weight-bold">{{ plan.title }}</div>
                  <div class="row q-gutter-xs">
                    <q-btn round dense icon="edit" size="sm" class="btn-icon-edit" @click="editPlan(plan)" />
                    <q-btn round dense icon="delete" size="sm" class="btn-icon-delete" @click="confirmDeletePlan(plan)" />
                  </div>
                </div>

                <div class="text-h5 text-weight-bolder q-mb-md">
                  {{ plan.price }}<span class="text-caption text-weight-regular">/bulan</span>
                </div>

                <div class="feature-container">
                  <div v-for="f in plan.features" :key="f" class="feature-item row no-wrap q-mb-sm">
                    <div class="dot q-mt-xs q-mr-sm"></div>
                    <div class="text-body2">{{ f }}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-4 col-md-3">
            <div class="plan-add-box flex flex-center" @click="addPlan">
              <q-icon name="add" size="48px" color="grey-6" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat class="rounded-borders q-pa-md">
      <q-card-section>
        <div class="text-h5 text-weight-bold text-center q-mb-xl">Fasilitas Gym</div>

        <div class="row q-col-gutter-md q-mb-lg items-center">
          <div class="col">
            <q-input
              outlined
              dense
              v-model="search"
              placeholder="Search..."
              class="bg-white"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-auto">
            <q-btn unelevated label="Tambah" no-caps class="btn-tambah q-px-xl text-weight-bold" @click="goToTambahAlat" />
          </div>
        </div>

        <q-table
          flat
          :rows="equipments"
          :columns="columns"
          row-key="id"
          :filter="search"
          hide-bottom
          class="facilities-table"
        >
          <template v-slot:header="props">
            <q-tr :props="props" class="bg-white">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                :col="col"
                class="text-weight-bolder text-subtitle2"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                unelevated
                label="Detail"
                no-caps
                class="btn-detail q-px-lg"
                @click="goToDetail(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>

  <q-dialog v-model="showAddDialog" persistent>
    <q-card class="dialog-card q-pa-lg">
      <q-btn icon="close" flat round dense v-close-popup class="close-btn text-grey-6" />

      <q-card-section class="text-center q-pb-none">
        <div class="text-h6 text-weight-bolder">
          {{ editingPlanId ? 'Edit Paket Berlangganan' : 'Tambah Paket Berlangganan' }}
        </div>
        <div class="text-caption text-grey-7">Silakan lengkapi detail paket di bawah ini.</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-md q-pt-lg">
        <div>
          <div class="text-subtitle2 q-mb-xs text-weight-bold">Nama Paket</div>
          <q-input
            outlined
            dense
            v-model="newPlan.title"
            placeholder="Contoh: Paket Gold"
            class="custom-input"
          />
        </div>

        <div>
          <div class="text-subtitle2 q-mb-xs text-weight-bold">Harga (per bulan)</div>
          <q-input
            outlined
            dense
            v-model="newPlan.price"
            placeholder="Contoh: Rp 300.000"
            class="custom-input"
          >
            <template v-slot:prepend>
              <q-icon name="payments" size="xs" color="grey-7" />
            </template>
          </q-input>
        </div>

        <div>
          <div class="text-subtitle2 q-mb-xs text-weight-bold">Fasilitas Paket</div>
          <div v-for="(feature, index) in newPlan.features" :key="index" class="row items-center q-mb-sm no-wrap">
            <q-input
              outlined
              dense
              v-model="newPlan.features[index]"
              placeholder="Contoh: Free WiFi"
              class="col custom-input"
            />
            <q-btn
              flat
              round
              color="negative"
              icon="delete_outline"
              size="sm"
              class="q-ml-xs"
              @click="removeFeatureInput(index)"
              v-if="newPlan.features.length > 1"
            />
          </div>
          <q-btn
            outline
            label="Tambah Baris Fasilitas"
            icon="add_circle_outline"
            no-caps
            class="full-width q-mt-sm btn-outline-add"
            @click="addFeatureInput"
          />
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-pt-xl q-pb-md">
        <q-btn
          flat
          label="Batal"
          v-close-popup
          class="btn-action-dialog btn-batal-dialog"
          no-caps
        />
        <q-btn
          unelevated
          label="Simpan Paket"
          class="btn-action-dialog btn-konfirmasi-dialog"
          no-caps
          @click="submitNewPlan"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Delete confirmation dialog for plans (updated to match StaffPage design) -->
  <q-dialog v-model="showDeletePlanDialog" persistent>
    <q-card class="dialog-card q-pa-lg text-center">
      <q-btn icon="close" flat round dense v-close-popup class="close-btn text-grey-6" />

      <q-card-section class="q-pt-md">
        <q-img
          src="../../assets/popup/hapus.png"
          style="width: 150px; height: auto"
          class="q-mb-md"
        />
        <div class="text-h6 text-weight-bolder q-mb-sm">Apakah Anda yakin ingin menghapus paket ini?</div>
        <div class="text-body2 text-grey-8">
          Data paket yang dihapus tidak dapat dipulihkan.
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-pb-md q-gutter-x-md">
        <q-btn flat label="Batal" v-close-popup class="btn-action-dialog btn-batal-dialog" no-caps />
        <q-btn unelevated label="Ya, Hapus Data" class="btn-action-dialog btn-konfirmasi-dialog" no-caps v-close-popup @click="executeDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const search = ref('')
const tags = ['Pilates', 'Sauna', 'GymBro']

const showAddDialog = ref(false)
const showDeletePlanDialog = ref(false)
const planToDelete = ref(null)
const editingPlanId = ref(null)

const newPlan = reactive({
  title: '',
  price: '',
  features: ['']
})

const addFeatureInput = () => {
  newPlan.features.push('')
}

const removeFeatureInput = (index) => {
  newPlan.features.splice(index, 1)
}

const submitNewPlan = () => {
  if (!newPlan.title || !newPlan.price) {
    alert('Nama paket dan harga harus diisi!')
    return
  }

  if (editingPlanId.value) {
    const idx = subscriptionPlans.value.findIndex(p => p.id === editingPlanId.value)
    if (idx !== -1) {
      subscriptionPlans.value[idx] = {
        ...subscriptionPlans.value[idx],
        title: newPlan.title,
        price: newPlan.price,
        features: newPlan.features.filter(f => f.trim() !== '')
      }
    }
  } else {
    subscriptionPlans.value.push({
      id: Date.now(),
      title: newPlan.title,
      price: newPlan.price,
      features: newPlan.features.filter(f => f.trim() !== '')
    })
  }

  showAddDialog.value = false
  newPlan.title = ''
  newPlan.price = ''
  newPlan.features = ['']
  editingPlanId.value = null
}

const subscriptionPlans = ref([
  {
    id: 1,
    title: 'Paket A',
    price: 'Rp 250.000',
    features: [
      'Akses Gym Sepuasnya',
      'Gratis 1x Sesi Personal Trainer',
      'Bebas Akses Semua Kelas',
      'Free WiFi & Locker',
      'Parkir Luas'
    ],
  },
  {
    id: 2,
    title: 'Paket B',
    price: 'Rp 250.000',
    features: [
      'Akses Gym Sepuasnya',
      'Gratis 1x Sesi Personal Trainer',
      'Bebas Akses Semua Kelas',
      'Free WiFi & Locker',
      'Parkir Luas'
    ],
  },
])

const columns = [
  { name: 'name', label: 'Nama Alat', field: 'name', align: 'left' },
  { name: 'qty', label: 'Jumlah', field: 'qty', align: 'center' },
  { name: 'actions', label: '', field: 'actions', align: 'right' },
]

const equipments = ref([])

const defaultEquipments = [
  { id: 1, name: 'Alat 1', qty: 25 },
  { id: 2, name: 'Alat 2', qty: 25 },
]

onMounted(() => {
  try {
    const raw = localStorage.getItem('equipments')
    if (raw) {
      equipments.value = JSON.parse(raw)
    } else {
      equipments.value = defaultEquipments
      localStorage.setItem('equipments', JSON.stringify(defaultEquipments))
    }
  } catch (err) {
    console.warn('Failed to load equipments from localStorage:', err)
    equipments.value = defaultEquipments
  }
})

const addPlan = () => {
  editingPlanId.value = null
  newPlan.title = ''
  newPlan.price = ''
  newPlan.features = ['']
  showAddDialog.value = true
}

const editPlan = (plan) => {
  if (!plan) return
  editingPlanId.value = plan.id
  newPlan.title = plan.title
  newPlan.price = plan.price
  newPlan.features = Array.isArray(plan.features) && plan.features.length ? [...plan.features] : ['']
  showAddDialog.value = true
}

// confirm delete plan (show confirmation dialog)
const confirmDeletePlan = (plan) => {
  planToDelete.value = plan
  showDeletePlanDialog.value = true
}

const executeDelete = () => {
  if (!planToDelete.value) return
  const id = planToDelete.value.id
  subscriptionPlans.value = subscriptionPlans.value.filter(p => p.id !== id)

  $q.notify({ type: 'positive', message: 'Paket berhasil dihapus' })

  planToDelete.value = null
  showDeletePlanDialog.value = false
}

const editInfo = () => {
  router.push('/info/edit')
}

const goToTambahAlat = () => {
  router.push('/info/alat/tambah')
}

const goToDetail = (id) => {
  if (!id) return
  router.push(`/info/alat/${id}`)
}
</script>

<style scoped lang="scss">

.info-block {
  .text-subtitle2 {
    color: #000;
  }
  .leading-relaxed {
    line-height: 1.5;
  }
}

.package-card {
  border-radius: 12px;
  border: 1px solid #edf2f7;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
}

.feature-item {
  .dot {
    width: 4px;
    height: 4px;
    background-color: black;
    border-radius: 50%;
  }
}

.plan-add-box {
  height: 100%;
  min-height: 200px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f8fafc;
    border-color: #94a3b8;
  }
}

.btn-tambah {
  background-color: #0c0c0c;
  color: white;
  border-radius: 8px;
  text-transform: none;
  font-weight: bold;
  height: 40px;
  min-width: 100px;
}

.btn-edit {
  background-color: #2563eb;
  color: white;
  border-radius: 6px;
  text-transform: none;
  font-weight: 500;
  height: 36px;
  padding: 0 12px;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
  border-radius: 6px;
  text-transform: none;
  font-weight: 500;
  height: 36px;
  padding: 0 12px;
}

.btn-icon-edit,
.btn-icon-delete {
  min-width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.btn-icon-edit { background-color: #2563eb; }
.btn-icon-delete { background-color: #ef4444; }

.btn-detail {
  background-color: #0c0c0c;
  color: white;
  border-radius: 8px;
  height: 36px;
  padding: 0 12px;
  font-weight: bold;
  text-transform: none;
}

.facilities-table {
  background: transparent;

  :deep(.q-table th) {
    font-size: 1.1rem;
    border-bottom: none;
  }

  :deep(.q-table td) {
    font-size: 1rem;
    border-bottom: none;
    padding: 16px;
  }

  :deep(.q-table tbody tr:nth-child(even)) {
    background-color: #f8f9fa;
  }

  :deep(.q-table tbody tr:nth-child(odd)) {
    background-color: #ffffff;
  }
}

.dialog-card {
  width: 100%;
  max-width: 450px;
  border-radius: 20px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f0f0f0;
}

.btn-action-dialog {
  width: 140px;
  height: 44px;
  border-radius: 12px;
  font-weight: bold;
}

.btn-batal-dialog {
  background: #f0f0f0;
  color: black;
}

.btn-konfirmasi-dialog {
  background: linear-gradient(to bottom, #a0a0a0, #666666);
  color: white;
}

.btn-action-dialog + .btn-action-dialog {
  margin-left: 12px;
}

/* Gaya tambahan untuk Form di Pop-up */
.custom-input {
  :deep(.q-field__control) {
    border-radius: 10px;
    background-color: #ffffff;
    transition: all 0.3s;

    &:hover {
      background-color: #f8fafc;
    }
  }
}

.btn-outline-add {
  border-radius: 10px;
  border: 1.5px dashed #cbd5e1;
  color: #64748b;
  font-weight: 600;

  &:hover {
    background-color: #f1f5f9;
    border-color: #94a3b8;
  }
}

.dialog-card {
  width: 100%;
  max-width: 480px; /* Sedikit lebih lebar untuk form input */
  border-radius: 24px; /* Sudut lebih membulat */
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
</style>
