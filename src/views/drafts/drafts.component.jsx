import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDone, MdDoneAll } from "react-icons/md";
import { FaCloudDownloadAlt, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import "./drafts.styles.scss";
import { getOneReceivedFile } from "../../store/features/attachment/attachment.actions";
import {
  deleteOneTo,
  downloadFileFromFileSystem,
  setView,
} from "../../store/features/attachment/attachment.actions";
import { formatBytes } from "../../helpers/helper.functions";

const Drafts = () => {
  const { kelganFayllar, oneReceivedFile } = useSelector(
    (state) => state.attachment
  );
  const { mode } = useSelector((state) => state.ui);
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
    setDeleteFileModal("all");
  };

  const deleteAllFilesHandler = () => {
    kelganFayllar.forEach((file) => {
      dispatch(deleteOneTo(file.id));
    });
    setDeleteFileModal(undefined);
  };

  return (
    <div className="inbox">
      <div className="inbox__list">
        <h4 className="inbox__header">Qabul qilingan fayllar</h4>
        <hr className="dashboard__line" />
        <table className="inbox__table">
          <thead className="inbox__table-header">
            <tr>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                N
              </th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Nomi
              </th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Fayl hajmi
              </th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Kimdan
              </th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Kimga
              </th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              ></th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                <FaCloudDownloadAlt
                  className="download-file-icon"
                  style={
                    mode
                      ? { color: "orange" }
                      : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                  onClick={(e) => downloadAll(e)}
                />
              </th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                <FaTrashAlt
                  className="delete-file-icon"
                  style={
                    mode
                      ? { color: "orange" }
                      : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                  onClick={deleteAllFileModal}
                />
                <div className="delete-file-td">
                  <div
                    className={
                      deleteFileModal === "all"
                        ? "delete-file-modal "
                        : "delete-file-modal-none " +
                          "delete-file-modal-handler"
                    }
                  >
                    <h5 className="delete-file-modal__header">
                      Fayl serverdan o'chib ketadi, rozimisiz?
                    </h5>
                    <div className="delete-file-modal__text">
                      <p
                        className="delete-file-modal__yes"
                        onClick={deleteAllFilesHandler}
                      >
                        Ha
                      </p>
                      <p
                        className="delete-file-modal__no"
                        onClick={() => {
                          setDeleteFileModal(undefined);
                        }}
                      >
                        Yo'q
                      </p>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="send__table-body">
            {kelganFayllar
              ?.filter((file) => file.pdtv === true)
              ?.map((file, idx) => (
                <tr
                  style={mode ? {} : { backgroundColor: "#1b4a4c" }}
                  key={idx}
                  id={file.id}
                  onClick={(e) => setViewHandler(e)}
                >
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                  >
                    {idx + 1}
                  </td>
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                  >
                    {file.originalName}
                  </td>
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                  >
                    {formatBytes(file.size)}
                  </td>
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                  >
                    {
                      divisions?.filter(
                        (division) => division.id === file.fromDivision.id
                      )[0]?.name
                    }
                  </td>
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                  >
                    {
                      divisions?.filter(
                        (division) => division.id === file.toDivision.id
                      )[0]?.name
                    }
                  </td>
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                    className="icons"
                  >
                    <span
                      className="sent__info-icon"
                      onClick={() => {
                        fileInfoHandler(file.id);
                      }}
                    >
                      <FaInfoCircle />
                    </span>
                  </td>
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                    className="icons"
                    id={file.id}
                    onClick={(e) => downloadRow(e, file.originalName)}
                  >
                    <span className="delete-icon">
                      <FaCloudDownloadAlt className="download-file-icon" />
                    </span>
                  </td>
                  <td
                    style={
                      mode
                        ? {}
                        : { backgroundColor: "#fff", color: "#0b2b26cc" }
                    }
                    className="icons"
                  >
                    <span
                      className="delete-icon"
                      onClick={(e) => {
                        deleteModalHandler(file.id);
                      }}
                    >
                      <FaTrashAlt className="delete-file-icon" />
                    </span>
                    <div className="delete-file-td">
                      <div
                        className={
                          deleteFileModal == file.id
                            ? "delete-file-modal "
                            : "delete-file-modal-none " +
                              "delete-file-modal-handler"
                        }
                      >
                        <h5 className="delete-file-modal__header">
                          Fayl serverdan o'chib ketadi, rozimisiz?
                        </h5>
                        <div className="delete-file-modal__text">
                          <p
                            className="delete-file-modal__yes"
                            onClick={() => {
                              deleteMessageHandler(file.id);
                            }}
                          >
                            Ha
                          </p>
                          <p
                            className="delete-file-modal__no"
                            onClick={() => {
                              setDeleteFileModal(undefined);
                            }}
                          >
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
        className={isModalOpen ? "file-info-modal" : "file-info-modal--close"}
      >
        {
          <div>
            <div className="file-info-modal__header">
              <h5>Fayl haqida ma'lumot</h5>
              <button
                className="file-info-modal__btn"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
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
              ?.replace("T", ", ")
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
              oneReceivedFile?.pdtv ? "tasdiqlangan" : "yo'q"
            }`}</div>
          </div>
        }
      </div>
    </div>
  );
};

export default Drafts;
