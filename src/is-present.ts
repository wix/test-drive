import { isElement } from './helpers';

function isPresent(element: any): boolean {
    if (isElement(element)) {
        const rects = [...element.getClientRects()];
        return rects.some(rectangle => rectangle.width > 0 && rectangle.height > 0);
    } else {
        return false;
    }
}

export default function (chai: Chai.ChaiStatic, util: Chai.ChaiUtils) {
    chai.Assertion.addMethod('present', function (this: any) {
        const { flag } = util;
        const element = flag(this, 'object');
        this.assert(isPresent(element),
            'Element expected to be present.',
            'Element expected to be absent.'
        );
    });

    chai.Assertion.addMethod('absent', function (this: any) {
        const { flag } = util;
        const element = flag(this, 'object');
        this.assert(!isPresent(element),
            'Element expected to be absent.',
            'Element expected to be present.'
        );
    });
}
