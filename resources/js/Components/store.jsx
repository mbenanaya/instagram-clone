import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	deleteType: null,
	id: null,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setDeleteType: (state, action) => {
			state.deleteType = action.payload;
		},
		setId: (state, action) => {
			state.id = action.payload;
		},
		resetDeleteOptions: (state) => {
			state.deleteType = null;
			state.id = null;
		},
	},
});

export const { setDeleteType, setId, resetDeleteOptions } = appSlice.actions;

export default configureStore({
	reducer: {
		app: appSlice.reducer,
	},
});
