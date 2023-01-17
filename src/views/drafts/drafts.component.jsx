import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDone, MdDoneAll } from 'react-icons/md';
import { FaCloudDownloadAlt, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';
import './drafts.styles.scss';
import { getOneReceivedFile } from '../../store/features/attachment/attachment.actions';
import {
  deleteOneTo,
  downloadFileFromFileSystem,
  setView,
} from '../../store/features/attachment/attachment.actions';

const Drafts = () => {
  const { kelganFayllar, oneReceivedFile } = useSelector(
    (state) => state.attachment
  );
  const { divisions } = useSelector((state) => state.division);
  const [deleteFileModal, setDeleteFileModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const setViewHandler = (e) => {
    const id = e.currentTarget.id;
    dispatch(setView(id));
  };

  const downloadRow = (e, fileName) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    dispatch(downloadFileFromFileSystem({ id, fileName }));
  };

  const deleteModalHandler = (id) => {
    setDeleteFileModal(id);
  };

  const deleteMessageHandler = (id) => {
    dispatch(deleteOneTo(id));
    setDeleteFileModal(undefined);
  };

  const downloadAll = (e) => {
    e.stopPropagation();
    kelganFayllar?.forEach((file) => {
      dispatch(
        downloadFileFromFileSystem({
          id: file.id,
          fileName: file.originalName,
        })
      );
    });
  };
  const fileInfoHandler = (id) => {
    dispatch(getOneReceivedFile(id));
    setIsModalOpen(!isModalOpen);
  };

  const deleteAllFileModal = () => {
    setDeleteFileModal('all');
  };

  const deleteAllFilesHandler = () => {
    kelganFayllar.forEach((file) => {
      dispatch(deleteOneTo(file.id));
    });
    setDeleteFileModal(undefined);
  };

  return (
    <div className='inbox'>
      <div className='inbox__list'>
        <h4 className='inbox__header'>Qabul qilingan fayllar</h4>
        <hr className='dashboard__line' />
        <table className='inbox__table'>
          <thead className='inbox__table-header'>
            <tr>
              <th style={{ color: 'orange' }}>N</th>
              <th style={{ color: 'orange' }}>Nomi</th>
              <th style={{ color: 'orange' }}>Fayl hajmi</th>
              <th style={{ color: 'orange' }}>Kimdan</th>
              <th style={{ color: 'orange' }}>Kimga</th>
              <th style={{ color: 'orange' }}></th>
              <th>
                <FaCloudDownloadAlt
                  className='download-file-icon'
                  style={{ color: 'orange' }}
                  onClick={(e) => downloadAll(e)}
                />
              </th>
              <th>
                <FaTrashAlt
                  className='delete-file-icon'
                  style={{ color: 'orange' }}
                  onClick={deleteAllFileModal}
                />
                <div className='delete-file-td'>
                  <div
                    className={
                      deleteFileModal === 'all'
                        ? 'delete-file-modal '
                        : 'delete-file-modal-none ' +
                          'delete-file-modal-handler'
                    }>
                    <h5 className='delete-file-modal__header'>
                      Fayl serverdan o'chib ketadi, rozimisiz?
                    </h5>
                    <div className='delete-file-modal__text'>
                      <p
                        className='delete-file-modal__yes'
                        onClick={deleteAllFilesHandler}>
                        Ha
                      </p>
                      <p
                        className='delete-file-modal__no'
                        onClick={() => {
                          setDeleteFileModal(undefined);
                        }}>
                        Yo'q
                      </p>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className='send__table-body'>
            {kelganFayllar
              ?.filter((file) => file.pdtv === true)
              ?.map((file, idx) => (
                <tr
                  className=''
                  key={idx}
                  id={file.id}
                  onClick={(e) => setViewHandler(e)}>
                  <td>{idx + 1}</td>
                  <td className=''>{file.originalName}</td>
                  <td className=''>{file.size + 'b'}</td>
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
                      <FaCloudDownloadAlt className='download-file-icon' />
                    </span>
                  </td>
                  <td className='icons'>
                    <span
                      className='delete-icon'
                      onClick={(e) => {
                        deleteModalHandler(file.id);
                      }}>
                      <FaTrashAlt className='delete-file-icon' />
                    </span>
                    <div className='delete-file-td'>
                      <div
                        className={
                          deleteFileModal == file.id
                            ? 'delete-file-modal '
                            : 'delete-file-modal-none ' +
                              'delete-file-modal-handler'
                        }>
                        <h5 className='delete-file-modal__header'>
                          Fayl serverdan o'chib ketadi, rozimisiz?
                        </h5>
                        <div className='delete-file-modal__text'>
                          <p
                            className='delete-file-modal__yes'
                            onClick={() => {
                              deleteMessageHandler(file.id);
                            }}>
                            Ha
                          </p>
                          <p
                            className='delete-file-modal__no'
                            onClick={() => {
                              setDeleteFileModal(undefined);
                            }}>
                            Yo'q
                          </p>
                        </div>
                      </div>
                    </div>
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

export default Drafts;
