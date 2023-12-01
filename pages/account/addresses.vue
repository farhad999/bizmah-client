<template>
  <div class="container">

    <div class="row my-2">
      <div class="col-sm-12">
        <ul class="account-breadcrumb">
          <li><a href="/"><i class="fa fa-home"></i></a></li>
          <li>/</li>
          <li>
            <nuxt-link to="/account">Account</nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h4 class="account-sub-title mb-1">
                <i class="fa fa-map-marker-alt mr-3"></i>Addresses
              </h4>
              <button @click="resetAndOpenModal" class="btn btn-primary btn-md">
                <i class="fa fa-plus"></i>
                Add
              </button>
            </div>
            <div class="mt-2 table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(add,index) in user.addresses"
                    :key="`add-${index}`"
                >
                  <td>{{ add.customer_name }}</td>
                  <td>{{ add.mobile }}</td>
                  <td>{{ add.address }}</td>
                  <td>
                    <button @click="()=>selectAndOpenModal(add)" class="btn btn-info btn-sm">Edit</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <BModal :title="selectedAddress ? 'Update Address' : 'Add Address'"
            v-model="openModal"
            hide-footer
            v-b-modal.modal-tall
    >
      <AddAddress
        :selectedAddress="selectedAddress"
        @onAddressAdded="openModal = false"
      />
    </BModal>

  </div>
</template>

<script>

import {ValidationObserver, ValidationProvider} from "vee-validate";
import {BModal, BFormSelect} from "bootstrap-vue";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import AddAddress from "~/pages/account/AddAddress.vue";

export default {
  middleware: 'auth',
  components: {
    ValidationProvider, ValidationObserver,
    BModal, vSelect, BFormSelect, AddAddress
  },
  data() {
    return {
      openModal: false,
      selectedAddress: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    resetAndOpenModal() {
      this.selectedAddress = null;
      this.openModal = true;
    },
    selectAndOpenModal(add) {
      this.selectedAddress = add;
      this.openModal = true;
    },
  }
}

</script>

<style>
.v-select-custom .vs__dropdown-toggle {
  padding: 1rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2px;
}
</style>
