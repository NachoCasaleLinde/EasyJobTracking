<template>
  <div class="main-container">
    <div class="login-container">
      <div class="logo">logo</div>
      <div class="text-container">
        <div class="welcome-message">Bienvenida a EasyJobTracking</div>
        <div class="secondary-message">Cada oportunidad empieza con un buen seguimiento.</div>
      </div>
      <div class="login-data">
        <q-input outlined v-model="email" label="Correo" />
        <q-input outlined v-model="password" label="Contraseña" />
        <q-btn class="full-width" color="primary" label="Iniciar Sesión" size="bg" rounded />
      </div>

      <div class="create-account">
        <div class="create-account-text">No tienes una cuenta?</div>
        <div class="sign-up-link">Regístrate aqui</div>
      </div>
    </div>
    <div class="image-container">
      <img src="/exampleImage.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* -------------------------------------------------------------------------- */
/* IMPORTS                                                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* LOCAL TYPES & INTERFACES                                                         */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* PROPS                                                                      */
/* -------------------------------------------------------------------------- */
// defineProps<{ ... }>();

/* -------------------------------------------------------------------------- */
/* EMITS                                                                      */
/* -------------------------------------------------------------------------- */
// const emit = defineEmits<{ (e: 'close'): void }>();

/* -------------------------------------------------------------------------- */
/* COMPOSABLES & STORES                                                       */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* STATE (refs, reactive, constants)                                         */
/* -------------------------------------------------------------------------- */
const email = ref('');
const password = ref('');
/* -------------------------------------------------------------------------- */
/* COMPUTED                                                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* WATCHERS                                                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* METHODS                                                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* LIFECYCLE HOOKS                                                            */
/* -------------------------------------------------------------------------- */
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  justify-content: space-evenly;
  overflow-x: hidden;
  .login-container {
    width: 48%;
    border-radius: 20px;
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 50px;

    .text-container {
      .welcome-message {
        font-size: 40px;
        font-weight: bold;
        margin-top: 20px;
        letter-spacing: 0.5px;
      }

      .secondary-message {
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 30px;
        color: rgb(100, 100, 100);
      }
    }

    .login-data {
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .create-account {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      font-size: 14px;

      .create-account-text {
        color: rgb(100, 100, 100);
      }

      .sign-up-link {
        margin-left: 5px;
        color: blue;
        cursor: pointer;
      }
    }
  }

  .image-container {
    width: 48%;
    border-radius: 40px;
    margin: 10px;
    background-color: rgb(59, 59, 240);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      object-fit: cover;
      height: 100%;
    }
  }
}
</style>
