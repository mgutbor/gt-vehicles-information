export const NHTSA_API_CONFIG = {
  baseUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles',
  endpoints: {
    getAllMakes: '/GetAllMakes',
    getVehicleTypesForMake: '/GetVehicleTypesForMakeId',
    getModelsForMake: '/GetModelsForMakeId',
    getModelsForMakeYear: '/GetModelsForMakeYear/makeId', // Formato especial para año
    getModelsForMakeIdYearVehicleType: '/GetModelsForMakeIdYear/makeId', // Para filtrado por tipo y año
  },
  defaultFormat: 'json',
  timeout: 30000,
} as const;

export type NhtsaEndpoint = keyof typeof NHTSA_API_CONFIG.endpoints;

export interface ApiUrlParams {
  endpoint: NhtsaEndpoint;
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number>;
}

export class ApiUrlBuilder {
  static build(params: ApiUrlParams): string {
    const { endpoint, pathParams = {}, queryParams = {} } = params;

    let url = `${NHTSA_API_CONFIG.baseUrl}${NHTSA_API_CONFIG.endpoints[endpoint]}`;

    // eslint-disable-next-line
    Object.entries(pathParams).forEach(([key, value]) => {
      url += `/${value}`;
    });

    // Agregar parámetros de query
    const queryString = new URLSearchParams({
      format: NHTSA_API_CONFIG.defaultFormat,
      ...Object.entries(queryParams).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: String(value),
        }),
        {}
      ),
    }).toString();

    return `${url}?${queryString}`;
  }
}
