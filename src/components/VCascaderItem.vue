<template>
  <div class="v-cascader__item d-flex flex">
    <v-list class="v-cascader__list d-flex flex pa-0" :dense="dense">
      <v-list-item-group v-model="selectedItem" style="flex: 1 1 auto">
        <template v-for="item in items">
          <v-list-item :key="item.id" :value="item">
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
    <template
      v-if="
        selectedItem &&
        selectedItem[childrenKey] &&
        selectedItem[childrenKey].length > 0
      "
    >
      <v-divider vertical />
      <v-cascader-item
        v-if="selectedChildren"
        :depth="depth + 1"
        :items="selectedChildren"
        :selected-items="selectedItems"
        :item-text="itemText"
        :item-value="itemValue"
        :value="value"
        :dense="dense"
        :multiple="multiple"
        @input="handleInput"
      />
    </template>
  </div>
</template>
<script>
import VCascaderItem from './VCascaderItem'
import {
  VList,
  VListItem,
  VListItemGroup,
  VListItemTitle,
  VListItemIcon,
  VIcon,
  VDivider,
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
    VDivider,
    VCascaderItem,
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
      type: [Array, Number, String],
      default: () => [],
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
        if (val) {
          this.selectedItem = this.selectedItems[this.depth]
        }
      },
      immediate: true,
    },
    selectedItem: {
      handler(val) {
        if (val) {
          let value = this.value
          if (this.multiple) {
            switch (this.depth) {
              case 0:
                value = [0, 0, 0]
                value[0] = val.id
                break
              case 1:
                value[1] = val.id
                value[2] = 0
                break
              default:
                value[2] = 0
                break
            }
            value[this.depth] = val.id
            this.$emit('input', value)
          } else {
            this.$emit('input', val.id)
          }
        }
      },
    },
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="sass" scoped>
.v-cascader__list
  flex: 1
</style>
