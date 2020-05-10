<template>
  <v-sheet data-test="information-item" class="information-item">
    <h3 data-test="information-title" class="information-title">{{ information.title }}</h3>
    <div data-test="information-date" class="information-date">{{ formattedDate }}</div>
    <div data-test="information-message" class="information-message">message body.</div>
  </v-sheet>
</template>

<script lang="ts">

import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import Information from '@/domains/Information'
import dayjs from 'dayjs'


type Data = {
}

type Method = {
}

type Computed = {
  formattedDate: string
}

type Props = {
  information: Information
}

const options: ThisTypedComponentOptionsWithRecordProps<Vue, Data, Method, Computed, Props> = {
  props: {
    information: {
      type: Object as Vue.PropType<Information>,required: true
      }
  },

  computed: {
    formattedDate() {
      return dayjs(this.information.date).format('YYYY-MM-DD HH:mm:ss Z')
    }
  }
}

export default Vue.extend(options)


</script>


<style lang="scss" scoped>

.information-item {
  padding-top: 10px;
  margin-bottom: 15px;
  border-top: 1px dashed rgba(0,0,0,0.3);
}

.information-title {
  font-size: 24px;
}

.information-date {
  font-size: 12px;
  color: rgba(0,0,0,0.7);
}

</style>
