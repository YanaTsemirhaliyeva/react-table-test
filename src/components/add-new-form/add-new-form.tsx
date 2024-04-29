import { useAppDispatch, useAppSelector } from "@/hooks";
import { getPostNewFormStatus, isNewForm } from "@/store/headers/headers.selectors";
import './add-new-form.css';
import { setIsNewForm, setNewFormPostStatus } from "@/store/headers/headers.slice";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Status } from "@/const";
import { fetchHeadersAction, postNewFormAction } from "@/store/api-actions";
import { useScrollLock } from "../hook/use-scroll-lock";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];



export function AddNewForm() {
  const dispatch = useAppDispatch();
  const [beginValue, setBeginValue] = useState<Value>(new Date());
  const [endVvalue, setEndVvalue] = useState<Value>(new Date());
  const modalRef = useRef(null);
  const { lockScroll, unlockScroll } = useScrollLock();
  const newForm = useAppSelector(isNewForm);
  const className = newForm ? 'new-form new-form--active' : 'new-form';
  const postFormStatus = useAppSelector(getPostNewFormStatus);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(setIsNewForm(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (newForm && modalRef.current) {
      document.addEventListener('keydown', handleEscapeKeydown);
      lockScroll();
    }

    return () => {
      unlockScroll();
      document.removeEventListener('keydown', handleEscapeKeydown);

    };
  }, [handleEscapeKeydown, lockScroll, newForm, unlockScroll]);


  const [formData, setFormData] = useState({
    'insert_user': '',
    'org_employee': '',
  });


  const handleFormChange =
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const {name, value} = evt.target;
      setFormData({ ...formData, [name]: value});
    };



  useEffect(() => {
    if (postFormStatus === Status.Success) {
      dispatch(setNewFormPostStatus(Status.Idle));
      dispatch(setIsNewForm(false));
      dispatch(fetchHeadersAction());
      setFormData({
        ...formData,
        'insert_user': '',
        'org_employee': '',
      });
    }
  }, [dispatch, formData, postFormStatus]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(beginValue && endVvalue){
      dispatch(postNewFormAction({
        ...formData,
        'insert_date': new Date().toISOString(),
        'rep_beg_period': beginValue?.toLocaleString().split(',')[0].split('.').reverse().join('-'),
        'rep_end_period': endVvalue?.toLocaleString().split(',')[0].split('.').reverse().join('-'),
        'update_date':  new Date().toISOString(),
        'update_user': formData.insert_user,
      }));
    }
  };

  return (
    <form className={className} onSubmit={handleFormSubmit} ref={modalRef}>
      <div className="new-form__layout">
        <div className="new-form__wrapper">
          <div className="new-form__content">
            <div className="new-form__organization">
              <label>ОРГАНИЗАЦИЯ</label>
              <input className="new-form__organization-input" type="text"
                id="org_employee"
                name="org_employee"
                onChange={handleFormChange}
                value={formData.org_employee}
              />
            </div>
            <div>
              <p className="new-form__period-title">ЗА ПЕРИОД</p>
              <div className="new-form__term">
                <div className="date-picker">
                  <DatePicker onChange={setBeginValue} value={beginValue} />
                </div>
                <div className="date-picker">
                  <DatePicker onChange={setEndVvalue} value={endVvalue} />
                </div>
              </div>
            </div>
            <div className="new-form__organization">
              <label htmlFor="">Ответственный, заполнивший форму (Ф.И.О., должность, телефон)</label>
              <input className='new-form__employee new-form__organization-input' type="text"
                id="insert_user"
                name="insert_user"
                onChange={handleFormChange}
                value={formData.insert_user}
              />
            </div>
            <div className="new-form__buttons">
              <button className="new-form__btn-close btn"
                type="button"
                onClick={() =>
                  dispatch(setIsNewForm(false))
                }
              >
                Закрыть
              </button>
              <button className="new-form__btn-save btn" type='submit'>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
