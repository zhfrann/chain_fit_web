import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useGymStore = defineStore('gym', {
  state: () => ({
    myGyms: [],
    currentGym: null,
    selectedGymId: null,
    loading: false,
  }),

  persist: true,

  actions: {
    setSelectedGymId(id) {
      this.selectedGymId = id
    },

    async registerGym(formData) {
      this.loading = true
      try {
        const response = await api.post('api/v1/gym', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response.data.data) {
          this.myGyms.push(response.data.data)
        }

        return response.data
      } catch (error) {
        console.error('Error registering gym:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Mengambil daftar gym yang dikelola user
    async fetchMyGyms() {
      this.loading = true
      try {
        const response = await api.get('api/v1/gym/my-gyms')
        this.myGyms = response.data.data
        return response.data
      } catch (error) {
        console.error('Error fetching gyms:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Mengambil detail gym berdasarkan ID
    async fetchGymDetail(id) {
      this.loading = true
      try {
        const response = await api.get(`api/v1/gym/${id}`)
        this.currentGym = response.data.data
        return response.data
      } catch (error) {
        console.error('Error fetching gym detail:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Menghapus gym berdasarkan ID
    async deleteGym(id) {
      try {
        await api.delete(`api/v1/gym/${id}`)
        this.myGyms = this.myGyms.filter((gym) => gym.id !== id)
      } catch (error) {
        console.error('Error deleting gym:', error)
        throw error
      }
    },

    async updateGym(id, payload) {
      const fd = new FormData()

      fd.append('name', payload.name ?? '')
      fd.append('maxCp', String(payload.maxCp ?? ''))
      fd.append('address', payload.address ?? '')
      fd.append('jamOperasional', payload.jamOperasional ?? '')
      fd.append('description', payload.description ?? '')
      fd.append('lat', String(payload.lat ?? ''))
      fd.append('long', String(payload.long ?? ''))

      fd.append('fac', JSON.stringify(payload.fac ?? []))

      fd.append('tag', payload.tag ?? '')

      const res = await api.put(`/api/v1/gym/${id}`, fd)

      const updated = res.data.data
      if (updated) {
        this.currentGym = updated

        const idx = this.myGyms.findIndex((g) => g.id === id)
        if (idx !== -1) this.myGyms[idx] = { ...this.myGyms[idx], ...updated }
      }

      return res
    },
  },
})
