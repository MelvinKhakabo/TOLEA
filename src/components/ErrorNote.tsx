export default function ErrorNote({ message }: { message: string }) {
  if (!message) return null
  return (
    <p role="alert" className="text-[12.5px] text-umber bg-marigold-soft border border-marigold rounded-md px-3.5 py-2.5">
      {message}
    </p>
  )
}