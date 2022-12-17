
export default function BaseButton({ text, color, onClick, disabled, className }) {

  function getClassName() {
    const background = {
      secondaryButton: 'secondaryButton',
      redButton: 'redButton',
      default: 'primaryButton'
    };
    return background[color] ?? [background.default];
  }

  return (
    <button
      className={`${getClassName()} hover:opacity-80 text-white rounded-md shadow-md disabled:opacity-75 ${className ?? ""}`}
      type="submit"
      onClick={onClick}
      disabled={disabled ? disabled : false}>
      {text ? text : 'Aceptar'}
    </button>
  );
}
