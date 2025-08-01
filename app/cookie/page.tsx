export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-brand-cyan">Cookie Policy</h1>

      <p className="mb-4">
        Questa Cookie Policy spiega come <strong>L&apos;Altra Saronno</strong> utilizza cookie e tecnologie simili per migliorare l&rsquo;esperienza utente.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Cosa sono i cookie?</h2>
      <p className="mb-4">
        I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo per garantire funzionalità e migliorare i servizi offerti.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Tipologie di cookie</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Cookie tecnici:</strong> necessari per il funzionamento del sito (login, preferenze).</li>
        <li><strong>Cookie analitici:</strong> raccolta anonima di dati per statistiche e ottimizzazione.</li>
        <li><strong>Cookie di terze parti:</strong> utilizzati per eventuali annunci pubblicitari e contenuti esterni (es. social).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Consenso e gestione</h2>
      <p className="mb-4">
        Al primo accesso l&rsquo;utente può accettare o rifiutare i cookie non essenziali tramite il banner dedicato. È possibile modificare le preferenze dal browser.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Terze parti</h2>
      <p className="mb-4">
        Se utilizziamo servizi esterni (es. Google Analytics, pubblicità), questi potrebbero salvare cookie propri. L&rsquo;elenco aggiornato sarà disponibile in questa pagina.
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Ultimo aggiornamento: {new Date().getFullYear()}
      </p>
    </div>
  )
}

