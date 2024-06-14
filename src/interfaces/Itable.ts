

export interface Ipatient {
   id: number | string;
   firstName: string;
   lastName: string;
   dob: string;
   gender: string;
   address: number;
   phone: string;

}
export interface IpatientsTable {
  data : Ipatient[]
}


export interface Iusers {
   id: number | string;
   name: string;
   email: string;
   phone_number: string;
   roles: string[];
}

export interface IusersTable {
  data : Iusers[]
}

export interface ImedicalRecords {
   id: number | string;
   patientId: string;
   notes: string;
   date: string;
   createdAt: string;
}

export interface ImedicalRecordsTable {
  data : ImedicalRecords[]
}

export interface Itransactions {
   amount: number;
   method: string;
   status: string;
   description: string;
   reference: string;
   createdAt: string;
}


export interface ItransactionsTable {
  data : Itransactions[]
}


export interface Iprescriptions {
   id: number | string;
   medicalRecordId: string;
   createdById: string;
   createdAt: string;
}

export interface IprescriptionsTable {
  data : Iprescriptions[]
}

export interface Iinventory {
   id: number | string;
   name: string;
   description: string;
   quantity: number;
   price: number;
   createdById: string;
   createdAt: string;
}

export interface IinventoryTable {
  data : Iinventory[]
}





export type complex =
  | ImedicalRecords
  | Ipatient
  | Iinventory
  | Iprescriptions
    |Itransactions
    | Iusers
;

export interface Itable {
  path?:string;
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  bodyData: (
    | ImedicalRecords
    | Ipatient
    | Iinventory
    | Iprescriptions
    | Iusers
| Itransactions
  )[];
}
