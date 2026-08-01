export interface OccupancyProps {
  id?: string;
  rentalUnitId: string;
  bookingId?: string | null;
  date: Date;
  isOccupied?: boolean;
  createdAt?: Date;
}

export class OccupancyEntity {
  public readonly id?: string;
  public readonly rentalUnitId: string;
  public readonly bookingId?: string | null;
  public readonly date: Date;
  public readonly isOccupied: boolean;
  public readonly createdAt?: Date;

  constructor(props: OccupancyProps) {
    this.id = props.id;
    this.rentalUnitId = props.rentalUnitId;
    this.bookingId = props.bookingId;
    this.date = props.date;
    this.isOccupied = props.isOccupied ?? false;
    this.createdAt = props.createdAt;
  }
}
