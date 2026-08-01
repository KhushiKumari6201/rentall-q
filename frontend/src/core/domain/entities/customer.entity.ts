export interface CustomerProps {
  id?: string;
  fullName: string;
  email: string;
  phone?: string | null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CustomerEntity {
  public readonly id?: string;
  public readonly fullName: string;
  public readonly email: string;
  public readonly phone?: string | null;
  public readonly isActive: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: CustomerProps) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email;
    this.phone = props.phone;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
