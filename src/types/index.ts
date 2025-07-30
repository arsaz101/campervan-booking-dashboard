export interface Booking {
    id: string;
    stationId: string;
    startDate: Date;
    endDate: Date;
    customerName: string;
    vehicleType: string;
}

export interface Station {
    id: string;
    name: string;
    location: string;
    availableVehicles: number;
}

export interface AutocompleteOption {
    id: string;
    label: string;
}

export interface RescheduleData {
    bookingId: string;
    newStartDate: Date;
    newEndDate: Date;
}