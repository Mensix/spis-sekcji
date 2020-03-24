<template>
  <q-header>
    <q-toolbar class="bg--secondary-gradient text-white shadow-2">
      <q-icon name="fas fa-list" class="toolbar-icon" />
      <q-toolbar-title>Spis Sekcji</q-toolbar-title>
      <q-space />
      <q-btn @click="$router.push('/')" flat label="Sekcje" />
      <q-btn @click="$router.push('/taggroups')" flat label="Tag-grupki" />
      <q-btn @click="$router.push('/dead')" flat label="Hades" />
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.toolbar-icon {
  font-size: 21px;
}

.bg--secondary-gradient {
  background: rgb(38, 166, 153);
  background: linear-gradient(
    90deg,
    rgba(38, 166, 153, 1) 0%,
    rgba(30, 131, 121, 1) 50%
  );
}
</style>
