import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './journal.styles.scss';
import {
  getAllStatistics,
  getAllStatisticsFromDivision,
  getAllStatisticsToDivision,
} from '../../store/features/statistics/statistics.actions';
import { formatBytes } from '../../helpers/helper.functions';

const Journal = () => {
  const { logs } = useSelector((state) => state.statistics);
  const { userRole } = useSelector((state) => state.user);
  const { userDivision } = useSelector((state) => state.user);
  const { divisions } = useSelector((state) => state.division);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const getJournal = (data) => {
    data.divisionId = userDivision;
    const { sortType } = data;
    if (sortType === 'HAMMASI') {
      dispatch(getAllStatistics(data));
    } else if (sortType === 'YUBORILGANLAR') {
      dispatch(getAllStatisticsFromDivision(data));
    } else if (sortType === 'QABUL QILINGANLAR') {
      dispatch(getAllStatisticsToDivision(data));
    }
  };

  return (
    <div className='journal'>
      <h4 className='journal__header'>
        Yuborilgan va qabul qilingan fayllar jurnali
      </h4>
      <form className='journal__form' onSubmit={handleSubmit(getJournal)}>
        <input
          type='datetime-local'
          // defaultValue={}
          className='journal__input'
          id='date-start'
          {...register('start', {})}
          required
        />
        <label className='journal__label' htmlFor='date-start'>
          dan
        </label>
        <input
          type='datetime-local'
          className='journal__input'
          id='date-end'
          {...register('end', {})}
          required
        />
        <label className='journal__label' htmlFor='date-end'>
          gacha
        </label>
        <select
          className='journal__select'
          id='date-select'
          defaultValue={'DEFAULT'}
          {...register('sortType')}>
          <option className='' value={'DEFAULT'} disabled hidden>
            TANLANG
          </option>
          {userRole === 'ADMIN' ? (
            <option className='journal__select--options'>HAMMASI</option>
          ) : (
            ''
          )}
          <option className='journal__select--options'>YUBORILGANLAR</option>
          <option className='journal__select--options'>
            QABUL QILINGANLAR
          </option>
        </select>
        {userRole === 'ADMIN' && (
          <select
            className='journal__select'
            id='division-select-send'
            defaultValue={'DEFAULT'}
            {...register('divisionId')}>
            <option
              className='journal__select--options'
              value={'DEFAULT'}
              disabled
              hidden>
              Boshqarmalar...
            </option>
            {divisions
              ?.filter((division) => division.active === true)
              .map((division, idx) => (
                <option
                  className='journal__select--options'
                  key={division.id}
                  value={division.id}>
                  {division.name}
                </option>
              ))}
          </select>
        )}
        <button className='journal__btn' type='submit'>
          QIDIRISH
        </button>
      </form>
      {logs.length !== 0 && (
        <table className='sent__table'>
          <thead className='send__table-header'>
            <tr>
              <th>N</th>
              <th>Nomi</th>
              <th>Fayl hajmi</th>
              <th>Kimdan</th>
              <th>Kimga</th>
              <th>Yuborilgan vaqti</th>
              <th>Qabul qilingan vaqti</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='send__table-body'>
            {logs?.map((file, idx) => (
              <tr className='tasdiqlangan' key={idx}>
                <td>{idx + 1}</td>
                <td className=''>{file.originalName}</td>
                <td className=''>{formatBytes(file.size)}</td>
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
                  {file.fromDivision.createdAt.replace('T', ', ').slice(0, 17)}
                </td>
                <td className='icons'>
                  {file.toDivision.createdAt.replace('T', ', ').slice(0, 17)}
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
