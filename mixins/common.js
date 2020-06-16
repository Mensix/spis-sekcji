export default {
  data() {
    return {
      columns: [
        {
          name: 'name',
          label: 'Nazwa',
          field: 'name',
          align: 'left',
          sortable: true,
          sort: (a, b) => a.localeCompare(b)
        },
        {
          name: 'members',
          label: 'Liczba członków',
          field: 'members',
          align: 'left',
          sortable: true
        },
        { name: 'link', label: 'Link', field: 'link', align: 'left' },
        {
          name: 'category',
          label: 'Kategoria',
          field: 'category',
          align: 'left'
        },
        {
          name: 'membersGrowth',
          field: 'membersGrowth',
          label: 'Przyrost członków',
          align: 'left',
          sortable: true
        },
        {
          name: 'keywords',
          field: 'keywords'
        }
      ],
      pagination: {
        page: 0,
        rowsPerPage: 20,
        rowsCount: 0
      },
      lastUpdateDate: undefined,
      input: undefined,
      loading: true
    }
  },
  computed: {
    isMobileDevice() {
      return this.$q.screen.lt.sm
    }
  },
  methods: {
    filterData(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase().trim() : ''
      return rows.filter(row =>
        cols.some(
          col =>
            (col.name === 'name' ||
              col.name === 'link' ||
              col.name === 'keywords') &&
            (cellValue(col, row) + '').toLowerCase().includes(lowerTerms)
        )
      )
    }
  }
}
