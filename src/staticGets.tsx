export class Getters {

    static getAllStates(): any[] {
        return [
            { id: 1, name: 'Buenos Aires' },
            { id: 2, name: 'Salta - Jujuy' },
            { id: 3, name: 'Rosario' },
            { id: 4, name: 'Santa Fé' },
            { id: 5, name: 'Córdoba' },
            { id: 6, name: 'Mendoza' },
            { id: 7, name: 'Mar del Plata' },
        ];
    }

    static getAllCities(): any[] {
        return [
            { id: 8, name: 'Ciudad Autónoma de Buenos Aires', state_id: 1},
            { id: 9, name: 'GBA Norte', state_id: 1 },
            { id: 10, name: 'GBA Sur', state_id: 1 },
            { id: 11, name: 'GBA Oeste', state_id: 1 },
            { id: 12, name: 'Provincia (Bs. As)', state_id: 1 },
        ];
    }

    static getAllTowns(): any[] {
        return [
            { id: 13, name: 'Belgrano', city_id: 8 },
            { id: 14, name: 'Caballito', city_id: 8 },
            { id: 15, name: 'Colegiales', city_id: 8 },
            { id: 16, name: 'Recoleta', city_id: 8 },
            { id: 17, name: 'Retiro', city_id: 8 },
        ];
    }

    static getAllAmenities(): any[] {
        return [
            { id: 18, name: 'Lavaplatos' },
            { id: 19, name: 'Lavarropas' },
            { id: 20, name: 'Secarropas' },
            { id: 21, name: 'Aire Acondicionado' },
            { id: 22, name: 'Calefaccion' },
        ];
    }

    static getAllSecurityMeasures(): any[] {
        return [
            { id: 23, name: 'Rejas' },
            { id: 24, name: 'Camaras' },
            { id: 25, name: 'Alarmas' },
        ];
    }

    static getAllConstructionMaterials(): any[] {
        return [
            { id: 26, name: 'Ladrillo' },
            { id: 27, name: 'Cemento' },
            { id: 28, name: 'Chapa' },
        ];
    }
}