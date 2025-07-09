export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const diffInMs = now.getTime() - date.getTime();

  if (diffInMs < 0) {
    const futureDiffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);
    const futureDiffInMinutes = Math.floor(futureDiffInSeconds / 60);
    const futureDiffInHours = Math.floor(futureDiffInMinutes / 60);
    const futureDiffInDays = Math.floor(futureDiffInHours / 24);

    if (futureDiffInSeconds < 60) {
      return `in ${futureDiffInSeconds} seconds`;
    } else if (futureDiffInMinutes < 60) {
      return `in ${futureDiffInMinutes} minutes`;
    } else if (futureDiffInHours < 24) {
      return `in ${futureDiffInHours} hours`;
    } else {
      return `in ${futureDiffInDays} days`;
    }
  }

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return diffInSeconds === 1
      ? "1 second ago"
      : `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? "1 minute ago"
      : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  }
}
