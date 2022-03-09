function makeTippy(element, text) {
    const ref = element.popperRef();
    const domElement = document.createElement('div');
    return tippy(domElement, {
        getReferenceClientRect: ref.getBoundingClientRect,
        trigger: 'manual',
        content: function() {
            const div = document.createElement('div');
            div.innerHTML = text;
            return div;
        },
        arrow: true,
        placement: 'top',
        hideOnClick: false,
        sticky: "reference",
        interactive: true,
        appendTo: document.body
    });
}