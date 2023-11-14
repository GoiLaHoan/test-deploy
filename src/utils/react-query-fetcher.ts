export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: any,
) {
  return async (): Promise<TData> => {
    const res = await fetch("https://kitco.graphcdn.app", {
      method: "POST",
      ...{ headers: { "Content-Type": "application/json" } },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];
      console.warn("Fetcher err", message);
      console.warn("options", options);
      // NOTE: sometimes fields dont resolve in drupal graphql.
      // however, the query itself still does.
      // if we throw an error here, that state gets propagated all the
      // way up to react query's state and we dont want that..
      // throw new Error(message);
    }

    return json.data;
  };
}
