import { useRouter } from "next/router";
import React from 'react'
import { useEffect } from 'react'

export default function index() {
    const router = useRouter()
    useEffect(() => {
        router.push({pathname:"/report"})
    },[])
}
