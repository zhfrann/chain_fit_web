<template>
  <q-page class="bg-grey-1 q-pa-lg">

    <q-card flat class="main-card q-pa-xl">
      <div class="text-h5 text-weight-bolder text-center q-mb-xl">Tambah Staff</div>

      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-8">
          <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
            <div class="col-12 col-sm-6">
              <label class="text-weight-bold block q-mb-xs">Nama</label>
              <q-input
                outlined
                v-model="form.nama"
                placeholder="Masukkan nama lengkap"
                dense
                class="custom-input"
              />
            </div>
            <div class="col-12 col-sm-6">
              <label class="text-weight-bold block q-mb-xs">Username</label>
              <q-input
                outlined
                v-model="form.username"
                placeholder="Masukkan username"
                dense
                class="custom-input"
              />
            </div>
            <div class="col-12 col-sm-6">
              <label class="text-weight-bold block q-mb-xs">Email</label>
              <q-input
                outlined
                v-model="form.email"
                placeholder="Masukkan email aktif"
                dense
                class="custom-input"
              />
            </div>
            <div class="col-12 col-sm-6">
              <label class="text-weight-bold block q-mb-xs">Password</label>
              <q-input
                outlined
                type="password"
                v-model="form.password"
                placeholder="Masukkan password (min. 6 karakter)"
                dense
                class="custom-input"
              />
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4 flex justify-center">
          <div class="photo-wrapper">
            <q-img
              src="../../assets/staff/rora.jpeg"
              class="photo-img"
              fit="cover"
            />
          </div>
        </div>
      </div>

      <div class="row justify-end q-mt-xl q-gutter-md">
        <q-btn
          unelevated
          label="Batal"
          class="btn-action btn-cancel"
          @click="goBack"
        />
        <q-btn
          unelevated
          label="Tambah"
          class="btn-action btn-save"
          @click="submitForm"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  nama: '',
  username: '',
  email: '',
  password: ''
})

const goBack = () => router.push('/staff')
const submitForm = () => {
  console.log('Submit:', form.value)
  goBack()
}
</script>

<style lang="scss" scoped>
// Kotak Putih Utama
.main-card {
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03) !important;
}

// Custom Input agar Border Tipis & Rounded
.custom-input {
  :deep(.q-field__control) {
    border-radius: 12px;
    // Mengatur warna & ketebalan border input
    &:before {
      border: 1.5px solid #2d2d2d !important;
    }
    &:after {
      border-width: 2px;
    }
  }
}

// Container Foto
.photo-wrapper {
  width: 180px;
  height: 220px;
  border: 1.5px solid #2d2d2d;
  border-radius: 15px;
  padding: 4px;
  overflow: hidden;
}

.photo-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

// Tombol
.btn-action {
  border-radius: 8px;
  padding: 8px 30px;
  font-weight: bold;
  text-transform: none; // Menghilangkan Uppercase otomatis
}

.btn-cancel {
  background-color: #e53935 !important;
  color: white;
}

.btn-save {
  background-color: #1a1a1a !important;
  color: white;
  min-width: 120px;
}
</style>
