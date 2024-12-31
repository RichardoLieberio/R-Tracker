import {createSlice} from '@reduxjs/toolkit';

export const categoryPageSlice = createSlice({
    name: 'categoryPage',
    initialState: {
        order: 'desc',
        orderBy: 'created_at',
        processing: [],
        editProcess: {}
    },
    reducers: {
        setOrder: function(state, action) {
            state.order = action.payload;
        },
        setOrderBy: function(state, action) {
            state.orderBy = action.payload;
        },
        addProcess: function(state, action) {
            state.processing = [...state.processing, action.payload];
        },
        deleteProcess: function(state, action) {
            state.processing = state.processing.filter(id => id !== action.payload);
        },
        addEditProcess: function(state, action) {
            const {id, data} = action.payload;
            state.editProcess = {...state.editProcess, [id]: data};
        },
        deleteEditProcess: function(state, action) {
            const newProcess = {...state.editProcess};
            delete newProcess[action.payload];
            state.editProcess = {...newProcess};
        },
        logout: function(state) {
            state.order = 'desc';
            state.orderBy = 'created_at';
            state.processing = [];
            state.editProcess = {};
        }
    }
});

export const {setOrder, setOrderBy, addProcess, deleteProcess, addEditProcess, deleteEditProcess, logout} = categoryPageSlice.actions;

export default categoryPageSlice.reducer;