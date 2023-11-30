<template>

  <ValidationObserver v-slot="{handleSubmit, invalid}"
                      ref="form"
  >
    <form @submit.prevent="submit"
          class="mb-0">

      <ValidationProvider
          v-slot="{ errors }"
          name="mobile"
          rules="required|phone"

      >
        <div class="form-group">
          <label class="control-label">
            Mobile
            <span class="required">*</span>
          </label>

          <input
              class="form-control"
              required
              v-model="mobile"
              :disabled="showCodeField"
              @keydown.enter="submit"
              placeholder="Mobile"
          />
          <div class="text-danger">{{ errors[0] }}</div>
        </div>
      </ValidationProvider>


      <div v-if="showCodeField">

        <ValidationProvider
            v-slot="{ errors }"
            name="code"
            rules="required|code"
        >

          <label for="control-label">
            Code
            <span class="required">*</span>
          </label>

          <input
              type="number"
              class="form-control"
              v-model="otpCode"
              @keydown.enter="submit"
              placeholder="OTP"
          />
          <div class="text-danger">{{ errors[0] }}</div>
        </ValidationProvider>

        <div class="ml-1 my-3">
          <div class="font-weight-bold" v-if="waitingTime>0">Resend Code After <strong>{{ waitingTime }}</strong>
            seconds
          </div>
          <a class="link-button float-right" v-else @click="sendVerificationCode"
             href="javascript:void(0)">Resend</a>
        </div>

      </div>

      <div class="text-center">
        <button
            class="btn btn-dark btn-block btn-md"
            ref="submitButton"
            type="submit"
            :disabled="loading"
        >
          {{ showCodeField ? 'Login' : 'Send Code' }}
          <span v-if="loading"  class="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span>
        </button>
      </div>
    </form>
  </ValidationObserver>

</template>

<script>

import {ValidationObserver, ValidationProvider, extend} from "vee-validate";

const otpTime = 180;

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: function () {
    return {
      mobile: '',
      otpCode: '',
      showCodeField: false,
      waitingTime: 0,
      loading: false,
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      this.$refs.form.validate().then(success => {
        if (success) {
          if (!this.showCodeField) {
            this.sendVerificationCode();
          } else {
            this.login();
          }
        }
      })
    },
    async sendVerificationCode() {

      this.loading = true;

      this.$axios.post('/auth/get-code', {mobile: this.mobile})
          .then(res => {
            let {status, code} = res.data;
            if (status === 'success') {
              this.showCodeField = true;
              this.$toast.success('A verification code has been Sent');
              this.waitingTime = otpTime;
              this.waitFor();
              this.loading = false;
            }
          }).catch(er => {
        this.loading = false;
      })

      //send code

    },

    async login() {
      let data = {
        mobile: this.mobile,
        code: this.otpCode,
      };

      this.loading = true;

      try {

        let res = await this.$axios.post('/auth/login', data)

        let {status, token, message} = res.data

        if (status === 'success') {
          //localStorage.setItem('token', token);
          await this.$auth.setUserToken(token);
          //await this.$store.dispatch('auth/fetchUser');
          this.$toast.success('Logged In');
          this.$router.replace('/')
          //hide all modal after login
          this.loading = false;
          //this.$store.dispatch('modules/cart/getCartItems')
          await this.$store.dispatch('cart/sync')
          await this.$store.dispatch('cart/getCartProducts')
          //remove localstorage carts
          window.localStorage.removeItem('cart')
        } else {
          this.$toast.error(message)
          this.loading = false;
        }
      }catch(er) {
        this.$toast.error('Token Validation Failed');
        this.loading = false;
      }
    },
    waitFor() {
      const interval = setInterval(() => {

        if (this.waitingTime < 1) {

          return clearInterval(interval)
        }
        return this.waitingTime -= 1;

      }, 1000);

    },
  }
}
</script>

<style scoped>
.float-right {
  float: right;
}
</style>
