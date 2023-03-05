import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities;
            }, {} as {[Key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.setloadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setloadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setloadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setloadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity);
                this.setloadingInitial(false);
            } catch (error) {
                console.log(error);
                this.setloadingInitial(false);
            }
            return activity;
        }
    }

    private getActivity(id: string) {
        return this.activityRegistry.get(id);
    }

    private setActivity(activity: Activity) {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.loading = false;
                this.editMode = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.editMode = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        this.editMode = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.loading = false;
                this.editMode = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.editMode = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}