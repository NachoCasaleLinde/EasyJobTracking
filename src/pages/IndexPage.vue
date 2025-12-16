<template>
  <q-page class="row items-center justify-evenly">
    <div class="main-container">
      <div class="add-button-container">
        <q-btn
          color="primary"
          label="Nuevo Trabajo"
          size="md"
          rounded
          @click="addNewJob"
          icon="add"
        />
      </div>
      <TableComponent> </TableComponent>
    </div>

    <q-dialog v-model="showDialog" backdrop-filter="blur(4px) saturate(150%)">
      <JobFormComponent />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import JobFormComponent from 'src/components/JobFormComponent.vue';
import TableComponent from 'src/components/TableComponent.vue';
import { ref } from 'vue';

const showDialog = ref(false);

const addNewJob = () => {
  // Lógica para agregar un nuevo trabajo
  showDialog.value = true;
};
</script>
<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 90vh;
  justify-content: start;

  .add-button-container {
    margin: 16px;
    display: flex;
    justify-content: end;
  }
}
</style>
