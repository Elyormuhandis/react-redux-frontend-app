import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllByFromDivision,
  uploadFiles,
} from "../../store/features/attachment/attachment.actions";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import "./send.styles.scss";
import { BarLoader } from "react-spinners";

const Send = () => {
  const dispatch = useDispatch();
  const [drag, setDrag] = useState(false);
  const [dragFiles, setDragFiles] = useState([]);
  const { divisions } = useSelector((state) => state.division);
  const { loadingFile, success, message} = useSelector((state) => state.attachment);

  useEffect(()=>{
    if (success) {
      setDragFiles([])
    }
  }, [message])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addFileHandler = (data) => {
    data.files = [...dragFiles];
    dispatch(uploadFiles(data));
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    setDragFiles([...dragFiles, ...e.dataTransfer.files]);
    setDrag(false);
  };

  const handlePick = (e) => {
    document.querySelector("#file-input-field").click();
  };



  return (
    <div className="send">
      <form className="send__form" onSubmit={handleSubmit(addFileHandler)}>
        <div className="send__container">
          <div className="send__bottom">
            <h4>Qayerga</h4>
            <div className="send__file-sender-container">
              <select
                className="send__form--select"
                id="division-select-send"
                defaultValue={"DEFAULT"}
                {...register("toDivision")}
              >
                <option
                  className="send__form--option"
                  value={"DEFAULT"}
                  disabled
                  hidden
                >
                  Boshqarmalar...
                </option>
                {divisions
                  ?.filter((division) => division.active === true)
                  ?.map((division, idx) => (
                    <option
                      className="send__form--option"
                      key={division.id}
                      value={division.id}
                    >
                      {division.name}
                    </option>
                  ))}
              </select>
              <button className="send__form--btn" type="submit">
                <MdSend className="upload-icon" />
              </button>
            </div>
          </div>
          <div className="send__file-picker">
            <h4>Fayllar</h4>
            <input
              id="file-input-field"
              type="file"
              multiple
              // accept="image/*, .png, .jpg, .gif"
              className="send__file-input--hidden"
              {...register("files", {
                onChange: (e) => {
                  setDragFiles([...dragFiles, ...e.target.files]);
                },
              })}
            />
            {drag ? (
              <div
                className="drop-area"
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragOverHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => dropHandler(e)}
              >
                Qo'yib yuboring...
              </div>
            ) : (
              <div
                className="drag"
                onClick={(e) => handlePick(e)}
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragOverHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
              >
                <FaPlusCircle className="upload-icon" />
                <span>YUKLASH</span>
              </div>
            )}
          </div>
          <h4 className="send__head">Xabar</h4>
          <textarea className="send__message" type="text" />
        </div>
      </form>
      <div className="send__selected-files">
        <div className="send__selected-files--header"></div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th style={{ color: "orange" }}>T/R</th>
              <th style={{ color: "orange" }}>Nomi</th>
              <th style={{ color: "orange" }}>Hajmi</th>
              <th style={{ color: "orange" }}>Holati</th>
              <th style={{ color: "orange" }}>
                <FaTrashAlt
                  className="send__selected-files--clr-icon"
                  onClick={() => setDragFiles([])}
                />
              </th>
            </tr>
          </thead>
          <tbody className="send__table-body">
            {dragFiles?.map((file, idx) => (
              <tr key={idx} id={idx}>
                <td>
                  <input type="checkbox" id={idx} />
                </td>
                <td>{idx + 1}</td>
                <td className="table-head-name">{file.name}</td>
                <td className="table-head-name">{file.size}</td>
                <td className="table-head-name">
                  <BarLoader color="#36d7b7" loading={loadingFile} />
                </td>
                <td className="table-head-name">
                  <FaTrashAlt
                    className="send__selected-files--clr-icon"
                    onClick={(e) => {
                      setDragFiles(
                        dragFiles.filter(
                          (file, idx) => idx != e.currentTarget.id
                        )
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Send;
