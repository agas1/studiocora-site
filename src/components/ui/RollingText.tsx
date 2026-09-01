export function RollingText({ children }: { children: React.ReactNode }) {
  return (
    <span className="rolling-text relative block overflow-hidden leading-[1.2]">
      <span className="rolling-text__face block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span aria-hidden="true" className="rolling-text__ghost absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
    </span>
  )
}
