import { ref, computed } from 'vue';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire';

export default function usePropiedades() {
    const alberca = ref(false);

    const storage = useFirebaseStorage();
    const db = useFirestore();
    const propiedadesCollection = useCollection(collection(db, 'propiedades'));

    const filteredItems = computed(() => {
        return alberca.value ? propiedadesCollection.value.filter((propiedad) => propiedad.alberca) : propiedadesCollection.value
    });

    async function deleteItem(id, urlImage) {
        if (confirm('¿Deseas eliminar esta propiedad?')) {
            const imageRef = storageRef(storage, urlImage);
            const docRef = doc(db, 'propiedades', id);

            // Todos los await se ejecutan al mismo tiempo
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef),
            ]);

        }
    }

    return {
        alberca,
        propiedadesCollection,
        filteredItems,

        deleteItem,
    }
}