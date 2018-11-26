interface Window {
  initialReduxState: any
}

declare interface ServiceWorkerConfig {
  onSuccess: (registration: ServiceWorkerRegistration) => void
  onUpdate: (registration: ServiceWorkerRegistration) => void
}

declare module 'redux-first-history'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
