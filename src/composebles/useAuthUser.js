// import soap from 'soap';
import { ref } from 'vue';

const user = ref(null);

export default function useAuthUser() {
  // const { supabase } = useSupabase()

  //const soap = require('soap');
  /*
  const urlsoap =
    'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsd1';
  const infoStation = async (req, res) => {
    soap.createClient(urlsoap, (err, client) => {
      if (err) console.log(err);
      else {
        console.log('ok..', JSON.stringify(client));
        /*
        client.consultaCEP(
          {
            cep: '37552171',
          },
          (err, res) => {
            if (err) console.log(err);
            else console.log(res);
            // alert(JSON.stringify(res));
          }
        );

      }
    });
  };*/

  const login = async ({ email, password }) => {
    //  const { user, error } = await supabase.auth.signIn({ email, password })

    if (error) throw error;
    return user;
  };

  const loginWithSociaProvider = async (provider) => {
    // const { user, error } = await supabase.auth.update(provider)

    if (error) throw error;
    return user;
  };

  const logout = async () => {
    // const { error } = await supabase.auth.signOut()

    if (error) throw error;
  };

  const isLoggedIn = async () => {
    return !!user.value;
  };

  const register = async ({ email, password, ...meta }) => {
    // const { user, error } = await supabase.auth.signUp(
    //     { email, password },
    //     {
    //         data: meta,
    //         redirectTo: `${window.location.origin}/login`
    //     }
    //  )
    //  if (error) throw error
    return user;
  };

  const updated = async (data) => {
    //const { user, error } = await supabase.auth.update(data)

    // if (error) throw error
    return user;
  };

  const sendPasswordRestEmail = async (email) => {
    //const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)

    // if (error) throw error
    return user;
  };

  const resetPassword = async (accessToken, newPassword) => {
    //const { user, error } = await supabase.auth.api.updateUser(accessToken, { password: newPassword })
    //if (error) throw error
    //return user
  };

  return {
    user,
    //infoStation,
    login,
    loginWithSociaProvider,
    logout,
    isLoggedIn,
    register,
    updated,
    sendPasswordRestEmail,
    resetPassword,
  };
}
