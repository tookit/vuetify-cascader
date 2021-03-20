<template>
  <v-menu v-model="showMenu" :close-on-content-click="false" offset-y tile>
    <template #activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        ref="text"
        :label="label"
        :placeholder="placeholder"
        hide-details
        readonly
        append-icon="mdi-chevron-down"
        :value="inputValue"
        :dense="dense"
        :outlined="outlined"
        v-on="on"
      />
    </template>
    <v-sheet>
      <div class="v-cascader">
        <v-cascader-item
          :items="items"
          :dense="dense"
          :multiple="multiple"
          :selected-items="selectedItems"
          :value.sync="value"
          :item-text="itemText"
          :item-value="itemValue"
          @input="handleInput"
        />
      </div>
    </v-sheet>
  </v-menu>
</template>
<script>
import { findPath, findPathNodes } from 'n-ary-tree'
import { VMenu, VTextField, VSheet } from 'vuetify/lib/components/'
import VCascaderItem from './VCascaderItem.vue'
export default {
  name: 'VCascader',
  components: {
    VMenu,
    VTextField,
    VSheet,
    VCascaderItem,
  },
  props: {
    items: Array,
    label: String,
    placeholder: String,
    name: String,
    dense: Boolean,
    outlined: Boolean,
    multiple: Boolean,
    childrenKey: {
      type: String,
      default: 'children',
    },
    seperator: {
      type: String,
      default: ' / ',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    value: {
      type: [Array, Number, String],
      default: () => [],
    },
  },
  data() {
    return {
      showMenu: false,
      selectedItems: null,
    }
  },
  computed: {
    inputValue() {
      return this.selectedItems
        ? this.selectedItems
            .map((item) => item[this.itemText])
            .join(this.seperator)
        : null
    },
  },
  watch: {
    value: {
      handler(val) {
        return (this.selectedItems = this.multiple
          ? this.findPathNodes(val)
          : this.findPath(val))
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleInput(val) {
      if (this.multiple) {
        this.selectedItems = this.findPathNodes(val)
      }
      this.$emit('input', val)
    },
    findPath(id) {
      return id
        ? this.items
            .map((item) => {
              return findPath(item, id, {
                value: this.itemValue,
                children: this.childrenKey,
              })
            })
            .filter((item) => item.length > 0)
            .pop()
        : []
    },
    findPathNodes(val) {
      return val
        ? this.items
            .map((item) => {
              const find = findPathNodes(item, val, {
                value: this.itemValue,
                children: this.childrenKey,
              })
              return find
            })
            .filter((item) => item.length > 0)
            .pop()
        : []
    },
  },
}
</script>
