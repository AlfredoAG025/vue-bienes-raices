<script setup>
import usePropiedades from '@/composables/usePropiedades';
import { propertyPrice } from '@/helpers';

const { propiedadesCollection, deleteItem } = usePropiedades();
</script>

<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

    <v-btn color="blue" variant="flat" :to="{ name: 'nueva-propiedad' }">
        Nueva Propiedad
    </v-btn>

    <v-card class="mx-auto mt-10" flat>
        <v-list>
            <v-list-item v-for="propiedad in propiedadesCollection" :key="propiedad.id" border>

                <template v-slot:prepend>
                    <v-list-item-media :start="true">
                        <img :src="propiedad.imagen" :alt="'Propiedad ' + propiedad.titulo" width="180">
                    </v-list-item-media>
                </template>

                <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
                <v-list-item-subtitle>{{ propertyPrice(propiedad.precio) }}</v-list-item-subtitle>

                <template v-slot:append>
                    <v-btn :to="{ name: 'editar-propiedad', params: { id: propiedad.id } }" color="info" variant="flat"
                        class="mr-2">
                        Editar
                    </v-btn>
                    <v-btn @click="deleteItem(propiedad.id, propiedad.imagen)" color="red-darken-3" variant="flat">
                        Eliminar
                    </v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>
