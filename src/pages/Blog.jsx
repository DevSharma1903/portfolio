import { notes } from '../data/site';

export default function Blog() {
  return (
    <div className="route-page journal-page">
      <header className="page-intro">
        <p className="page-context">Notes / Systems in practice</p>
        <h1>Keep the signal.<br /><em>Show the context.</em></h1>
        <p>Three practical notes on data quality, uncertainty, and the decision that follows.</p>
      </header>
      <section className="journal-list" aria-label="Field notes">
        {notes.map((note) => (
          <article className="journal-row" key={note.title}>
            <div className="journal-row-copy">
              <p className="project-discipline">{note.category}</p>
              <h2>{note.title}</h2>
              <p className="journal-note-summary">{note.summary}</p>
              <div className="journal-note-body">
                {note.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="journal-note-takeaway"><span>Useful next step</span>{note.takeaway}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
