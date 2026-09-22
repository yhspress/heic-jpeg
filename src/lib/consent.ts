"use client";
import { useSyncExternalStore } from "react";
const key = "optional-services";
function subscribe(callback:()=>void){window.addEventListener("storage",callback);window.addEventListener("consentchange",callback);return()=>{window.removeEventListener("storage",callback);window.removeEventListener("consentchange",callback)}}
function snapshot(){try{return localStorage.getItem(key);}catch{return null;}}
export function useOptionalConsent(){return useSyncExternalStore(subscribe,snapshot,()=>null)}
export function setOptionalConsent(value:string){try{localStorage.setItem(key,value)}catch{}window.dispatchEvent(new Event("consentchange"))}
