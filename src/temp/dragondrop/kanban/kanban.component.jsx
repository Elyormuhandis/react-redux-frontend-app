import { useState } from "react"
import './kanban.styles.scss'


const Kanban = () => {
  const [boards, setBoards] = useState([
  {id:1, title:"TODO", items:[{id:1, title: 'Go to the GYM'}, {id:2, title: 'Learn 20 words'}, {id:3, title: 'To do physical training'}]},
  {id:2, title:"IN PROGRESS", items:[{id:4, title: 'Learn drag on drop'}, {id:5, title: 'Finish one section of file-transfer'}, {id:6, title: 'Call home'}]},  
  {id:3, title:"FINISHED", items:[{id:7, title: 'Call parents'}, {id:8, title: 'Play football'}, {id:9, title: 'Finish docs'}]},  
  ])

  const [currentBoard, setCurrentBoard] = useState();
  const [currentItem, setCurrentItem] = useState();



  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  const dragOverHandler = (e) => {
    e.preventDefault();
    if(e.target.className == 'item'){
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dragEndHandler = (e) => {
    
  }
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    e.target.style.boxShadow = 'none'
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }
  
  
  

  return(
    <div className="send">
        {
          boards.map(board => 
            <div 
            className="board" 
            key={board.id}
            onDragOver={e => dragOverHandler(e) }
            onDrop={e => dropCardHandler(e, board)}
            >
                <div className="board__title">{board.title}</div>
                  {
                  board.items.map((item, idx )=>
                    <div 
                    key={item.id}
                    onDragStart={e => dragStartHandler(e, board, item)}
                    onDragOver={e => dragOverHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragEnd={e => dragEndHandler(e)}
                    onDrop={e => dropHandler(e, board, item)}
                    className="item"
                    draggable='true'
                    >
                      {idx+1+". " + item.title}
                    </div>)
                  }
            </div>)          
        }
    </div>
  )  
}
    


export default Kanban
