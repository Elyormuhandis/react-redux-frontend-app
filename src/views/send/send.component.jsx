import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../store/features/attachment/attachment.actions';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { MdDoneOutline, MdSend } from 'react-icons/md';
import './send.styles.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ProgressBar from '@ramonak/react-progress-bar';
import {
  clearDragFileList,
  editDragFileList,
  setDragFileList,
} from '../../store/features/attachment/attachment.slice';
import { formatBytes } from '../../helpers/helper.functions';

const Send = (props) => {
  const dispatch = useDispatch();
  const { divisions } = useSelector((state) => state.division);
  let { dragFileList } = useSelector((state) => state.attachment);
  const [drag, setDrag] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [active, setActive] = useState(-1);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [filteredDivisions, setFilteredDivisions] = useState(divisions);

  const formSchema = Yup.object().shape({
    toDivision: Yup.string().required(
      'Iltimos, yuborish uchun manzil kiriting!'
    ),
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const addFileHandler = async () => {
    const toDivision = selectedDivision;
    await dragFileList.forEach((file) => {
      dispatch(uploadFiles({ toDivision, file }));
      setSelectedDivision(null);
    });
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
    for (const file of e.target.files) {
      dispatch(setDragFileList(file));
    }
    setDrag(false);
  };

  const handlePick = (e) => {
    document.querySelector('#file-input-field').click();
  };

  return (
    <div className='send'>
      <form className='send__form' onSubmit={handleSubmit(addFileHandler)}>
        <div className='send__form--container'>
          <div className='send__form--box'>
            <input
              className='send__form--input'
              type='search'
              autoComplete='off'
              placeholder='Qayerga fayl yuborasiz?'
              onKeyDown={(e) => {
                switch (e.keyCode) {
                  case 40:
                    if (active < filteredDivisions.length - 1) {
                      setActive(active + 1);
                      setIsFocus(true);
                    }
                    break;
                  case 38:
                    if (active >= 0) {
                      setActive(active - 1);
                      if (active === 0) {
                        setIsFocus(false);
                      }
                    }
                    break;
                  case 13:
                    setSelectedDivision(filteredDivisions[active]?.id);
                    reset({
                      toDivision: filteredDivisions[active]?.name,
                    });
                    setIsFocus(false);
                    break;
                  case 27:
                    setActive(-1);
                    setIsFocus(false);
                    setSelectedDivision(null);
                    break;
                  default:
                    break;
                }
              }}
              onFocus={() => {
                setIsFocus(true);
                setFilteredDivisions(divisions);
                setActive(-1);
              }}
              {...register('toDivision', {
                onBlur: (e) => {
                  setTimeout(() => {
                    setActive(-1);
                    setIsFocus(false);
                    setFilteredDivisions([]);
                  }, 120);
                },
                onChange: () => {
                  setFilteredDivisions(
                    divisions.filter((division) =>
                      division.name
                        .toLocaleLowerCase()
                        .includes(watch('toDivision').toLocaleLowerCase())
                    )
                  );
                },
                required: true,
              })}
            />
            <ul className='send__form--autocomplete'>
              {isFocus &&
                filteredDivisions
                  ?.filter((division) => division.active === true)
                  ?.map((division, idx) => (
                    <li
                      className={`send__form--result ${
                        idx === active ? 'focused' : ''
                      }`}
                      key={division.id}
                      value={division.name}
                      onClick={(e) => {
                        setSelectedDivision(division.id);
                        reset({
                          toDivision: division.name,
                        });
                        setFilteredDivisions([]);
                      }}>
                      {division.name}
                    </li>
                  ))}
            </ul>
            <div className='send__form--picker'>
              <input
                id='file-input-field'
                type='file'
                multiple
                // accept="image/*, .png, .jpg, .gif"
                className='send__form--hidden'
                {...register('files', {
                  onChange: (e) => {
                    for (const file of e.target.files) {
                      dispatch(setDragFileList(file));
                    }
                  },
                })}
              />
              {drag ? (
                <div
                  className='send__form--drop-area'
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragOverHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                  onDrop={(e) => dropHandler(e)}>
                  Qo'yib yuboring...
                </div>
              ) : (
                <div
                  className='send__form--drag'
                  onClick={(e) => handlePick(e)}
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragOverHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}>
                  <FaPlusCircle className='upload-icon' />
                  <span>Fayllarni yuklash...</span>
                </div>
              )}
            </div>
            <button className='send__form--btn' type='submit'>
              <MdSend className='send-icon' />
              <span>YUBORISH</span>
            </button>
          </div>
        </div>
      </form>
      <p
        className={errors.toDivision ? 'alerts' : 'alerts v-hidden'}
        style={{ marginLeft: '2rem' }}>
        {errors.toDivision?.message}
      </p>
      {dragFileList.length !== 0 && (
        <div className='send__selected-files'>
          <div className='send__selected-files--header'>Tanlangan fayllar</div>
          <table>
            <thead>
              <tr>
                <th style={{ color: 'orange' }}>T/R</th>
                <th style={{ color: 'orange' }}>Nomi</th>
                <th style={{ color: 'orange' }}>Hajmi</th>
                <th style={{ color: 'orange' }}>Holati</th>
                <th style={{ color: 'orange' }}>
                  <FaTrashAlt
                    className='send__selected-files--clr-icon'
                    onClick={() => {
                      dispatch(clearDragFileList());
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody className='send__table-body'>
              {dragFileList?.map((file, idx) => (
                <tr
                  key={idx}
                  id={idx}
                  style={file?.isSent ? { backgroundColor: 'green' } : {}}>
                  <td>{idx + 1}</td>
                  <td className='table-head-name'>{file.file.name}</td>
                  <td className='table-head-name'>
                    {formatBytes(file.file.size)}
                  </td>
                  <td className='table-head-name'>
                    {file.progress < 100 ? (
                      <ProgressBar
                        completed={file.progress}
                        height='0.8rem'
                        labelSize='8px'
                        transitionDuration='.3s'
                        transitionTimingFunction='linear'
                        maxCompleted={100}
                        baseBgColor='#b2bac2'
                        bgColor='rgb(245, 93, 49)'
                      />
                    ) : (
                      <MdDoneOutline />
                    )}
                  </td>
                  <td className='table-head-name'>
                    <FaTrashAlt
                      className='send__selected-files--clr-icon'
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
