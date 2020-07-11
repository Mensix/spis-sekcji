<template>
  <div
    v-if="Object.keys(updateStatus).length > 0"
    class="row q-ma-md justify-center"
  >
    <div class="col-10 col-xs-12 col-sm-12 col-md-12">
      <q-card class="q-mb-md">
        <q-card-section>
          <p class="text-grey q-ma-none">
            Następna aktualizacja spisu sekcji
          </p>
          <div v-if="isNotInProgress" class="text-h4">
            {{ nearestUpdate }}
          </div>
          <div v-else class="text-h4">W trakcie...</div>
        </q-card-section>
      </q-card>
    </div>
    <div
      v-if="!isNotInProgress"
      class="col-10 col-xs-12 col-sm-12 col-md-12 q-mb-md"
    >
      <q-card>
        <q-card-section>
          <p class="text-grey q-mb-sm">Sekcje</p>
          <div class="text-h4">
            {{ updateStatus.sections.current }} /
            {{ updateStatus.sections.total }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div
      v-if="!isNotInProgress"
      class="col-10 col-xs-12 col-sm-12 col-md-12 q-mb-md"
    >
      <q-card>
        <q-card-section>
          <p class="text-grey q-mb-sm">Tag-grupki</p>
          <div class="text-h4">
            {{ updateStatus.taggroups.current }} /
            {{ updateStatus.taggroups.total }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-10 col-xs-12 col-sm-12 col-md-12">
      <q-card>
        <q-card-section>
          <p class="q-ma-none q-mb-sm">Informacje dotyczące aktualizacji:</p>
          <ul class="q-ma-none">
            <li>Spis sekcji jest aktualizowany co niedzielę od godziny 12</li>
            <li>Aktualizacja trwa mniej niż godzinę</li>
            <li>
              Do aktualizacji wykorzystywany jest napisany w C# skrypt, jego kod
              źródłowy można znaleźć
              <a
                href="https://github.com/Mensix/SpisSekcjiManager"
                class="text-secondary"
                >tutaj</a
              >
            </li>
            <li>
              Najpierw pobierane są dane sekcji, następnie tag-grupek (z tego
              powodu status typu grup, które nie są pobierane wynosi 0 / 0)
            </li>
            <li>
              Dane wyświetlane powyżej są pobierane co sekundę i mają małe
              opóźnienie względem skryptu
            </li>
          </ul>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { format, lastDayOfISOWeek, addWeeks, isSunday } from 'date-fns'
export default {
  layout: 'layout',
  data() {
    return {
      interval: undefined,
      updateStatus: {}
    }
  },
  computed: {
    nearestUpdate() {
      return this.updateStatus.isDone === false && isSunday === false
        ? format(lastDayOfISOWeek(new Date()), 'dd/MM/yyyy')
        : format(lastDayOfISOWeek(addWeeks(new Date(), 1)), 'dd/MM/yyyy')
    },
    isNotInProgress() {
      return (
        Object.values(this.updateStatus).length > 0 &&
        this.updateStatus.sections.current === 0 &&
        this.updateStatus.sections.total === 0 &&
        this.updateStatus.taggroups.current === 0 &&
        this.updateStatus.taggroups.total === 0
      )
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    fetch('https://spissekcji.firebaseio.com/update.json')
      .then(response => response.json())
      .then(output => {
        this.updateStatus = output
      })
      .then(callback => !this.isNotInProgress && this.fetchStatus())
  },
  methods: {
    fetchStatus() {
      this.interval = setInterval(
        () =>
          fetch('https://spissekcji.firebaseio.com/update.json')
            .then(response => response.json())
            .then(output => {
              this.updateStatus = output
            })
            .then(
              callback => this.isNotInProgress && clearInterval(this.interval)
            ),
        1000
      )
    }
  }
}
</script>
