<template>
  <q-footer class="bg-white text-secondary fixed-bottom">
    <q-tabs :mobile-arrows="false" dense shrink no-caps>
      <q-route-tab label="Sekcje" icon="vertical_split" to="/" exact />
      <q-route-tab label="Tag-grupki" icon="list" to="/taggroups" exact />
      <q-route-tab label="Hades" icon="label_off" to="/dead" exact />
      <q-route-tab label="Dodaj grupę" icon="add" to="/submissions" exact />
      <q-route-tab
        label="Dodaj kategorie"
        icon="add"
        to="submissions/categories"
        exact
      />
      <q-route-tab label="Prywatność" icon="lock" to="/privacy" exact />
    </q-tabs>
  </q-footer>
</template>
