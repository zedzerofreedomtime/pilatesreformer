function HomeHighlightsSection({ serviceHighlights }) {
  return (
    <section className="grid gap-5 lg:grid-cols-3">
      {serviceHighlights.map((item) => (
        <article key={item.title} className="panel p-6">
          <h2 className="font-display text-3xl text-slate-900">{item.title}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {item.description}
          </p>
        </article>
      ))}
    </section>
  )
}

export default HomeHighlightsSection
