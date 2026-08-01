export interface RentalUnitProps {
  id?: string;
  title: string;
  address: string;
  unitType?: string;
  dailyRate: number;
  capacity?: number;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RentalUnitEntity {
  public readonly id?: string;
  public readonly title: string;
  public readonly address: string;
  public readonly unitType: string;
  public readonly dailyRate: number;
  public readonly capacity: number;
  public readonly isAvailable: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: RentalUnitProps) {
    this.id = props.id;
    this.title = props.title;
    this.address = props.address;
    this.unitType = props.unitType || 'apartment';
    this.dailyRate = props.dailyRate;
    this.capacity = props.capacity || 1;
    this.isAvailable = props.isAvailable ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
