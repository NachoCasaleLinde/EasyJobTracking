<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Logo</q-toolbar-title>
      </q-toolbar>
      <q-btn
        round
        flat
        size="md"
        color="white"
        icon="logout"
        @click="useAuthStore().logOutUser()"
      />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store';
</script>

<style lang="scss" scoped>
.q-header {
  display: flex;
}
.q-btn {
  height: 10px;
  width: 10px;
  margin: auto;
  margin-right: 8px;
}
</style>
