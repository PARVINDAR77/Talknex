export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateYearlyDiscount(monthlyPrice: number, yearlyPrice: number): number {
  if (monthlyPrice <= 0) return 0;
  const annualMonthlyEquivalent = yearlyPrice / 12;
  const savings = ((monthlyPrice - annualMonthlyEquivalent) / monthlyPrice) * 100;
  return Math.round(savings);
}

export function isValidIndianPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, '');
  return clean.length === 10 || (clean.length === 12 && clean.startsWith('91'));
}

