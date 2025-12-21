<template>
  <q-page class="flex flex-center bg-grey-1">
    <div class="content-container text-center q-pa-xl bg-white shadow-1 rounded-borders">
      <h2 class="text-h5 text-weight-bold q-mb-xl text-dark">Anda belum memiliki Gym</h2>

      <q-btn
        outline
        padding="12px 30px"
        color="grey-4"
        text-color="dark"
        label="Tambahkan Gym Anda +"
        class="btn-tambah-gym text-capitalize text-weight-medium"
        @click="onAddGym"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

const onAddGym = () => {
  $q.notify({
    message: 'Fitur tambah gym akan segera hadir',
    color: 'primary',
    icon: 'info',
    position: 'top',
  })
}
</script>

<style lang="scss" scoped>
.content-container {
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  /* Matches your original white box styling */
  border: 1px solid #e2e8f0;
}

.btn-tambah-gym {
  border: 2px solid #ddd !important;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0f172a !important; // Matches your Staff page dark color
    color: white !important;
    border-color: #0f172a !important;
  }
}
</style>
