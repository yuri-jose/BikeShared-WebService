<template>
  <q-page>
    <q-toolbar-title style="margin-top: 10px;" class="text-center text-h5 text-bold">
      <strong class="text-blue-9 text-center"> {{ user.name }}</strong>
    </q-toolbar-title>

    <q-card :dense="$q.screen.lt.md" class="q-mt-md" style="width: 97%; background-color: white; border-radius: 2px">
    </q-card>
  </q-page>
</template>

<script>
//import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'ClientePage',
  setup() {
    const user = { name: 'Yuri Rego' }
    return {
      user
    }
  },
}
</script>

