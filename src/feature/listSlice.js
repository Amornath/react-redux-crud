import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getLists = createAsyncThunk(
  'list/getLists',
  async () => { 
    return fetch(
      `http://localhost:8000/students`
    ).then((res) => res.json())
  }
);

export const updateList = createAsyncThunk(
  'list/updateList',
  async (data) => { 
    return fetch(
      `http://localhost:8000/students/`+data.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
    ).then((res) => res.json())
  }
);

export const deleteList = createAsyncThunk(
  'list/deleteList',
  async (data) => { 
    return fetch(
      `http://localhost:8000/students/`+data.id, {
          method: "DELETE",
         
        }
    ).then((res) => res.json())
  }
);

export const createList = createAsyncThunk(
    'list/createList',
    async (record) => { 
      return fetch(
        `http://localhost:8000/students`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
          }
      ).then((res) => res.json())
    }
  );

const listSlice = createSlice({
  name: 'list',
  initialState: {
    data: [],
    status: null,
  },
  reducers:{
//     filterByMissionName: (state, action) => {
//       state.list = state.list.filter((item)=> item.mission_name.toLowerCase().includes(action.payload));
//      },
//     filterByLaunchYear: (state, action) => {
//      state.list = state.list.filter((item)=> item.launch_year.includes(action.payload));
//     },
//     filterByStatus:(state, action) =>{
//         state.list = state.list.filter((item)=> item.launch_success===action.payload);
//     },
//     filterByLastLaunchYear:(state, action) =>{
//       const todayDate = new Date()
//       const startDayOfPrevYear = moment(todayDate).subtract(action.payload, 'year').startOf('year').format('LLLL')
//       const lastDayOfPrevYear = moment(todayDate).subtract(action.payload, 'year').endOf('year').format('LLLL')
//       state.list = state.list.filter((item)=> {return moment(item.launch_date_local).isBetween(startDayOfPrevYear, lastDayOfPrevYear)} );
//   },
  },
  extraReducers: {
    [getLists.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getLists.fulfilled]: (state, { payload }) => {
      state.data = payload
      state.status = 'success'
    },
    [getLists.rejected]: (state, action) => {
      state.status = 'failed'
    },
  },
})

// export const { filterByLaunchYear,filterByStatus, filterByLastLaunchYear, filterByMissionName } = listSlice.actions

export default listSlice.reducer
