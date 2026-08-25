/**
 * WhatsApp is how this trade actually communicates: a photo of the load and a
 * question about price. Every call to action that could be a phone call is also
 * a WhatsApp link with the context already written into the message, so the
 * yard knows what it is looking at before it replies.
 */

/** Primary yard mobile, in E.164 without the +, as wa.me requires. */
export const WHATSAPP_NUMBER = '61478555537'
export const WHATSAPP_DISPLAY = '0478 555 537'

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
