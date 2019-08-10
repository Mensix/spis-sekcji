<template>
  <q-table
    hide-bottom
    flat
    dense
    square
    :columns="columns"
    :data="taggroups"
    :filter="input"
    :pagination.sync="pagination"
  >
    <template v-slot:top-left="props">
      <q-input
        v-model="input"
        color="secondary"
        placeholder="Wyszukiwarka tag-grupek"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
    </template>

    <template v-slot:top-right="props">
      Liczba tag-grupek w spisie: {{ taggroups.length }}
      <br />
      Ostatnia aktualizacja: {{ lastUpdateDate }}
    </template>

    <template v-slot:body="props">
      <q-tr :class="{ 'bg-grey-2': props.row.members >= 10000 }" :props="props">
        <q-td key="Name" :props="props">
          <span class="text-grey" style="font-size: 8px;">{{
            props.row.__index + 1
          }}</span>
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="Members" :props="props">
          <span>{{ props.row.members }}</span>
        </q-td>
        <q-td key="Link" :props="props">
          <a :href="props.row.link" class="text-secondary" target="_blank">{{
            props.row.link.replace('https://facebook.com/groups', '')
          }}</a>
        </q-td>
        <q-td key="Category" :props="props">
          <span>{{ props.row.category }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  data() {
    return {
      taggroups: [],
      lastUpdateDate: null,
      columns: [
        {
          name: 'Name',
          label: 'Nazwa',
          field: 'name',
          align: 'left',
          sortable: true,
          sort: (a, b, rowA, rowB) => {
            const lettermap = {
              Ё: 'JO',
              Й: 'J',
              Ц: 'C',
              У: 'U',
              К: 'K',
              Е: 'E',
              Н: 'N',
              Г: 'G',
              Ш: 'SZ',
              Щ: 'SZCZ',
              З: 'Z',
              Х: 'H',
              Ъ: "'",

              ё: 'jo',
              й: 'j',
              ц: 'c',
              у: 'u',
              к: 'k',
              е: 'e',
              н: 'n',
              г: 'g',
              ш: 'sz',
              щ: 'szcz',
              з: 'z',
              х: 'h',
              ъ: "'",

              Ф: 'F',
              Ы: 'Y',
              В: 'W',
              А: 'A',
              П: 'P',
              Р: 'R',
              О: 'O',
              Л: 'L',
              Д: 'D',
              Ж: 'Ż',
              Э: 'E',

              ф: 'f',
              ы: 'y',
              в: 'w',
              а: 'a',
              п: 'p',
              р: 'r',
              о: 'o',
              л: 'l',
              д: 'd',
              ж: 'ż',
              э: 'e',

              Я: 'JA',
              Ч: 'CZ',
              С: 'S',
              М: 'M',
              И: 'I',
              Т: 'T',
              Ь: "'",
              Б: 'B',
              Ю: 'JU',

              я: 'ja',
              ч: 'cz',
              с: 's',
              м: 'm',
              и: 'i',
              т: 't',
              ь: "'",
              б: 'b',
              ю: 'ju',

              Ї: 'JI',
              ї: 'ji'
            }
            const transliterate = function(word) {
              return word
                .split('')
                .map(function(char) {
                  return lettermap[char] || char
                })
                .join('')
            }
            ;[a, b] = [a, b].map(s =>
              transliterate(s + '')
                .toLowerCase()
                .replace(/[^a-z0-9 ]/gi, '')
                .trim()
            )
            return a > b ? 1 : a === b ? 0 : -1
          }
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
          align: 'left',
          sortable: true
        }
      ],
      pagination: {
        sortBy: 'Members',
        descending: true,
        page: 0,
        rowsPerPage: 0,
        rowsCount: 0
      },
      input: null
    }
  },
  mounted() {
    fetch('https://api.github.com/gists/9c2ddd305a04e353e29bc65ea403bcfb')
      .then(response => response.json())
      .then(output => JSON.parse(output.files['taggroups.json'].content))
      .then(output => {
        this.taggroups = Array.from(output.taggroups)
        this.lastUpdateDate = output.lastUpdateDate
      })
  },
  methods: {
    filterTaggroups(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(row =>
        cols.some(
          col =>
            col.name === 'name' ||
            col.name === 'link' ||
            (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1
        )
      )
    }
  }
}
</script>
