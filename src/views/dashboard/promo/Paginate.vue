<script setup>
import ApiService from '@/services/ApiService'
import { h, ref } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { useVueTable, getCoreRowModel, FlexRender, createColumnHelper } from '@tanstack/vue-table'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'

const emit = defineEmits(['destroy', 'showModal'])
const router = useRouter()
const page = ref(1)
const search = ref('')
const category = ref('')

const fetcher = async (page, search) =>
  await ApiService({ requiresAuth: true })
    .get('gallery', {
      params: {
        page: page.value,
        search: search.value
      }
    })
    .then((res) => res.data)

const { data, isFetching, isError, error, refetch } = useQuery({
  queryKey: ['artworks', page, search, category],
  queryFn: () => fetcher(page, search, category),
  placeholderData: keepPreviousData
})

const handlePageChange = (url) => {
  const urlSearchParams = new URLSearchParams(url.split('?')[1])
  page.value = urlSearchParams.get('page')
  search.value = urlSearchParams.get('search')
}

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor('title', {
    header: 'TITLE'
  }),
  columnHelper.accessor('description', {
    header: 'DESCRIPTION'
  }),
  columnHelper.accessor('url', {
    header: 'IMAGE',
    cell: (info) => {
      const imgUrl = info.row.original.image
      return h('img', { src: imgUrl, alt: 'Image', class: 'rounded' })
    }
  }),
  columnHelper.accessor('id', {
    header: 'Action',
    cell: (info) =>
      h('div', { class: 'flex gap-2' }, [
        h(
          'button',
          {
            class: 'btn btn-sm  btn-info',
            onClick: () =>
              router.push({ name: 'admin.promo.edit', params: { id: info.getValue() } })
          },
          h(FontAwesomeIcon, { icon: faPenToSquare })
        ),
        h(
          'button',
          {
            class: 'btn btn-sm btn-error',
            onClick: () => emit('destroy', info.getValue())
          },
          h(FontAwesomeIcon, { icon: faTrash })
        )
      ])
  })
]
const table = useVueTable({
  get data() {
    return data.value?.data || []
  },
  columns,
  getCoreRowModel: getCoreRowModel()
})

defineExpose({ refetch })
</script>

<template>
  <div class="bg-base-100 rounded-md shadow overflow-x-auto mb-6">
    <table class="table w-full whitespace-nowrap">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" class="w-full">
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isFetching">
          <td :colspan="columns.length" class="text-center">
            <span class="loading loading-infinity loading-lg"></span>
          </td>
        </tr>
        <tr v-else-if="isError">
          <td :colspan="columns.length" class="text-center">
            {{ error }}
          </td>
        </tr>
        <template v-else-if="!!data?.data?.length">
          <tr v-for="row in table.getRowModel().rows" :key="row.id" class="hover:bg-base-300">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="columns.length" class="text-center">NO DATA</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <div class="flex justify-between items-center px-2">
    <div v-if="isFetching" class="skeleton w-28 h-5"></div>
    <div v-else class="h-fit text-sm">
      Showing
      <span class="font-semibold">{{ data.meta.from ?? 0 }} - {{ data.meta.to ?? 0 }}</span> of
      <span class="font-semibold">{{ data.meta.total ?? 0 }}</span>
    </div>

    <div v-if="isFetching" class="skeleton w-96 h-12"></div>
    <div v-else class="join">
      <button
        v-for="(link, k) in data.meta.links"
        :key="k"
        :disabled="!link.url"
        @click="handlePageChange(link.url)"
        class="join-item btn"
        :class="{ 'btn-active': link.active }"
      >
        {{ link.label }}
      </button>
    </div>
  </div>
</template>
