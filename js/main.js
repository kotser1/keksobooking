import './data.js';
import './make-elements.js';
import './form.js';
import './map.js';
import './api.js';
import {renderElements} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form.js';

getData(renderElements);

setUserFormSubmit();
