import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar';
import { auth } from 'src/boot/FirebaseInit';
import router from 'src/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    signedUserData: null as User | null, //? Holds the signed in user data (uid, email, etc.)
  }),

  actions: {
    /**
     * Creates a new user account using email and password with Firebase Auth.
     * On success, stores the authenticated user data.
     * On failure, logs the error and shows a Quasar notification.
     *
     * @param {string} email - User email for account creation.
     * @param {string} password - User password for account creation.
     */
    signUpUser(email: string, password: string) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Store user data
          this.signedUserData = userCredential.user;
          // Go to home page
          void router.push('/');

          Notify.create({
            type: 'positive',
            message: '¡Cuenta creada con éxito! Bienvenido/a ✨',
            position: 'top',
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error during sign up:', errorCode, errorMessage);

          Notify.create({
            type: 'negative',
            message:
              'Hubo un error al crear la cuenta. Por favor, revisa tus datos o inténtalo de nuevo.',
            position: 'top',
          });
        });
    },

    /**
     * Logs in an existing user using email and password with Firebase Auth.
     * On success, stores the authenticated user data and redirects to home page.
     * On failure, logs the error and shows a Quasar notification.
     *
     * @param {string} email - User email for authentication.
     * @param {string} password - User password for authentication.
     */
    logInUser(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Store user data
          this.signedUserData = userCredential.user;
          // Go to home page
        })
        .catch((error) => {
          console.error('Error during login:', error.code, error.message);

          Notify.create({
            type: 'negative',
            message:
              'Hubo un error al iniciar sesión. Por favor, revisa tus datos o inténtalo de nuevo.',
            position: 'top',
          });
        });
    },

    /**
     * Signs out the current authenticated user from Firebase Auth.
     * On success, clears stored user data, shows a logout message,
     * and redirects to the login page.
     * On failure, logs the error and shows a Quasar notification.
     */
    logOutUser() {
      signOut(auth)
        .then(() => {
          this.signedUserData = null;

          Notify.create({
            type: 'positive',
            message: 'Sesión cerrada correctamente. ¡Hasta pronto! 👋',
            position: 'top',
          });

          void useRouter().push('/login');
        })
        .catch((error) => {
          console.error('Error during logout:', error.code, error.message);

          Notify.create({
            type: 'negative',
            message: 'No se pudo cerrar la sesión. Inténtalo de nuevo.',
            position: 'top',
          });
        });
    },

    /**
     * Sets up a Firebase Auth listener to keep `signedUserData` updated.
     * Redirects to `/home` if the user is authenticated, or to `/login` if not.
     * Avoids redundant redirects to prevent navigation loops.
     *
     * @remarks
     * Should be called once during app initialization.
     */
    initAuthListener() {
      const router = useRouter();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.signedUserData = user;

          // Avoid redirect loop if already on home
          if (router.currentRoute.value.path !== '/home') {
            void router.push('/home');
          }
        } else {
          this.signedUserData = null;
          // Avoid redirect loop if already on login
          if (router.currentRoute.value.path !== '/login') {
            void router.push('/login');
          }
        }
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
