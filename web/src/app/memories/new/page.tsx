'use client'
import CreateNewMemorieForm from '@/components/CreateNewMemorieForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewMemorie() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-4 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <CreateNewMemorieForm />
    </div>
  )
}
