import { computed } from 'vue';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';

export default function usePropiedades() {
    const db = useFirestore();
    const propiedadesCollection = useCollection(collection(db, 'propiedades'));

    const propertyPrice = computed(() => {
        return (price) => {
            return Number(price).toLocaleString('en', {
                style: 'currency',
                currency: 'USD',
            });
        }
    });

    return {
        propiedadesCollection,
        propertyPrice,
    }
}