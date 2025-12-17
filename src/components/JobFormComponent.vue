<template>
  <q-card class="main-card-container">
    <q-card-section class="row items-center q-pb-none text-h6"> Nuevo Trabajo </q-card-section>

    <q-card-section class="main-input-container">
      <q-input outlined v-model="jobName" label="Nombre de Vacante" />
      <q-input outlined v-model="companyName" label="Empresa" />
      <q-select outlined v-model="platform" :options="platforms" label="Plataforma" />
      <q-select outlined v-model="status" :options="statusOptions" label="Estado Actual" />
      <q-input outlined v-model="notes" label="Notas" />
    </q-card-section>

    <q-card-actions align="right" class="buttons">
      <q-btn outline rounded label="Cancelar" color="primary" v-close-popup />
      <q-btn unelevated rounded label="Añadir" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
/* -------------------------------------------------------------------------- */
/* IMPORTS                                                                    */
/* -------------------------------------------------------------------------- */
import { ref } from 'vue';

/* -------------------------------------------------------------------------- */
/* LOCAL TYPES & INTERFACES                                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* PROPS                                                                      */
/* -------------------------------------------------------------------------- */
// defineProps<{ ... }>();

/* -------------------------------------------------------------------------- */
/* EMITS                                                                      */
/* -------------------------------------------------------------------------- */
// const emit = defineEmits<{ (e: 'select', job: IJobData): void }>();

/* -------------------------------------------------------------------------- */
/* COMPOSABLES & STORES                                                       */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* STATE (refs, reactive, constants)                                          */
/* -------------------------------------------------------------------------- */

const jobName = ref('');

const companyName = ref('');

const platforms = ['LinkedIn', 'InfoJobs', 'Indeed', 'OCC', 'Web Empresa'];

const statusOptions = [
  'Aplicado',
  'Entrevista Telefónica',
  'Entrevista Técnica',
  'Oferta',
  'Rechazado',
];

const status = ref('');

const platform = ref('');

const notes = ref(null);
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
.main-card-container {
  width: 90vw;
  max-width: 600px;

  .main-input-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.buttons {
  padding: 10px;
  margin-right: 8px;
  margin-bottom: 16px;
}
</style>
