import { useAppDispatch, useAppSelector } from '@/hooks';
import './layout.css'
import { setActiveIdForm, setIsFormActive, setWatchButton } from '@/store/data-line/data-line.slice';
import { fetchFormItemAction, fetchHeadersAction, fetchLineDataAction } from '@/store/api-actions';
import { getActiveIdForm } from '@/store/data-line/data-line.selectors';
import { setIsNewForm, setRowActive } from '@/store/headers/headers.slice';


type LayoutProps = {
  children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {
  const dispatch = useAppDispatch();
  const activeId = useAppSelector(getActiveIdForm);

  const onChangeBtnClickHandler = () => {
    dispatch(setIsFormActive(true));
    if (activeId) {
      dispatch(fetchFormItemAction(activeId.toString()));
    }
  }

  const onUpdateBtnClickHandler = () => {
    dispatch(fetchHeadersAction());
    dispatch(fetchLineDataAction());
  }

  const onWatchBtnClickHandler = () => {
    dispatch(setWatchButton(true));
    dispatch(setIsFormActive(true));
    if (activeId) {
      dispatch(fetchFormItemAction(activeId.toString()));
    }
  }

  const onAddNewFormBtnClickHandler = () => {
    dispatch(setIsNewForm(true));
    dispatch(setRowActive(null));
    dispatch(setActiveIdForm(null));
  }


  return (
    <div className='layout'>
      <div className="layout__buttons">
        <button className='btn' onClick={onUpdateBtnClickHandler}>
          Обновить
        </button>
        <button className='btn' onClick={onAddNewFormBtnClickHandler}>
          Добавить
        </button>
        <button  className='btn' disabled={activeId === null}
          onClick={onWatchBtnClickHandler}
        >
          Просмотреть
        </button>
        <button className='btn' type='button'
          onClick={onChangeBtnClickHandler}
          disabled={activeId === null}
        >
          Редактировать
        </button>
      </div>
      {children}
    </div>
  );
}
