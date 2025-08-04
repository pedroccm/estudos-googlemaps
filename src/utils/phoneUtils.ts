/**
 * Utility functions for phone number handling
 */

/**
 * Checks if a phone number is a mobile/cell phone in Brazil
 * Brazilian mobile numbers have the format: +55 XX 9XXXX-XXXX
 * Where XX is the area code and the number starts with 9
 */
export function isBrazilianMobile(phone: string): boolean {
  if (!phone) return false;
  
  // Remove all non-numeric characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Check if it's a Brazilian number (+55) and has mobile pattern
  // Mobile numbers in Brazil: +55 XX 9XXXX-XXXX (11 digits after country code)
  if (cleanPhone.startsWith('+55')) {
    const numberPart = cleanPhone.slice(3); // Remove +55
    
    // Should have 11 digits total: 2 for area code + 9 digits for mobile
    if (numberPart.length === 11) {
      // The third digit (after area code) should be 9 for mobile
      const thirdDigit = numberPart.charAt(2);
      return thirdDigit === '9';
    }
  }
  
  return false;
}

/**
 * Formats a phone number for WhatsApp URL
 * Removes all non-numeric characters except +
 */
export function formatPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Generates WhatsApp URL for a phone number
 */
export function getWhatsAppUrl(phone: string): string {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  return `https://wa.me/${formattedPhone}`;
}

/**
 * Formats phone number for display
 */
export function formatPhoneDisplay(phone: string): string {
  // Keep the original formatting for display
  return phone;
}