import { configureStore } from '@reduxjs/toolkit'
import titleReducer from './title'

export default configureStore({
  reducer: {
    title: titleReducer,
  },
})