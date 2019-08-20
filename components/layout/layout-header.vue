<template>
  <q-header>
    <q-toolbar class="bg-secondary text-white shadow-2">
      <i class="q-mr-sm fas fa-list" style="font-size: 21px;" />
      <q-toolbar-title>Spis Sekcji</q-toolbar-title>
      <q-space />
      <q-btn flat label="Sekcje" @click="$router.push('/')" />
      <q-btn flat label="Tag-grupki" @click="$router.push('/taggroups')" />
      <q-btn flat label="Hades" @click="$router.push('/dead')" />
    </q-toolbar>
  </q-header>
</template>
