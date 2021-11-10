import { getToken, removeToken } from '../utils/cookies';
import { fetchUser, setUserData } from '../redux/auth';
import { showSnackbar } from '../redux/snackbar';
import { ERROR_SNACKBAR, SUCCESS_SNACKBAR } from '../constants/snackbar';
import { useDispatch } from 'react-redux'
import { fetchUserByToken } from '../repositories/AuthRepository';
import { useState, useLayoutEffect } from 'react';

export default function useConfigApp() {
    const [isFetched, setIsFetched] = useState(false)
    const dispatch = useDispatch()
    useLayoutEffect(() => {
      if (!isFetched) {
        ; (async () => {
          const token = getToken()
          if (token) {
            await fetchUserByToken(fetchUser())
              .then((res) => {
                dispatch(setUserData(res))
                dispatch(showSnackbar({ type: SUCCESS_SNACKBAR, message: 'Welcome back' }))
              })
              .catch((err) => {
                console.log(err)
                dispatch(showSnackbar({ type: ERROR_SNACKBAR, message: err.response?.data.status ?? err.message  }))
                removeToken()
              })
          }
          setIsFetched(true)
        })()
      }
    })

    return isFetched
}