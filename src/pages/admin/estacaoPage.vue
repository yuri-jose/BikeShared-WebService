<template>
  <q-page>
    <q-toolbar-title class="flex text-h5 text-bold">Dashboard da Estação {{ }}</q-toolbar-title>
    <div class="row q-mt-md q-gutter-x-md" style="height: 60%">
      <div class="col" style="widht: 40%; border-radius: 10px">
        <div class="row q-gutter-x-md">

          <!--
            Primeiro Carde - Total de reservas feitas nas últimas 24h
          -->
          <div class="col ">
            <q-card :dense="$q.screen.lt.md" class="my-card text-white" style="
             background: radial-gradient(circle, #00ff7e 0%, #5fcc2e 100%);
             height: 120px;
            ">
              <q-card-section>
                <q-icon name="group" color="black" size="md" />
                <div class="text-subtitle2 text-bold">Total de levantamentos</div>
                <p class="text-right q-mt-sm q-mr-sm text-subtitle1">244</p>
              </q-card-section>
            </q-card>
          </div>
          <!-----------2º Card- Total de Entregas de Bikes-------->
          <div class="col q-ml-md">
            <q-card :dense="$q.screen.lt.md" class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
            height: 120px;">
              <q-card-section>
                <q-icon name="group" color="black" size="md" />
                <div class="text-subtitle2 text-bold">
                  Total de Entregas
                </div>
                <p class="text-right q-mr-sm text-subtitle1" style="margin-top: -15px">
                  14
                </p>
              </q-card-section>
            </q-card>
          </div>
          <!---------- 3º card- Total De Bicicletas Disponíveis-------->
          <div class="col">
            <q-card :dense="$q.screen.lt.md" class="my-card text-white" style="
              background: radial-gradient(circle, #ab47bc 0%, #800080 100%); height: 120px;
            ">
              <q-card-section>
                <q-icon name="img:/img/noun-bike-1997666.svg" size="lg" />
                <div class="text-subtitle2 text-bold">Total De Bicicletas Disponíveis</div>
                <p class="text-right q-mt-sm q-mr-sm text-subtitle1">15</p>
              </q-card-section>
            </q-card>
          </div>
          <!-------------- 4º Card- Total de Docas Livres---------------->
          <div class="col q-ml-md">
            <q-card :dense="$q.screen.lt.md" class="my-card text-white" style="
              background: radial-gradient(circle, #ffb268 0%, #ff8c00 100%); height: 120px;
            ">
              <q-card-section>
                <q-icon name="category" color="black" size="md" />
                <div class="text-subtitle2 text-bold">Total de Docas Livres</div>
                <p class="text-right q-mt-sm q-mr-sm text-subtitle1">100</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-md">
      <div class="row q-gutter-x-md">
        <!-----------Lista e Gráfico dos Dias da semana mais solicitados---------------->
        <div class="col" style="background-color: white; height: auto">
          <q-toolbar>
            <q-toolbar-title class="text-subtitle1 text-bold">
              Dias da semana mais solicitados
            </q-toolbar-title>
          </q-toolbar>
          <div>
            <q-tabs :dense="$q.screen.lt.md" v-model="tab" class="text-grey" active-color="primary"
              indicator-color="primary" narrow-indicator inline-label>
              <q-tab name="grafico" icon="bar_chart" label="Gráfico" />
              <q-tab name="lista" icon="list_alt" label="Lista" />
            </q-tabs>

            <q-tab-panels :dense="$q.screen.lt.md" v-model="tab" animated class="shadow-2 rounded-borders q-mt-xs"
              style="height: 300px">
              <!-----------Gráfico dos Dias da semana mais solicitados---------------->
              <q-tab-panel name="grafico">
                <div id="chart">
                  <apexchart type="bar" height="300" :options="bar.chartOptions" :series="bar.series"></apexchart>
                </div>
              </q-tab-panel>
              <!-----------Lista dos Dias da semana mais solicitados---------------->
              <q-tab-panel name="lista">
                <div>
                  <q-list separator>
                    <q-item v-for="dayStatistic in daysStatistic" :key="dayStatistic.dayOfWeek" clickable v-ripple>
                      <q-item-section top avatar>
                        <q-avatar>
                          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{ dayStatistic.dayOfWeek }}</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-badge class="text-subtitle2" color="red">
                          {{ dayStatistic.value }}
                        </q-badge>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref, reactive, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'IndexPage',
  components: {
    apexchart: VueApexCharts,
  },

  setup() {
    //-----------PRIMEIRO GRÁFICO Número de eservas feitas ao longo do ano------------------
    const visible = ref(false)

    //const mycinemas = ref(['Cine_UAN', 'Cine_ADS', 'Cine_malanje', 'Cine_Benguela', 'Cine Cazenga'])
    const daysOfWeek = ref([
      'Domingo',
      'Segunda Feira',
      'Terça Feira',
      'Quarta Feira',
      'Quinta Feira',
      'Sexta Feira',
      'Sábado'
    ]);

    function statisticDaysWeek() {
      const solicitacoes = [97, 67, 55, 77, 70, 81, 31];

      return solicitacoes;
    }

    const statistic = ref(statisticDaysWeek());

    const daysStatistic = ref([]);

    function preechDaysValue() {
      statistic.value.forEach((element, index) => {
        daysStatistic.value.push({
          dayOfWeek: daysOfWeek.value[index],
          value: element
        })
      });
    }

    const getdDataBD = async () => {
      visible.value = true
      //alert('foiiiii')
      for (let index = 0; index < 10; index++) {
        //const element = array[index];
      }
      visible.value = false
    }

    //--------------------Último Gráfico--------------------------------------
    const bar = reactive({
      series: [
        {
          name: 'Servings',
          data: [],
        },
      ],
      chartOptions: {
        annotations: {
          points: [
            {
              x: 'usuarios',
              seriesIndex: 0,
              label: {
                borderColor: '#775DD0',
                offsetY: 0,
                style: {
                  color: '#fff',
                  background: '#775DD0',
                },
                text: 'Bike Shared',
              },
            },
          ],
        },
        chart: {
          height: 400,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 7,
            columnWidth: '37%',
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          width: 3,
        },

        grid: {
          row: {
            colors: ['#fff', '#f2f2f2'],
          },
        },
        xaxis: {
          categories: [],
          tickPlacement: 'on',
        },
        yaxis: {
          max: 100,
          title: {
            text: 'Dados Estatísticos',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100],
          },
        },
      },
    });
    bar.series[0].data = statistic;
    bar.chartOptions.xaxis.categories = daysOfWeek.value;
    //--------FIM ÚLTIMO GRÁFICO-----------------------------------------------------

    //------------3º Gráfico Dos Filmes mais assistidos----------------------------
    const chart = reactive({
      series: [
        {
          data: [400, 399, 44, 470, 540],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'Até o último Homem',
            'O Heroi Não Chora',
            'Yuri Boyca',
            'Comando Da Jeni',
            'Speed Gonzalo',
          ],
        },
      },
    });
    //------------FIM 3º Gráfico Dos Filmes mais assistidos----------------------------

    onMounted(async () => {
      getdDataBD();
      preechDaysValue();
    });

    return {
      daysStatistic,
      visible,
      bar,
      chart,
      filter: ref(''),
      tab: ref('grafico'),

      users: [
        {
          nome: 'Até o último Homem',
          numero: 100,
        },
        {
          nome: 'O Heroi Não Chora',
          numero: 98,
        },
        {
          nome: 'Yuri Boyca',
          numero: 74,
        },
        {
          nome: 'Comando Da Jeni',
          numero: 12,
        },
        {
          nome: 'Speed Gonzalo',
          numero: 5,
        },
      ],
    };
  },
};
</script>
<style scoped></style>
