const DURATION = 100;
const TIMING_FUNCTION = 'linear';
const PROPERTY = 'all';
const PROPERTY_TIMING = 'transition-timing-function';

/**
 * getWindow:: void -> window object
 */
const getWindow = new Function('return window');

/**
 * isBrowser:: void -> boolean
 */
const isBrowser = new Function(`
    try {
        return this === window;
    } catch {
        return false;
    }
`);

/**
 * setTransitionProperties:: (
 *  HTMLElement,
 *  {duration: number, timingFunction: string, property: string}
 * ) -> void
 */
const setTransitionProperties = (
	node,
	{ duration, timingFunction, property } = {}
) => {
	const {
		style
	} = node;
	style.setProperty('transition-duration', `${duration || DURATION}ms`);
	style.setProperty(PROPERTY_TIMING, timingFunction || TIMING_FUNCTION);
	style.setProperty('transition-property', property || PROPERTY);
};

/**
 * controllerEvent: (HTMLElement, number, {active: boolean}) ->
 *                  MouseEvent -> void
 */
const controllerEvent = (node, motion = DURATION, state) => {
	const {
		style
	} = node;
	const { x, y, height, width } = node.getBoundingClientRect();
	const centerY = y + height / 2;
	const centerX = x + width / 2;
	const { round } = Math;
	const { innerHeight: iHeight, innerWidth: iWidth } = getWindow();
	/**
	 * :: MouseEvent -> void
	 */
	return ({ pageY, pageX }) => {
		if (state.active) {
			const repelY = round(((centerY - pageY) / iHeight) * motion);
			const repelX = round(((centerX - pageX) / iWidth) * motion);
			style.setProperty('transform', `translate(
                ${repelX}px,
                ${repelY}px
            )`);
			state.active = false;
		}
	};
};

/**
 * reboundTimmer:: number -> number
 */
const reboundTimmer = (duration) => Math.ceil(duration * 0.95);

/**
 * controllerClearOf:: (number, MouseEvent -> void) -> void
 */
const controllerClearOf = (intervalAnimation, event) => () => {
	getWindow().removeEventListener('mousemove', event);
	clearInterval(intervalAnimation);
};

/**
 * RepelCursor:: (
 *  HTMLElement,
 *  {duration:number, timingFunction: string, property: string, length: number}
 * ) -> {update: property -> RepelCursor, destroy: void -> void}
 */
const RepelCursor = (node, data) => {
	if (!isBrowser()) {
		return {};
	}

	if (!data) {
		return {
			update: (property) => RepelCursor(node, property)
		};
	}

	const state = {
		active: false
	};

	setTransitionProperties(node, data);

	const { duration, length } = data;

	const intervalAnimation = setInterval(
		() => (state.active = true),
		reboundTimmer(duration)
	);

	const event = controllerEvent(node, length, state);

	getWindow().addEventListener('mousemove', event);

	const toClear = controllerClearOf(intervalAnimation, event);

	return {
		update(property) {
			toClear();
			return RepelCursor(node, property);
		},
		destroy: () => toClear()
	};
};

export default RepelCursor;
