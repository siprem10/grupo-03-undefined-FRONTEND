import Swal from 'sweetalert2';

export function errorAlert() {
    Swal.fire({
        title: 'Oops!',
        text: 'There is an error',
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

export function infoAlert() {
    Swal.fire({
        title: 'Title for info!',
        text: 'Do you want to continue',
        icon: 'info',
        confirmButtonText: 'Ok'
    })
}

export function successAlert() {
    Swal.fire({
        title: 'Awesome!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool'
    })
}