<script setup>
import { useForm, useField } from 'vee-validate';
import { loginSchema as validationSchema } from '../validation/loginSchema'

import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const { handleSubmit } = useForm({
    validationSchema,
});

const email = useField('email');
const password = useField('password');

const submit = handleSubmit((values) => {
    auth.login(values)
});

</script>

<template>
    <v-card flat max-width="600" class="mx-auto my-10">
        <v-card-title class="text-h4 font-weight-bold" tag="h4">
            Iniciar Sesión
        </v-card-title>

        <v-card-subtitle class="text-h5" tag="h5">
            Inicia Sesión con tu cuenta
        </v-card-subtitle>

        <v-alert v-if="auth.hasError" class="my-5" :title="auth.errorMessage" type="error" variant="tonal"></v-alert>

        <v-form class="mt-5">
            <v-text-field class="mb-3" type="email" label="Email" bg-color="blue-grey-lighten-5"
                v-model="email.value.value" :error-messages="email.errorMessage.value" />

            <v-text-field class="mb-3" type="password" label="Password" bg-color="blue-grey-lighten-5"
                v-model="password.value.value" :error-messages="password.errorMessage.value" />

            <v-btn block color="pink-accent-3" @click="submit">
                Iniciar Sesión
            </v-btn>
        </v-form>

    </v-card>
</template>
