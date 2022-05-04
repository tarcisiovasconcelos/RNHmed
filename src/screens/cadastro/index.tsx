import * as React from 'react';
import { StyleSheet, View, Text , ImageBackground, ActivityIndicator, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { useState } from 'react';
import { InputRound } from './components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export interface CadastroProps {
}
//LOGIN
export function Cadastro (props: CadastroProps) {

    const nav = useNavigation();
    const [erro, setErro] = useState<null|string>(null);
    
        
    const cadastro = async (dados:any) => {
        setErro(null)
        
        await new Promise((resolve) => setTimeout(() => resolve(''), 2000))
            console.log(dados);       
    }

    return (
      <ImageBackground source={require('./../../assets/imgs/bg2.png')}
                            style={styles.background}>
      
      <Formik
        initialValues={{email:'', senha: '', user: '', senha1: ''}}
        validationSchema={Yup.object({
          user: Yup.string().required('*Campo Obrigatório*'),
          email: Yup.string().required('*Campo Obrigatório*').email('campo deve ser EMAIL'),
          senha: Yup.string().required('*Campo Obrigatório*').min(4,'A senha deve conter no minimo 4 dígitos').max(6,'A senha deve conter no máximo 6 dígitos'),
          senha1: Yup.string().required('*Campo Obrigatório*').oneOf([Yup.ref('senha')], 'as senhas precisam ser iguais'), 

        })}
        onSubmit={cadastro}
        >
        {({ handleChange, touched, handleSubmit, handleBlur, isSubmitting, errors}) => (
        <View style={styles.container}>
          <Text style={styles.text1}>Cadastro</Text>

          <Text style={{paddingLeft: 30}}>Paciente</Text>
          <InputRound onBlur={handleBlur('user')} placeholder="Digite o nome do paciente" icone="person" onChangeText={handleChange('user')}/>
          { touched.user && <Text style={styles.errorLabel}>{errors.user}</Text>}

        <Text style={{paddingLeft: 30}}>E-mail</Text>
          <InputRound onBlur={handleBlur('email')} placeholder="Digite seu email" icone="email" onChangeText={handleChange('email')}/>
          { touched.email && <Text style={styles.errorLabel}>{errors.email}</Text>}

        <Text style={{paddingLeft: 30}}>Senha</Text>
          <InputRound onBlur={handleBlur('senha')} placeholder="Digite sua senha" icone="lock" senha onChangeText={handleChange('senha')}/>
          { touched.senha && <Text style={styles.errorLabel}>{errors.senha}</Text>}
          { erro != null && <Text style={styles.errorLabel}>{erro}</Text>}

        <Text style={{paddingLeft: 30}}>Confirmar Senha</Text>
          <InputRound onBlur={handleBlur('senha1')} placeholder="Digite novamente sua senha" icone="lock" senha onChangeText={handleChange('senha1')}/>
          { touched.senha && <Text style={styles.errorLabel}>{errors.senha1}</Text>}
          { erro != null && <Text style={styles.errorLabel}>{erro}</Text>}
          { isSubmitting && <ActivityIndicator style={styles.bolinha}  size="large" color="black"/>}
          { !isSubmitting && <Button title="Cadastrar" onPress={handleSubmit} buttonStyle={{ borderRadius: 30, backgroundColor: '#1C3144', marginTop: 10}}></Button>}
        </View>)}
      </Formik>
      <View style={styles.container2}>
      <TouchableOpacity onPress={() => nav.navigate('Tela-Login')}>
          <Text style={styles.text2}>Já se cadastrou? Clique aqui para entrar.</Text>
      </TouchableOpacity>
      <StatusBar style="dark"/>
      </View>
      <View style={styles.rodape}>

      </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({

//CSS BACKGROUND + INDICATOR
background: {
  width: '100%',
  height: '100%',  
},

bolinha: {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingTop: 15
},

//CSS VIEWS
rodape:{
  flex:1,
},

container: {
  flex: 20,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 30,

},

container2: {
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-end'
},

//CSS TEXTOS
text2: {
  color:'black',
  fontSize: 11,
  textAlign: 'center',
  textDecorationLine: 'underline',
},

text1: {
  textAlign: 'center',
  color:'black',
  fontSize: 20,
  paddingLeft: 30,
  paddingTop:50,
  fontStyle: 'italic'
},

errorLabel: {
  color:'red',
  fontSize: 12,
  marginTop: 0,
  marginBottom: 5,
  textAlign: 'center'
  
}

})