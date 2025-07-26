import Link from 'next/link';

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.59C8.76 21.39 10.37 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.83 19.17 4.97C17.42 3.12 14.88 2 12.04 2M12.04 3.67C16.56 3.67 20.28 7.39 20.28 11.91C20.28 16.43 16.56 20.15 12.04 20.15C10.56 20.15 9.14 19.78 7.9 19.11L7.53 18.91L4.3 19.83L5.26 16.7L5.03 16.3C4.3 15.05 3.8 13.54 3.8 11.91C3.8 7.39 7.52 3.67 12.04 3.67M9.15 6.72C8.95 6.72 8.76 6.72 8.61 6.92C8.47 7.12 7.96 7.64 7.96 8.65C7.96 9.66 8.63 10.62 8.78 10.82C8.93 11.02 10.16 12.91 12.11 13.7C13.78 14.38 14.28 14.2 14.67 14.15C15.11 14.11 16.03 13.59 16.23 13.03C16.43 12.48 16.43 12.02 16.33 11.92C16.23 11.82 16.08 11.77 15.84 11.67C15.59 11.57 14.52 11.04 14.32 10.97C14.12 10.89 13.97 10.84 13.82 11.04C13.67 11.24 13.21 11.77 13.06 11.92C12.91 12.07 12.77 12.09 12.52 12C12.27 11.9 11.61 11.68 10.8 10.94C9.82 10.05 9.26 8.94 9.11 8.69C8.96 8.44 9.11 8.32 9.24 8.19C9.35 8.08 9.49 7.91 9.61 7.79C9.74 7.67 9.79 7.57 9.89 7.37C9.99 7.17 9.94 7.02 9.89 6.92C9.84 6.82 9.35 5.62 9.15 5.12" />
    </svg>
);

export default function WhatsAppButton() {
  const phoneNumber = "1234567890"; // Replace with your number
  const message = "Hola! Quisiera más información sobre sus productos personalizados.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 ease-in-out transform hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon />
    </Link>
  );
}
