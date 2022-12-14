import Swal from 'sweetalert2';

export function confirmationAlert(
    title,
    text,
    showCancelButton = true,
    confirmButtonText,
    cb
) {
    Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText,
        cancelButtonText: 'Cancelar',
    }).then(cb);
}
