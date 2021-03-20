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
            clearable
            outlined
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { VContainer, VRow, VCol, VApp } from 'vuetify/lib/components/'
import VCascader from './components/VCascader.vue'

export default {
  components: {
    VApp,
    VContainer,
    VRow,
    VCol,
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
      selectedItem: 11,
    }
  },
}
</script>
