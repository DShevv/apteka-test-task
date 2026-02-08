export type ProductT = {
  id: number;
  title: string;
  price: number;
  image: string;
  characteristics: {
    country: string;
    brand: string;
    dossage: string;
    releaseForm: string;
    storageTemperature: string;
    quantityPerPackage: string;
    expirationDate: string;
    isByPrescription: string;
    manufacturer: string;
  }
}

export type FilterNameT = keyof ProductT["characteristics"];

export type FilterT = {
  name: FilterNameT;
  values: string[];
};

export type ActiveFiltersT = Record<string, string | string[]>;
