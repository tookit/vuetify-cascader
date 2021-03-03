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

## Props

|   Name    |  Type   | Default | Required? | Description                                        |
| :-------: | :-----: | :-----: | :-------: | -------------------------------------------------- |
|   items   |  Array  |   []    |     Y     | A nested data set                                  |
| itemValue | String  |  value  |     N     | Set property of items’s value - must be primitive. |
| itemText  | String  |  value  |     N     | Set property of items’s text value                 |
| outlined  | Boolean |  false  |     N     | Applies the outlined style to the input            |
|   label   | String  |  null   |     N     | Set input's label                                  |


# Usage

```vue
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
            ...
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
