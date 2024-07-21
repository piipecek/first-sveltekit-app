import { writable } from "svelte/store";

export const roles = writable([]);

export function setRoles(newRoles) {
    roles.set(newRoles);
}

export function purgeRoles() {
    roles.set([]);
}