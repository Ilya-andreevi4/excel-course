export class Emitter {
    constructor() {
        this. listeners = {}
    }

    // Уведомляем слушателей, если они есть

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)            
        })
        return true
    }

    // Подписываемся на уведомления
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = 
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('test', data => console.log('Sub: ', data))

// emitter.emit('test', 42)

// setTimeout(() => {
//     emitter.emit('test', 'after 1 sec')
// }, 1000)

// setTimeout(() => {
//     unsub()
// }, 2000)

// setTimeout(() => {
//     emitter.emit('test', 'after 3 sec')
// }, 3000)
