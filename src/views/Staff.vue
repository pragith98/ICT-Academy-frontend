<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <v-container>

        </v-container>
        <router-link to="/Staff/StaffRegistration">Register Staff</router-link>
    </div>
</template>