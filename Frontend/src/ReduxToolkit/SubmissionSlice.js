import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {api, setAuthHeader} from "../api/api";

export const submitTask = createAsyncThunk(
    "submissions/submitTask",
    async ({ taskId, githubLink }) => {
        setAuthHeader(localStorage.getItem("jwt"), api);

        try{
            const {data} = await api.post(
                `/api/submissions?task_id=${taskId}&github_link=${githubLink}`, {}
            );
            console.log("submitted task ", data);
            return data;
        } catch(error){
            console.log("catch ",error);
            throw Error(error.response.data.error);
        }
    }
);

export const fetchAllSubmissions = createAsyncThunk(
    "submissions/fetchAllSubmissions",
    async () => {
        setAuthHeader(localStorage.getItem("jwt"), api);

        try{
            const {data} = await api.get(`/api/submissions`);
            console.log("submitted task ", data);
            return data;
        } catch(error){
            console.log("catch ",error);
            throw Error(error.response.data.error);
        }
    }
);

export const fetchSubmissionsByTaskId = createAsyncThunk(
    "submissions/fetchAllSubmissionsByTaskId",
    async ({taskId}) => {
        console.log("fetch submissions by task id");
        setAuthHeader(localStorage.getItem("jwt"), api);

        try{
            const {data} = await api.get(`/api/submissions/task/${taskId}`);
            console.log("submitted task ", data);
            return data;
        } catch(error){
            console.log("catch ",error);
            throw Error(error.response.data.error);
        }
    }
);

export const acceptDeclineSubmission = createAsyncThunk(
    "submissions/acceptDeclineSubmission",
    async ({id,status}) => {
        setAuthHeader(localStorage.getItem("jwt"), api);

        try{
            const {data} = await api.put(
                `/api/submissions/${id}?status=${status}`, {}
            );
            console.log("accept task ", data);
            return data;
        } catch(error){
            console.log("catch ",error);
            throw Error(error.response.data.error);
        }
    }
);

const submissionSlice = createSlice({
    name: "submission",
    initialState: {
        submissions: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(submitTask.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(submitTask.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.submissions.push(action.payload);
        })
        .addCase(submitTask.rejected, (state, action)=>{
            state.status = 'failed';
            state.error=action.error.message;
        })
        .addCase(fetchAllSubmissions.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.submissions = action.payload;
        })
        .addCase(fetchAllSubmissions.rejected, (state, action)=>{
            state.status = 'failed';
            state.error=action.error.message;
        })
        .addCase(fetchSubmissionsByTaskId.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.submissions = action.payload;
        })
        .addCase(acceptDeclineSubmission.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.submissions = action.submissions.map((item)=>item.id!==action.payload.id ? item : action.payload);
        })
    },
});

export default submissionSlice.reducer;