export default function BaseButton({ text, color, onClick, disabled }) {
  function getClassName() {
    const background = {
      secondaryButton: 'secondaryButton',
      default: 'primaryButton'
    };
    return background[color] ?? [background.default];
  }

  return (
    <button
      className={`${getClassName()} hover:opacity-80 text-white p-3 rounded-md my-8 shadow-md`}
      type="submit"
      onClick={onClick}
      disabled={disabled ? disabled : false}>
      {text ? text : 'Accept'}
    </button>
  );
}
