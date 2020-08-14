<template>
  <q-header>
    <q-toolbar class="bg-secondary-gradient text-white shadow-2">
      <q-icon name="fas fa-list" class="toolbar-icon" />
      <q-toolbar-title>Spis Sekcji</q-toolbar-title>
      <q-space />
      <div v-if="!$q.screen.lt.sm">
        <q-btn @click="$router.push('/')" flat label="Sekcje" />
        <q-btn @click="$router.push('/taggroups')" flat label="Tag-grupki" />
        <q-btn @click="$router.push('/dead')" flat label="Hades" />
        <q-btn-dropdown flat label="Dodaj...">
          <q-item @click="$router.push('/submissions')" clickable>
            <q-item-section>
              <q-item-label>Grupę</q-item-label>
            </q-item-section>
          </q-item>
          <q-item @click="$router.push('/submissions/categories')" clickable>
            <q-item-section>
              <q-item-label>Kategorie</q-item-label>
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.toolbar-icon {
  font-size: 21px;
}

.bg-secondary-gradient {
  background: rgb(38, 166, 153);
  background: linear-gradient(
    90deg,
    rgba(38, 166, 153, 1) 0%,
    rgba(30, 131, 121, 1) 50%
  );
}
</style>
