export const saveGameToStorage = ({ newBoard, newTurn }) => {
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', JSON.stringify(newTurn))
}

export const removeGameToStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}