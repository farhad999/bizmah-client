<template>
  <ValidationObserver v-slot="{handleSubmit, invalid}">
    <form @submit.prevent="handleSubmit(submit)" class="mb-0">

      <ValidationProvider
        v-slot="{ errors }"
        name="name"
        rules="required"
      >
        <div class="form-group">


          <label>
            Name
            <span class="required">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            v-model="userData.name"
          />

          <p class="text-danger mt-1">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        name="mobile"
        rules="required|email"

      >
        <div class="form-group">
          <label>
            Email
            <span class="required">*</span>
          </label>

          <input
            type="text"
            class="form-control"
            required
            v-model="userData.email"
          />
          <p class="text-danger mt-1">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>

      <div class="text-center">
        <button
          type="submit"
          class="btn btn-success"
        >Update
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  components: {ValidationProvider, ValidationObserver},
  data() {
    return {
      userData: {
        name: '',
        email: '',
      },
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async submit() {
      try {
        let res = await this.$axios.post('/auth/update-user', this.userData)
        await this.$store.dispatch('auth/fetchUser')
        this.$toast.success('information updated');
        this.$emit('callback');
      } catch ($e) {

      }
    }
  },
  mounted() {
    this.userData.name = this.user.name;
    this.userData.email = this.user.email;
  }
}
</script>
