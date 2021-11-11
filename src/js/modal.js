import * as basicLightbox from 'basiclightbox'
import basicLight from '../css/basicLightBox.css'


function onModalImage(event) {
    event.preventDefault();

    const eventTarget = event.target
    if (eventTarget.nodeName !== 'IMG') {
        return
    }

    let largeImage = eventTarget.dataset.source;
    const instance = basicLightbox
        .create(`<img src="${largeImage}" width="800" height="600">`)
        instance.show()
}

export default onModalImage