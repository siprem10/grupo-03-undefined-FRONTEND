import Swal from 'sweetalert2';

export function errorAlert() {
    Swal.fire({
        title: 'Oops!',
        text: 'There is an error',
        icon: 'error',
        confirmButtonText: 'Ok',
    });
}

export function infoAlert() {
    Swal.fire({
        title: 'Title for info!',
        text: 'Do you want to continue',
        icon: 'info',
        confirmButtonText: 'Ok',
    });
}

export function successAlert() {
    Swal.fire({
        title: 'Awesome!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool',
    });
}

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
