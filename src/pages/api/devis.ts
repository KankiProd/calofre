import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name')?.toString();
  const phone = data.get('phone')?.toString();
  const email = data.get('email')?.toString();
  const service = data.get('service')?.toString();
  const postal = data.get('postal')?.toString();
  const message = data.get('message')?.toString();
  const honeypot = data.get('website')?.toString();
  const rgpd = data.get('rgpd');

  if (honeypot) return new Response(JSON.stringify({ success: true }), { status: 200 });

  if (!name || !phone || !email || !service || !rgpd) {
    return new Response(JSON.stringify({ error: 'Champs manquants' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      console.log('RESEND_API_KEY not configured — logging form submission');
      console.log({ name, phone, email, service, postal, message });
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Site CALOFRÉ <noreply@calofre.fr>',
      to: '[EMAIL_CALOFRE]',
      replyTo: email,
      subject: `Nouveau devis — ${service} — ${name}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Service :</strong> ${service}</p>
        <p><strong>Code postal :</strong> ${postal || 'Non renseigné'}</p>
        <p><strong>Message :</strong></p>
        <p>${message?.replace(/\n/g, '<br>') || 'Aucun message'}</p>
      `,
    });

    await resend.emails.send({
      from: 'CALOFRÉ <noreply@calofre.fr>',
      to: email,
      subject: 'Votre demande de devis a bien été reçue — CALOFRÉ',
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Merci pour votre demande de devis. Fouad ou un membre de notre équipe vous recontactera sous 24h ouvrées.</p>
        <p>En cas d'urgence, n'hésitez pas à nous appeler directement au <strong>07 88 13 38 89</strong>.</p>
        <p><em>CALOFRÉ — Artisan RGE QualiPAC<br>14 Chemin de la Chasse, 31770 Colomiers</em></p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Erreur envoi email:', err);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
