<template>
  <div class="v-cascader__item">
    <v-list class="v-cascader__list" :dense="dense">
      <v-list-item-group v-model="selectedItem">
        <template v-for="item in items">
          <v-list-item :key="item.id" :value="item">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
            <v-list-item-icon>
              <template v-if="item[childrenKey]">
                <v-icon>mdi-chevron-right</v-icon>
              </template>
              <template v-else>
                <div class="v-cascader__holder"></div>
              </template>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-divider vertical></v-divider>
    <template v-if="selectedItem">
      <v-cascader-item
        v-if="selectedChildren"
        :depth="depth + 1"
        :items="selectedChildren"
        :selected-items="selectedItems"
        :value="value"
        :dense="dense"
        @input="handleInput"
      />
    </template>
  </div>
</template>
<script>
import VCascaderItem from './VCascaderItem'
export default {
  name: 'v-cascader-item',
  props: {
    dense: Boolean,
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
  components: { VCascaderItem },
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
      handler() {
        this.selectedItem = this.selectedItems[this.depth]
      },
      immediate: true,
    },
    selectedItem: {
      handler(val) {
        if (val) {
          this.$emit('input', val.id)
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

.v-cascader
    &__item
      display: flex
    &__list
      display: flex
      padding: 0
    &__holder
      min-height: 24px
</style>
