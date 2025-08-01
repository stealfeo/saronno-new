export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-brand-cyan">Privacy Policy</h1>

      <p className="mb-4">
        Questa Privacy Policy descrive come <strong>L&apos;Altra Saronno</strong> raccoglie, utilizza e protegge i dati personali degli utenti ai sensi del Regolamento (UE) 2016/679 (GDPR).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Titolare del trattamento</h2>
      <p className="mb-4">
        Il titolare del trattamento è <strong>L&apos;Altra Saronno</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Dati raccolti</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Dati di registrazione (nome, cognome, email) per iscrizioni e commenti.</li>
        <li>Dati di navigazione (indirizzo IP, browser, statistiche anonime).</li>
        <li>Cookie e tecnologie simili (vedi <a href="/cookie" className="text-brand-cyan underline">Cookie Policy</a>).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Finalità del trattamento</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Gestire iscrizioni, login e commenti.</li>
        <li>Inviare newsletter e aggiornamenti editoriali (con consenso).</li>
        <li>Migliorare l&rsquo;esperienza utente e i contenuti.</li>
        <li>Mostrare eventuali contenuti pubblicitari personalizzati.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Conservazione dei dati</h2>
      <p className="mb-4">
        I dati saranno conservati per il tempo necessario ai servizi offerti o fino a revoca del consenso.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Diritti dell&rsquo;utente</h2>
      <p className="mb-4">
        L&rsquo;utente può esercitare in ogni momento i diritti di accesso, rettifica, cancellazione, portabilità e revoca del consenso contattando il titolare del trattamento.
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Ultimo aggiornamento: {new Date().getFullYear()}
      </p>
    </div>
  )
}


