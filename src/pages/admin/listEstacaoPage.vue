<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-pa-sm">Estações</div>
    <q-card class="q-mb-sm" flat bordered>
      <div class="row q-pa-md q-gutter-sm">
        <q-input class="col-7 col-sm-7 col-md-7 col-xs-12 col-lg-7 col-xl-7" v-model="filter"
          placeholder="Pesquisar Cinemas" dense outlined />
        <q-space />
        <q-btn class="text-orange col-2 col-sm-2 col-md-2 col-xs-12 col-lg-2 col-xl-2" color="black" label="Nova Estação"
          @click="newDialog()" no-caps rounded>
        </q-btn>
        <q-btn class="text-orange col-2 col-sm-2 col-md-2 col-xs-12 col-lg-2 col-xl-2" color="black" label="Atualizar"
          @click="listAll()" no-caps rounded>
        </q-btn>
      </div>
    </q-card>
    <!---->

    <q-inner-loading :showing="loading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />

    <div class="q-pa-md">
      <q-table :dense="$q.screen.lt.md" title="Lista de Estações" :rows="rows" :columns="columns" row-key="id"
        :loading="loading" :filter="filter" separator="cell"
        :visible-columns="['nome', 'localizacao', 'docas_livres', 'total_docas', 'saldo', 'estado', 'opcoes']">
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
            <q-td key="total_docas" class="text-center" :props="props">
              {{ props.row.total_docas }}
            </q-td>
            <q-td key="saldo" class="text-center" :props="props">
              {{ props.row.saldo }}
            </q-td>
            <q-td key="estado" class="text-center" :props="props">
              <q-btn color="green" v-if="props.row.estado" label="Activo" flat square @click="props.row.estado = false"
                dense />
              <q-btn color="red-10" v-else label="Inactivo" flat square @click="props.row.estado = true" dense />
            </q-td>
            <q-td key="opcoes" class="text-center q-gutter-x-md align-center" :props="props">
              <q-btn color="grey" flat square icon="visibility" @click="verEstacao(props.row)" dense />
              <q-btn color="blue-10" flat square icon="edit" @click="newDialog(props.row)" dense />
              <q-btn color="red" flat square icon="delete" @click="newDialog(props.row)" dense />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog persistent v-model="dialogEstacao">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center"><strong>Editar Dados da Estação</strong></div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll q-pt-none" style="max-height: 70vh">
          <q-input v-model="formData.nome" filled type="text" hint="Nome da Estação" />
          <div class="q-pa-md">
            <div class="text-center q-gutter-md row items-start">
              <q-input v-model="formData.localizacao" filled type="text" hint="Localização" />
              <q-input v-model="formData.docas_livres" filled type="number" hint="Docas Livres" />
              <q-input v-model="formData.total_docas" filled type="number" hint="Total de Docas" />
              <q-input v-model="formData.saldo" filled type="number" hint="Pontos Pela Entrega da Bina" />
            </div><br>

            <q-separator /><br>

            <div class="text-center"><strong>Coordenadas Geográfica</strong></div>

            <q-input v-model="formData.latitude" filled hint="Latitude" />
            <q-input v-model="formData.longitude" filled hint="Longetude" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Enviar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
      <div>
        <q-inner-loading :showing="loading" label="Atualizando..." label-class="text-primary" color="primary"
          label-style="font-size: 1.1em" />
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
//import { useQuasar } from 'quasar';
//import soap from 'soap';
import axios from 'axios';

//import { useStore } from "vuex";
import useAuthUser from 'src/composebles/useAuthUser';
import { useRouter } from 'vue-router';

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
    name: 'localizacao',
    required: true,
    label: 'Localização',
    align: 'center',
    field: row => row.name,
    sortable: true

  },
  {
    name: 'docas_livres',
    required: true,
    label: 'Docas Livres',
    align: 'center',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'total_docas',
    required: true,
    label: 'Total de Docas',
    align: 'center',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'saldo',
    required: true,
    label: 'Saldo de Entrega',
    align: 'center',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'estado',
    required: true,
    label: 'Estado',
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

export default defineComponent({
  setup() {
    const loading = ref(true);

    const dialogEstacao = ref(false);

    const { infoStation } = useAuthUser();
    //const $q = useQuasar();

    // const url = 'http://192.168.228.48:9090';

    const router = useRouter();

    // const rows = ref([]);
    const rows = ref([
      {
        nome: 'UAN Station',
        localizacao: 'Talatona',
        docas_livres: 12,
        id: 0,
        total_docas: 21,
        estado: true,
        saldo: 9,
        id: 1
      },
      {
        nome: 'OUR Station',
        localizacao: 'Talatona',
        docas_livres: 7,
        id: 1,
        total_docas: 23,
        estado: true,
        saldo: 11,
        id: 2
      },
      {
        nome: 'ISPTEC Station',
        localizacao: 'Talatona',
        docas_livres: 3,
        id: 2,
        total_docas: 17,
        estado: false,
        saldo: 7,
        id: 3
      }
    ]);

    const formData = ref({
      nome: 'UAN Station',
      localizacao: 'Talatona',
      docas_livres: 12,
      id: 0,
      total_docas: 21,
      saldo: 7,
      longitude: null,
      latitude: null
    })

    const verEstacao = async (id) => {
      router.push('/estacao');
    }

    const newDialog = (data) => {
      //alert(JSON.stringify(data))
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.value[key] = data[key];
          //alert(JSON.stringify(formData.value))
        });
      } else {
        formData.value.nome = '';
        formData.value.docas_livres = null;
        formData.value.total_docas = null;
        formData.value.localizacao = '';
        formData.value.latitude = null;
        formData.value.longitude = null;
        formData.value.saldo = null;
      }

      dialogEstacao.value = true;
    };

    const listAll = async () => {
      try {
        loading.value = true;
        //infoStation();
        //infoStation();
        //const stations = await axios.get(`${url}`);
        //alert(JSON.stringfy(stations));
        //console.log(stations)

        //rows.values = auxFilme.data.data;

      } catch (error) {
        alert(error);
      } finally {
        loading.value = false;
      }
    };

    const saveItem = async () => {
      try {
        loading.value = true;
        if (!formData.value.id) {
          // delete formData.value.id;
          // await post("categoria", formData);
        } else {
          //await update("categoria", formData);
        }
        listAll();
      } catch (error) {
        alert(error);
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      listAll();
      loading.value = false;
    });

    // loading.value = false
    const filter = ref('');
    return {
      filter,
      loading,
      dialogEstacao,
      formData,
      newDialog,
      verEstacao,
      columns,
      rows,
      saveItem,
      listAll
    };
  },
});
</script>

<style></style>
