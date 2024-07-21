import { writable } from "svelte/store";

export const messages = writable([]);

export function addMessage(type, text) {
    let message = { type, text };
    messages.update((msgs) => [...msgs, message]);

    setTimeout(() => {
        removeMessage(message);
    }, 5000);
}

export function removeMessage(message) {
    messages.update((msgs) => {
        return msgs.filter((msg) => msg !== message);
    });
}