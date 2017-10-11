// https://github.com/allouis/minivents
import EventsHandler from 'miniEvents';

// Consider revising this method, not happy with it.
const evHandler = new EventsHandler();

class EventManager {

    static Register(ev, fn) {

        evHandler.on(ev, fn);

    }

    static Trigger(str, data) {

        evHandler.emit(str, data);

    }

}

export default EventManager;
