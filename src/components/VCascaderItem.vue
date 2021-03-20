<template>
  <div class="v-cascader__item d-flex flex">
    <v-list class="v-cascader__list d-flex flex pa-0" :dense="dense">
      <v-list-item-group v-model="selectedItem" style="flex: 1 1 auto">
        <template v-for="item in items">
          <v-list-item
            :key="item.id"
            :value="item"
            @click="handleSelectItem(item)"
          >
            <v-list-item-title>{{ item[itemText] }}</v-list-item-title>
            <v-list-item-icon>
              <template
                v-if="item[childrenKey] && item[childrenKey].length > 0"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </template>
              <template v-else>
                <div class="v-cascader__holder" style="min-height: 24px"></div>
              </template>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
import {
  VList,
  VListItem,
  VListItemGroup,
  VListItemTitle,
  VListItemIcon,
  VIcon,
} from 'vuetify/lib/components/'
export default {
  name: 'VCascaderItem',
  components: {
    VList,
    VListItem,
    VListItemGroup,
    VListItemTitle,
    VListItemIcon,
    VIcon,
  },
  props: {
    dense: Boolean,
    multiple: Boolean,
    items: Array,
    selectedItems: Array,
    childrenKey: {
      type: String,
      default: 'children',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    depth: {
      type: [Number],
      default: 0,
    },
    value: {
      type: [Object, String],
    },
  },
  data() {
    return {
      selectedItem: null,
    }
  },
  computed: {
    selectedChildren() {
      return this.selectedItem ? this.selectedItem[this.childrenKey] : []
    },
  },
  watch: {
    value: {
      handler(val) {
        this.initValue(val)
      },
      immediate: true,
    },
  },
  methods: {
    initValue(val) {
      this.selectedItem = val
    },
    handleSelectItem(item) {
      this.$emit('select', { depth: this.depth, item: item })
    },
  },
}
</script>

<style lang="sass" scoped>
.v-cascader__list
  flex: 1
</style>
