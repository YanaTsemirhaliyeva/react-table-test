import './spinner.css';

function Spinner() {
  return (
    <div className='el'>
      <div className='container'>
        <div className='wrapper'>
          <div className='loader'>
            <div className='dot'/>
          </div>
          <div className='loader'>
            <div className='dot'/>
          </div>
          <div className='loader'>
            <div className='dot'/>
          </div>
          <div className='loader'>
            <div className='dot'/>
          </div>
          <div className='loader'>
            <div className='dot'/>
          </div>
          <div className='loader'>
            <div className='dot'/>
          </div>
        </div>
        <div className='text'>
          Загрузка...
        </div>
      </div>
    </div>
  );
}

export default Spinner;
