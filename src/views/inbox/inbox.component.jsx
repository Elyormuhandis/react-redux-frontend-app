import { useDispatch, useSelector } from "react-redux";
import { FaCloudDownloadAlt, FaTrashAlt, FaEye, FaEyeDropper, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import './inbox.styles.scss'
import { downloadFileFromFileSystem, setPDTV, setView } from "../../store/features/attachment/attachment.actions";
import { useState } from "react";
import { hover } from "@testing-library/user-event/dist/hover";

const Inbox = () => {
    const { kelganFayllar } = useSelector(state => state.attachment) 
    const {divisions} = useSelector(state => state.division)
    const [pdtvModal, setPdtvModal] = useState()
    const dispatch = useDispatch()

    const setViewHandler = (id) => {
        dispatch(setView(id))
    }

   

    const downloadRow = (e, fileName) => {
          e.stopPropagation();
          const id = e.currentTarget.id;
          dispatch(downloadFileFromFileSystem({id, fileName}))
        }  
    
    const downloadAll = (e) => {
        e.stopPropagation();
        kelganFayllar.filter(file => file.pdtv === false).forEach((file)=>{
            dispatch(downloadFileFromFileSystem({
                id:file.id, 
                fileName:file.originalName
            }))
        })
    }

    const pdtvModalHandler = (e) => {
        setPdtvModal(e.currentTarget.id);
    }



    const setPdtvHandler = (id) => {
        dispatch(setPDTV(id))
        setPdtvModal(undefined);
    }


    
    return (
        <div className="inbox">
            <div  className="inbox__list">
                <h4 className="inbox__header">Kelgan fayllar</h4>
                <hr className='dashboard__line'/>
                <table className='inbox__table'>
                    <thead className='inbox__table-header'>
                        <tr>
                            <th style={{color:"orange"}}><input type='checkbox'/></th>
                            <th style={{color:"orange"}}>N</th>
                            <th style={{color:"orange"}}>Nomi</th>
                            <th style={{color:"orange"}}>Fayl hajmi</th>
                            <th style={{color:"orange"}}>Kimdan</th>
                            <th style={{color:"orange"}}>Kimga</th>
                            <th style={{color:"orange"}}>
                                <button className="all-pdtv-btn pdtv-btn">Tasdiqlash</button>
                            </th>
                            <th><FaInfoCircle style={{color:"orange"}}/></th>
                            <th><FaCloudDownloadAlt className="download-icon" style={{color:"orange"}} 
                            onClick={(e) => downloadAll(e)}/></th>
                        </tr>
                    </thead>
                    <tbody className='send__table-body'>                   
                    {kelganFayllar?.filter(file => file.pdtv === false)?.map((file, idx)=>(
                        <tr className={!file.view ? "file-text-bold" : "file-text-normal"} key={idx} onClick={e => setViewHandler(file.id)}>
                            <td><input type='checkbox'/></td>
                            <td>{idx+1}</td>
                            <td className=''>
                                {file.originalName}
                            </td>
                            <td className=''>
                                {file.size+"b"}
                            </td>
                            <td className=''>
                            {divisions?.filter((division)=>division.id===file.fromDivision.id)[0]?.name}
                            </td>
                            <td className=''>
                            {divisions?.filter((division)=>division.id===file.toDivision.id)[0]?.name}
                            </td>
                            <td className='icons '>
                                <button id={file.id} className="pdtv-btn" onClick={(e)=>{pdtvModalHandler(e)}}>
                                    <span>Tasdiqlash</span>  
                                </button>
                                <div className="pdtv-td">
                                <div className={pdtvModal==file.id ? "pdtv-modal " : "pdtv-modal-none " + "pdtv-modal-handler"} >
                                    <h5 className="pdtv-modal__header">Tasdiqlaysizmi?</h5>
                                    <div className="pdtv-modal__text">
                                        <p className="pdtv-modal__yes" onClick={()=>{setPdtvHandler(file.id)}}>Ha</p>
                                        <p className="pdtv-modal__no" onClick={()=>{setPdtvModal(undefined)}}>Yo'q</p>
                                    </div>
                                </div> 
                                </div>
                            </td>
                            <td className='icons'>
                            <span className='delete-icon'><FaInfoCircle/></span>
                            </td>
                            <td className='icons' id={file.id} onClick={(e) => downloadRow(e, file.originalName)}>
                            <span className='delete-icon'>
                                <FaCloudDownloadAlt className="download-icon"/>
                            </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inbox;