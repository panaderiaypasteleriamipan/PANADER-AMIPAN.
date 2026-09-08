// MiPan 2025, C.A. — Interactividad del clon
document.addEventListener('DOMContentLoaded', () => {

  // ===== Header shadow al hacer scroll =====
  const header = document.getElementById('topbar');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Menú móvil =====
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );

  // ===== Animación reveal al hacer scroll =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ===== Formulario de pedidos: un solo formulario, dos canales =====
  // Ambos botones comparten los mismos datos y el mismo mensaje,
  // solo cambia el canal de salida (correo o WhatsApp).
  const form = document.getElementById('orderForm');
  const EMAIL = 'panaderiaypasteleriamipanmipan@gmail.com';
  const WHATSAPP = '584162214657'; // 0416-2214657

  const getFormData = () => ({
    nombre: document.getElementById('nombre').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    mensaje: document.getElementById('mensaje').value.trim()
  });

  const buildMessage = (d) =>
    `Hola MiPan, soy ${d.nombre}.\n\n${d.mensaje}\n\nMi correo: ${d.correo}`;

  const buildMailto = (d) =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(`Pedido de ${d.nombre}`)}` +
    `&body=${encodeURIComponent(buildMessage(d))}`;

  const buildWhatsApp = (d) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage(d))}`;

  // Canal 1: correo (submit del formulario)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    window.location.href = buildMailto(getFormData());
  });

  // Canal 2: WhatsApp (botón dedicado)
  document.getElementById('waBtn').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    window.open(buildWhatsApp(getFormData()), '_blank', 'noopener');
  });

  // Validación en vivo: habilita los botones solo con datos completos
  const inputs = [...form.querySelectorAll('input, textarea')];
  const updateButtons = () => {
    const ok = form.checkValidity() && inputs.every(i => i.value.trim() !== '');
    document.querySelector('.form-actions').classList.toggle('ready', ok);
  };
  inputs.forEach(i => i.addEventListener('input', updateButtons));

  // Expuesto para pruebas y reutilización externa
  window.MiPan = { buildMailto, buildWhatsApp, getFormData };
});
