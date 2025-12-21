<template>
  <q-layout>
    <q-page-container>
      <q-page class="row">
        <div class="col-12 col-md-6 left-side q-pa-xl gt-sm flex flex-vertical justify-between">
          <div class="logo-placeholder"></div>

          <div class="text-box q-mt-auto">
            <p class="text-body2 text-dark">
              Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf
              atau typesetting.
            </p>
            <p class="text-caption text-weight-bold">bye Lorem</p>
          </div>
        </div>

        <div class="col-12 col-md-6 flex flex-center bg-white">
          <div class="form-container q-pa-lg">
            <div class="text-center q-mb-lg">
              <h2 class="text-h5 text-weight-bolder q-mb-xs">Buat Akun Anda</h2>
              <p class="text-grey-7">Mulai Perjalanan Anda Dengan Kami</p>
            </div>

            <q-form @submit="handleRegister" class="q-gutter-y-sm">
              <q-input outlined dense v-model="form.name" placeholder="Nama" required />
              <q-input
                outlined
                dense
                v-model="form.email"
                type="email"
                placeholder="Email"
                required
              />
              <q-input
                outlined
                dense
                v-model="form.phone"
                type="tel"
                placeholder="No Telepon"
                required
              />

              <q-input
                outlined
                dense
                v-model="form.password"
                type="password"
                placeholder="Password"
                required
              />

              <q-input
                outlined
                dense
                v-model="form.confirmPassword"
                type="password"
                placeholder="Konfirmasi Password"
                :rules="[(val) => val === form.password || 'Password tidak cocok']"
                lazy-rules
                required
              />

              <q-btn
                type="submit"
                label="Continue"
                class="full-width btn-continue q-mt-md"
                unelevated
              />
            </q-form>

            <div class="row items-center q-my-lg">
              <q-separator class="col" />
              <span class="q-px-sm text-caption text-grey-7">Or continue with</span>
              <q-separator class="col" />
            </div>

            <div class="row justify-center q-gutter-x-md q-mb-lg">
              <q-btn flat round @click="goToLogin">
                <q-avatar size="32px">
                  <img src="https://www.svgrepo.com/show/355037/google.svg" />
                </q-avatar>
              </q-btn>
              <q-btn flat round @click="goToLogin">
                <q-avatar size="32px">
                  <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" />
                </q-avatar>
              </q-btn>
            </div>

            <div class="text-center text-body2">
              Sudah punya akun?
              <router-link to="/login" class="text-weight-bold text-black no-decoration">
                Masuk
              </router-link>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const handleRegister = () => {
  $q.notify({
    message: 'Akun berhasil dibuat!',
    color: 'positive',
    icon: 'person_add',
  })
  router.push('/login')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.left-side {
  background-color: #d6d6d6;
  min-height: 100vh;
}

.logo-placeholder {
  width: 120px;
  height: 35px;
  border: 1px solid #000;
  border-radius: 6px;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.btn-continue {
  background-color: #0a0f1f !important;
  color: white;
  text-transform: none;
  border-radius: 6px;
  height: 44px;

  &:hover {
    background-color: #131a32 !important;
  }
}

.no-decoration {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.flex-vertical {
  flex-direction: column;
}

/* Ensure validation error doesn't push layout too much */
:deep(.q-field--with-bottom) {
  padding-bottom: 12px;
}
</style>
