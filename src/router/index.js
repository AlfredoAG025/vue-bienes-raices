import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from 'firebase/auth';
import { useFirebaseAuth } from "vuefire";


import HomeView from "../views/HomeView.vue";


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/LoginView.vue"),
		},
		{
			path: "/propiedades/:id",
			name: "propiedad",
			component: () => import("../views/PropiedadView.vue"),
		},
		{
			path: "/admin",
			name: "admin",
			component: () => import("../views/admin/AdminLayout.vue"),
			meta: {
				requiresAuth: true,
			},
			children: [
				{
					path: "/admin/propiedades",
					name: "admin-propiedades",
					component: () => import("../views/admin/AdminView.vue"),
				},
				{
					path: "/admin/nueva",
					name: "nueva-propiedad",
					component: () =>
						import("../views/admin/NuevaPropiedadView.vue"),
				},
				{
					path: "/admin/editar/:id",
					name: "editar-propiedad",
					component: () =>
						import("../views/admin/EditarPropiedad.vue"),
				},
			],
		},
	],
});

// Guard de navegacion

router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
	if (requiresAuth) {
		// Comprobar usuario autenticado
		try {
			await authenticateUser();
			next();
		} catch (error) {
			console.log(error);
			next({ name: 'login' })
		}
	} else {
		// No esta protegido, mostramos la vista
		next();
	}
});

function authenticateUser() {
	const auth = useFirebaseAuth();

	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			unsubscribe();
			if (user) {
				resolve(user);
			} else {
				reject();
			}
		});
	});
}

export default router;
