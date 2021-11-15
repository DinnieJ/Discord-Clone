import { getToken, removeToken } from '../utils/cookies';
import { setUserData } from '../redux/auth';
import { showSnackbar } from '../redux/snackbar';
import { ERROR_SNACKBAR, SUCCESS_SNACKBAR } from '../constants/snackbar';
import { useDispatch, useSelector } from 'react-redux'
import { loginWithToken } from '../repositories/AuthRepository';
import { useState, useLayoutEffect, useContext } from 'react';
import { SocketContext } from '../utils/socket';

export default function useConfigApp() {
  const [isFetched, setIsFetched] = useState(false)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const isConnected = useSelector(state => state.socket.isConnected)

  useLayoutEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
    if (!isFetched && isConnected) {
      ; (async () => {
        const token = getToken()
        if (token) {
          await loginWithToken()
            .then((res) => {
              dispatch(setUserData(res))
              console.log(res)
              dispatch(showSnackbar({ type: SUCCESS_SNACKBAR, message: 'Welcome back' }))
              socket.emit('user:reset-socket', res.data.data.user.id)
            })
            .catch((err) => {
              console.log(err)
              dispatch(showSnackbar({ type: ERROR_SNACKBAR, message: err.response?.data.status ?? err.message }))
              removeToken()
            })
        }
        setIsFetched(true)
      })()
    }
  }, [isConnected])

  return isFetched
}