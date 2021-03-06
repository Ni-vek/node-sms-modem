import CancelablePromise from 'cancelable-promise'

export default class Sleep {

    public static sleeps: object = {}

    public static create(timeout: number = 0, ...id: string[]): CancelablePromise {
        let idJoined
        if (id.length) {
            idJoined = id.join('_')
        } else {
            idJoined = new Date().getTime().toString()
        }

        this.clear(idJoined)
        this.sleeps[idJoined] = new CancelablePromise((resolve: any) => {
            setTimeout(resolve, timeout)
        })
        return this.sleeps[idJoined]
    }

    public static clear(id: string, reason?: () => void): void {
        if (this.sleeps.hasOwnProperty(id)) {
            this.sleeps[id].cancel(reason || null)
        }
    }

    public static clearAllBy(...id: string[]): void {
        for (const sleepsKey of Object.keys(this.sleeps)) {
            if (new RegExp(id.join('_')).test(sleepsKey)) {
                this.clear(sleepsKey)
            }
        }
    }
}
