import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { Notify } from 'quasar';
import { auth } from 'src/boot/FirebaseInit';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    signedUserData: null as User | null, //? Holds the signed in user data (uid, email, etc.)
  }),

  actions: {
    /**
     * Creates a new user account using Firebase Auth.
     * Returns true if the operation succeeds, false otherwise.
     *
     * @param {string} email - User email for account creation.
     * @param {string} password - User password for account creation.
     */
    async signUpUser(email: string, password: string): Promise<boolean> {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        this.signedUserData = userCredential.user;

        Notify.create({
          type: 'positive',
          message: '¡Cuenta creada con éxito! Bienvenido/a ✨',
          position: 'top',
        });

        return true;
      } catch (error) {
        const firebaseError = error as { code: string; message: string };
        console.error('Error during sign up:', firebaseError.code, firebaseError.message);

        Notify.create({
          type: 'negative',
          message:
            'Hubo un error al crear la cuenta. Por favor, revisa tus datos o inténtalo de nuevo.',
          position: 'top',
        });

        return false;
      }
    },

    /**
     * Logs in an existing user using email and password with Firebase Auth.
     * Returns true if the operation succeeds, false otherwise.
     *
     * @param {string} email - User email for authentication.
     * @param {string} password - User password for authentication.
     */
    async logInUser(email: string, password: string): Promise<boolean> {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Store user data
        this.signedUserData = userCredential.user;

        return true;
      } catch (error) {
        const firebaseError = error as { code: string; message: string };
        console.error('Error during login:', firebaseError.code, firebaseError.message);

        Notify.create({
          type: 'negative',
          message:
            'Hubo un error al iniciar sesión. Por favor, revisa tus datos o inténtalo de nuevo.',
          position: 'top',
        });

        return false;
      }
    },

    /**
     * Signs out the current authenticated user from Firebase Auth.
     * Returns true if the operation succeeds, false otherwise.
     *
     * On success:
     * - Clears stored user data
     * - Shows a logout notification
     * - Redirects to login page
     */
    async logOutUser(): Promise<boolean> {
      try {
        await signOut(auth);

        this.signedUserData = null;

        Notify.create({
          type: 'positive',
          message: 'Sesión cerrada correctamente. ¡Hasta pronto! 👋',
          position: 'top',
        });

        return true;
      } catch (error) {
        const firebaseError = error as { code: string; message: string };
        console.error('Error during logout:', firebaseError.code, firebaseError.message);

        Notify.create({
          type: 'negative',
          message: 'No se pudo cerrar la sesión. Inténtalo de nuevo.',
          position: 'top',
        });

        return false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
