<template>
  <q-page class="q-pa-lg bg-grey-2">
    <!-- HEADER -->
    <q-card flat class="rounded-borders q-mb-lg bg-white shadow-1">
      <q-card-section class="header-height q-pa-md row items-center">
        <q-btn
          flat
          round
          icon="arrow_back"
          color="grey-7"
          size="md"
          dense
          @click="goBack"
          class="q-mr-sm"
        />
        <q-icon name="construction" size="22px" class="q-ml-sm q-mr-sm" />
        <div class="text-h5 text-weight-bold">Edit Gym</div>
      </q-card-section>
    </q-card>

    <!-- FORM -->
    <q-card flat class="rounded-borders shadow-1 q-pa-md">
      <q-card-section>
        <div class="row items-center justify-end q-mb-lg">
          <q-btn
            unelevated
            label="Simpan"
            no-caps
            class="btn-save q-px-xl text-weight-bold"
            :loading="saving"
            :disable="saving"
            @click="saveChanges"
          />
        </div>

        <div class="q-gutter-y-lg">
          <!-- Nama -->
          <div class="input-group">
            <div class="text-subtitle1 text-weight-bold q-mb-xs">Nama Gym</div>
            <q-input
              outlined
              dense
              v-model="form.name"
              placeholder="Masukkan nama gym"
              class="bg-white custom-input"
            />
          </div>

          <!-- Kapasitas -->
          <div class="input-group">
            <div class="text-subtitle1 text-weight-bold q-mb-xs">Kapasitas</div>
            <q-input
              outlined
              dense
              type="number"
              v-model="form.maxCp"
              placeholder="Contoh: 40"
              class="bg-white custom-input"
            />
          </div>

          <!-- Alamat -->
          <div class="input-group">
            <div class="text-subtitle1 text-weight-bold q-mb-xs">Alamat</div>
            <q-input
              outlined
              dense
              v-model="form.address"
              placeholder="Masukkan alamat"
              class="bg-white custom-input"
            />
          </div>

          <!-- Lokasi Saat Ini -->
          <div class="row items-center q-gutter-sm">
            <q-btn
              outline
              no-caps
              icon="my_location"
              label="Lokasi Saat Ini"
              :loading="gettingLocation"
              :disable="gettingLocation"
              @click="useCurrentLocation"
            />
            <q-btn
              v-if="hasCoords"
              outline
              no-caps
              icon="close"
              label="Reset Lokasi"
              color="negative"
              @click="resetLocation"
            />
          </div>

          <!-- Status lokasi (tanpa tampilkan lat/long) -->
          <div v-if="hasCoords" class="row items-center q-gutter-sm">
            <q-chip color="green-7" text-color="white" icon="check_circle" square>
              Lokasi sudah terpasang
            </q-chip>
            <div v-if="accuracyMeters != null" class="text-caption text-grey-7">
              Akurasi ±{{ Math.round(accuracyMeters) }} m
            </div>
          </div>

          <div v-else class="text-caption text-grey-7">
            Lokasi belum diambil. Klik <b>Lokasi Saat Ini</b> untuk mengisi koordinat otomatis.
          </div>

          <!-- Jam Operasional -->
          <div class="input-group">
            <div class="text-subtitle1 text-weight-bold q-mb-xs">Jam Operasional</div>
            <q-input
              outlined
              dense
              v-model="form.jamOperasional"
              placeholder="Contoh: Senin-Jumat: 12:00-20:00"
              class="bg-white custom-input"
            />
          </div>

          <!-- Deskripsi -->
          <div class="input-group">
            <div class="text-subtitle1 text-weight-bold q-mb-xs">Deskripsi</div>
            <q-input
              outlined
              type="textarea"
              v-model="form.description"
              placeholder="Masukkan deskripsi lengkap gym..."
              class="bg-white custom-input"
              rows="5"
            />
          </div>

          <!-- Fasilitas -->
          <div class="input-group">
            <div class="text-subtitle1 text-weight-bold q-mb-xs">Fasilitas</div>

            <div class="row q-gutter-sm q-mb-sm">
              <q-chip
                v-for="(f, index) in form.fac"
                :key="f + index"
                removable
                @remove="removeFacility(index)"
                square
                color="blue-grey-8"
                text-color="white"
                class="q-px-md"
                icon="check_circle"
              >
                {{ f }}
              </q-chip>
            </div>

            <div class="row items-center q-gutter-x-md">
              <div class="text-body1 text-weight-medium">Tambah fasilitas</div>
              <q-input
                outlined
                dense
                v-model="newFacility"
                placeholder="contoh: Sauna"
                class="bg-white col-4"
                @keyup.enter="addFacility"
                @blur="addFacility"
                @update:model-value="onFacilityTyping"
              />
            </div>
          </div>

          <!-- Tags -->
          <div class="input-group">
            <div class="text-subtitle1 text-weight-bold q-mb-xs">Tag</div>
            <div class="row q-gutter-sm q-mb-sm">
              <q-chip
                v-for="(tag, index) in form.tags"
                :key="tag + index"
                removable
                @remove="removeTag(index)"
                square
                color="grey-8"
                text-color="white"
                class="q-px-md"
              >
                {{ tag }}
              </q-chip>
            </div>

            <div class="row items-center q-gutter-x-md">
              <div class="text-body1 text-weight-medium">Tambah tag</div>
              <q-input
                outlined
                dense
                v-model="newTag"
                placeholder="Tambah tag baru"
                class="bg-white col-4"
                @keyup.enter="addTag"
                @blur="addTag"
                @update:model-value="onTagTyping"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useGymStore } from 'src/stores/Gym'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const gymStore = useGymStore()

const saving = ref(false)
const gettingLocation = ref(false)
const newTag = ref('')
const newFacility = ref('')

const accuracyMeters = ref(null)

// kalau route kamu ada param id, pakai itu. kalau enggak, pakai selectedGymId
const gymId = computed(() => route.params.id || gymStore.selectedGymId)

const normalizeList = (arr) => {
  return (arr || [])
    .map((t) => String(t).trim())
    .filter(Boolean)
    .filter((t, i, self) => self.indexOf(t) === i)
}

const onTagTyping = (val) => {
  if (typeof val !== 'string') return
  if (val.includes(',')) {
    addTag()
  }
}
const form = reactive({
  name: '',
  maxCp: '',
  address: '',
  jamOperasional: '',
  description: '',
  lat: '', // tetap disimpan tapi tidak ditampilkan
  long: '', // tetap disimpan tapi tidak ditampilkan
  fac: [],
  tags: [],
})

const hasCoords = computed(() => !!form.lat && !!form.long)

const goBack = () => router.push('/info')

const hydrateForm = (g) => {
  if (!g) return
  form.name = g.name ?? ''
  form.maxCp = g.maxCp ?? g.maxCapacity ?? ''
  form.address = g.address ?? ''
  form.jamOperasional = g.jamOperasional ?? ''
  form.description = g.description ?? ''
  form.lat = g.lat != null ? String(g.lat) : ''
  form.long = g.long != null ? String(g.long) : String(g.lng ?? '')

  form.fac = Array.isArray(g.fac) ? g.fac : Array.isArray(g.facility) ? g.facility : []

  const t = g.tag ?? ''
  form.tags = t
    ? t
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

}

const loadForEdit = async () => {
  const id = gymId.value
  if (!id) return

  if (!gymStore.currentGym || gymStore.currentGym.id !== id) {
    try {
      await gymStore.fetchGymDetail(id)
    } catch (e) {
      console.error(e)
      $q.notify({ type: 'negative', message: 'Gagal ambil detail gym' })
      return
    }
  }
  hydrateForm(gymStore.currentGym)
}

onMounted(loadForEdit)
watch(gymId, loadForEdit)

const resetLocation = () => {
  form.lat = ''
  form.long = ''
  accuracyMeters.value = null
}

// Ambil lokasi saat ini (GPS) - versi lebih tahan timeout
const useCurrentLocation = async () => {
  // Secure context check (biar jelas penyebabnya)
  if (
    !window.isSecureContext &&
    !location.hostname.includes('localhost') &&
    location.hostname !== '127.0.0.1'
  ) {
    $q.notify({
      type: 'negative',
      message: 'Geolocation butuh HTTPS (atau localhost). Jalankan di https / localhost.',
    })
    return
  }

  if (!('geolocation' in navigator)) {
    $q.notify({ type: 'negative', message: 'Browser tidak mendukung GPS' })
    return
  }

  gettingLocation.value = true

  const options = {
    enableHighAccuracy: true,
    timeout: 20000, // naikkan timeout
    maximumAge: 0,
  }

  const onSuccess = (pos) => {
    const { latitude, longitude, accuracy } = pos.coords
    form.lat = String(latitude)
    form.long = String(longitude)
    accuracyMeters.value = accuracy ?? null

    $q.notify({ type: 'positive', message: 'Lokasi berhasil diambil' })
    gettingLocation.value = false
  }

  const onError = (err) => {
    console.error(err)
    const msg =
      err.code === 1
        ? 'Izin lokasi ditolak. Silakan Allow lokasi di browser.'
        : err.code === 2
          ? 'Lokasi tidak tersedia. Pastikan GPS/Location Services aktif.'
          : 'Timeout / gagal mengambil lokasi. Coba lagi atau pindah ke area sinyal lebih baik.'

    $q.notify({ type: 'negative', message: msg })

    // fallback: coba watchPosition sebentar (kadang lebih berhasil)
    let watchId = null
    try {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          navigator.geolocation.clearWatch(watchId)
          onSuccess(pos)
        },
        (e2) => {
          console.error(e2)
          if (watchId) navigator.geolocation.clearWatch(watchId)
          gettingLocation.value = false
        },
        { ...options, timeout: 30000 },
      )

      // stop fallback setelah 8 detik kalau belum dapat
      setTimeout(() => {
        if (watchId) navigator.geolocation.clearWatch(watchId)
        gettingLocation.value = false
      }, 8000)
    } catch {
      gettingLocation.value = false
    }
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
}

const addFacility = () => {
  const t = newFacility.value.trim()
  if (!t) return

  const parts = t
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  form.fac = normalizeList([...form.fac, ...parts])
  newFacility.value = ''
}

const removeFacility = (i) => {
  form.fac.splice(i, 1)
  form.fac = normalizeList(form.fac)
}

const onFacilityTyping = (val) => {
  if (typeof val !== 'string') return
  if (val.includes(',')) {
    addFacility()
  }
}

const addTag = () => {
  const t = newTag.value.trim()
  if (!t) return

  // boleh support input "a, b, c"
  const parts = t
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  form.tags = normalizeList([...form.tags, ...parts])
  newTag.value = ''
}

const removeTag = (i) => {
  form.tags.splice(i, 1)
  form.tags = normalizeList(form.tags) // rapihin setelah remove
}

const saveChanges = async () => {
  const id = gymId.value
  if (!id) return

  if (!form.lat || !form.long) {
    $q.notify({ type: 'warning', message: 'Silakan ambil lokasi (Lokasi Saat Ini) dulu.' })
    return
  }

  if (newTag.value.trim()) addTag()
  if (newFacility.value.trim()) addFacility()
  saving.value = true
  try {
    await gymStore.updateGym(id, {
      name: form.name,
      maxCp: form.maxCp,
      address: form.address,
      jamOperasional: form.jamOperasional,
      description: form.description,
      lat: form.lat,
      long: form.long,
      fac: form.fac,
      tag: normalizeList(form.tags).join(', '),
    })

    $q.notify({ type: 'positive', message: 'Data berhasil disimpan!' })
    await gymStore.fetchGymDetail(id)
    goBack()
  } catch (e) {
    console.error(e)
    $q.notify({ type: 'negative', message: 'Gagal menyimpan data' })
  } finally {
    saving.value = false
  }
}
</script>

<style scoped lang="scss">
.header-height {
  min-height: 64px;
}

.custom-input {
  :deep(.q-field__control) {
    border-radius: 8px;
  }
}

.input-group {
  .text-subtitle1 {
    color: #1a1a1a;
  }
}

:deep(.q-textarea .q-field__native) {
  line-height: 1.6;
}

.btn-save {
  background: #0a0f1f;
  color: #fff;
  border-radius: 8px;
  height: 40px;
  font-weight: 700;
  text-transform: none;
}
</style>
