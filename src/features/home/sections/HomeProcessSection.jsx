function HomeProcessSection({ processContent }) {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <span className="eyebrow">{processContent.eyebrow}</span>
        <h2 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
          {processContent.title}
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {processContent.steps.map((item) => (
          <article key={item.step} className="panel p-6">
            <p className="font-display text-5xl text-[#d6a273]">{item.step}</p>
            <h3 className="mt-5 font-display text-3xl text-slate-900">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomeProcessSection
