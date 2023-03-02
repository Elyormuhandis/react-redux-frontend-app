import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./journal.styles.scss";
import {
  getAllStatistics,
  getAllStatisticsFromDivision,
  getAllStatisticsToDivision,
} from "../../store/features/statistics/statistics.actions";
import { formatBytes } from "../../helpers/helper.functions";

const Journal = () => {
  const { mode } = useSelector((state) => state.ui);
  const { logs } = useSelector((state) => state.statistics);
  const { userRole } = useSelector((state) => state.user);
  const { userDivision } = useSelector((state) => state.user);
  const { divisions } = useSelector((state) => state.division);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm({ mode: "onBlur" });

  const getJournal = (data) => {
    const { sortType } = data;
    if (userRole === "ADMIN") {
      if (sortType === "HAMMASI") {
        dispatch(getAllStatistics(data));
      } else if (sortType === "YUBORILGANLAR") {
        dispatch(getAllStatisticsFromDivision(data));
      } else if (sortType === "QABUL QILINGANLAR") {
        dispatch(getAllStatisticsToDivision(data));
      }
    }
    if (userRole === "USER") {
      data.divisionId = userDivision;
      if (sortType === "YUBORILGANLAR") {
        dispatch(getAllStatisticsFromDivision(data));
      } else if (sortType === "QABUL QILINGANLAR") {
        dispatch(getAllStatisticsToDivision(data));
      }
    }
  };

  return (
    <div className="journal">
      <h4 className="journal__header">
        Yuborilgan va qabul qilingan fayllar jurnali
      </h4>
      <form
        className="journal__form"
        onSubmit={handleSubmit(getJournal)}
        style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
      >
        <input
          style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
          type="datetime-local"
          // defaultValue={}
          className="journal__input"
          id="date-start"
          {...register("start", {})}
          required
        />
        <label className="journal__label" htmlFor="date-start">
          dan
        </label>
        <input
          style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
          type="datetime-local"
          className="journal__input"
          id="date-end"
          {...register("end", {})}
          required
        />
        <label className="journal__label" htmlFor="date-end">
          gacha
        </label>
        <select
          style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
          className="journal__select"
          id="date-select"
          defaultValue={"DEFAULT"}
          {...register("sortType", {
            onChange: (e) => {
              if (e.target.value === "HAMMASI") {
                reset({
                  divisionId: "DEFAULT",
                });
              }
            },
          })}
        >
          <option
            style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
            value={"DEFAULT"}
            disabled
            hidden
          >
            TANLANG
          </option>
          {userRole === "ADMIN" ? (
            <option
              className="journal__select--options"
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
            >
              HAMMASI
            </option>
          ) : (
            ""
          )}
          <option
            style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
            className="journal__select--options"
          >
            YUBORILGANLAR
          </option>
          <option
            style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
            className="journal__select--options"
          >
            QABUL QILINGANLAR
          </option>
        </select>
        {userRole === "ADMIN" && (
          <select
            style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
            className="journal__select"
            id="division-select-send"
            defaultValue={"DEFAULT"}
            {...register("divisionId")}
          >
            <option
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
              className="journal__select--options"
              value={"DEFAULT"}
              disabled
              hidden
            >
              Boshqarmalar...
            </option>
            {divisions
              ?.filter((division) => division.active === true)
              .map((division, idx) => (
                <option
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                  className="journal__select--options"
                  key={division.id}
                  value={division.id}
                >
                  {division.name}
                </option>
              ))}
          </select>
        )}
        <button
          style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
          className="journal__btn"
          type="submit"
        >
          QIDIRISH
        </button>
        <span>
          Umumiy:
          {" " + formatBytes(logs.reduce((acc, file) => (acc += file.size), 0))}
        </span>
      </form>
      {logs.length !== 0 && (
        <table className="sent__table">
          <thead className="send__table-header">
            <tr>
              <th
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                N
              </th>
              <th
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Nomi
              </th>
              <th
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Fayl hajmi
              </th>
              <th
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Kimdan
              </th>
              <th
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Kimga
              </th>
              <th
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Yuborilgan vaqti
              </th>
              <th
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                Qabul qilingan vaqti
              </th>
            </tr>
          </thead>
          <tbody className="send__table-body">
            {logs?.map((file, idx) => (
              <tr className="tasdiqlangan" key={idx}>
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
                  {file.createdAt?.replace("T", ", ").slice(0, 17)}
                </td>
                <td
                  style={
                    mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                  }
                  className="icons"
                >
                  {file.pdtvTime?.replace("T", ", ").slice(0, 17)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Journal;
