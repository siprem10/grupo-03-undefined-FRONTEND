import Swal from "sweetalert2";

function alertBase(onClick, icon, title, text, showCancelButton = false) {
    Swal.fire({
        icon: icon ?? "error",
        title: title ?? "Oops...",
        text: text,
        showCancelButton,
        confirmButtonColor: '#054a47',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',

    }).then((result) => {
        if(!showCancelButton){
            if (onClick && typeof (onClick) === "function") {
                onClick();
            }
        } else {
            if(result.isConfirmed) {
                onClick();
            }
        }
    })
}

export function alertOk(text, title = "Ok!") {
    alertBase(null, "success", title, text);
}

export function alertErr(text, title = "Oops...") {
    alertBase(null, "error", title, text);
}

export function alertOkClick(onClick, text, title = "Ok!") {
    alertBase(onClick, "success", title, text);
}

export function alertErrClick(text, title = "Oops...") {
    alertBase(onClick, "error", title, text);
}


export function alertAdvert(onClick, text, title = "Atención!") {
    alertBase(onClick, "warning", title, text, true);
}

export function alertAdvert2(text, title = "Atención!") {
    alertBase(null, "warning", title, text);
}

