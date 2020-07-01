<template>
  <div class="q-pa-md">
    <h5 class="q-ma-none text-weight-light">Polityka prywatności</h5>
    <q-separator class="q-mb-md q-mt-md" />
    <h6 class="q-ma-none q-mb-sm">
      <b
        >Ta strona używa następujących serwisów gromadzących następujące dane w
        następujących celach:</b
      >
    </h6>
    <div class="row items-center">
      <div class="col">
        <q-icon name="analytics" class="text-h3 icon-fixed" />
        <div class="col">
          <a
            href="https://analytics.google.com/"
            class="text-secondary"
            target="_blank"
            rel="noopener noreferer"
            >Google Analytics</a
          >
          <p class="q-ma-none">Pliki cookies, statystyki wyświetleń strony</p>
        </div>
      </div>
      <div class="col">
        <q-icon name="note" class="text-h3 icon-fixed" />
        <div class="col">
          <a
            href="https://tagmanager.google.com/"
            class="text-secondary"
            target="_blank"
            rel="noopener noreferer"
            >Google Tag Manager</a
          >
          <p class="q-ma-none">Statystyki wyświetleń strony</p>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-md q-mb-md" />
    <h6 class="q-ma-none q-mb-sm"><b>Kontakt:</b></h6>
    <q-icon name="person" class="text-h3 icon-fixed" />
    <div class="col">
      <p class="q-ma-none">Grzegorz Perun</p>
      <a
        href="mailto:grzegorz.perun@gmail.com"
        class="text-secondary"
        target="_blank"
        rel="noopener noreferer"
        >grzegorz.perun@gmail.com</a
      >
    </div>
    <q-separator class="q-mt-md q-mb-md" />
    <small class="q-ma-none"
      >Zbierane dane posiadają anonimowe IP oraz nie są udostępniane podmiotom
      trzecim.</small
    >
    <br />
    <small class="q-ma-none">Ostatnia aktualizacja: 01/07/2020</small>
  </div>
</template>

<script>
export default {
  layout: 'layout'
}
</script>

<style>
.icon-fixed {
  margin-left: -6px;
}
</style>
