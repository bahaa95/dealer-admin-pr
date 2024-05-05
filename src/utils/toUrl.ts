// TODO: refactor
export function toUrl(urlObject: Record<any, any>) {
  const keys = Object.keys(urlObject);
  const filteredUrl = keys.reduce((prev, key) => {
    if (
      urlObject[key] !== undefined &&
      urlObject[key] !== null &&
      urlObject[key] !== ""
    ) {
      return { ...prev, [key]: urlObject[key] };
    }
    return prev;
  }, {});

  return filteredUrl ? new URLSearchParams(filteredUrl as any).toString() : "";
}
