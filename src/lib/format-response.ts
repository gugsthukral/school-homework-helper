export function formatResponse(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-900 font-semibold'>$1</strong>")
    .replace(/^### (.*$)/gm, "<h3 class='text-lg font-semibold text-sky-700 mt-4 mb-2'>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2 class='text-xl font-bold text-slate-900 mt-5 mb-2'>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1 class='text-2xl font-bold text-slate-900 mt-5 mb-3'>$1</h1>")
    .replace(
      /^\d+\.\s(.+)$/gm,
      "<p class='ml-4 mb-1'><span class='text-orange-500 font-medium'>•</span> $1</p>"
    )
    .replace(/^[-*]\s(.+)$/gm, "<p class='ml-4 mb-1'><span class='text-sky-600'>→</span> $1</p>")
    .replace(/\n\n/g, "</p><p class='mb-2 text-slate-700'>")
    .replace(/\n/g, "<br />");
}

export function formatResponseForPrint(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^\d+\.\s(.+)$/gm, "<p style='margin-left:1rem'>$1</p>")
    .replace(/^[-*]\s(.+)$/gm, "<p style='margin-left:1rem'>$1</p>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />");
}
