<template>
  <q-header>
    <q-toolbar class="bg-secondary__gradient text-white shadow-2">
      <q-icon name="fas fa-list" style="font-size: 21px;" />
      <q-toolbar-title>Spis Sekcji</q-toolbar-title>
      <q-space />
      <q-btn flat label="Sekcje" @click="$router.push('/')" />
      <q-btn flat label="Tag-grupki" @click="$router.push('/taggroups')" />
      <q-btn flat label="Hades" @click="$router.push('/dead')" />
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.bg-secondary__gradient {
  background: rgb(38, 166, 153);
  background: linear-gradient(
    90deg,
    rgba(38, 166, 153, 1) 0%,
    rgba(30, 131, 121, 1) 50%
  );
}
</style>
