"use client"
import {useContext} from "react";
import {QuioscoContext} from "../context/QuioscoProvider";
export default function useQuiosco(){
    return useContext(QuioscoContext)
}