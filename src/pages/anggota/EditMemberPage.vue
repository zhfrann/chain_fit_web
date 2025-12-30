<template>
  <q-page class="q-pa-lg bg-grey-2">
    <q-card flat class="rounded-borders shadow-1 custom-card">
      <q-card-section class="q-pa-xl">
        <div class="text-h5 text-center text-weight-bolder q-mb-xl">Pembaruan Keanggotaan</div>

        <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
          <div class="col-12 col-sm-6">
            <div class="text-weight-bold q-mb-sm">Nama</div>
            <q-input
              outlined
              dense
              v-model="form.nama"
              placeholder="Masukkan nama anggota"
              class="custom-input"
              :error="!!errors.nama"
              @update:model-value="errors.nama = ''"
            />
          </div>

          <div class="col-12 col-sm-6">
            <div class="text-weight-bold q-mb-sm">Email</div>
            <q-input
              outlined
              dense
              v-model="form.email"
              placeholder="Masukkan email anggota"
              class="custom-input"
              :error="!!errors.email"
              @update:model-value="errors.email = ''"
            />
          </div>

          <div class="col-12">
            <div class="text-weight-bold q-mb-md">Paket Gym</div>
            <div class="row q-col-gutter-md">
              <div v-for="paket in paketOptions" :key="paket.id" class="col-12 col-sm-4">
                <q-card
                  flat
                  class="paket-card cursor-pointer"
                  :class="{ 'paket-selected': form.selectedPaket === paket.id }"
                  @click="selectPaket(paket.id)"
                >
                  <q-card-section class="row items-center no-wrap q-pa-md">
                    <div class="col">
                      <div class="text-subtitle1 text-weight-bolder">{{ paket.nama }}</div>
                      <div class="text-body2 text-weight-bold">
                        Rp {{ paket.harga.toLocaleString() }}
                      </div>
                    </div>
                    <div class="col-auto row items-baseline">
                      <div class="text-h3 text-weight-bolder">{{ paket.durasi }}</div>
                      <div class="text-caption q-ml-xs">/hari</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div v-if="errors.selectedPaket" class="error-text q-mt-sm">
              {{ errors.selectedPaket }}
            </div>
          </div>
        </div>

        <div class="row justify-end q-mt-xl q-gutter-md">
          <q-btn unelevated no-caps label="Batal" class="btn-batal" @click="goBack" />
          <q-btn unelevated no-caps :label="isEditing ? 'Simpan' : 'Tambah'" class="btn-tambah" @click="onSaveClick" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

// form state
const form = ref({ id: null, nama: '', email: '', selectedPaket: null })

// validation errors
const errors = reactive({
  nama: '',
  email: '',
  selectedPaket: '',
})

const paketOptions = [
  { id: 'A', nama: 'Paket A', harga: 100000, durasi: 90 },
  { id: 'B', nama: 'Paket B', harga: 100000, durasi: 60 },
  { id: 'C', nama: 'Paket C', harga: 100000, durasi: 30 },
]

const goBack = () => router.push('/anggota')

const selectPaket = (id) => {
  form.value.selectedPaket = id
  errors.selectedPaket = ''
}

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

// detect editing mode
const isEditing = computed(() => !!form.value.id)

/*
  submitForm: perform validation and persist changes.
  Returns true when save succeeded, false otherwise.
*/
const submitForm = () => {
  // reset validation errors
  errors.nama = ''
  errors.email = ''
  errors.selectedPaket = ''

  // basic validation
  let ok = true
  if (!form.value.nama || !form.value.nama.trim()) {
    errors.nama = 'Nama wajib diisi'
    ok = false
  }
  if (!form.value.email || !form.value.email.trim()) {
    errors.email = 'Email wajib diisi'
    ok = false
  } else if (!validateEmail(form.value.email)) {
    errors.email = 'Format email tidak valid'
    ok = false
  }
  if (!form.value.selectedPaket) {
    errors.selectedPaket = 'Silakan pilih paket'
    ok = false
    $q.notify({ type: 'warning', message: 'Silakan pilih paket terlebih dahulu' })
  }

  if (!ok) return false

  try {
    const raw = localStorage.getItem('members')
    const members = raw ? JSON.parse(raw) : []

    // find member by id using String comparison
    const memberIndex = members.findIndex(m => String(m.id) === String(form.value.id))

    const paketBaru = paketOptions.find((p) => p.id === form.value.selectedPaket)
    const durasiTambahan = paketBaru ? Number(paketBaru.durasi) : 0

    if (memberIndex !== -1) {
      // EDIT MODE: accumulate days (add to existing masaAktif)
      const existing = members[memberIndex]
      const masaAktifLama = Number(existing.masaAktif) || 0
      existing.nama = form.value.nama
      existing.email = form.value.email
      existing.masaAktif = masaAktifLama + durasiTambahan
      existing.status = 'Aktif'

      $q.notify({
        type: 'positive',
        message: `Berhasil! Masa aktif ditambah ${durasiTambahan} hari. Total: ${existing.masaAktif} hari`
      })
    } else {
      // ADD MODE: create new member with paket duration
      const newMember = {
        id: form.value.id || Date.now(),
        nama: form.value.nama,
        email: form.value.email,
        status: 'Aktif',
        masaAktif: durasiTambahan,
      }
      members.push(newMember)
      $q.notify({ type: 'positive', message: 'Anggota baru berhasil ditambahkan' })
    }

    // persist
    localStorage.setItem('members', JSON.stringify(members))

    return true
  } catch (err) {
    console.error('Error saat submit:', err)
    $q.notify({ type: 'negative', message: 'Terjadi kesalahan saat menyimpan data' })
    return false
  }
}

/*
  onSaveClick: wrapper invoked by the Save button.
  Calls submitForm(); if it returns true then navigate back to /anggota.
*/
const onSaveClick = () => {
  const saved = submitForm()
  if (saved) {
    // Notify other parts of the app (same tab) that members changed
    // MemberPage will listen to this event and reload its data
    try {
      window.dispatchEvent(new Event('members:updated'))
    } catch (e) {
      // ignore if dispatch fails for any reason
      console.warn('Failed to dispatch members:updated event', e)
    }

    router.push('/anggota')
  }
}

// prefill form when route has id
onMounted(() => {
  const id = route.params.id
  if (!id) return
  try {
    const raw = localStorage.getItem('members')
    const members = raw ? JSON.parse(raw) : []
    // ensure robust ID comparison
    const member = members.find(m => String(m.id) === String(id))
    if (member) {
      form.value.id = member.id
      form.value.nama = member.nama || ''
      form.value.email = member.email || ''
      // do not auto-set selectedPaket; user chooses package to add days
      form.value.selectedPaket = null
    }
  } catch (err) {
    console.warn('Failed to load member for edit:', err)
  }
})
</script>

<style lang="scss" scoped>
.custom-card {
  border-radius: 15px;
  max-width: 1000px;
  margin: 0 auto;
}

/* Input Border Hitam Tegas sesuai gambar */
.custom-input :deep(.q-field__control) {
  border-radius: 10px;
  background-color: white;
  border: 1.5px solid #000;
  &:before, &:after { display: none; } /* Sembunyikan default border quasar */
}

/* Card Paket dengan Gradasi Abu-abu sesuai gambar */
.paket-card {
  border-radius: 10px;
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  color: white;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

/* Efek saat paket dipilih */
.paket-selected {
  background: linear-gradient(135deg, #475569 0%, #1e293b 100%);
  border-color: #0c0c0c;
  transform: translateY(-2px);
}

/* Styling Angka Durasi agar besar (90, 60, 30) */
.text-h3 {
  line-height: 1;
  letter-spacing: -2px;
}

/* Tombol Batal Merah */
.btn-batal {
  background-color: #e53935;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  height: 40px;
  padding: 0 25px;
}

/* Tombol Tambah Hitam / Simpan */
.btn-tambah {
  background-color: #0c0c0c;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  height: 40px;
  padding: 0 35px;
}

.error-text {
  color: #ef4444;
  font-size: 13px;
  font-weight: 600;
}
</style>
