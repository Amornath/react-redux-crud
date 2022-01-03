import { configureStore } from '@reduxjs/toolkit'

import listReducer from '../feature/listSlice';


export default configureStore({
  reducer: {
    
    list: listReducer
  },
})