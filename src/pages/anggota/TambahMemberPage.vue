<template>
  <q-page class="q-pa-lg bg-grey-2">
    <q-card flat class="rounded-borders shadow-1 custom-card">
      <q-card-section class="q-pa-xl">
        <div class="text-h5 text-center text-weight-bolder q-mb-xl">Tambah Anggota</div>

        <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
          <div class="col-12 col-sm-6">
            <div class="text-weight-bold q-mb-sm">Nama</div>
            <q-input outlined dense v-model="form.nama" placeholder="Masukkan nama anggota" class="custom-input" />
          </div>
          <div class="col-12 col-sm-6">
            <div class="text-weight-bold q-mb-sm">Email</div>
            <q-input outlined dense v-model="form.email" placeholder="Masukkan email anggota" class="custom-input" />
          </div>

          <div class="col-12">
            <div class="text-weight-bold q-mb-md">Paket Gym</div>
            <div class="row q-col-gutter-md">
              <div v-for="paket in paketOptions" :key="paket.id" class="col-12 col-sm-4">
                <q-card flat bordered class="paket-card cursor-pointer" :class="{ 'paket-selected': form.selectedPaket === paket.id }" @click="form.selectedPaket = paket.id">
                  <q-card-section class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h6 text-weight-bolder">{{ paket.nama }}</div>
                      <div class="text-caption text-weight-bold">Rp {{ paket.harga.toLocaleString() }}</div>
                    </div>
                    <div class="col-auto text-right">
                      <span class="text-h4 text-weight-bolder">{{ paket.durasi }}</span>
                      <span class="text-caption">/hari</span>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-end q-mt-xl q-gutter-sm">
          <q-btn unelevated no-caps label="Batal" class="btn-batal q-px-lg" @click="goBack" />
          <q-btn unelevated no-caps class="btn-tambah q-px-xl" label="Tambah" @click="submitForm" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({ nama: '', email: '', selectedPaket: null })

const paketOptions = [
  { id: 'A', nama: 'Paket A', harga: 100000, durasi: 90 },
  { id: 'B', nama: 'Paket B', harga: 100000, durasi: 60 },
  { id: 'C', nama: 'Paket C', harga: 100000, durasi: 30 }
]

const goBack = () => {
  router.push('/anggota')
}

const submitForm = () => {
  if (!form.value.nama || !form.value.email || !form.value.selectedPaket) {
    alert('Mohon lengkapi semua data!')
    return
  }

  try {
    const raw = localStorage.getItem('members')
    const members = raw ? JSON.parse(raw) : []
    const paket = paketOptions.find(p => p.id === form.value.selectedPaket)

    const newMember = {
      id: Date.now(),
      nama: form.value.nama,
      email: form.value.email,
      status: 'Aktif',
      masaAktif: paket.durasi
    }

    members.push(newMember)
    localStorage.setItem('members', JSON.stringify(members))
    goBack()
  } catch (err) {
    console.error(err)
  }
}
</script>

<style lang="scss" scoped>
.custom-card { border-radius: 15px; max-width: 1000px; margin: 0 auto; }
.custom-input :deep(.q-field__control) { border-radius: 10px; background-color: white; border: 1.5px solid #000; }
.paket-card { border-radius: 12px; background-color: #94a3b8; color: white; border: 2px solid transparent; }
.paket-selected { background-color: #475569; border-color: #0c0c0c; }
.btn-tambah { background-color: #0c0c0c; color: white; border-radius: 10px; font-weight: bold; height: 44px; }
.btn-batal { background-color: #e53935; color: white; border-radius: 10px; font-weight: bold; height: 44px; text-transform: none; }
</style>
