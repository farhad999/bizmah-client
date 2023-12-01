<template>
  <div v-if="!cityLoading">

    <ValidationObserver v-slot="{handleSubmit, invalid}">
      <form @submit.prevent="handleSubmit(submit)" class="mb-0">

        <div class="row">

          <div class="col-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="mobile"
              rules="required|phone"

            >
              <div class="mb-2">
                <label>
                  Phone
                  <span class="required">*</span>
                </label>

                <input
                  type="number"
                  class="form-control"
                  required
                  v-model="addressData.mobile"
                />
                <p class="text-danger mt-1">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>

          <div class="col-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="name"
              rules="required"
            >
              <div class="mb-2">
                <label>
                  Name
                  <span class="required">*</span>
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="addressData.customer_name"
                />

                <p class="text-danger mt-1">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>

          <div class="col-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="city"
              rules="required"
            >
              <div class="mb-2">
                <label>
                  City
                  <span class="required">*</span>
                </label>
                <v-select
                  :options="cities"
                  label="name"
                  item-class="form-control"
                  v-model="addressData.city"
                />
                <p class="text-danger mt-1">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>

          <div class="col-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="zone"
              rules="required"
            >
              <div class="mb-2">
                <label>
                  Select Zone
                </label>
                <v-select
                  :options="zones"
                  label="name"
                  item-class="form-control"
                  v-model="addressData.zone"
                />
                <p class="text-danger mt-1">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>


          <div class="col-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="address"
              rules="required"
            >
              <div class="mb-2">


                <label for="login-password">
                  Address
                  <span class="required">*</span>
                </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="addressData.address"
                />
              </div>
            </ValidationProvider>
          </div>

          <div class="col-12 text-right">
            <button
              type="submit"
              class="btn btn-dark btn-md mt-3"
            >{{ selectedAddress ? 'Update Address' : 'Add Address' }}
            </button>
          </div>
        </div>
      </form>

    </ValidationObserver>
  </div>
  <div v-else>
    <div class="text-center py-4">
      <span class="spinner-border"></span>
    </div>
  </div>
</template>
<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  components: {ValidationProvider, ValidationObserver},
  props: ['selectedAddress'],
  data() {
    return {
      cityData: [],
      cities: [],
      zones: [],
      cityLoading: false,
      selectedCity: '',
      addressData: {
        mobile: this.selectedCity?.mobile,
        customer_name: '',
        address: '',
        city: '',
        zone: '',
      }
    }
  },
  methods: {
    async submit() {

      let data = {...this.addressData};

      if (this.selectedAddress) {
        data.id = this.selectedAddress.id;
      }

      console.log({data})

      try {
        let responseData = await this.$axios.$post('/addresses', data)

        if (responseData.status === 'success') {

          this.$toast.success(responseData.message)
          await this.$auth.fetchUser();
          this.$emit('onAddressAdded');

        }

      } catch (er) {
        console.log(er)
      }

    },
    async getAreas() {
      this.cityLoading = true;
      let data = await this.$axios.$get('/get-cities')
      this.cityLoading = false;
      this.cityData = data;
      this.cities = data.map(item => (item.name.trim()));
      console.log({city: this.cities})
    },
    onSelectCity(val) {

      this.addressData.zone = '';

      console.log('on select city');

      let selected = this.cityData.find(item => {
        console.log({ref: item.name.trim(), val: val.trim()})
        if (item.name.trim() === val.trim()) {
          console.log('matched');
        }
        return item.name.trim() === val;
      });

      if (!val) {
        this.zones = [];
        return;
      }

      this.zones = selected.zones.map(item => item.name.trim());
    }
  },
  watch: {
    /*'addressData.city': function (val) {
      this.onSelectCity(val)
    },*/
    selectedAddress: {
      deep: true,
      handler: function (val) {
        console.log({val})
        if (val) {
          this.addressData = {...val};
        }
      }
    }
  },
  async mounted() {
    await this.getAreas();

    if (this.selectedAddress) {
      this.addressData.customer_name = this.selectedAddress.customer_name;
      this.addressData.mobile = this.selectedAddress.mobile;
      this.addressData.address = this.selectedAddress.address;

      //await this.getAreas();

      this.addressData.city = this.selectedAddress.city;
      //this.onSelectCity(this.selectedAddress.city)

      console.log({selectedAddress: this.selectedAddress})

      this.addressData.zone = this.selectedAddress.zone;
    }

  }
}
</script>
