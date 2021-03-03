<template>
  <v-menu v-model="showMenu" :close-on-content-click="false" offset-y tile>
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        :placeholder="placeholder"
        hide-details
        readonly
        append-icon="mdi-chevron-down"
        :value="inputValue"
        :dense="dense"
        :outlined="outlined"
        v-on="on"
        v-bind="attrs"
        ref="text"
      />
    </template>
    <v-sheet>
      <div class="v-cascader">
        <v-cascader-item
          :items="items"
          :dense="dense"
          :selected-items="selectedItems"
          @input="handleInput"
          :value.sync="value"
          :item-text="itemText"
          :item-value="itemValue"
        />
      </div>
    </v-sheet>
  </v-menu>
</template>
<script>
import { findPath } from 'n-ary-tree'
import VCascaderItem from './VCascaderItem.vue'
export default {
  name: 'v-cascader',
  props: {
    items: Array,
    label: String,
    placeholder: String,
    name: String,
    dense: Boolean,
    outlined: Boolean,
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
  components: { VCascaderItem },
  computed: {
    selectedItems() {
      const search = parseInt(this.value)
      return this.items
        .map((item) => {
          return findPath(item, search, {
            value: this.itemValue,
            children: this.childrenKey,
          })
        })
        .filter((item) => item.length > 0)
        .pop()
    },
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
      handler() {},
      immediate: true,
    },
  },
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.v-cascader__close {
  position: absolute;
  right: 0;
}
</style>
