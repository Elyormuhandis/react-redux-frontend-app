import { useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllByFromDivision } from "../../store/features/attachment/attachment.actions";
import {FaCloudDownloadAlt, FaDownload, FaPlusCircle, FaTrash, FaTrashAlt, FaUpload} from 'react-icons/fa'
import './send.styles.scss'
import { MdDelete, MdDone, MdDoneAll, MdMail } from "react-icons/md";


const Send = () => {
  const dispatch = useDispatch()
  const [drag, setDrag] = useState(false);
  const [dragFiles, setDragFiles] = useState([]);
  const {divisions} = useSelector(state => state.division)
  const { yuborilganFayllar} = useSelector(state => state.attachment)
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
    // dispatch(uploadFiles(data))
    console.log("click");
    dispatch(getAllByFromDivision())

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

  console.log(yuborilganFayllar);

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
          <div className="send__selected-files--header">
              <h5>Tanlangan fayllar</h5>
              <span className="send__selected-files--clr-icon"><FaTrashAlt/></span>
          </div>
          <div className="send__selected-files">
            <table >
                <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>T/R</th>
                        <th>Faylning nomi</th>
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
                    </tr>
                )) : ""}
                </tbody>
            </table>
            </div>
          </div>
      </form>
      <div className="send__list">
        <h4>Fayllar</h4>
        <hr className='dashboard__line'/>
            <table className='send__table'>
                <thead className='send__table-header'>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>N</th>
                        <th>Nomi</th>
                        <th>Fayl hajmi</th>
                        <th>Kimdan</th>
                        <th>Kimga</th>
                        <th>Tasdiq</th>
                        <th>Yuklab olish</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody className='send__table-body'>                   
                {
                yuborilganFayllar ? yuborilganFayllar.map((file, idx)=>(
                    <tr className='' key={idx}>
                        <td><input type='checkbox'/></td>
                        <td>{idx+1}</td>
                        <td className=''>
                            {file.originalName}
                        </td>
                        <td className=''>
                            {file.size+"b"}
                        </td>
                        <td className=''>
                        {divisions ? divisions.filter((division)=>division.id===file.fromDivision.id)[0].name: ''}
                        </td>
                        <td className=''>
                        {divisions ? divisions.filter((division)=>division.id===file.toDivision.id)[0].name: ''}
                        </td>
                        <td className='icons'>
                        {file.pdtv ? <MdDoneAll/> : <MdDone/>}
                        </td>
                        <td className='icons'>
                          <span className='delete-icon'><FaCloudDownloadAlt/></span>
                        </td>
                        <td className='icons'>
                          <span className='delete-icon'><FaTrashAlt/></span>
                        </td>
                    </tr>
                )) : <tr>
                        <td>
                        Server bilan aloqa yo'q
                        </td>
                      </tr>}
                </tbody>
            </table>
      </div>
    </div>
  )  
}
    
export default Send
