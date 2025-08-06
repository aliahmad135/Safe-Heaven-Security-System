import { BrandConfig } from './brands';

export function getPhoneNumber(brand: BrandConfig, source?: string): string {
  if (!source) return brand.phoneNumbers.default;
  
  const sourceKey = source.toLowerCase() as keyof typeof brand.phoneNumbers;
  return brand.phoneNumbers[sourceKey] || brand.phoneNumbers.default;
}

export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function createPhoneLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+1${digits}`;
}