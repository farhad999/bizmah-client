<template>
  <main class="main py-5">
    <div class="page-header">
      <div class="container d-flex flex-column align-items-center">
        <h3>Login</h3>
      </div>
    </div>

    <div class="container login-container my-2">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 mx-auto">
          <div class="card">
            <div class="card-body" style="padding-top: 40px; padding-bottom: 40px">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import Login from "~/components/auth/auth/Login.vue";

export default {
  middleware: 'auth',
  auth: 'guest',
  components: {Login},
  data(){
    return{

    }
  },
}
</script>
