const CallValues = {
  searchAll: 'autocomplete.get',
}

type CallType = keyof typeof CallValues

export const useFetch = async (type: CallType, params: Record<string, string>) => {
  const url = new URL('https://www.jiosaavn.com/api.php')

  url.searchParams.append('__call', CallValues[type])
  url.searchParams.append('_format', 'json')
  url.searchParams.append('_marker', '0')
  url.searchParams.append('ctx', 'web6dot0')

  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))

  return fetch(url.toString())
}
