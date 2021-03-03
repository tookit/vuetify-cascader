# vuetify-cascader

A missing cascader select for vuetify

# Demo

http://vma.isocked.com/#/element/cascader/

![example](https://raw.githubusercontent.com/tookit/vuetify-cascader/master/docs/example.png)

# Installation

```
# npm
npm install vuetify-cascader

# Yarn
yarn add vuetify-cascader
```

# Usage

```
<template>
  <v-app id="app">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-cascader
            v-model="selectedItem"
            label="Select Product"
            item-value="id"
            item-text="text"
            :items="items"
            outlined
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import VCascader from './components/VCascader.vue'

export default {
  components: {
    VCascader,
  },

  data() {
    return {
      items: [
        {
          id: 1,
          text: 'Phone',
          value: 'phone',
          children: [
            {
              id: 2,
              text: 'IPhone',
              value: 'iphone',
              children: [
                {
                  id: 3,
                  text: 'IPhone 12',
                  value: 'iphone 12',
                },
                {
                  id: 99,
                  text: 'IPhone 8',
                  value: 'iphone 8',
                },
              ],
            },
          ],
        },
        {
          id: 11,
          text: 'Computer',
          value: 'computer',
          children: [
            {
              id: 12,
              text: 'Mac',
              value: 'mac',
              children: [
                {
                  id: 13,
                  text: 'Mac Air',
                  value: 'Mac air',
                },
              ],
            },
            {
              id: 14,
              text: 'PC',
              value: 'PC',
              children: [
                {
                  id: 15,
                  text: 'Surface',
                  value: 'surface ',
                },
              ],
            },
          ],
        },
      ],
      selectedItem: null,
    }
  },
}
</script>


```

For other uses see examples: https://github.com/tookit/vuetify-cascader/blob/master/src/App.vue
