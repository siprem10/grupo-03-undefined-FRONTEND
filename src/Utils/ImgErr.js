import avatar_default from "../assets/user/avatar_default.png";

export function setImgError(e, img) {
    if (!img) return;
    e.target.src = img;
}

export function setImgUserErr(e) {
    setImgError(e, avatar_default);
}