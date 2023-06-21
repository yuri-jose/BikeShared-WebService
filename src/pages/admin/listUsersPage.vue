<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-pa-sm">Clientes</div>
    <q-card class="q-mb-sm" flat bordered>
      <div class="row q-pa-md q-gutter-sm">
        <q-input class="col-7 col-sm-7 col-md-7 col-xs-12 col-lg-7 col-xl-7" v-model="filter"
          placeholder="Pesquisar Cinemas" dense outlined />
        <q-space />
        <q-btn class="text-orange col-2 col-sm-2 col-md-2 col-xs-12 col-lg-2 col-xl-2" color="black" label="Nova Estação"
          @click="newDialog()" no-caps rounded>
        </q-btn>
        <q-btn class="text-orange col-2 col-sm-2 col-md-2 col-xs-12 col-lg-2 col-xl-2" color="black" label="Atualizar"
          @click="listAll()" to="/estacao" no-caps rounded>
        </q-btn>
      </div>
    </q-card>
    <!--
    <div class="q-pa-md">
    <q-table :dense="$q.screen.lt.md" flat square bordered title="Lista de Estações" :rows="cinemas" :columns="columns"
      :visible-columns="['nome', 'localizacao', 'docas_livres']" row-key="id" :filter="filter" separator="cell">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nome" class="text-center" :props="props">
            {{ props.row.nome }}
          </q-td>
          <q-td key="localizacao" :props="props">
            {{ props.row.localizacao }}
          </q-td>
          <q-td key="docas_livres" class="text-center" :props="props">
            {{ props.row.docas_livres }}
          </q-td>
          <q-td key="options" class="text-center align-center" :props="props">
            <q-btn color="grey" flat square icon="visibility" @click="verCliente(props.row)" dense />
            <q-btn color="orange-10" flat square icon="edit" @click="$eventnewDialog(props.row)" dense />
            <q-btn color="red" flat square icon="delete" @click="newDialog(props.row)" dense />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>
    -->

    <div class="q-pa-md">
      <q-table :dense="$q.screen.lt.md" title="Lista de Estações" :rows="rows" :columns="columns" row-key="id"
        :loading="loading" :filter="filter" separator="cell"
        :visible-columns="['nome', 'email', 'contacto', 'saldo', 'opcoes']">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nome" class="text-center" :props="props">
              {{ props.row.nome }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="contacto" class="text-center" :props="props">
              {{ props.row.contacto }}
            </q-td>
            <q-tr key="saldo" class="text-center" :props="props">
              {{ props.row.saldo }}
            </q-tr>
            <q-td key="opcoes" class="text-center q-gutter-x-md align-center" :props="props">
              <q-btn color="green" v-if="props.row.estado" label="Activo" flat square @click="newDialog(props.row)"
                dense />
              <q-btn color="red-10" v-else label="Inactivo" flat square @click="newDialog(props.row)" dense />
              <q-btn color="grey" flat square icon="visibility" @click="verCliente(props.row)" dense />
              <q-btn color="blue-10" flat square icon="edit" @click="$eventnewDialog(props.row)" dense />
              <q-btn color="red" flat square icon="delete" @click="newDialog(props.row)" dense />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>

  <div class="column" style="min-width: 99.9%">


    <q-inner-loading :showing="loading" label="Atualizando..." label-class="text-primary" color="primary"
      label-style="font-size: 1.1em" />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
//import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router';

const columns = [
  {
    name: 'nome',
    required: true,
    label: 'Nome',
    align: 'center',
    field: 'nome',
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'center',
    field: row => row.name,
    sortable: true

  },
  {
    name: 'contacto',
    required: true,
    label: 'Contacto',
    align: 'center',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'saldo',
    required: true,
    label: 'Saldo',
    align: 'center',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'opcoes',
    required: true,
    label: 'Opções',
    align: 'center',
    field: row => row.name,
    sortable: true
  },
]

const rows = [
  {
    nome: 'Edson Carlos Xauvunge',
    email: 'edsocarlos@gmail.com',
    contacto: 9256911171,
    saldo: 10,
    estado: true,
    genero: 'M',
    //trajetoria: {},
    id: 0
  },
  {
    nome: 'Yuri José Rego',
    email: 'yurirego12@gmail.com',
    contacto: 934113448,
    saldo: 12,
    estado: true,
    genero: 'M',
    id: 1
  },
  {
    nome: 'Elizabeth Mateus',
    email: 'elizabeth@gmail.com',
    contacto: 944957954,
    saldo: 77,
    genero: 'F',
    id: 2
  }
]
export default defineComponent({
  setup() {
    const loading = ref(true);
    //const $q = useQuasar();

    const router = useRouter();

    const newDialog = async (id) => {
      id.value = '1234567';
    }

    const verCliente = async (id) => {
      router.push('/cliente');
    }

    loading.value = false
    const filter = ref('');
    return {
      filter,
      loading,
      newDialog,
      verCliente,
      columns,
      rows
      //varDialogPassword: ref(false),
    };
  },
});
</script>

<style></style>
