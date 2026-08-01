export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class InvalidBookingDateException extends DomainException {
  constructor(message: string = 'Check-out date must be strictly after check-in date.') {
    super(message);
    this.name = 'InvalidBookingDateException';
  }
}

export class ResourceNotFoundException extends DomainException {
  constructor(resourceName: string, id: string) {
    super(`${resourceName} with ID '${id}' was not found.`);
    this.name = 'ResourceNotFoundException';
  }
}
