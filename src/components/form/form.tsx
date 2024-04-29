import { useAppDispatch, useAppSelector } from '@/hooks';
import './form.css'
import { getDataByLine, getFormItem, getPostUpdatesStatus, isFormActive, isFormItemStatusLoading, isWatchButton } from '@/store/data-line/data-line.selectors';
import { setActiveIdForm, setIsFormActive, setUpdatesStatus, setWatchButton } from '@/store/data-line/data-line.slice';
import { getLines } from '@/store/lines/lines.selectors';
import Spinner from '../spinner/spinner';
import { fetchLineDataAction, postUpdatesAction } from '@/store/api-actions';
import { getActiveHeader, getRowActive, isNewForm } from '@/store/headers/headers.selectors';
import { DataLineData } from '@/types/data-line';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Status } from '@/const';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useScrollLock } from '../hook/use-scroll-lock';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PostUpdates } from '@/types/updates-post';
import { store } from '@/store';
import { setRowActive } from '@/store/headers/headers.slice';
import dayjs from 'dayjs';

store.dispatch(fetchLineDataAction());

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Form() {
  const dispatch = useAppDispatch();
  const [beginValue, setBeginValue] = useState<Value>(new Date());
  const modalRef = useRef(null);
  const { lockScroll, unlockScroll } = useScrollLock();
  const isActiveForm = useAppSelector(isFormActive);
  const lines = useAppSelector(getLines);
  const activeForm = useAppSelector(getFormItem);
  const activeHeaderFormId = useAppSelector(getRowActive)
  const allforms = useAppSelector(getDataByLine);
  const activeHeader  = useAppSelector(getActiveHeader);
  const updatePostStatus = useAppSelector(getPostUpdatesStatus);
  const isNewFormAdd = useAppSelector(isNewForm);
  const isWatchBtn = useAppSelector(isWatchButton);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(setIsFormActive(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isActiveForm && modalRef.current) {
      document.addEventListener('keydown', handleEscapeKeydown);
      lockScroll();
    }

    return () => {
      unlockScroll();
      document.removeEventListener('keydown', handleEscapeKeydown);

    };
  }, [handleEscapeKeydown, isActiveForm, lockScroll, unlockScroll]);

  let prevActiveId = 0;
  const initialStateArray = useMemo(() =>[
    {
      targetCount: 0,
      distributionCount: 0,
      nsiPersIndicateId: 1,
    },
    {
      targetCount: 0,
      distributionCount: 0,
      nsiPersIndicateId: 2,
    },
    {
      targetCount: 0,
      distributionCount: 0,
      nsiPersIndicateId: 3,
    },
    {
      targetCount: 0,
      distributionCount: 0,
      nsiPersIndicateId: 4,
    },
    {
      targetCount: 0,
      distributionCount: 0,
      nsiPersIndicateId: 5,
    }
  ],[]);

  const [lineData1, setLineData1] = useState({
    targetCount: 0,
    distributionCount: 0,
    nsiPersIndicateId: 1,
  });
  const [lineData2, setLineData2] = useState({
    targetCount: 0,
    distributionCount: 0,
    nsiPersIndicateId: 2,
  });
  const [lineData3, setLineData3] = useState({
    targetCount: 0,
    distributionCount: 0,
    nsiPersIndicateId: 3,
  });
  const [lineData4, setLineData4] = useState({
    targetCount: 0,
    distributionCount: 0,
    nsiPersIndicateId: 4,
  });
  const [lineData5, setLineData5] = useState({
    targetCount: 0,
    distributionCount: 0,
    nsiPersIndicateId: 5,
  });
  const updates = useMemo(() => [lineData1, lineData2, lineData3, lineData4, lineData5], [lineData1, lineData2, lineData3, lineData4, lineData5])
  const sets = useMemo(() => [setLineData1,setLineData2, setLineData3, setLineData4, setLineData5], [])

  const {register, handleSubmit, formState: {errors}, reset} = useForm<PostUpdates>({
    defaultValues: {},
    mode: 'onChange'
  });
  const handleFormChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value, id} = evt.target;
    sets[Number(id)-1]({ ...updates[Number(id)-1], [name]: value})
  };

  const distributionSum = useCallback(() => updates.reduce((acc, sum) => acc + Number(sum.distributionCount), 0), [updates]);
  const targetSum = useCallback(() => updates.reduce((acc, sum) => acc + Number(sum.targetCount), 0), [updates]);
  const selectedForms = allforms.filter((item) => item.f_pers_young_spec_id === activeHeaderFormId).reverse();
  // const lastUpdates: DataLineData[] = selectedForms.reduce((acc, form) => acc.map[form.nsi_pers_indicate_id] ? acc : ((acc.map[form.nsi_pers_indicate_id] = true), acc.lastUpdates.push(form), acc), {
  //   map: {},
  //   lastUpdates: []
  // }).lastUpdates;

  type DataMap = {
    [key: number]: DataLineData;
  }

  const lastUpdates: DataLineData[] = Object.values(selectedForms.reduce(
    (acc: DataMap, val: DataLineData) => {
      acc[val.nsi_pers_indicate_id] = Object.assign(acc[val.nsi_pers_indicate_id] ?? {}, val);
      return acc;
    },
    {} as DataMap
  ))

  const sortedUpdates = useMemo(() => lastUpdates.sort((a, b) => a.nsi_pers_indicate_id - b.nsi_pers_indicate_id), [lastUpdates]);

  useEffect(() => {
    if (updatePostStatus === Status.Success) {
      dispatch(setRowActive(null));
      dispatch(setActiveIdForm(null));
    }
    if (updatePostStatus === Status.Success || prevActiveId !== activeHeaderFormId || isNewFormAdd) {
      dispatch(setUpdatesStatus(Status.Idle));

      if (sortedUpdates && sortedUpdates.length > 0) {
        for (let j = 0; j < sortedUpdates.length; j++) {
          for (let i = 0; i < initialStateArray.length; i++) {

            if (initialStateArray[i].nsiPersIndicateId === sortedUpdates[j].nsi_pers_indicate_id) {
              initialStateArray[i] = {...initialStateArray[i],
                targetCount: sortedUpdates[j].target_count,
                distributionCount: sortedUpdates[j].distribution_count,
              }
              sets[i]({...initialStateArray[i],
                  targetCount: sortedUpdates[j].target_count,
                  distributionCount: sortedUpdates[j].distribution_count,
                })
            }
          }
        }
        dispatch(setIsFormActive(false))
      activeHeaderFormId ? prevActiveId = activeHeaderFormId : 0;
      sets.map((set, i) => {
        set({...initialStateArray[i],
        targetCount: 0,
        distributionCount: 0,
        nsiPersIndicateId: i + 1,
      })});
      }
    }
  }, [activeHeaderFormId, dispatch, updatePostStatus]);


  useEffect(() =>{
    if (sortedUpdates && sortedUpdates.length > 0) {
      for (let j = 0; j < sortedUpdates.length; j++) {
        for (let i = 0; i < initialStateArray.length; i++) {
          if (initialStateArray[i].nsiPersIndicateId === sortedUpdates[j].nsi_pers_indicate_id) {
            sets[i]({...initialStateArray[i],
                targetCount: sortedUpdates[j].target_count,
                distributionCount: sortedUpdates[j].distribution_count,
              })
            initialStateArray[i] = {...initialStateArray[i],
              targetCount: sortedUpdates[j].target_count,
              distributionCount: sortedUpdates[j].distribution_count,
            }
          }
        }
      }
    }
  },[isActiveForm])
  const isFormLoading = useAppSelector(isFormItemStatusLoading)
  if (isFormLoading) {
    return <Spinner />;
  }


  const getChanges = () => {
    const changes = [];
    for (let i = 0; i < initialStateArray.length; i++) {
      const condition =
      initialStateArray[i].distributionCount
        !== Number(updates[i].distributionCount)
        || initialStateArray[i].targetCount
        !== Number(updates[i].targetCount)
      if (condition) {
        changes.push(updates[i]);
      }
    }
    return changes
  }

  const newChanges = getChanges();
  const formClassName = isActiveForm ? 'form--active form' : 'form';

  const handleFormSubmit: SubmitHandler<PostUpdates> = (data) => {
    const {update_user} = data
    reset();
    if(activeForm && newChanges.length > 0) {
      newChanges.map((change) => {
        dispatch(postUpdatesAction({
          'target_count': Number(change.targetCount),
          'distribution_count': Number(change.distributionCount),
          'update_date': new Date().toISOString(),
          'nsi_pers_indicate_id': Number(change.nsiPersIndicateId),
          'f_pers_young_spec_id': Number(activeHeaderFormId),
          'update_user': update_user,
        }));
      });
    }
  };

  const closeWatchMode = () => {
    dispatch(setWatchButton(false));
    dispatch(setIsFormActive(false));
  }
  const lastUpdateUser = lastUpdates.length > 0 ? lastUpdates.sort((a, b) => dayjs(b.update_date).diff(a.update_date))[0].update_user :'';

  return (
    <form className={formClassName} onSubmit={handleSubmit(handleFormSubmit)} ref={modalRef}>
      <div className='form__container'>
        <div>
          <div className='form__term'>
            <div>За период&nbsp;
              {isNewFormAdd ? new Date().toLocaleString('ru', { month: 'long' }).toUpperCase() :  activeHeader
                ? new Date(activeHeader.rep_beg_period).toLocaleString('ru', { month: 'long' }).toUpperCase()
                : new Date().toLocaleString('ru', { month: 'long' }).toUpperCase()} -
            </div>
            {activeHeader
                && new Date(activeHeader.rep_end_period).toLocaleString('ru', { month: 'long' }).toUpperCase()
                !== new Date(activeHeader.rep_beg_period).toLocaleString('ru', { month: 'long' }).toUpperCase()
                && <div> {new Date(activeHeader.rep_end_period).toLocaleString('ru', { month: 'long' }).toUpperCase()}</div>}
            <div className="date-picker">
              <DatePicker onChange={setBeginValue} value={beginValue} />
            </div>
          </div>
        </div>
        {!isNewFormAdd &&
          <>
            <div className='form__organization'>
              <p>ОРГАНИЗАЦИЯ</p>
              <p className='form__data'>{!isNewFormAdd && activeHeader && activeHeader.org_employee}</p>
            </div>
            <div className='form__organization'>
              <p>Последние изменения</p>
              <p className='form__data'>{!isNewFormAdd && lastUpdateUser !== '' ? lastUpdateUser : activeHeader ? activeHeader.update_user : ''}</p>
            </div>
          </>
        }
        <div>

          <fieldset>
            <label htmlFor="">Ответственный, заполнивший форму (Ф.И.О., должность, телефон)</label>
            <input  className='form__update-user' style={{width: '100%'}} type="text"
              placeholder="ФИО"
              {...register('update_user', {
                required: true,
                pattern: {
                  value:  /^.{1,15}$/,
                  message: 'Имя обязательно и не может превышать 15 символов'
                } })}
              aria-invalid={errors.update_user ? 'true' : 'false'}
            />
            {errors.update_user && (
              <p role="alert">{errors.update_user.message}</p>
            )}
          </fieldset>
        </div>
        <div className='table__wrapper'>
          <div className='table__flex'>

            <div className='table__column table__column--text'>
              <p className="form__table-header">Наименование показателя</p>
            </div>
            <div className='table__column'>
              <p className="form__table-header">Общее количество молодых специалистов</p>
            </div>

            <div className='table__column'>
              <p className="form__table-header form__table-header--sub">категория, источник приёма на работу</p>
              <div className='header__sub'>
                <p className="form__header-subtitle">целевое</p>
                <p className="form__header-subtitle">распределение</p>
              </div>
            </div>

          </div>
          <div className='table__wrapper'>
            <div className='table__flex'>
              <ol className="form__row-list">
                {lines.map((line) => {
                  const range = line.nsi_pers_young_spec_id;

                  return (
                    <li className='form__row' key={line.nsi_pers_young_spec_id}>
                      <label htmlFor={`line-total-${line.range}`} className='table__column table__column--text'>
                        {line.range}. {line.name}
                      </label>
                      <div className='table__column'>
                        <input type="number" id={`line-total-${line.range}`}
                          name={`line-total-${line.range}`}
                        />
                      </div>
                      <div className='table__column table__column--sub'>
                        <div className='table__column--half'>
                          <input type="number"
                            name='targetCount'
                            id={range.toString()}
                            min={0}
                            onChange={handleFormChange}
                            value={updates[range-1].targetCount}
                          />
                        </div>
                        <div className='table__column--half'>
                        <input type="number"
                          min={0}
                          name='distributionCount'
                          id={range.toString()}
                          onChange={handleFormChange}
                          value={updates[range-1].distributionCount}
                        />
                        </div>
                      </div>
                    </li>
                    );
                  })}
                <li className='form__row form__row--total'>
                  <label htmlFor="" className='table__column table__column--text'>
                    ИТОГО:
                  </label>
                  <div className='table__column'>
                    <input style={{pointerEvents: 'none'}} type="number"/>
                  </div>
                  <div className='table__column table__column--sub'>
                    <div className='table__column--half'>
                      <div style={{backgroundColor:'white', border: 'solid 1px black'}}>{targetSum()}</div>
                    </div>
                    <div className='table__column--half'>
                      <div style={{backgroundColor:'white', border: 'solid 1px black'}}>{distributionSum()}</div>
                    </div>
                  </div>
                </li>
              </ol>

            </div>
          </div>

        </div>
        {!isWatchBtn &&
          <div className='form__buttons'>
            <button className='btn-close btn'
              onClick={(e) => {
                e.preventDefault();
                dispatch(setIsFormActive(!isActiveForm));
              }}
            >
              Закрыть
            </button>
            <button className='btn-save btn' type='submit'>
              Сохранить
            </button>
          </div>
        }
        {isWatchBtn &&
        <div className='readonly' ref={modalRef}>
          <button className='btn' onClick={closeWatchMode}>Закрыть</button>
        </div>
      }
      </div>
    </form>
  );
}
