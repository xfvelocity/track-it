import router from '@/router'
import { useUserStore } from '@/stores/user'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
  UserCredential,
  Auth,
  signOut,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export const signIn = (type: string): void => {
  let provider: GoogleAuthProvider | FacebookAuthProvider | null = null
  const auth: Auth = getAuth()
  const userStore = useUserStore()

  switch (type) {
    case 'google':
      provider = new GoogleAuthProvider()
      break
    case 'facebook':
      provider = new FacebookAuthProvider()
      break
  }

  if (provider) {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        let credential: OAuthCredential | null = null

        switch (type) {
          case 'google':
            credential = GoogleAuthProvider.credentialFromResult(result)
            break
          case 'facebook':
            credential = FacebookAuthProvider.credentialFromResult(result)
            break
        }

        if (credential) {
          userStore.user = result.user
          router.push('/')
        }
      })
      .catch((error) => {
        // store.commit('setError', error)
      })
  }
}

export const createEmailAccount = (email: string, password: string) => {
  const auth: Auth = getAuth()

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.push('/account/login')
    })
    .catch((error) => {
      // store.commit('setError', error)
    })
}

export const signInEmailAccount = (email: string, password: string) => {
  const auth: Auth = getAuth()
  const userStore = useUserStore()

  signInWithEmailAndPassword(auth, email, password)
    .then((result: UserCredential) => {
      if (result) {
        userStore.user = result.user
        router.push('/')
      }
    })
    .catch((error) => {
      // store.commit('setError', error)
    })
}

export const signUserOut = (): void => {
  const auth: Auth = getAuth()
  const userStore = useUserStore()

  signOut(auth)
    .then(() => {
      userStore.$reset()
      router.push('/login')
    })
    .catch((error) => {
      // store.commit('setError', error)
    })
}
