
const DURATION = 100;
const TIMING_FUNCTION = 'linear';
const PROPERTY = 'all';

/**
 * getWindow:: void -> window object
 */
const getWindow = new Function('return window')

/**
 * isBrowser:: void -> boolean
 */
const isBrowser = new Function(`
    try {
        return this === window;
    } catch {
        return false;
    }
`)

/**
 * setTransitionProperties:: (HTMLElement, {duration: number, timingFunction: string, property: string}) -> void
 */
const setTransitionProperties = (node, { duration, timingFunction, property } = {}) => {
    const { style: { setProperty } } = node;
    setProperty('transition-duration', `${duration || DURATION}ms`);
    setProperty('transition-timing-function', timingFunction || TIMING_FUNCTION);
    setProperty('transition-property', property || PROPERTY);
}

/**
 * controllerEvent: (HTMLElement, number, {active: boolean}) -> MouseEvent -> void
 */
const controllerEvent = (node, lengthMotion = DURATION, state) => {
    const { style: { setProperty } } = node;
    const { x, y, height, width } = node.getBoundingClientRect();
    const positionCenterY = y + (height / 2);
    const positionCenterX = x + (width / 2);
    const { round } = Math;
    const { innerHeight, innerWidth } = getWindow();
    /**
     * :: MouseEvent -> void
     */
    return ({ pageY, pageX }) => {
        if (state.active) {
            const repelCursorY = round(((positionCenterY - pageY) / innerHeight) * lengthMotion);
            const repelCursorX = round(((positionCenterX - pageX) / innerWidth) * lengthMotion);
            setProperty('transform', `translate(${repelCursorX}px, ${repelCursorY}px)`);
            state.active = false;
        }
    }
}

/**
 * reboundTimmingAnimation:: number -> number
 */
const reboundTimingAnimation = (duration) => Math.ceil(duration * 0.95);

/**
 * controllerClearOf:: (number, MouseEvent -> void) -> void
 */
const controllerClearOf = (intervalAnimation, event) => () => {
    getWindow().removeEventListener('mousemove', event);
    clearInterval(intervalAnimation);;
}


/**
 * RepelCursor:: (HTMLElement, {duration:number, timingFunction: string, property: string, length: number}) -> {update: property -> RepelCursor, destroy: void -> void}
 */
const RepelCursor = (node, data) => {
    if (!isBrowser()) {
        return {};
    }

    if (!data) {
        return {
            update: (property) => RepelCursor(node, property),
        }
    }

    const state = { active: false };

    setTransitionProperties(node, data);

    const { duration, length } = data;

    const intervalAnimation = setInterval(() => repelActive = true, reboundTimingAnimation(duration))

    const event = controllerEvent(node, length, state);

    getWindow().addEventListener('mousemove', event);

    const toClear = controllerClearOf(intervalAnimation, event);

    return {
        update(property) {
            toClear();
            return RepelCursor(node, property);
        },
        destroy: () => toClear(),
    };
};

export default RepelCursor;