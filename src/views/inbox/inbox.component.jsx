import { useDispatch, useSelector } from 'react-redux';
import { FaCloudDownloadAlt, FaInfoCircle } from 'react-icons/fa';
import './inbox.styles.scss';
import {
  downloadFileFromFileSystem,
  getOneReceivedFile,
  setPDTV,
  setView,
} from '../../store/features/attachment/attachment.actions';
import { useState } from 'react';
import { formatBytes } from '../../helpers/helper.functions';

const Inbox = () => {
  const { kelganFayllar, oneReceivedFile } = useSelector(
    (state) => state.attachment
  );
  const { divisions } = useSelector((state) => state.division);
  const [pdtvModal, setPdtvModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const setViewHandler = (id) => {
    dispatch(setView(id));
  };

  const downloadRow = (e, fileName) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    dispatch(downloadFileFromFileSystem({ id, fileName }));
  };

  const downloadAll = (e) => {
    e.stopPropagation();
    kelganFayllar
      .filter((file) => file.pdtv === false)
      .forEach((file) => {
        dispatch(
          downloadFileFromFileSystem({
            id: file.id,
            fileName: file.originalName,
          })
        );
      });
  };

  const pdtvModalHandler = (e) => {
    setPdtvModal(e.currentTarget.id);
  };

  const allPdtvModal = () => {
    setPdtvModal('all');
  };

  const setPdtvHandler = (id) => {
    dispatch(setPDTV(id));
    setPdtvModal(undefined);
  };

  const setAllPdtvHandler = (e) => {
    kelganFayllar.forEach((file) => {
      dispatch(setPDTV(file.id));
    });
    setPdtvModal(undefined);
  };

  const fileInfoHandler = (id) => {
    dispatch(getOneReceivedFile(id));

    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='inbox'>
      <div className='inbox__list'>
        <h4 className='inbox__header'>Kelgan fayllar</h4>
        <hr className='dashboard__line' />
        <table className='inbox__table'>
          <thead className='inbox__table-header'>
            <tr>
              <th style={{ color: 'orange' }}>N</th>
              <th style={{ color: 'orange' }}>Nomi</th>
              <th style={{ color: 'orange' }}>Fayl hajmi</th>
              <th style={{ color: 'orange' }}>Kelgan vaqti</th>
              <th style={{ color: 'orange' }}>Kimdan</th>
              <th style={{ color: 'orange' }}>Kimga</th>
              <th style={{ color: 'orange' }}>
                <button
                  className='all-pdtv-btn pdtv-btn'
                  onClick={allPdtvModal}>
                  Tasdiqlash
                </button>
                <div className='pdtv-td'>
                  <div
                    className={
                      pdtvModal === 'all'
                        ? 'pdtv-modal '
                        : 'pdtv-modal-none ' + 'pdtv-modal-handler'
                    }>
                    <h5 className='pdtv-modal__header'>Tasdiqlaysizmi?</h5>
                    <div className='pdtv-modal__text'>
                      <p
                        className='pdtv-modal__yes'
                        onClick={setAllPdtvHandler}>
                        Ha
                      </p>
                      <p
                        className='pdtv-modal__no'
                        onClick={() => {
                          setPdtvModal(undefined);
                        }}>
                        Yo'q
                      </p>
                    </div>
                  </div>
                </div>
              </th>
              <th style={{ color: 'orange' }}>Fayl haqida</th>
              <th>
                <FaCloudDownloadAlt
                  className='download-icon'
                  style={{ color: 'orange' }}
                  onClick={(e) => downloadAll(e)}
                />
              </th>
            </tr>
          </thead>
          <tbody className='send__table-body'>
            {kelganFayllar
              ?.filter((file) => file.pdtv === false)
              ?.map((file, idx) => (
                <tr
                  className={!file.view ? 'file-text-bold' : 'file-text-normal'}
                  key={idx}
                  onClick={(e) => setViewHandler(file.id)}>
                  <td>{idx + 1}</td>
                  <td className=''>{file.originalName}</td>
                  <td className=''>{formatBytes(file.size)}</td>
                  <td className=''>
                    {file?.createdAt?.replace('T', ', ').slice(0, 17)}
                  </td>
                  <td className=''>
                    {
                      divisions?.filter(
                        (division) => division.id === file.fromDivision.id
                      )[0]?.name
                    }
                  </td>
                  <td className=''>
                    {
                      divisions?.filter(
                        (division) => division.id === file.toDivision.id
                      )[0]?.name
                    }
                  </td>
                  <td className='icons '>
                    <button
                      id={file.id}
                      className='pdtv-btn'
                      onClick={(e) => {
                        pdtvModalHandler(e);
                      }}>
                      <span>Tasdiqlash</span>
                    </button>
                    <div className='pdtv-td'>
                      <div
                        className={
                          pdtvModal == file.id
                            ? 'pdtv-modal '
                            : 'pdtv-modal-none ' + 'pdtv-modal-handler'
                        }>
                        <h5 className='pdtv-modal__header'>Tasdiqlaysizmi?</h5>
                        <div className='pdtv-modal__text'>
                          <p
                            className='pdtv-modal__yes'
                            onClick={() => {
                              setPdtvHandler(file.id);
                            }}>
                            Ha
                          </p>
                          <p
                            className='pdtv-modal__no'
                            onClick={() => {
                              setPdtvModal(undefined);
                            }}>
                            Yo'q
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='icons'>
                    <span
                      className='sent__info-icon'
                      onClick={() => {
                        fileInfoHandler(file.id);
                      }}>
                      <FaInfoCircle />
                    </span>
                  </td>
                  <td
                    className='icons'
                    id={file.id}
                    onClick={(e) => downloadRow(e, file.originalName)}>
                    <span className='delete-icon'>
                      <FaCloudDownloadAlt className='download-icon' />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        className={isModalOpen ? 'file-info-modal' : 'file-info-modal--close'}>
        {
          <div>
            <div className='file-info-modal__header'>
              <h5>Fayl haqida ma'lumot</h5>
              <button
                className='file-info-modal__btn'
                onClick={() => {
                  setIsModalOpen(false);
                }}>
                X
              </button>
            </div>
            <hr />
            <div>{`1. Fayl nomi: ${oneReceivedFile.originalName}`}</div>
            <div>{`2. Yuboruvchi: ${
              divisions?.filter(
                (division) => division?.id === oneReceivedFile?.fromDivision?.id
              )[0]?.name
            }, ${oneReceivedFile?.createdAt
              ?.replace('T', ', ')
              .slice(0, 17)}`}</div>
            <div>{`3. Qabul qiluvchi: ${
              divisions?.filter(
                (division) => division?.id === oneReceivedFile?.toDivision?.id
              )[0]?.name
            }`}</div>
            <div>{`4. Holati: ${
              oneReceivedFile?.view ? "ko'rildi" : "ko'rilmadi"
            }`}</div>
            <div>{`5. Tasdiq: ${
              oneReceivedFile?.pdtv ? 'tasdiqlangan' : "yo'q"
            }`}</div>
          </div>
        }
      </div>
    </div>
  );
};

export default Inbox;
