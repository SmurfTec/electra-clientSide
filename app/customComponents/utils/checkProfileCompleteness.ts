interface UserProfile {
  shipping_address_line_1?: string | null;
  billing_address_line_1?: string | null;
  mobile_no?: string | null;
}

// Utility function to check profile completeness
export function checkProfileCompleteness(profile: UserProfile | null): { isComplete: boolean; missingFields: string } {
  if (!profile) {
    return { isComplete: false, missingFields: 'Shipping Address, Billing Address, Phone Number' };
  }

  const isShippingComplete = profile.shipping_address_line_1 !== null && profile.shipping_address_line_1 !== '';
  const isBillingComplete = profile.billing_address_line_1 !== null && profile.billing_address_line_1 !== '';
  const isPhoneComplete = profile.mobile_no !== null && profile.mobile_no !== '';

  const missingFields = [];
  if (!isShippingComplete) missingFields.push('Shipping Address');
  if (!isBillingComplete) missingFields.push('Billing Address');
  if (!isPhoneComplete) missingFields.push('Phone Number');

  return {
    isComplete: isShippingComplete && isBillingComplete && isPhoneComplete,
    missingFields: missingFields.join(', '),
  };
}
