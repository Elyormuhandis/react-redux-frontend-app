import { useDispatch, useSelector } from "react-redux";
import {MdDone, MdDoneAll} from "react-icons/md"
import { FaCloudDownloadAlt, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import './sent.styles.scss'
import { useState } from "react";
import { getOneSentFile } from "../../store/features/attachment/attachment.actions";

const Sent = () => {
    const { yuborilganFayllar, oneSentFile} = useSelector(state => state.attachment) 
    const {divisions} = useSelector(state => state.division)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()
    const fileInfoHandler = (id) => {
        dispatch(getOneSentFile(id))
        setIsModalOpen(!isModalOpen)
    }
    
    return (
        <div className="sent">
            <div  className="sent__list">
                <h4 className="sent__header">Yuborilgan fayllar</h4>
                <hr className='dashboard__line'/>
                <table className='sent__table'>
                    <thead className='send__table-header'>
                        <tr>
                            <th><input type='checkbox'/></th>
                            <th>N</th>
                            <th>Nomi</th>
                            <th>Fayl hajmi</th>
                            <th>Kimdan</th>
                            <th>Kimga</th>
                            <th>Holati</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='send__table-body'>                   
                    {yuborilganFayllar?.map((file, idx)=>(
                        <tr className={file.pdtv ? "tasdiqlangan" : "tasdiqlanmagan"} key={idx}>
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
                            <td className='icons'>
                            {file.view ? <MdDoneAll/> : <MdDone/>}
                            </td>
                            <td className='icons'>
                            <span className='sent__info-icon' onClick={()=>{fileInfoHandler(file.id)}}><FaInfoCircle/></span>
                            </td>
                        </tr>
                    )) }
                    </tbody>
                </table>
            </div>
            <div className={isModalOpen ? "file-info-modal" : "file-info-modal--close"}>
                        {
                            <div>
                                <div className="file-info-modal__header">
                                    <h5>Fayl haqida ma'lumot</h5>
                                    <button className="file-info-modal__btn" 
                                    onClick={()=>{setIsModalOpen(false)}}
                                    >X</button>
                                </div>
                                <hr/>
                                <div>{`1. Fayl nomi: ${oneSentFile.originalName}`}</div>
                                <div>{`2. Yuboruvchi: ${divisions?.filter((division)=>division?.id===oneSentFile?.fromDivision?.id)[0]?.name}, ${oneSentFile.createdAt}`}</div>
                                <div>{`3. Qabul qiluvchi: ${divisions?.filter((division)=>division?.id===oneSentFile?.toDivision?.id)[0]?.name}`}</div>
                                <div>{`4. Holati: ${oneSentFile?.view ? "ko'rildi" : "ko'rilmadi"}`}</div>
                                <div>{`5. Tasdiq: ${oneSentFile?.pdtv ? "tasdiqlangan" : "yo'q"}`}</div>

                            </div>
                        }
            </div>
        </div>
    );
};

export default Sent;