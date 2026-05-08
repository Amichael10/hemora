/**
 * Country & state/region reference data shared between the directory filter UI
 * and the provider seed script. Names here are the canonical strings persisted
 * in the `providers.country` / `providers.state` columns — keep in sync.
 */

export interface Country {
  code: string;
  name: string;
  states: string[];
}

const NIGERIA_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Federal Capital Territory", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun",
  "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
  "Zamfara",
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const UK_REGIONS = [
  "England - London", "England - South East", "England - South West",
  "England - East of England", "England - East Midlands",
  "England - West Midlands", "England - Yorkshire and the Humber",
  "England - North East", "England - North West", "Scotland", "Wales",
  "Northern Ireland",
];

const GHANA_REGIONS = [
  "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern", "Greater Accra",
  "North East", "Northern", "Oti", "Savannah", "Upper East", "Upper West",
  "Volta", "Western", "Western North",
];

const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa",
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
  "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans-Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
];

const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

export const COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", states: NIGERIA_STATES },
  { code: "GH", name: "Ghana", states: GHANA_REGIONS },
  { code: "KE", name: "Kenya", states: KENYA_COUNTIES },
  { code: "GB", name: "United Kingdom", states: UK_REGIONS },
  { code: "US", name: "United States", states: US_STATES },
  { code: "IN", name: "India", states: INDIA_STATES },
];

export const DEFAULT_COUNTRY = "Nigeria";

export function findCountry(name: string | null | undefined): Country | undefined {
  if (!name) return undefined;
  return COUNTRIES.find((c) => c.name === name);
}

export function statesFor(countryName: string | null | undefined): string[] {
  return findCountry(countryName)?.states ?? [];
}
