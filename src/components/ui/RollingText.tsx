export function RollingText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden leading-[1.2]">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span aria-hidden="true" className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
    </span>
  )
}
