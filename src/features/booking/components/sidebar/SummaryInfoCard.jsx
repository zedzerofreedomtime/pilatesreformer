function SummaryInfoCard({ label, title, body, image }) {
  return (
    <div className="rounded-[24px] bg-white/10 p-4">
      {image && (
        <img
          src={image}
          alt={title}
          className="mb-4 h-28 w-full rounded-[20px] object-cover"
        />
      )}
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{title}</p>
      {body && <p className="mt-2 text-sm leading-6 text-white/75">{body}</p>}
    </div>
  )
}

export default SummaryInfoCard
