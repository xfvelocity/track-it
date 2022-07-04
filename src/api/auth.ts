import router from '@/router'
import store from '@/store'
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
  store.commit('setLoading', {
    type: 'fullpage',
    value: true,
  })

  let provider: GoogleAuthProvider | FacebookAuthProvider | null = null
  const auth: Auth = getAuth()

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
          store.commit('setUser', result.user)

          router.push('/')
        }
      })
      .catch((error) => {
        store.commit('setError', error)
      })
      .finally(() => {
        store.commit('setLoadingValue', false)
      })
  }
}

export const createEmailAccount = (email: string, password: string) => {
  const auth: Auth = getAuth()

  store.commit('setLoading', {
    type: 'fullpage',
    value: true,
  })

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.push('/account/login')
    })
    .catch((error) => {
      store.commit('setError', error)
    })
    .finally(() => {
      store.commit('setLoadingValue', false)
    })
}

export const signInEmailAccount = (email: string, password: string) => {
  const auth: Auth = getAuth()

  store.commit('setLoading', {
    type: 'fullpage',
    value: true,
  })

  signInWithEmailAndPassword(auth, email, password)
    .then((result: UserCredential) => {
      if (result) {
        store.commit('setUser', result.user)
        router.push('/')
      }
    })
    .catch((error) => {
      store.commit('setError', error)
    })
    .finally(() => {
      store.commit('setLoadingValue', false)
    })
}

export const signUserOut = (): void => {
  const auth: Auth = getAuth()

  store.commit('setLoading', {
    type: 'fullpage',
    value: true,
  })

  signOut(auth)
    .then(() => {
      store.commit('setUser', {})
      router.push('/login')
    })
    .catch((error) => {
      store.commit('setError', error)
    })
    .finally(() => {
      store.commit('setLoadingValue', false)
    })
}
