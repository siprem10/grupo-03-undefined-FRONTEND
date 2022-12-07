import Swal from "sweetalert2";

export function alert(title, text, icon = 'success') {    
  Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#ff714e'
   })
}

export function alert2(onClick, title, text, icon = 'success') {    
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonColor: '#ff714e'
     }).then((result) => {
        if (onClick && typeof(onClick) === "function") {
            onClick();
        }
      })
}