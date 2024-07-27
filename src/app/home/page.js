"use client"

import React from 'react'
import { useState } from 'react'
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const page = () => {
    let router = useRouter()

    const [mail , setmail] = useState('')

    const logoutClick = () => {
        deleteCookie('email')
        setmail('')
        router.push('/')
    }

    useEffect(() => {
        setmail(getCookie('email'))
    }, [])
    return (
        <div >
            <h1 className='text-3xl underline text-center'> Wellcome {mail} this is your  Home Page</h1>
            <button className='text-3xl underline text-center' onClick={logoutClick}>Logout</button>
        </div>
    )
}

export default page