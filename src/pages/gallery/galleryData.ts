import { cld, PHOTO_PATHS } from '../../constants';

export const allImages = PHOTO_PATHS.map(path => cld(path, 'f_auto,q_auto,w_900'));
