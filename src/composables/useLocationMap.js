import { ref } from 'vue';

export default function useLocationMap() {
    const zoom = ref(50);
    const center = ref(['20.52366865098047', '-100.79655689600573'])


    function pin(e) {
        const marker = e.target.getLatLng();
        center.value = [marker.lat, marker.lng];
    }

    return {
        zoom,
        center,

        pin,
    };
}