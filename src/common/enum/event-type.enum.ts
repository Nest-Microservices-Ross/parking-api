/*
  Enum to represent the type of event that occurred in the system.
*/

export enum EventType {
  reservationCreated = 'RESERVATION_CREATED',
  reservationUpdated = 'RESERVATION_UPDATED',
  reservationDeleted = 'RESERVATION_DELETED',
  reservationConsulted = 'RESERVATION_CONSULTED',
  reservationCancelled = 'RESERVATION_CANCELED',
  vehicleEntry = 'VEHICLE_ENTRY',
  vehicleExit = 'VEHICLE_EXIT',
  parkingSpotCreated = 'SPOT_CREATED',
  parkingSpotUpdated = 'SPOT_UPDATED',
  parkingSpotConsulted = 'SPOT_CONSULTED',
  parkingSpotDeleted = 'SPOT_DELETED',
  availabilityChecked = 'AVAILABILITY_CHECKED',
}