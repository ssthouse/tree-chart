export const DEFAULT_NODE_WIDTH = 100;
export const DEFAULT_NODE_HEIGHT = 100;
export const DEFAULT_LEVEL_HEIGHT = 200;

/**
 * Used to decrement the height of the 'initTransformY' to center diagrams.
 * This is only a hotfix caused by the addition of '__invisible_root' node
 * for multi root purposes.
 */
export const DEFAULT_HEIGHT_DECREMENT = 200;

export const ANIMATION_DURATION = 800;

export const MATCH_TRANSLATE_REGEX = /translate\((-?\d+)px, ?(-?\d+)px\)/i;
export const MATCH_SCALE_REGEX = /scale\((\S*)\)/i;