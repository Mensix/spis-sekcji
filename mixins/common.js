export default {
  data() {
    return {
      columns: [
        {
          name: 'Name',
          label: 'Nazwa',
          field: 'name',
          align: 'left',
          sortable: true,
          sort: (a, b) => a.localeCompare(b)
        },
        {
          name: 'Members',
          label: 'Liczba członków',
          field: 'members',
          align: 'left',
          sortable: true
        },
        { name: 'Link', label: 'Link', field: 'link', align: 'left' },
        {
          name: 'Category',
          label: 'Kategoria',
          field: 'category',
          align: 'left'
        },
        {
          name: 'MembersGrowth',
          field: 'membersGrowth',
          label: 'Przyrost członków',
          align: 'left',
          sortable: true
        },
        {
          name: 'Keywords',
          field: 'keywords'
        }
      ],
      pagination: {
        page: 0,
        rowsPerPage: 20,
        rowsCount: 0
      },
      lastUpdateDate: null,
      input: null,
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
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(row =>
        cols.some(
          col =>
            (col.name === 'Name' ||
              col.name === 'Link' ||
              col.name === 'Keywords') &&
            (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1
        )
      )
    }
  }
}
