import './App.css';
import UserPosition from './components/position/position';
import Cities from './components/filter/cities';
import Logo from './IMAGES/branding copy.png'

function App(props) {

  return (
    <div className="App">
      <div className='banner p-3'>
        <img src={Logo} alt='Logo' className='logo'></img>
      </div>
      <div className='row d-flex flex-wrap justify-content-evenly'>
        <div className='col-sm-4 col-md-6 col-lg-4 align-self-end'>
          <UserPosition />
        </div>
        <div className='col-sm-4 col-md-6 col-lg-4'>
          <Cities />
        </div>
      </div>
      <footer className='footer fixed-bottom'>
        ©️ 2021 Techi Rexach
      </footer>
    </div>
  );
}

export default App;



