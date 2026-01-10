export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/27824988638"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:shadow-lg"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      <img src="/icon/whatsapp.svg" alt="" className="h-6 w-6" />
    </a>
  );
}
