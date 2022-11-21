import { useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles } from "../../store/features/attachment/attachment.actions";
import {FaPlusCircle, FaTrashAlt, FaUpload} from 'react-icons/fa'
import './send.styles.scss'



const Send = () => {
  const dispatch = useDispatch()
  const [drag, setDrag] = useState(false);
  const [dragFiles, setDragFiles] = useState([]);
  const {divisions} = useSelector(state => state.division)

  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
    mode: "onTouched"
    });

  const addFileHandler = (data) => {
    data.files=[...dragFiles]
    dispatch(uploadFiles(data))
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
            <h4 className="send__head">Fayllarni tanlang</h4>
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
            <button type="button" onClick={(e)=>handlePick(e)} className="send__file-input">
              <span className="send__file-input--btn"><FaPlusCircle className="upload-icon"/>QO'SHISH</span>
              </button>
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
          <div className="send__bottom">
          <select 
          className='send__form--select' 
          id='division-select-send'
          defaultValue={'DEFAULT'}
          {...register("toDivision")}>
              <option 
              className='send__form--option' 
              value={'DEFAULT'}
              disabled 
              hidden>Qayerga...</option>
              {
              divisions ? divisions.filter((division)=>division.active===true).map((division, idx)=>(
                  <option 
                  className='send__form--option' 
                  key={division.id} 
                  value={division.id}
                  >
                  {division.name}
                  </option>
              )) : <option>Server bilan aloqa yo'q</option>
            }
            </select>
          <button className="send__form--btn" type="submit">< FaUpload className="upload-icon"/>YUKLASH</button>
          </div>
          </div>
      </form>
          <div className="send__selected-files">
          <div className="send__selected-files--header">
              <h5>Tanlangan fayllar</h5>
              <span className="send__selected-files--clr-icon"><FaTrashAlt/></span>
          </div>
            <table >
                <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>T/R</th>
                        <th>Faylning nomi</th>
                        <th>Faylning hajmi (bayt)</th>
                    </tr>
                </thead>
                <tbody className='send__table-body'>                   
                {
                dragFiles ? dragFiles.map((file, idx)=>(
                    <tr key={idx}>
                        <td><input type='checkbox'/></td>
                        <td>{idx+1}</td>
                        <td className="table-head-name">
                            {file.name}
                        </td>
                        <td className="table-head-name">
                            {file.size}
                        </td>
                    </tr>
                )) : ""}
                </tbody>
            </table>
            </div>
    </div>
  )  
}
    
export default Send
