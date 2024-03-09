function modal(modalId) {
    const modalBackground = document.getElementById("modalContainer");
    const modal = document.getElementById(modalId)

    return {
        show: function() {
            modalBackground.style.opacity = 1;
            modalBackground.style.pointerEvents = 'unset';

            modal.style.display = 'flex';
        },

        hide: function() {
            modalBackground.style.opacity = 0;
            modalBackground.style.pointerEvents = null;

            modal.style.display = null;
        }
    }
}