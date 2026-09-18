import Button from './Button';

export default function FootCta({
  message,
  buttonLabel,
  onClick,
}: {
  message: string;
  buttonLabel: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex justify-between items-center px-9 py-6 bg-umber text-[#d8d1c1]">
      <p className="text-[12.5px] max-w-[400px] m-0">{message}</p>
      <Button variant="primary" onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}