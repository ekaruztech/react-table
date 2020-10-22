import { isObject, omit, remove as rm } from 'lodash'

export type PostEventInit = {
  detail: { newData: any; storageKey: string; oldData: any }
  bubbles: boolean
}

export type UpdateEventInit = {
  detail: { newData: any; storageKey: string; oldData: any }
  bubbles: boolean
}

export type PullEventInit = {
  detail: { data: any; storageKey: string }
  bubbles: boolean
}

export type RemoveEventInit = {
  detail: { storageKey: string }
  bubbles: boolean
}

const events = {
  post: 'RTStoragePost',
  pull: 'RTStoragePull',
  update: 'RTStoragePut',
  remove: 'RTStorageDelete'
}
/**
 * Stores, Retrieve, Delete and Updates a data in the local storage.
 * @param localStorageKey
 * @param defaultValue
 */
const Storage = (localStorageKey: string, defaultValue?: any) => {
  if (localStorageKey) {
    const storage = localStorage.getItem(localStorageKey)
    if (!storage) {
      localStorage.setItem(localStorageKey, JSON.stringify(defaultValue))
    }
    /**
     * Stores data in localstorage.
     * @param data
     */
    const post = (data: any): void => {
      // Stores the data in local-storage.
      localStorage.setItem(localStorageKey, JSON.stringify(data))
      // Initializes data to send to listener.
      const eventInit: PostEventInit = {
        detail: {
          newData: JSON.parse(
            (localStorage.getItem(localStorageKey) || '{}') as string
          ),
          storageKey: localStorageKey,
          oldData: JSON.parse(storage || '{}')
        },
        bubbles: true
      }
      // Creates a post event.
      /* See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events */
      const postEvent = new CustomEvent(events.post, eventInit)

      // Dispatches the event.
      document.dispatchEvent(postEvent)
    }

    /**
     * Retrieves data from local storage
     */
    const pull = (): any => {
      // Retrieves data from local-storage.
      const storage = localStorage.getItem(localStorageKey)
      if (storage) {
        const data = JSON.parse(storage || '{}')
        // Inits event data.
        const eventInit: PullEventInit = {
          detail: { data, storageKey: localStorageKey },
          bubbles: true
        }
        // Creates a pull event.
        /* See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events */
        const pullEvent = new CustomEvent(events.pull, eventInit)

        // Dispatches pull event.
        document.dispatchEvent(pullEvent)
        return data
      }
      return null
    }

    /**
     * Updates a storage value, unlike push, it checks does not reset the data.
     * @param updateData
     */
    const update = (updateData: any) => {
      // Finds existing data. in local-storage.
      const storage = localStorage.getItem(localStorageKey)
      if (storage && updateData) {
        // Parses data to JS objects.
        const storageValue = JSON.parse(storage || '{}')

        // Updates data different for Objects
        if (isObject(updateData) && isObject(storageValue)) {
          const newStorageValue = {
            ...storageValue,
            ...updateData
          }
          localStorage.setItem(localStorageKey, JSON.stringify(newStorageValue))
        }

        // For Arrays
        if (Array.isArray(updateData) && Array.isArray(storageValue)) {
          const newStorageValue = [...storageValue, ...updateData]
          localStorage.setItem(localStorageKey, JSON.stringify(newStorageValue))
        }

        // For non-Arrays and non-Objects
        if (
          !(isObject(updateData) && isObject(storageValue)) &&
          !(Array.isArray(updateData) && Array.isArray(storageValue))
        ) {
          localStorage.setItem(localStorageKey, updateData.toString())
        }

        // Dispatch event after completion
        const eventInit: UpdateEventInit = {
          detail: {
            newData: JSON.parse(
              (localStorage.getItem(localStorageKey) || '{}') as string
            ),
            storageKey: localStorageKey,
            oldData: JSON.parse(storage || '{}')
          },
          bubbles: true
        }

        // Creates a update event.
        /* See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events */
        const updateEvent = new CustomEvent(events.update, eventInit)

        // dispatches event.
        document.dispatchEvent(updateEvent)
      }
    }
    /**
     * Removes a nested value from the storage value. Only(Array | Objects)
     * @param key
     * @param removeFn
     */
    const removeNested = (
      key: string | string[],
      removeFn?: (value: any) => any
    ): void => {
      // Retrieves data.
      const storage = localStorage.getItem(localStorageKey)

      if (storage && key) {
        const storageValue = JSON.parse(storage)

        // Removes data if stored data is an object.
        if (isObject(storageValue)) {
          const newStorageValue = JSON.stringify(omit(storageValue, key))
          localStorage.setItem(localStorageKey, newStorageValue)
        }

        // Removes data if stored data is an array.
        if (Array.isArray(storageValue) && removeFn) {
          const newStorageValue = JSON.stringify(rm(storageValue, removeFn))
          localStorage.setItem(localStorageKey, newStorageValue)
        }

        // Dispatch event after completion
        const eventInit: RemoveEventInit = {
          detail: { storageKey: localStorageKey },
          bubbles: true
        }
        // Creates a remove event.
        /* See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events */
        const removeEvent = new CustomEvent(events.remove, eventInit)
        document.dispatchEvent(removeEvent)
      }
    }
    /**
     * Removes a storage data from the local storage
     */
    const remove = (): void => {
      const eventInit: RemoveEventInit = {
        detail: { storageKey: localStorageKey },
        bubbles: true
      }
      // Creates a remove event.
      /* See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events */
      const removeEvent = new CustomEvent(events.remove, eventInit)
      localStorage.removeItem(localStorageKey)

      // dispatches event.
      document.dispatchEvent(removeEvent)
    }
    return { post, pull, update, remove, removeNested }
  }

  return {}
}

export { Storage, events as StorageEvents }
