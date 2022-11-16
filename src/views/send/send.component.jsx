import { useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles } from "../../store/features/attachment/attachment.actions";
import {FaPlusCircle} from 'react-icons/fa'
import './send.styles.scss'


const Send = () => {
  const dispatch = useDispatch()
  const [drag, setDrag] = useState(false);
  const [dragFiles, setDragFiles] = useState([]);
  const {divisions} = useSelector(state => state.division)
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    watch,
    getValues
    } = useForm({
    mode: "onTouched"
    });

  const addFileHandler = (data) => {
    data.files=[...dragFiles]
    console.log(data);
    // dispatch(uploadFiles(data))

  }

  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragOverHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }
  
  const dropHandler = (e) => {
    e.preventDefault()
    setDragFiles([...dragFiles, ...e.dataTransfer.files])
    setDrag(false)
  }

  const handlePick = (e) => {
    document.querySelector("#file-input-field").click();
  }


  return(
    <div className="send">
      <form className="send__form" onSubmit={handleSubmit(addFileHandler)}>
        <div className="send__container">
          <div className="send__file-picker">
          <label htmlFor="file-input-field">Fayllarni tanlang</label>
          <input
          id="file-input-field" 
          type="file"
          multiple
          // accept="image/*, .png, .jpg, .gif"
          className="send__file-input--hidden"
          {...register('files',
          {
            onChange: (e) => {setDragFiles([...dragFiles, ...e.target.files])}
          })}
          />
          <button type="button" onClick={(e)=>handlePick(e)} className="send__file-input"><FaPlusCircle className="upload-icon"/>QO'SHISH</button>
          {
          drag ? <div 
          className="drop-area"
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragOverHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => dropHandler(e)}

          >
            Qo'yib yuboring...
          </div> 
          : <div 
          className="drag"
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragOverHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          >
            Fayllarni shu yerga tashlang...
          </div> 
          }
          </div>
          <div className="send__file-sender">
          <label className='users__label' htmlFor='division-select-send'>Qayerga</label>
          <select 
          className='' 
          id='division-select-send'
          defaultValue={'DEFAULT'}
          {...register("toDivision")}>
              <option 
              className='division__list--item' 
              value={'DEFAULT'}
              disabled 
              hidden>Boshqarma tanlang...</option>
              {
              divisions ? divisions.filter((division)=>division.active===true).map((division, idx)=>(
                  <option 
                  className='division__list--item' 
                  key={division.id} 
                  value={division.id}
                  >
                  {division.name}
                  </option>
              )) : <option>Server bilan aloqa yo'q</option>
            }
            </select>
          <button type="submit">YUKLASH</button>
          </div>
        </div>
      </form>
        <ul>
          {
            dragFiles ? dragFiles.map(file=><li>{file.name}</li>) : ''
          }
        </ul>
    </div>
  )  
}
    
export default Send
