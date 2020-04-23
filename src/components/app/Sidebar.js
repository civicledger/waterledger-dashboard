import React, { useState} from 'react';
import { Logo, MainNav } from '../components';
import { fetchAuth } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';



export default () => {

  const [hideForm, setHideForm] = useState(true);
  const toggleHideForm = () => setHideForm(!hideForm);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  return <div className="hidden lg:flex lg:w-70 border border-gray-300 border-t-0 border-l-0 border-b-0 relative bg-white open" id="menu">
    <div className="flex flex-col w-full">
      <a href="https://www.waterledger.com" className="no-underline"><Logo /></a>

      <div className="flex-shrink p-5 pb-0"><MainNav /></div>

      <div className="flex-1 p-5"></div>
      <div className="flex-shrink">

        <div onClick={toggleHideForm} className="p-5 text-center text-gray-300">
          <i className="fal fa-user-lock fa-lg"></i>
        </div>

        { !hideForm && <form className="m-5 p-5 border rounded bg-gray-100">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              autoComplete="email-address"
              onChange={event => setEmail(event.target.value)}
              id="email"
              type="text"
              placeholder="Email address" />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
              id="password"
              type="password"
              placeholder="******************" />
          </div>
          <div className="text-right">
            <button
              onClick={() => {
                  dispatch(fetchAuth(email, password));
                  setPassword('');
                  setEmail('');
                  setHideForm(true);
                }
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
              >
              Sign In
            </button>
          </div>
        </form> }

      </div>

      <div className="flex-shrink p-5 pt-0 text-center">
        {/* <h3 className="text-gray-800 mb-2 heading">WATER ECOTECH</h3> */}
        <p className="text-gray-700">A Civic Ledger Solution</p>
      </div>
    </div>
  </div>
}