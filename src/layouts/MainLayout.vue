<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="img:/img/noun-bike-1997666.svg" style="margin-right: -15px;" size="45px" />
          <q-toolbar-title shrink class="text-weight-bold">
            Bike Shared
          </q-toolbar-title>
        </q-btn>
        <q-btn flat no-caps no-wrap class="q-ml-ms" v-else>
          <q-icon name="img:/img/noun-bike-1997666.svg" style="margin-right: -15px;" size="30px" />
          <q-toolbar-title shrink class="text-weight-bold">
            Bike Shared
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="message">
            <q-tooltip>Mensagens</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 7 </q-badge>
            <q-tooltip>Notificações</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="30px">
              <img src="img/huawei.png" />
            </q-avatar>
            <q-tooltip>{{ user.name }}</q-tooltip>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">

                  <q-btn class="q-mt-md" label="Meu Perfil" dark-percentage />
                  <q-btn class="q-mt-md" label="Minhas Notas" dark-percentage />
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="img/huawei.png">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.name }}</div>

                  <q-btn color="primary" label="Sair" push size="sm" v-close-popup />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="240">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable :to="link.route">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold text-uppercase">
            MAIS DO BIKESHARED
          </q-item-label>

          <q-separator class="q-my-md" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a v-for="button in buttons1" :key="button.text" class="YL__drawer-footer-link" href="javascript:void(0)">
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MyLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    const user = { name: 'Yuri Rego' };

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      user,
      leftDrawerOpen,

      toggleLeftDrawer,

      links1: [
        { icon: 'home', text: 'Home', route: '/dashboard' },
        { icon: 'subscriptions', text: 'Estações', route: '/listEstacao' },
        { icon: 'group', text: 'Utilizadores', route: '/listUsers' },
      ],

      buttons1: [
        { text: 'About' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Developers' },
      ],
    };
  },
};
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
