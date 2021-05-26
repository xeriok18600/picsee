<template>
  <v-container>
    <!-- <v-card width="344" class="mx-auto">
      <v-card-title>縮短網址</v-card-title>
      <v-card-text>
        <v-text-field v-model="url" outlined></v-text-field>
        <v-btn block color="primary" :disabled="!url" @click="postApi"
          >送出</v-btn
        >
      </v-card-text>
    </v-card> -->
    <v-card>
      <v-card-text>
        <v-data-table :headers="headers" :items="urlHistory">
          <template #top>
            <div class="d-flex">
              <v-text-field
                v-model="url"
                outlined
                placeholder="縮短網址"
                @keyup.enter="postApi"
              ></v-text-field>
            </div>
          </template>
          <template #item.url="props">
            <v-edit-dialog
              :return-value.sync="props.item.url"
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              {{ props.item.url }}
              <template #input>
                <v-text-field
                  v-model="props.item.url"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    url: '',
    headers: [
      {
        text: 'Dessert (100g serving)',
        value: 'url',
      },
    ],
  }),
  computed: {
    urlHistory() {
      return this.$store.state.url.urlHistory
    },
  },
  methods: {
    // 縮網址
    async postApi() {
      const formData = new FormData()
      formData.append('url', this.url)
      try {
        const { data } = await this.$service.url.postUrl(formData)
        this.$store.commit('url/setUrlHistory', { url: data.picseeUrl })
        this.url = ''
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
