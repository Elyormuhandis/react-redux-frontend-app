import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles } from "../../store/features/attachment/attachment.actions";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdDoneOutline, MdSend } from "react-icons/md";
import "./send.styles.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  clearDragFileList,
  editDragFileList,
  setDragFileList,
} from "../../store/features/attachment/attachment.slice";
import { formatBytes } from "../../helpers/helper.functions";

const Send = (props) => {
  const dispatch = useDispatch();
  const { divisions } = useSelector((state) => state.division);
  let { dragFileList } = useSelector((state) => state.attachment);
  const [drag, setDrag] = useState(false);
  const [filteredDivisions, setfilteredDivisions] = useState(divisions);
  const [progress, setProgress] = useState(0);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addFileHandler = (data) => {
    data.setProgress = setProgress;
    data.toDivision = divisions.find(
      (division) => division.name === data.toDivision
    )?.id;
    data.files = [...dragFileList];
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
    dispatch(setDragFileList(e.dataTransfer.files));
    setDrag(false);
  };

  const handlePick = (e) => {
    document.querySelector("#file-input-field").click();
  };

  return (
    <div className="send">
      <form className="send__form" onSubmit={handleSubmit(addFileHandler)}>
        <div className="send__form--container">
          <div className="send__form--box">
            <input
              className="send__form--input"
              type="search"
              placeholder="Qayerga fayl yuborasiz?"
              {...register("toDivision", {
                onChange: () => {
                  setfilteredDivisions(
                    divisions.filter((division) =>
                      division.name
                        .toLocaleLowerCase()
                        .includes(watch("toDivision").toLocaleLowerCase())
                    )
                  );
                },
              })}
            />
            <ul className="send__form--autocomplete">
              {watch("toDivision") &&
                filteredDivisions
                  ?.filter((division) => division.active === true)
                  ?.map((division, idx) => (
                    <li
                      className="send__form--result"
                      key={division.id}
                      value={division.name}
                      onClick={() => {
                        reset({
                          toDivision: division.name,
                        });
                        setfilteredDivisions([]);
                      }}
                    >
                      {division.name}
                    </li>
                  ))}
            </ul>
            <div className="send__form--picker">
              <input
                id="file-input-field"
                type="file"
                multiple
                // accept="image/*, .png, .jpg, .gif"
                className="send__form--hidden"
                {...register("files", {
                  onChange: (e) => {
                    dispatch(setDragFileList(e.target.files));
                  },
                })}
              />
              {drag ? (
                <div
                  className="send__form--drop-area"
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragOverHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                  onDrop={(e) => dropHandler(e)}
                >
                  Qo'yib yuboring...
                </div>
              ) : (
                <div
                  className="send__form--drag"
                  onClick={(e) => handlePick(e)}
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragOverHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                >
                  <FaPlusCircle className="upload-icon" />
                  <span>Fayllarni yuklash...</span>
                </div>
              )}
            </div>
            <button className="send__form--btn" type="submit">
              <MdSend className="send-icon" />
              <span>YUBORISH</span>
            </button>
          </div>
        </div>
      </form>
      {dragFileList.length !== 0 && (
        <div className="send__selected-files">
          <div className="send__selected-files--header">Tanlangan fayllar</div>
          <table>
            <thead>
              <tr>
                <th style={{ color: "orange" }}>T/R</th>
                <th style={{ color: "orange" }}>Nomi</th>
                <th style={{ color: "orange" }}>Hajmi</th>
                <th style={{ color: "orange" }}>Holati</th>
                <th style={{ color: "orange" }}>
                  <FaTrashAlt
                    className="send__selected-files--clr-icon"
                    onClick={() => {
                      // setDragFiles([])
                      dispatch(clearDragFileList());
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="send__table-body">
              {dragFileList?.map((file, idx) => (
                <tr key={idx} id={idx}>
                  <td>{idx + 1}</td>
                  <td className="table-head-name">{file.name}</td>
                  <td className="table-head-name">{formatBytes(file.size)}</td>
                  <td className="table-head-name">
                    {progress < 100 ? (
                      <ProgressBar
                        completed={progress}
                        height="0.8rem"
                        labelSize="8px"
                        transitionDuration=".3s"
                        transitionTimingFunction="linear"
                        maxCompleted={100}
                        baseBgColor="#b2bac2"
                        bgColor="rgb(245, 93, 49)"
                      />
                    ) : (
                      <MdDoneOutline />
                    )}
                  </td>
                  <td className="table-head-name">
                    <FaTrashAlt
                      className="send__selected-files--clr-icon"
                      onClick={(e) => {
                        dispatch(
                          editDragFileList(
                            dragFileList.filter(
                              (file, idx) => idx != e.currentTarget.id
                            )
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
      )}
    </div>
  );
};

export default Send;
