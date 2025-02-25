import CustomNotification from "@/components/_ui/notification/customNotification";
import { schemaAuth } from "@/schemas/auth/schemaAuth";
import { Auth } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function ModalSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaAuth),
  });

  const submitForm: SubmitHandler<Auth> = async (formData) => {
    setIsLoading(true);
    signIn('credentials', {
      name: formData.name,
      password: formData.password,
      redirect: false,
    })
      .then((res) => {
        setIsLoading(false);
        if (res?.error) {
          CustomNotification({
            title: res.status === 401 ? 'Erro de Login' : 'Erro',
            message: res.status === 401 ? 'Usuário ou senha incorretos.' : 'Ocorreu um erro ao tentar fazer o login. Tente novamente mais tarde.',
          });
        }
        if (res?.ok) {
          CustomNotification({
            title: 'Sucesso',
            message: 'Usuário logado com sucesso!',
          });
          redirect('/dashboard');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label='Nome'
            value={field.value || ''}
            onChange={(value) => field.onChange(value || '')}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label='Senha'
            value={field.value || ''}
            onChange={(value) => field.onChange(value || '')}
          />
        )}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="light" fullWidth type="submit" disabled={isLoading} loading={isLoading}>
          Entrar
        </Button>
      </Group>
    </form>
  );
}
