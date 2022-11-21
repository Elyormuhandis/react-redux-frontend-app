import { useDispatch, useSelector } from "react-redux";
import {MdDone, MdDoneAll} from "react-icons/md"
import { FaCloudDownloadAlt, FaTrashAlt } from "react-icons/fa";
import './sent.styles.scss'

const Sent = () => {
    const { yuborilganFayllar} = useSelector(state => state.attachment) 
    const {divisions} = useSelector(state => state.division)

    
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
                            <th></th>
                            <th></th>
                            <th></th>
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
                            {file.pdtv ? <MdDone/> : <MdDoneAll/>}
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
    );
};

export default Sent;