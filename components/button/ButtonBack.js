import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@chakra-ui/react"
import { BsArrowLeftCircle } from "react-icons/bs";

export default function ButtonBack() {
  const router = useRouter()

  return (
    <>
      <Button
        size='sm'
        onClick={() => router.back()}
        leftIcon={<BsArrowLeftCircle />}
        borderRadius='20'
        background='#f84c01'
        color='white'
        fontWeight='none'
        fontSize='20px'
      >
        ย้อนกลับ
      </Button>
    </>
  )
}