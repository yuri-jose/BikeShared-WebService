<template>
  <q-page class="flex col-6 flex-center">
    <q-card class="flex flex-center q-px-md container">
      <div class="row">
        <div class="col-12 flex-center text-center">
          <br />
          <q-icon color="accent" size="5rem" name="img:/img/noun-bike-1997666.svg">
          </q-icon><br>
          <q-btn style="margin-top: -35px;" round dense flat :ripple="false" label=" Bike Shared" size="17px"
            color="black" class="q-mr-sm tex-bold" no-caps />
        </div>

        <div class="col-8 offset-2 flex flex-center login-content">
          <q-form @submit="handleLogin" class="text-center flex-center q-gutter-md">
            <div class="login-text-area">
              <q-input type="email" dense v-model="form.email" rounded outlined label="Email" lazy-rules :rules="[
                (val) =>
                  (val && val.length > 0) || 'Campo não pode estar vazio',
                (val) => (val && val.length > 12) || 'Email inválido',
                value => value.includes('@gmail', '@hotmail') || 'deve conter a palavra @gmail ou @hotmail',
                value => value.includes('.com') || 'Email inválido!'
              ]" />

              <q-input dense v-model="form.password" rounded outlined type="password" label="senha" lazy-rules :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Campo não pode estar vazio',
              ]" />
            </div>

            <div v-if="loading">
              <q-spinner-grid color="primary" size="2em" />
              <q-tooltip :offset="[0, 8]">QSpinnerGrid</q-tooltip>
            </div>

            <div class="login-btn-area">
              <q-btn unelevated rounded :id="id" dense label="acessar" type="submit" style="
                                                                          min-width: 100%;
                                                                          border: 0.5px solid #49d166;
                                                                          background-color: #49d166;
                                                                          color: #fff;
                                                                          padding: 5px 30px;
                                                                          font-weight: normal;
                                                                          .q-btn__content {
                                                                            padding: 10px;
                                                                          }
                                                                        " />

              <q-btn :to="{ name: 'reset-password' }" label="Esqueceu a Palavra Passe?"
                class="full-width q-my-md text-primary text-center" flat />
            </div>
            <br /><br />
            <q-spinner class="absolute-center" v-if="loading" size="xl" color="primary" />
          </q-form>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
//import { logobike } from '@quasar/extras/fontawesome-v6';
import axios from 'axios';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const form = ref({ email: '', password: '' });

    //const user = {};

    const loading = ref(false);

    const logobike = '../../../public/img/bike.png'

    const router = useRouter();

    const dataLugares = new FormData();

    const url = 'http://192.168.179.62/';

    const handleLogin = async () => {
      try {
        loading.value = true;
        dataLugares.append('email', form.value.email);
        dataLugares.append('pass', form.value.password);
        axios({
          method: 'post',
          url: `${url}cinema/admin/login`,
          headers: { 'content-type': 'multipart/form-data' },
          data: dataLugares,
        })
          .then((res) => {
            /*
        $q.notify({
          title: `${res}`,
          color: 'positive',
          position: 'top',
          message: 'Reserva Efetuada com Sucesso!!',
          icon: 'done'
        })*/
            //alert(JSON.stringify(res.data));
            user = res.data;
          })
          .catch((error) => {
            $q.dialog({
              title: 'Erro ao oucupar lugar!!!',
              dark: true,
              message: `tipo de erro: ${error}`,
              progress: {
                spinner: QSpinnerGears,
                color: 'negative',
              },
              persistent: true, // we want the user to not be able to close it
              ok: true, // we want the user to not be able to close it
            });
            alert(error);
            console.log(error);
          });
        router.push('/dashboard');
      } catch (error) {
        alert(error.message);
      } finally {
        router.push('/dashboard');
        loading.value = false;
      }
    };
    return {
      handleLogin,
      form,
      loading,
      logobike,
    };
  },
});
</script>

<style scoped>
.login-content {
  margin-top: 40px;
  margin-bottom: auto;
  height: 100%;
}

.login-cab {
  padding: 0 10px;
  margin-bottom: 30px;
}

.login-title {
  font-weight: bold;
  margin: 0;
  padding: 0;
}

.login-text-area .q-field {
  margin-top: 0;
  margin-bottom: 0;
}

.login-btn-area {
  margin-top: 40px;
}

.login-content .q-btn {
  margin: 5px 0;
}
</style>
