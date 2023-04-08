import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from '../notes/noteService'

const initialState = {
  notes: [],
  loading: false,
}

// get ticket notes
export const createNote = createAsyncThunk(
  'ticket/createNote',
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// create ticket notes
export const getNotes = createAsyncThunk(
  'ticket/getNotes',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(createNote.pending, (state) => {
        state.loading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default noteSlice.reducer
