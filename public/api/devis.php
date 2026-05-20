<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://calofre.fr');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// Anti-spam honeypot
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$email   = trim($_POST['email'] ?? '');
$service = trim($_POST['service'] ?? '');
$postal  = trim($_POST['postal'] ?? '');
$message = trim($_POST['message'] ?? '');
$rgpd    = $_POST['rgpd'] ?? '';

// Validation
if (empty($name) || empty($phone) || empty($email) || empty($service) || empty($rgpd)) {
    http_response_code(400);
    echo json_encode(['error' => 'Champs manquants']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email invalide']);
    exit;
}

// Sanitize
$name    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$phone   = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$postal  = htmlspecialchars($postal, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// --- Email au client CALOFRÉ ---
$to_calofre = '[EMAIL_CALOFRE]'; // TODO: remplacer par l'email réel
$subject_calofre = "Nouveau devis — $service — $name";
$body_calofre = "
<html><body>
<h2>Nouvelle demande de devis</h2>
<p><strong>Nom :</strong> $name</p>
<p><strong>Téléphone :</strong> $phone</p>
<p><strong>Email :</strong> $email</p>
<p><strong>Service :</strong> $service</p>
<p><strong>Code postal :</strong> $postal</p>
<p><strong>Message :</strong></p>
<p>" . nl2br($message) . "</p>
</body></html>";

$headers_calofre  = "MIME-Version: 1.0\r\n";
$headers_calofre .= "Content-type: text/html; charset=UTF-8\r\n";
$headers_calofre .= "From: Site CALOFRÉ <noreply@calofre.fr>\r\n";
$headers_calofre .= "Reply-To: $email\r\n";

$sent_calofre = mail($to_calofre, $subject_calofre, $body_calofre, $headers_calofre);

// --- Auto-reply au prospect ---
$subject_reply = "Votre demande de devis a bien été reçue — CALOFRÉ";
$body_reply = "
<html><body>
<h2>Bonjour $name,</h2>
<p>Merci pour votre demande de devis. Fouad ou un membre de notre équipe vous recontactera sous 24h ouvrées.</p>
<p>En cas d'urgence, n'hésitez pas à nous appeler directement au <strong>07 88 13 38 89</strong>.</p>
<p><em>CALOFRÉ — Artisan RGE QualiPAC<br>14 Chemin de la Chasse, 31770 Colomiers</em></p>
</body></html>";

$headers_reply  = "MIME-Version: 1.0\r\n";
$headers_reply .= "Content-type: text/html; charset=UTF-8\r\n";
$headers_reply .= "From: CALOFRÉ <noreply@calofre.fr>\r\n";

mail($email, $subject_reply, $body_reply, $headers_reply);

if ($sent_calofre) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur envoi email']);
}
