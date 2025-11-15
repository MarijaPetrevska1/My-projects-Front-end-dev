export class Loader {
    static spinner = document.getElementById("spinner");
    static show() {
        this.spinner.style.display = "block";
    }
    static hide() {
        this.spinner.style.display = "none";
    }
}
