export function isValidName(any) {

    if (!any) return false;

    return (
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
            .test(any)
    );
}

export function isValidNum(any) {

    if (!any) return false;

    return isNaN(Number(any));
}

export function isValidEmail(any) {

    if (!any) return false;
    
    return (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        .test(any)
    );
}