export default function FloatingWhatsApp() {
  const phone = "27824988638";
  const text = encodeURIComponent("Hi Mario — I’d like to start a conversation.");
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.82 11.82 0 0012.06 0C5.5.02.17 5.35.18 11.93c0 2.1.56 4.15 1.63 5.95L0 24l6.3-1.73a11.9 11.9 0 005.75 1.47h.01c6.57 0 11.9-5.33 11.92-11.9a11.84 11.84 0 00-3.46-8.36zM12.06 21.3h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.22-3.74 1.03 1-3.64-.24-.38a9.88 9.88 0 01-1.52-5.27C2.16 6.46 6.56 2.06 12.06 2.04c2.63 0 5.1 1.02 6.96 2.88a9.79 9.79 0 012.9 6.97c-.02 5.5-4.42 9.91-9.86 9.91zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
