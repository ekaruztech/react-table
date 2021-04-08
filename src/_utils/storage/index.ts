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

export interface StorageAPI {
  pull: () => any
  post: (data: any) => void
  update: (updateData: any) => void
  removeNested: (key: string | string[], removeFn?: (value: any) => any) => void
  remove: () => void
}

export class Storage implements StorageAPI {
  private readonly storageKey: string
  private readonly storage: any

  constructor(storageKey: string, defaultValue: any = null) {
    if (!storageKey) throw new Error('Invalid storage key')
    this.storageKey = storageKey
    this.storage = localStorage.getItem(storageKey)

    if (!this.storage) {
      localStorage.setItem(storageKey, JSON.stringify(defaultValue))
    }
  }

  /**
   * Stores data in localstorage.
   * @param data
   */
  public post(data: any): void {
    // Stores the data in local-storage.
    localStorage.setItem(this.storageKey, JSON.stringify(data))
    // Initializes data to send to listener.
    const eventInit: PostEventInit = {
      detail: {
        newData: JSON.parse(
          (localStorage.getItem(this.storageKey) || '{}') as string
        ),
        storageKey: this.storageKey,
        oldData: JSON.parse(this.storage || '{}')
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
  public pull(): any {
    // Retrieves data from local-storage.
    const storage = localStorage.getItem(this.storageKey)
    if (storage) {
      const data = JSON.parse(storage || '{}')
      // Inits event data.
      const eventInit: PullEventInit = {
        detail: { data, storageKey: this.storageKey },
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
  public update(updateData: any): void {
    // Finds existing data. in local-storage.
    const storage = localStorage.getItem(this.storageKey)
    if (storage && updateData) {
      // Parses data to JS objects.
      const storageValue = JSON.parse(storage || '{}')

      // Updates data different for Objects
      if (isObject(updateData) && isObject(storageValue)) {
        const newStorageValue = {
          ...storageValue,
          ...updateData
        }
        localStorage.setItem(this.storageKey, JSON.stringify(newStorageValue))
      }

      // For Arrays
      if (Array.isArray(updateData) && Array.isArray(storageValue)) {
        const newStorageValue = [...storageValue, ...updateData]
        localStorage.setItem(this.storageKey, JSON.stringify(newStorageValue))
      }

      // For non-Arrays and non-Objects
      if (
        !(isObject(updateData) && isObject(storageValue)) &&
        !(Array.isArray(updateData) && Array.isArray(storageValue))
      ) {
        localStorage.setItem(this.storageKey, updateData.toString())
      }

      // Dispatch event after completion
      const eventInit: UpdateEventInit = {
        detail: {
          newData: JSON.parse(
            (localStorage.getItem(this.storageKey) || '{}') as string
          ),
          storageKey: this.storageKey,
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
  public removeNested(
    key: string | string[],
    removeFn?: (value: any) => any
  ): void {
    // Retrieves data.
    const storage = localStorage.getItem(this.storageKey)

    if (storage && key) {
      const storageValue = JSON.parse(storage)

      // Removes data if stored data is an object.
      if (isObject(storageValue)) {
        const newStorageValue = JSON.stringify(omit(storageValue, key))
        localStorage.setItem(this.storageKey, newStorageValue)
      }

      // Removes data if stored data is an array.
      if (Array.isArray(storageValue) && removeFn) {
        const newStorageValue = JSON.stringify(rm(storageValue, removeFn))
        localStorage.setItem(this.storageKey, newStorageValue)
      }

      // Dispatch event after completion
      const eventInit: RemoveEventInit = {
        detail: { storageKey: this.storageKey },
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
  public remove(): void {
    const eventInit: RemoveEventInit = {
      detail: { storageKey: this.storageKey },
      bubbles: true
    }
    // Creates a remove event.
    /* See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events */
    const removeEvent = new CustomEvent(events.remove, eventInit)
    localStorage.removeItem(this.storageKey)

    // dispatches event.
    document.dispatchEvent(removeEvent)
  }
}
