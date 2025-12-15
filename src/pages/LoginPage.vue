<template>
  <div class="main-container">
    <div class="login-container">
      <div class="text-container">
        <div class="flex flex-center"><img src="/logo.png" style="width: 125px" /></div>

        <div class="welcome-message">Bienvenida a Empleo Track</div>
        <div class="secondary-message">Cada oportunidad empieza con un buen seguimiento.</div>
      </div>
      <div class="login-data">
        <q-input outlined v-model="email" label="Correo" />
        <q-input outlined v-model="password" label="Contraseña" />
        <q-btn class="full-width" color="primary" label="Iniciar Sesión" size="bg" rounded />
        <q-btn
          outline
          color="primary"
          class="full-width"
          label="Crear Cuenta"
          size="bg"
          rounded
          @click="handleSignUp"
        />
      </div>
    </div>
    <div class="image-container">
      <img src="/exampleImage.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
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
const handleSignUp = () => {
  if (!isValidEmail(email.value)) {
    Notify.create({
      type: 'negative',
      message: 'Email no válido',
      position: 'top',
    });
    return;
  }
  if (!isValidPassword(password.value)) {
    Notify.create({
      type: 'negative',
      message:
        'La contraseña debe tener al menos 6 caracteres, incluir letras y números, y no contener espacios.',
      position: 'top',
    });
    return;
  }
  useAuthStore().signUpUser(email.value, password.value);
};

/**
 * Checks whether a string is a syntactically valid email address.
 * Note: this validates format only; it does not verify domain or mailbox existence.
 */
const isValidEmail = (value: string): boolean => {
  if (!value) return false;

  const email = value.trim();

  // Basic sanity checks
  if (email.length > 254) return false;

  // Pragmatic, widely-used email format regex (not fully RFC exhaustive, but robust for apps)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

/**
 * Checks whether a password meets basic security requirements.
 *
 * Rules:
 * - Minimum length of 6 characters
 * - At least one letter
 * - At least one number
 * - No spaces allowed
 */
const isValidPassword = (value: string): boolean => {
  if (!value) return false;

  const password = value.trim();

  if (password.length < 6) return false;
  if (password.includes(' ')) return false;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasLetter && hasNumber;
};
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
