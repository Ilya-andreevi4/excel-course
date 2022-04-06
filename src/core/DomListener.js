import {capitalize} from './utilits'

export class DomListener {
    constructor($root, listeners=[]) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(
                    `Method ${method} is not implemented in ${this.name}`
                    )
            }

            this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDOMListeners() {
        // this.listeners.forEach(this.listener => {
        //     const method = getMethodName(listener)
        //     this.$root.off(listener, this[method])
        // })
    }
}

// input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
