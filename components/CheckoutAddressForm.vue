<template>
  <div v-if="!cityLoading">
    <ValidationObserver v-slot="{handleSubmit, invalid}">
      <form class="mb-0">

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
                  v-model="address.customer_mobile"
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
                  v-model="address.customer_name"
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
                  v-model="address.customer_city"
                  @input="onSelectCity"
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
                  v-model="address.customer_zone"
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
                  v-model="address.customer_address"
                />
              </div>
            </ValidationProvider>
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
  props: ['address'],
  data() {
    return {
      cityData: [],
      cities: [],
      zones: [],
      cityLoading: false,
      selectedCity: '',
      //addressData: {},
    }
  },
  watch: {
    'address.customer_city': function (val) {
      if (val) {
        this.onSelectCity(val)
      }
    }
  },
  methods: {
    async getAreas() {
      this.cityLoading = true;
      let data = await this.$axios.$get('/get-cities')
      this.cityLoading = false;
      this.cityData = data;
      this.cities = data.map(item => (item.name.trim()));
      console.log({city: this.cities})
    },
    onSelectCity(val) {
      this.address.zone = '';
      let selected = this.cityData.find(item => {
        return item.name.trim() === val;
      });

      if (!val) {
        this.zones = [];
        return;
      }
      this.zones = selected ? selected.zones.map(item => item.name.trim()) : [];
    }
  },
  async mounted() {

    await this.getAreas();

    if (this.address.customer_city) {
      this.onSelectCity(this.address.customer_city)
    }

    /*if (this.selectedAddress) {
      this.addressData.customer_name = this.selectedAddress.customer_name;
      this.addressData.mobile = this.selectedAddress.mobile;
      this.addressData.address = this.selectedAddress.address;

      //await this.getAreas();

      this.addressData.city = this.selectedAddress.city;
      //this.onSelectCity(this.selectedAddress.city)

      console.log({selectedAddress: this.selectedAddress})

      this.addressData.zone = this.selectedAddress.zone;
    }*/

  }
}
</script>
