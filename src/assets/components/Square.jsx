

function Square({ value, onSquareClick }) {
  return (
    <>
      <div
        className="w-14 h-14 border-double border-4 border-emerald-950 font-bold flex justify-center items-center text-3xl"
        onClick={onSquareClick}
      >
        <span className="animate-bounce md:animate-spin drop-shadow-[0_35px_35px_rgba(255,32,4,0.25)]">{value}</span>
      </div>
    </>
  );
}

export default Square;
