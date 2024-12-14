export function updateCountdown() {
    const now = new Date();
    const endsAt = new Date(data.data.endsAt);

    const timeLeft = endsAt - now;

    if (timeLeft <= 0) {
      countdownElement.textContent = "Auction ended";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();
} catch (error) {
  console.error(error);
  if (singleItem) {
    singleItem.innerHTML = "An error occurred while fetching the data";
  }
}