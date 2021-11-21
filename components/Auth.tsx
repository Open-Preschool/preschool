import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Styles } from '../lib/constants';
import { supabase } from '../lib/supabase';

import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  colorScheme: 'light' | 'dark';
}

export default Auth;
export function Auth({ colorScheme }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const handleLogin = async (type: string, email: string, password: string) => {
    setLoading(type);
    const { error, user } =
      type === 'LOGIN'
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password });
    if (!error && !user) Alert.alert('Check your email for the login link!');
    if (error) Alert.alert(error.message);
    if (!user) setLoading('');
  };

  const inputStyles = StyleSheet.create({
    input: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
  });

  return (
    <SafeAreaView style={colorScheme === 'dark' ? styles.dark : styles.light}>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Input
          style={inputStyles.input}
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType={'email-address'}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          style={inputStyles.input}
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Button
          title="Sign in"
          disabled={!!loading.length}
          loading={loading === 'LOGIN'}
          onPress={async () => await handleLogin('LOGIN', email, password)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={!!loading.length}
          loading={loading === 'SIGNUP'}
          onPress={async () => await handleLogin('SIGNUP', email, password)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: Styles.spacing,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  light: {
    color: '#000',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  dark: {
    color: '#fff',
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
});
