<template>
  <div class="q-pa-md">
    <q-table title="Job Applications" :rows="rows" :columns="columns" row-key="id" flat bordered />
  </div>
</template>

<script setup lang="ts">
/* -------------------------------------------------------------------------- */
/* IMPORTS                                                                    */
/* -------------------------------------------------------------------------- */
import { type QTableColumn } from 'quasar';
import { type IJobData } from 'src/Interfaces/globalInterfaces';

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
const columns: QTableColumn<IJobData>[] = [
  {
    name: 'jobName',
    label: 'Position',
    field: 'jobName',
    align: 'left',
    sortable: true,
  },
  {
    name: 'company',
    label: 'Company',
    field: 'company',
    align: 'left',
    sortable: true,
  },
  {
    name: 'platform',
    label: 'Platform',
    field: 'platform',
    align: 'left',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Current Phase',
    align: 'left',
    field: (row) => row.status[row.status.length - 1]?.phase ?? '-',
  },
  {
    name: 'notes',
    label: 'Notes',
    field: 'notes',
    align: 'left',
  },
];

const rows: IJobData[] = [
  {
    id: '1',
    jobName: 'Junior Front-end Developer',
    company: 'PrettyCat',
    platform: 'LinkedIn',
    status: [
      { phase: 'Applied', date: '2025-09-10' },
      { phase: 'In progress', date: '2025-09-15' },
    ],
    notes: 'Working on Vue 3 components and Firebase integration',
  },
  {
    id: '2',
    jobName: 'Front-end Developer',
    company: 'Cozy Apps Studio',
    platform: 'Company website',
    status: [{ phase: 'Applied', date: '2025-10-01' }],
    notes: 'Mobile-first UI, Vue + Quasar',
  },
  {
    id: '3',
    jobName: 'Junior Web Developer',
    company: 'Startup XYZ',
    platform: 'Indeed',
    status: [
      { phase: 'Applied', date: '2025-09-20' },
      { phase: 'Rejected', date: '2025-09-28' },
    ],
    notes: 'Good feedback on technical test',
    rejectReason: 'Looking for more experience',
  },
];

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

<style scoped lang="scss"></style>
