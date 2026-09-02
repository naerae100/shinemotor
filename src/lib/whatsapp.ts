/**
 * WhatsApp is how this trade actually communicates: a photo of the load and a
 * question about price. Every call to action that could be a phone call is also
 * a WhatsApp link with the context already written into the message, so the
 * yard knows what it is looking at before it replies.
 */

/** Primary yard mobile, in E.164 without the +, as wa.me requires. */
export const WHATSAPP_NUMBER = '61413222171'
export const WHATSAPP_DISPLAY = '0413 222 171'

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** Generic opener used by the floating button and the header. */
export const WA_GENERAL = whatsappUrl(
  "Hi Shine Motor, I'd like a price on some scrap metal.",
)

/** Opener that names the grade or item the visitor was looking at. */
export function waForMaterial(material: string): string {
  return whatsappUrl(
    `Hi Shine Motor, I'd like a price for ${material}. I can send photos.`,
  )
}

/** Opener for one of the three service lines. */
export function waForService(service: string): string {
  return whatsappUrl(`Hi Shine Motor, I'm enquiring about ${service}.`)
}

/**
 * Opener for container-load export enquiries.
 *
 * Deliberately different from the retail opener: an export buyer is asking
 * about grades, tonnage and destination port, not "what's my load worth". The
 * message pre-states that so the yard can answer in one reply instead of
 * establishing the basics first — and it signals to the sender that this line
 * is for trade, not walk-ins.
 */
export const WA_EXPORT = whatsappUrl(
  "Hi Shine Motor, I'm enquiring about container-load export supply. " +
    'Company: \nGrades required: \nTonnage / containers per month: \nDestination port: ',
)
