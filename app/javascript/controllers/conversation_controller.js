import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="conversation"
export default class extends Controller {
  static targets = ["textArea", "messages"]

  connect() {
    this.setScrollPosition();
    this.setupMutationObserver();
  }

  setupMutationObserver() {
    // Think of this like having a helper friend who watches the messages box
    // When new messages appear, the friend tells us "Hey! Something new happened!"
    this.observer = new MutationObserver(() => {
      // When our friend sees new messages, we scroll down to see them
      this.setScrollPosition();
    });

    // We tell our helper friend what to watch for:
    this.observer.observe(this.messagesTarget, {
      childList: true,  // Watch when new message bubbles get added or removed
      subtree: true     // Also watch inside all the message bubbles for any changes
    });
  }

  disconnect() {
    // When we're done with the chat, we tell our helper friend to stop watching
    // This is like saying "Thanks for helping! You can go play now!"
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setScrollPosition() {
    this.messagesTarget.scrollTop = this.messagesTarget.scrollHeight - this.messagesTarget.clientHeight;
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
