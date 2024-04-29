import {HelmetProvider} from 'react-helmet-async';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import { useAppSelector } from '@/hooks';
import { isHeadersDataLoading } from '@/store/headers/headers.selectors';
import { isLinesDataLoading } from '@/store/lines/lines.selectors';
import { isDataLineDataLoading } from '@/store/data-line/data-line.selectors';
import MainScreen from '@/screens/main/main';
import Spinner from '../spinner/spinner';


const App = () => {
  const isHeadersLoading = useAppSelector(isHeadersDataLoading);
  const isLinesLoading = useAppSelector(isLinesDataLoading);
  const isDataLineLoading = useAppSelector(isDataLineDataLoading);

  if (isHeadersLoading || isLinesLoading || isDataLineLoading) {
    return <Spinner/>
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Index}
          element={<MainScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
