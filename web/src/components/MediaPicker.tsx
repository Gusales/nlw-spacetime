/* eslint-disable @next/next/no-img-element */
'use client'

import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewUrl = URL.createObjectURL(files[0])
    setPreview(previewUrl)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        accept="image/*"
        id="media"
        className="invisible h-0 w-0"
      />

      {preview && (
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
