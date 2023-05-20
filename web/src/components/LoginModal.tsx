import { motion } from 'framer-motion'
import { Github, X } from 'lucide-react'
import Image from 'next/image'

// interface LoginModalInterface {
//   isVisible: boolean
// }

export default function LoginModal(props: any) {
  if (!props.isVisible) {
    return null
  }

  const dropIn = {
    hidden: {
      y: '-100vh',
      opactity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opactity: 0,
    },
  }

  return (
    // Modal
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    >
      {/* Modal Body */}
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative flex h-[400px] w-[400px] flex-col items-center justify-center space-y-4 rounded-lg bg-gray-600"
      >
        <button className="absolute right-0 top-0 p-2" onClick={props.onClose}>
          <X className="h-5 w-5 text-gray-50" />
        </button>
        <h1>Faça login utilizando sua conta:</h1>

        <a
          className="flex flex-row items-center gap-2 hover:text-gray-200"
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
        >
          <Github className="h-10 w-10 text-gray-50" />
          <h2>Github</h2>
        </a>

        <a
          className="flex flex-row items-center gap-2 hover:text-gray-200"
          href=""
        >
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="login with google"
            height={35}
            width={35}
          />

          <h2>Google</h2>
        </a>
      </motion.div>
    </motion.div>
  )
}
