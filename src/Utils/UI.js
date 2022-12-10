import Swal from "sweetalert2";

function alertBase(onClick, icon, title, text) {
    Swal.fire({
        icon: icon ?? "error",
        title: title ?? "Oops...",
        text: text,
        confirmButtonColor: '#ff714e'

    }).then(() => {
        if (onClick && typeof (onClick) === "function") {
            onClick();
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
