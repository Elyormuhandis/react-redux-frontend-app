import { useDispatch, useSelector } from "react-redux";
import { MdDone, MdDoneAll } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import "./sent.styles.scss";
import { useState } from "react";
import { getOneSentFile } from "../../store/features/attachment/attachment.actions";
import { formatBytes } from "../../helpers/helper.functions";

const Sent = () => {
  const { mode } = useSelector((state) => state.ui);
  const { yuborilganFayllar, oneSentFile } = useSelector(
    (state) => state.attachment
  );
  const { divisions } = useSelector((state) => state.division);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const fileInfoHandler = (id) => {
    dispatch(getOneSentFile(id));
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="sent">
      <div className="sent__list">
        <h4 className="sent__header">Yuborilgan fayllar</h4>
        <hr className="dashboard__line" />
        <table className="sent__table">
          <thead className="send__table-header">
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
                Yuborilgan vaqti
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
              >
                Holati
              </th>
              <th
                style={
                  mode
                    ? { color: "orange" }
                    : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Info
              </th>
            </tr>
          </thead>
          <tbody className="send__table-body">
            {yuborilganFayllar?.map((file, idx) => (
              <tr
                className={file.pdtv ? "tasdiqlangan" : "tasdiqlanmagan"}
                key={idx}
              >
                <td
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                >
                  {idx + 1}
                </td>
                <td
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                >
                  {file.originalName}
                </td>
                <td
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                >
                  {formatBytes(file.size)}
                </td>
                <td
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                >
                  {file?.createdAt?.replace("T", ", ").slice(0, 17)}
                </td>
                <td
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
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
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
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
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                  className="icons"
                >
                  {file.view ? <MdDoneAll /> : <MdDone />}
                </td>
                <td
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
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
            <div>{`1. Fayl nomi: ${oneSentFile.originalName}`}</div>
            <div>{`2. Yuboruvchi: ${
              divisions?.filter(
                (division) => division?.id === oneSentFile?.fromDivision?.id
              )[0]?.name
            }, ${oneSentFile?.createdAt
              ?.replace("T", ", ")
              .slice(0, 17)}`}</div>
            <div>{`3. Qabul qiluvchi: ${
              divisions?.filter(
                (division) => division?.id === oneSentFile?.toDivision?.id
              )[0]?.name
            }`}</div>
            <div>{`4. Holati: ${
              oneSentFile?.view ? "ko'rildi" : "ko'rilmadi"
            }`}</div>
            <div>{`5. Tasdiq: ${
              oneSentFile?.pdtv ? "tasdiqlangan" : "yo'q"
            }`}</div>
          </div>
        }
      </div>
    </div>
  );
};

export default Sent;
