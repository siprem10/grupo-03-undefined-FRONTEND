
export default function BaseButton({ text, color, onClick, disabled, className }) {

  function getClassName() {
    const background = {
      secondaryButton: 'secondaryButton',
      default: 'primaryButton'
    };
    return background[color] ?? [background.default];
  }

  return (
    <button
      className={`${getClassName()} hover:opacity-80 text-white p-3 rounded-md shadow-md ${className ?? ""}`}
      type="submit"
      onClick={onClick}
      disabled={disabled ? disabled : false}>
      {text ? text : 'Aceptar'}
    </button>
  );
}
