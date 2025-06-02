import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="conversation"
export default class extends Controller {
  static targets = ["textArea"]

  connect() {
    this.textAreaTarget.addEventListener("keydown", this.submitForm.bind(this));
  }

  submitForm(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const form = event.target.closest("form");
      form.requestSubmit();
      form.reset();
    }
  }
}
