//Instruments
import { MAIN_URL, TOKEN } from "./config";

export const api = {
    fetchTasks: async () => {
        const response = await fetch(MAIN_URL, {
            method:  "GET",
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: tasks } = await response.json();

        if (response.status !== 200) {
            throw new Error("Tasks were not fetched.");
        }

        return tasks;
    },
    createTask: async (newTaskMessage) => {
        const response = await fetch(MAIN_URL, {
            method:  "POST",
            headers: {
                Authorization:  TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: newTaskMessage }),
        });

        const { data } = await response.json();

        return data;
    },
    updateTask: async (updatedTask) => {
        const response = await fetch(MAIN_URL, {
            method:  "PUT",
            headers: {
                Authorization:  TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify([updatedTask]),
        });

        const { data } = await response.json();

        if (response.status !== 200) {
            throw new Error("Task was not updated.");
        }

        return data;
    },
    removeTask: async (taskId) => {
        const response = await fetch(`${MAIN_URL}/${taskId}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error("Task was not removed.");
        }
    },
    async completeAllTasks (tasks) {
        const promises = [];

        for (const task of tasks) {
            promises.push(
                fetch(`${MAIN_URL}/${task.id}`, {
                    method:  "PUT",
                    headers: {
                        Authorization:  TOKEN,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...task, completed: true }),
                })
            );
        }
        const responses = await Promise.all(promises);
        const success = responses.every((result) => result.status === 200);

        if (!success) {
            throw new Error("Tasks were not completed");
        }
    },
};
