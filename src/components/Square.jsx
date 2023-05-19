export const Square = ({ children, isSelected, updateBoard, index }) => {
  const classname = `square ${isSelected ? 'is-selected' : ''}`;

  const handlerClick = () => {
    updateBoard(index);
  }

  return (
    <div onClick={handlerClick} className={classname}>
      {children}
    </div>
  )
}