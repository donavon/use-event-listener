import useEventListener from './index'

declare const element: HTMLElement

useEventListener('click', (_: MouseEvent) => { }, element)

useEventListener('click', (_: MouseEvent) => { }, document)
useEventListener('resize', (_: UIEvent) => { }, document)

useEventListener('popstate', (_: PopStateEvent) => { }, window)
useEventListener('popstate', (_: PopStateEvent) => { })

declare const something: HTMLElement | Window | Document
useEventListener('click', (_: MouseEvent) => { }, something)
useEventListener('click', (_: Event) => { }, something)

declare const eventListenerObject: EventListenerObject
useEventListener('click', eventListenerObject)
useEventListener('click', eventListenerObject, something)
