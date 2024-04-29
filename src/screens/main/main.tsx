import { useAppSelector } from '@/hooks';
import { getHeaders } from '@/store/headers/headers.selectors';
// import { getLines } from '@/store/lines/lines.selectors';
// import { getDataByLine } from '@/store/data-line/data-line.selectors';
import Complex from '@/Table/Complex';
import Form from '@/components/form/form';
import { AddNewForm } from '@/components/add-new-form/add-new-form';
// import Material from '@/Table/Material';


function MainScreen() {

  const storeHeaders = useAppSelector(getHeaders);

  return (
    <>
      {/* <Material data={storeHeaders} /> */}
      <Complex data={storeHeaders} />
      <AddNewForm />
      <Form />
    </>
  )
}

export default MainScreen;
