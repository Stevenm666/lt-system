import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "",
        rol: [],
        isLoggedIn: false,
    },
    reducers: {
        loggedIn: (state, action) => {
            state.username = action.payload.username;
            state.rol = action.payload.rol;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        logoutIn: (state, action) => {
            state.username = action.payload.username;
            state.rol = action.payload.rol;
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});

export const { loggedIn, logoutIn } = userSlice.actions;
export default userSlice.reducer;