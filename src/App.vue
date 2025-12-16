<template>
  <router-view />
</template>

<script setup lang="ts">
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './boot/FirebaseInit';
import { useAuthStore } from './stores/auth-store';

/**
 * Sets up a Firebase Auth listener to keep `signedUserData` updated.
 * Redirects to `/` if the user is authenticated, or to `/login` if not.
 *
 * Should be called once during app initialization.
 */
const initAuthListener = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  onAuthStateChanged(auth, (user) => {
    console.info('Auth state changed. Current user:', user);

    if (user) {
      authStore.signedUserData = user;

      if (router.currentRoute.value.path !== '/') {
        void router.push('/');
      }
    } else {
      authStore.signedUserData = null;

      if (router.currentRoute.value.path !== '/login') {
        void router.push('/login');
      }
    }
  });
};

onMounted(() => {
  initAuthListener();
});
</script>
