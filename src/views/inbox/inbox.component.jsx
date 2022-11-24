import { useDispatch, useSelector } from "react-redux";
import {MdDone, MdDoneAll} from "react-icons/md"
import { FaCloudDownloadAlt, FaTrashAlt, FaEye, FaEyeDropper, FaEyeSlash } from "react-icons/fa";
import './inbox.styles.scss'
import { downloadFileFromFileSystem, setView } from "../../store/features/attachment/attachment.actions";

const Inbox = () => {
    const { kelganFayllar } = useSelector(state => state.attachment) 
    const {divisions} = useSelector(state => state.division)

    const dispatch = useDispatch()

    const setViewHandler = (e) => {
        const id = e.currentTarget.id;
        dispatch(setView(id))
    }



    const downloadRow = (e, fileName) => {
          e.stopPropagation();
          const id = e.currentTarget.id;
          dispatch(downloadFileFromFileSystem({id, fileName}))
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
                            <th style={{color:"orange"}}></th>
                            <th><FaCloudDownloadAlt style={{color:"orange"}}/></th>
                            <th><FaTrashAlt style={{color:"orange"}}/></th>
                        </tr>
                    </thead>
                    <tbody className='send__table-body'>                   
                    {
                    kelganFayllar ? kelganFayllar .map((file, idx)=>(
                        <tr className='' key={idx} id={file.id} onClick={e => setViewHandler(e)}>
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
                            {file.pdtv ? <FaEye/> : <FaEyeSlash/>}
                            </td>
                            <td className='icons' id={file.id} onClick={(e) => downloadRow(e, file.originalName)}>
                            <span className='delete-icon'>
                                <FaCloudDownloadAlt/>
                            </span>
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
    );
};

export default Inbox;