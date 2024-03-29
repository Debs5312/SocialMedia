import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { Activity } from "../models/activity";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;

}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error('Bad Request')
            break;
        case 401:
            toast.error('Unauthorized')
            break;
        case 404:
            toast.error('Not Found')
            break;
        case 403:
            toast.error('Forbidden')
            break;
        case 500:
            toast.error('Internal Server Error')
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activityApi'),
    details: (id: string) => request.get<Activity>(`/activityApi/${id}`),
    create: (activity: Activity) => request.post<void>('/activityApi', activity),
    update: (activity: Activity) => request.put<void>(`/activityApi/${activity.id}`, activity),
    delete: (id: string) => request.delete<void>(`/activityApi/${id}`)

}

const agent = {
    Activities
}

export default agent;